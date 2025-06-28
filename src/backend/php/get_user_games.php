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

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (!isset($_POST["user_id"]) || empty($_POST["user_id"])) {
        echo json_encode(['success' => false, 'error' => 'User ID is missing.']);
        exit();
    }

    $user_id = (int)$_POST["user_id"];

    // $servername = "sql102.infinityfree.com"; // Updated with your server hostname
    // $username = "if0_37568701"; // Your database username from the image
    // $password = "teoh0628"; // The password provided in the image
    // $dbname = "if0_37568701_gns"; // Use the actual database name provided in the image

    // // Create connection
    // $conn = mysqli_connect($dbHost, $dbUsername, $dbPassword, $dbName);

    // if (!$conn) {
    //     die('Could not connect to the database: ' . mysqli_connect_error());
    // }

    require_once 'db.php';

    // Prepare and execute SQL query for user purchases
    $sql = "SELECT purchase_id FROM purchases WHERE user_id = ?";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, 'i', $user_id);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if (mysqli_num_rows($result) > 0) {
        $game_purchased = [];
        
        while ($row = mysqli_fetch_assoc($result)) {
            $purchase_id = $row['purchase_id'];

            // Prepare and execute SQL query for game IDs
            $sql = "SELECT game_id FROM purchase_items WHERE purchase_id = ?";
            $stmt = mysqli_prepare($conn, $sql);
            mysqli_stmt_bind_param($stmt, 'i', $purchase_id);
            mysqli_stmt_execute($stmt);
            $game_result = mysqli_stmt_get_result($stmt);

            while ($game_row = mysqli_fetch_assoc($game_result)) {
                $game_id = $game_row['game_id'];

                // Prepare and execute SQL query for game details
                $sql = "SELECT game_id, img_src, title FROM games WHERE game_id = ?";
                $stmt = mysqli_prepare($conn, $sql);
                mysqli_stmt_bind_param($stmt, 'i', $game_id);
                mysqli_stmt_execute($stmt);
                $game_details_result = mysqli_stmt_get_result($stmt);

                if ($game_details = mysqli_fetch_assoc($game_details_result)) {
                    $game_purchased[] = $game_details;
                }
            }
        }

        echo json_encode(['success' => true, 'message' => 'Games found', 'game_list' => $game_purchased]);
    } else {
        echo json_encode(['success' => false, 'error' => 'No games purchased.']);
    }

    mysqli_close($conn);
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request method.']);
}
