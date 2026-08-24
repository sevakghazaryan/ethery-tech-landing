<?php
/**
 * Request Demo form endpoint (src/components/Contact/Form).
 *
 * Required fields mirror the asterisks in the UI exactly:
 *   full_name, company, work_email, interest
 * Optional: title, phone, message.
 */

declare(strict_types=1);

require __DIR__ . '/_lib.php';

et_require_post();
et_guard_post_size();
et_reject_honeypot();

$fullName = et_post('full_name');
$company  = et_post('company');
$email    = et_post('work_email');
$interest = et_post('interest');

$errors = [];
if ($fullName === '') {
    $errors['full_name'] = 'Full Name is required';
}
if ($company === '') {
    $errors['company'] = 'Company is required';
}
if ($email === '') {
    $errors['work_email'] = 'Email is required';
} elseif (!et_is_email($email)) {
    $errors['work_email'] = 'Enter a valid email';
}
if ($interest === '') {
    $errors['interest'] = 'Select at least one area of interest';
}

if ($errors) {
    et_json(422, [
        'message' => 'Please fill required fields correctly.',
        'errors'  => $errors,
    ]);
}

$sent = et_deliver(
    et_config()['to_demo'],
    'New demo request',
    $fullName . ' from ' . $company . ' requested a demo.',
    'Demo request - ' . $fullName . ' (' . $company . ')',
    [
        'Full name'        => $fullName,
        'Company'          => $company,
        'Job title'        => et_post('title'),
        'Email'            => $email,
        'Phone'            => et_post('phone'),
        'Area of interest' => $interest,
        'Message'          => et_post('message'),
    ],
    $email,
    $fullName
);

if (!$sent) {
    et_json(500, ['message' => 'We could not send your request right now. Please email contact@ethery.tech.']);
}

et_json(200, ['message' => 'OK']);
