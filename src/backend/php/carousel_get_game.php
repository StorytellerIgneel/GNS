<?php

// Allow requests from any origin
header("Access-Control-Allow-Origin: *");
// Allow certain HTTP methods
header("Access-Control-Allow-Methods: POST, OPTIONS");
// Allow certain headers
header("Access-Control-Allow-Headers: Content-Type");

// $servername = "sql102.infinityfree.com"; // Updated with your server hostname
// $username = "if0_37568701"; // Your database username from the image
// $password = "teoh0628"; // The password provided in the image
// $dbname = "if0_37568701_gns"; // Use the actual database name provided in the image

// // Create a connection
// $conn = new mysqli($servername, $username, $password, $dbname);

require_once 'db.php';

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL query to fetch 5 games (fixed selection)
$sql = "SELECT game_id, title, img_src FROM games ORDER BY game_id ASC LIMIT 15";
$result = $conn->query($sql);

$games = [];

if ($result->num_rows > 0) {
    // Fetch all games into an array
    while($row = $result->fetch_assoc()) {
        $games[] = [
            'game_id' => $row['game_id'],
            'title' => $row['title'],
            'img_src' => $row['img_src']
        ];
    }
}

// Return JSON response
header('Content-Type: application/json');
echo json_encode($games);

$conn->close();
?>
