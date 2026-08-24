<?php
/**
 * Mail configuration for the Ethery Tech contact endpoints.
 *
 * Deployed to <docroot>/api/config.php by the production workflow.
 */

return [
    // Where submissions are delivered.
    'to' => ['contact@ethery.tech'],

    // Envelope sender. Must be an @ethery.tech address so SPF/DKIM pass.
    // The visitor's address goes into Reply-To, never into From.
    'from_email' => 'no-reply@ethery.tech',
    'from_name'  => 'Ethery Tech Website',

    // Accepted CV uploads: extension => attachment content type.
    'max_cv_bytes' => 10 * 1024 * 1024,
    'cv_types' => [
        'pdf'  => 'application/pdf',
        'doc'  => 'application/msword',
        'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
];
