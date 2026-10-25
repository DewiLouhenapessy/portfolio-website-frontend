<?php
declare(strict_types=1);

header('Content-Type: application/json');

// Zet hier je eigen domein(en). Geen '*' meer.
$allowedOrigins = ['https://dewilouhenapessy.nl', 'https://www.dewilouhenapessy.nl'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: $origin");
    header('Vary: Origin');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
}

// Preflight-verzoek van de browser (nodig bij cross-origin JSON-POST)
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
    exit;
}

require __DIR__ . '/PHPMailer/Exception.php';
require __DIR__ . '/PHPMailer/PHPMailer.php';
require __DIR__ . '/PHPMailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Beperk de body-grootte (ruim boven het maximum van het formulier)
$raw = file_get_contents('php://input', false, null, 0, 20000);
$input = json_decode($raw ?: '', true);
if (!is_array($input)) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid JSON"]);
    exit;
}

// Honeypot
if (trim((string)($input['website'] ?? '')) !== '') {
    echo json_encode(["ok" => true]);
    exit;
}

// Timing-check. LET OP: formLoadedAt komt van de browser, dus dit is alleen
// een lichte bot-filter. Een verkeerd ingestelde klok bij de bezoeker kan
// hier echte berichten blokkeren, dus alleen toepassen als de waarde plausibel is.
$formLoadedAt = $input['formLoadedAt'] ?? null;
if (is_numeric($formLoadedAt)) {
    $elapsedMs = (microtime(true) * 1000) - (float)$formLoadedAt;
    if ($elapsedMs >= 0 && $elapsedMs < 5000) {
        echo json_encode(["ok" => true]); // waarschijnlijk een bot
        exit;
    }
}

$name    = trim((string)($input['name'] ?? ''));
$email   = trim((string)($input['email'] ?? ''));
$subject = trim((string)($input['subject'] ?? ''));
$message = trim((string)($input['message'] ?? ''));

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

$configPath = dirname(__DIR__) . '/private/contact-config.php';
if (!is_file($configPath) || !is_readable($configPath)) {
    error_log('Contact mail configuration file is missing or unreadable.');
    http_response_code(500);
    echo json_encode(["error" => "Mail service is not configured"]);
    exit;
}

$mailConfig = require $configPath;
if (!is_array($mailConfig)) {
    error_log('Contact mail configuration must return an array.');
    http_response_code(500);
    echo json_encode(["error" => "Mail service is not configured"]);
    exit;
}

$requiredSettings = ['to', 'from', 'smtp_host', 'smtp_user', 'smtp_password'];
$missingSettings = [];
foreach ($requiredSettings as $setting) {
    if (!isset($mailConfig[$setting]) || !is_string($mailConfig[$setting]) || trim($mailConfig[$setting]) === '') {
        $missingSettings[] = $setting;
    }
}
if (
    $missingSettings !== []
    || filter_var($mailConfig['to'] ?? '', FILTER_VALIDATE_EMAIL) === false
    || filter_var($mailConfig['from'] ?? '', FILTER_VALIDATE_EMAIL) === false
) {
    error_log(sprintf(
        'Contact mail configuration is invalid. Missing or invalid settings: %s.',
        implode(', ', $missingSettings === [] ? ['to or from'] : $missingSettings)
    ));
    http_response_code(500);
    echo json_encode(["error" => "Mail service is not configured"]);
    exit;
}

$htmlBody = "<p><strong>Name:</strong> " . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . "</p>"
    . "<p><strong>Email:</strong> " . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . "</p><hr/>"
    . "<p>" . nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8')) . "</p>";
$textBody = "Name: $name\nEmail: $email\n\n$message";

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = $mailConfig['smtp_host'];
    $mail->SMTPAuth   = true;
    $mail->Username   = $mailConfig['smtp_user'];
    $mail->Password   = $mailConfig['smtp_password'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;
    $mail->CharSet    = 'UTF-8';

    $mail->setFrom($mailConfig['from'], 'Contactformulier');
    $mail->addAddress($mailConfig['to']);
    $mail->addReplyTo($email, $name);

    $mail->isHTML(true);
    $mail->Subject = "[Contact] " . $subject;
    $mail->Body    = $htmlBody;
    $mail->AltBody = $textBody;

    $mail->send();
    echo json_encode(["ok" => true]);
} catch (Exception $e) {
    error_log("Mailer Error: " . $mail->ErrorInfo);
    http_response_code(500);
    echo json_encode(["error" => "Failed to send email"]);
}