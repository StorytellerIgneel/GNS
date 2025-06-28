<?php
// Load Composer autoloader (goes two levels up from php/ to root)
require_once __DIR__ . '/../../../vendor/autoload.php';

// Load environment variables from .env in the same directory
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Assign environment variables to PHP variables
$servername = $_ENV['DB_HOST'];
$username   = $_ENV['DB_USER'];
$password   = $_ENV['DB_PASS'];
$dbname     = $_ENV['DB_NAME'];

// Create a connection to MySQL
$conn = new mysqli($servername, $username, $password, $dbname);
if (!$conn)
    die('Could not connect to the database: ' . mysqli_connect_error());
else
    echo 'Connection successful!';

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}