<?php
/**
 * Careers application endpoint (src/components/Contact/CarrersForm).
 *
 * Required fields mirror the asterisks in the UI exactly:
 *   from_name, from_email, role, cv, consent
 * Optional: phone, linkedin, note.
 */

declare(strict_types=1);

require __DIR__ . '/_lib.php';

et_require_post();
et_guard_post_size('cv');
et_reject_honeypot();

$config = et_config();

$name    = et_post('from_name');
$email   = et_post('from_email');
$role    = et_post('role');
$consent = et_post('consent');

$errors = [];
if ($name === '') {
    $errors['from_name'] = 'Full Name is required';
}
if ($email === '') {
    $errors['from_email'] = 'Email is required';
} elseif (!et_is_email($email)) {
    $errors['from_email'] = 'Enter a valid email';
}
if ($role === '') {
    $errors['role'] = 'Role / Department of Interest is required';
}
if ($consent !== '1' && $consent !== 'true' && $consent !== 'on') {
    $errors['consent'] = 'You must agree to be contacted';
}

$cv = $_FILES['cv'] ?? null;
$attachment = null;

if (!is_array($cv) || ($cv['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE) {
    $errors['cv'] = 'Upload CV is required';
} elseif ($cv['error'] === UPLOAD_ERR_INI_SIZE || $cv['error'] === UPLOAD_ERR_FORM_SIZE) {
    // The server's own upload limit can be lower than the 10MB the form
    // advertises, so report the limit that actually rejected the file.
    $errors['cv'] = 'File is larger than this server accepts (max ' . ini_get('upload_max_filesize') . ')';
} elseif ($cv['error'] !== UPLOAD_ERR_OK || !is_uploaded_file($cv['tmp_name'])) {
    $errors['cv'] = 'The CV could not be uploaded. Please try again.';
} elseif ($cv['size'] > $config['max_cv_bytes']) {
    $errors['cv'] = 'File size must be under 10MB';
} else {
    $extension = strtolower(pathinfo((string) $cv['name'], PATHINFO_EXTENSION));

    if (!isset($config['cv_types'][$extension])) {
        $errors['cv'] = 'CV must be a PDF, DOC or DOCX file';
    } else {
        $data = file_get_contents($cv['tmp_name']);

        if ($data === false) {
            $errors['cv'] = 'The CV could not be read. Please try again.';
        } else {
            $attachment = [
                // Rebuild the filename instead of trusting the browser's.
                'name' => preg_replace('/[^A-Za-z0-9._-]/', '_', $name) . '-CV.' . $extension,
                'type' => $config['cv_types'][$extension],
                'data' => $data,
            ];
        }
    }
}

if ($errors) {
    et_json(422, [
        'message' => 'Please fill required fields correctly.',
        'errors'  => $errors,
    ]);
}

$sent = et_deliver(
    'New job application',
    $name . ' applied for: ' . $role,
    'Job application - ' . $name . ' (' . $role . ')',
    [
        'Full name'            => $name,
        'Email'                => $email,
        'Role of interest'     => $role,
        'Phone'                => et_post('phone'),
        'LinkedIn / Portfolio' => et_post('linkedin'),
        'Message'              => et_post('note'),
        'CV'                   => $attachment['name'],
    ],
    $email,
    $name,
    $attachment
);

if (!$sent) {
    et_json(500, ['message' => 'We could not send your application right now. Please email contact@ethery.tech.']);
}

et_json(200, ['message' => 'OK']);
