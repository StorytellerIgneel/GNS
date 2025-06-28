<?php
session_start();


error_reporting(E_ALL);
ini_set('display_errors', 1);

// Allow requests from any origin
header("Access-Control-Allow-Origin: *");
// Allow certain HTTP methods
header("Access-Control-Allow-Methods: POST, OPTIONS");
// Allow certain headers
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
  }
    
if ($_SERVER["REQUEST_METHOD"] == "POST"){
    $user_id = $_POST["user_id"];
    $game_list = json_decode($_POST["game_list"], true); //array of game id
    $total_amount = $_POST["total_amount"];
    $payment_method =  $_POST["payment_method"];
    $purchase_date = date('Y-m-d');

    // $servername = "sql102.infinityfree.com"; // Updated with your server hostname
    // $username = "if0_37568701"; // Your database username from the image
    // $password = "teoh0628"; // The password provided in the image
    // $dbname = "if0_37568701_gns"; // Use the actual database name provided in the image
        
    // // Create connection
    // $conn = mysqli_connect($dbHost, $dbUsername, $dbPassword, $dbName);

    require_once 'db.php';

    $payment_method = mysqli_real_escape_string($conn, $payment_method);
    // Insert data into Purchases table
    $sql = "INSERT INTO purchases (user_id, purchase_date, total_amount, payment_method)
    VALUES ('$user_id', '$purchase_date', '$total_amount', '$payment_method')";
    $res = mysqli_query($conn, $sql);

    if ($res){
        // Get the last inserted purchase_id
        $purchase_id = $conn->insert_id;

    // Insert each game into PurchaseItems table
        foreach ($game_list as $game) {
        $game_id = $game["game_id"];
        $sql = "INSERT INTO purchase_items (purchase_id, game_id)
                     VALUES ('$purchase_id', '$game_id')";
        $res = mysqli_query($conn, $sql);
        }
        echo json_encode(["success" => true, "message" => "Purchase made successfully"]);
    }
    else
        echo json_encode(['success' => false, 'error' => 'Failed to make purchases.']);
} else {
    echo json_encode(['success' => false, 'error' => 'Failed to make purchases.']);
}