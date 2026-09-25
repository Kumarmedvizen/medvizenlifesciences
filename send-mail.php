<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Method Not Allowed');
}

function clean($v) { return trim(strip_tags($v ?? '')); }

$name         = clean($_POST['name']         ?? '');
$organization = clean($_POST['organization'] ?? '');
$email        = clean($_POST['email']        ?? '');
$phone        = clean($_POST['phone']        ?? '');
$message      = clean($_POST['message']      ?? '');

if ($name === '')                               exit('Please enter your name.');
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) exit('Please enter a valid email.');
if (preg_match('/[\r\n]/', $name . $email))     exit('Invalid input.');

$to       = 'mukund.rayapureddi@gmail.com';
$siteName = 'Medvizen Life Science';
$subject  = "New Enquiry from {$name}" . ($organization ? " ({$organization})" : '');

$body  = "New enquiry from the Medvizen website\n\n";
$body .= "Name:         {$name}\n";
$body .= "Organization: " . ($organization ?: '-') . "\n";
$body .= "Email:        {$email}\n";
$body .= "Phone:        " . ($phone ?: '-') . "\n";
$body .= "----------------------------------\n";
$body .= "Message:\n{$message}\n";
$body .= "----------------------------------\n";
$body .= "Sent: " . date('Y-m-d H:i:s') . "\n";

$headers  = "From: {$siteName} <no-reply@medvizenlifesciences.com>\r\n";
$headers .= "Reply-To: {$name} <{$email}>\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$sent = @mail(
    $to,
    '=?UTF-8?B?' . base64_encode($subject) . '?=',
    $body,
    $headers
);

header('Content-Type: text/plain; charset=UTF-8');
echo $sent
    ? 'Thank you - your enquiry has been sent. We will contact you shortly.'
    : 'Sorry, your message could not be sent. Please email medvizen.lifesciences@gmail.com directly.';
