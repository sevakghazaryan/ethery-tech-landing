<?php
/**
 * Shared helpers for the Ethery Tech mail endpoints.
 *
 * Every path in here is resolved from __DIR__, never from the current working
 * directory, so the endpoints keep working regardless of how the web server
 * invokes PHP. Resolving the template relative to the CWD is what caused the
 * "Email template not found or unreadable." failure on the previous version.
 */

// Warnings must never be printed into the response - they would corrupt the
// JSON body the form parses. Everything still goes to the PHP error log.
ini_set('display_errors', '0');
ini_set('log_errors', '1');

function et_config(): array
{
    static $config = null;
    if ($config === null) {
        $config = require __DIR__ . '/config.php';
    }
    return $config;
}

/** Send a JSON response and stop. */
function et_json(int $status, array $payload): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=UTF-8');
    header('Cache-Control: no-store');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

/** Reject anything that is not a POST. */
function et_require_post(): void
{
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
        header('Allow: POST');
        et_json(405, ['message' => 'Method not allowed']);
    }
}

/**
 * When a request body exceeds post_max_size PHP discards $_POST and $_FILES
 * entirely. Without this guard that arrives as "every field is empty", which
 * would be reported to the visitor as a bogus validation error.
 */
function et_guard_post_size(?string $fileField = null): void
{
    $contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
    if ($contentLength > 0 && !$_POST && !$_FILES) {
        $payload = ['message' => 'Your submission was too large for the server. Please shorten it or attach a smaller file.'];
        if ($fileField !== null) {
            $payload['errors'] = [$fileField => 'File is too large to upload'];
        }
        et_json(413, $payload);
    }
}

/** Read a POST field as a trimmed string. */
function et_post(string $key): string
{
    $value = $_POST[$key] ?? '';
    if (!is_string($value)) {
        return '';
    }
    return trim($value);
}

function et_is_email(string $value): bool
{
    return (bool) filter_var($value, FILTER_VALIDATE_EMAIL);
}

/** Strip CR/LF so a submitted value can never inject extra mail headers. */
function et_header_safe(string $value): string
{
    return trim(str_replace(["\r", "\n", "\0"], ' ', $value));
}

/**
 * Silently accept and discard bot submissions that filled the hidden
 * "website" field, so the bot does not learn it was rejected.
 */
function et_reject_honeypot(): void
{
    if (et_post('website') !== '') {
        et_json(200, ['message' => 'OK']);
    }
}

/** Render an HTML table row, escaping the caller's data. */
function et_row(string $label, string $value): string
{
    $label = htmlspecialchars($label, ENT_QUOTES, 'UTF-8');
    $value = nl2br(htmlspecialchars($value, ENT_QUOTES, 'UTF-8'));

    return '<tr>'
        . '<td style="padding:10px 16px;border-bottom:1px solid #e6ebf2;font:600 14px/20px Arial,Helvetica,sans-serif;color:#0b1b33;white-space:nowrap;vertical-align:top;">' . $label . '</td>'
        . '<td style="padding:10px 16px;border-bottom:1px solid #e6ebf2;font:400 14px/20px Arial,Helvetica,sans-serif;color:#2c3e56;">' . $value . '</td>'
        . '</tr>';
}

/**
 * Load an email template and substitute {{placeholders}}.
 *
 * @param array<string,string> $vars Values are inserted verbatim, so callers
 *                                   must escape anything user-supplied first
 *                                   (see et_row()).
 * @throws RuntimeException when the template file is missing or unreadable.
 */
function et_render_template(string $name, array $vars): string
{
    $path = __DIR__ . '/templates/' . basename($name);

    if (!is_file($path) || !is_readable($path)) {
        throw new RuntimeException('Email template not found or unreadable: ' . basename($name));
    }

    $html = file_get_contents($path);
    if ($html === false) {
        throw new RuntimeException('Email template not found or unreadable: ' . basename($name));
    }

    foreach ($vars as $key => $value) {
        $html = str_replace('{{' . $key . '}}', $value, $html);
    }

    return $html;
}

/**
 * Render the notification email from one ordered field list and send it.
 *
 * The same $fields drive the HTML table and the plain-text alternative, so the
 * two versions cannot drift apart. Empty values render as a dash.
 *
 * @param array<string,string> $fields Ordered label => value pairs.
 * @param array{name:string,type:string,data:string}|null $attachment
 * @return bool False when the template is unreadable or mail() refused it;
 *              the reason is written to the PHP error log.
 */
function et_deliver(
    string $heading,
    string $intro,
    string $subject,
    array $fields,
    string $replyToEmail,
    string $replyToName,
    ?array $attachment = null
): bool {
    $submittedAt = gmdate('d M Y H:i') . ' UTC';

    $rows = '';
    $lines = [$heading, str_repeat('=', strlen($heading)), ''];
    foreach ($fields as $label => $value) {
        $display = $value === '' ? '—' : $value;
        $rows .= et_row($label, $display);
        $lines[] = $label . ': ' . $display;
    }
    $lines[] = 'Submitted: ' . $submittedAt;

    try {
        $html = et_render_template('submission.html', [
            'heading'      => htmlspecialchars($heading, ENT_QUOTES, 'UTF-8'),
            'intro'        => htmlspecialchars($intro, ENT_QUOTES, 'UTF-8'),
            'rows'         => $rows,
            'submitted_at' => $submittedAt,
        ]);
    } catch (RuntimeException $e) {
        error_log('[ethery-forms] ' . $e->getMessage());
        return false;
    }

    $text = implode("\r\n", $lines) . "\r\n";

    if (!et_send_mail(et_config()['to'], $subject, $html, $text, $replyToEmail, $replyToName, $attachment)) {
        error_log('[ethery-forms] mail() was refused for ' . $replyToEmail);
        return false;
    }

    return true;
}

/**
 * Send a multipart email, optionally with a single attachment.
 *
 * @param array{name:string,type:string,data:string}|null $attachment
 */
function et_send_mail(
    array $to,
    string $subject,
    string $html,
    string $text,
    string $replyToEmail,
    string $replyToName,
    ?array $attachment = null
): bool {
    $config = et_config();

    $fromEmail = $config['from_email'];
    $fromName  = et_header_safe($config['from_name']);

    $altBoundary = 'alt_' . bin2hex(random_bytes(12));
    $mixBoundary = 'mix_' . bin2hex(random_bytes(12));

    $headers = [
        'MIME-Version: 1.0',
        'From: ' . et_display_name($fromName) . ' <' . $fromEmail . '>',
        'X-Mailer: ethery-web',
    ];

    if ($replyToEmail !== '' && et_is_email($replyToEmail)) {
        $name = et_header_safe($replyToName);
        $headers[] = 'Reply-To: ' . ($name !== '' ? et_display_name($name) . ' ' : '')
            . '<' . et_header_safe($replyToEmail) . '>';
    }

    $alternative = "--{$altBoundary}\r\n"
        . "Content-Type: text/plain; charset=UTF-8\r\n"
        . "Content-Transfer-Encoding: base64\r\n\r\n"
        . chunk_split(base64_encode($text)) . "\r\n"
        . "--{$altBoundary}\r\n"
        . "Content-Type: text/html; charset=UTF-8\r\n"
        . "Content-Transfer-Encoding: base64\r\n\r\n"
        . chunk_split(base64_encode($html)) . "\r\n"
        . "--{$altBoundary}--\r\n";

    if ($attachment === null) {
        $headers[] = 'Content-Type: multipart/alternative; boundary="' . $altBoundary . '"';
        $body = $alternative;
    } else {
        $headers[] = 'Content-Type: multipart/mixed; boundary="' . $mixBoundary . '"';
        $filename = et_header_safe($attachment['name']);
        $body = "--{$mixBoundary}\r\n"
            . "Content-Type: multipart/alternative; boundary=\"{$altBoundary}\"\r\n\r\n"
            . $alternative . "\r\n"
            . "--{$mixBoundary}\r\n"
            . 'Content-Type: ' . $attachment['type'] . '; name="' . $filename . "\"\r\n"
            . "Content-Transfer-Encoding: base64\r\n"
            . 'Content-Disposition: attachment; filename="' . $filename . "\"\r\n\r\n"
            . chunk_split(base64_encode($attachment['data'])) . "\r\n"
            . "--{$mixBoundary}--\r\n";
    }

    $subject = et_mime_word(et_header_safe($subject));

    $ok = true;
    foreach ($to as $recipient) {
        if (!mail($recipient, $subject, $body, implode("\r\n", $headers), '-f' . $fromEmail)) {
            $ok = false;
        }
    }

    return $ok;
}

/** RFC 2047 encode a header value only when it contains non-ASCII characters. */
function et_mime_word(string $value): string
{
    if (preg_match('/^[\x20-\x7E]*$/', $value)) {
        return $value;
    }
    return '=?UTF-8?B?' . base64_encode($value) . '?=';
}

/**
 * Format a display name for a From/Reply-To header. Names containing RFC 5322
 * specials (a submitted name may contain anything) become a quoted string, so
 * they cannot break the header's structure.
 */
function et_display_name(string $name): string
{
    $encoded = et_mime_word($name);
    if ($encoded !== $name) {
        return $encoded; // Encoded words are already safe atoms.
    }
    if (preg_match('/[()<>@,;:\\\\".\[\]]/', $name)) {
        return '"' . str_replace(['\\', '"'], ['\\\\', '\\"'], $name) . '"';
    }
    return $name;
}
