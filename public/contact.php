<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

// Honeypot-check
$honeypot = trim($input['website'] ?? '');
if (!empty($honeypot)) {
    echo json_encode(["ok" => true]);
    exit;
}

// Timing-check — Form needs to have been opened for at least 5 seconds before submission
$formLoadedAt = $input['formLoadedAt'] ?? null;
$minSeconds = 5;

if ($formLoadedAt) {
    $elapsedMs = (microtime(true) * 1000) - $formLoadedAt;
    if ($elapsedMs < ($minSeconds * 1000)) {
        // Probably a bot — fake succes
        echo json_encode(["ok" => true]);
        exit;
    }
}

$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$subject = trim($input['subject'] ?? '');
$message = trim($input['message'] ?? '');

$errors = [];

if (mb_strlen($name) < 2) {
    $errors['name'] = "Naam moet minstens 2 karakters bevatten";
} elseif (mb_strlen($name) > 100) {
    $errors['name'] = "Naam mag niet langer dan 100 karakters zijn";
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = "Voer een geldig e-mailadres in";
}

if (mb_strlen($subject) < 5) {
    $errors['subject'] = "Onderwerp moet minstens 5 karakters bevatten";
} elseif (mb_strlen($subject) > 200) {
    $errors['subject'] = "Onderwerp mag niet langer dan 200 karakters zijn";
}

if (mb_strlen($message) < 10) {
    $errors['message'] = "Bericht moet minstens 10 karakters bevatten";
} elseif (mb_strlen($message) > 5000) {
    $errors['message'] = "Bericht mag niet langer dan 5000 karakters zijn";
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid form data", "details" => $errors]);
    exit;
}

$to = "your@email.nl";
$from = "noreply@yourdomain.nl";

$mailSubject = "[Contact] " . $subject;

$textBody = "Name: $name\nEmail: $email\n\n$message";

$htmlBody = "<p><strong>Name:</strong> " . htmlspecialchars($name) . "</p>"
    . "<p><strong>Email:</strong> " . htmlspecialchars($email) . "</p><hr/>"
    . "<p>" . nl2br(htmlspecialchars($message)) . "</p>";

$boundary = md5(time());
$headers = "From: $from\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/alternative; boundary=\"$boundary\"\r\n";

$body = "--$boundary\r\n";
$body .= "Content-Type: text/plain; charset=UTF-8\r\n\r\n";
$body .= "$textBody\r\n";
$body .= "--$boundary\r\n";
$body .= "Content-Type: text/html; charset=UTF-8\r\n\r\n";
$body .= "$htmlBody\r\n";
$body .= "--$boundary--";

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.yourprovider.nl';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'noreply@yourdomain.nl';
    $mail->Password   = 'your-mailbox-password';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;
    $mail->CharSet    = 'UTF-8';

    $mail->setFrom('noreply@jouwdomein.nl', 'Contactformulier');
    $mail->addAddress($to);
    $mail->addReplyTo($email, $name);

    $mail->isHTML(true);
    $mail->Subject = $mailSubject;
    $mail->Body    = $htmlBody;
    $mail->AltBody = $textBody;

    $mail->send();
    echo json_encode(["ok" => true]);
} catch (Exception $e) {
    error_log("Mailer Error: " . $mail->ErrorInfo);
    http_response_code(500);
    echo json_encode(["error" => "Failed to send email"]);
}
