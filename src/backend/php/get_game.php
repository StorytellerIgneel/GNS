<?php
session_start();

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
// // Database connection parameters
// $servername = "sql102.infinityfree.com"; // Updated with your server hostname
// $username = "if0_37568701"; // Your database username from the image
// $password = "teoh0628"; // The password provided in the image
// $dbname = "if0_37568701_gns"; // Use the actual database name provided in the image
// // Create a new connection
// $conn = new mysqli($servername, $username, $password, $dbname);
// // Check connection
// if ($conn->connect_error) {
//     die("Connection failed: " . $conn->connect_error);
// }

require_once 'db.php';

// Get the game ID from the query string
$game_id = isset($_GET['id']) ? intval($_GET['id']) : 0;
$game_id = isset($_GET['game_id']) ? intval($_GET['game_id']) : 0;

if ($game_id > 0) {
    // SQL query to fetch a specific game
    $sql = "SELECT * FROM games WHERE id = ?";
    $sql = "SELECT * FROM games WHERE game_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $game_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $game = $result->fetch_assoc();
    // Check if game was found
    if ($game) {
        // Set content type to JSON and output the data
        header('Content-Type: application/json');
        echo json_encode($game);
    } else {
        echo json_encode(["error" => "No game found with ID $game_id"]);
    }
    
    $stmt->close();
} else {
    // SQL query to fetch all games
    $sql = "SELECT * FROM games";
    $result = $conn->query($sql);
    $games = array();
    if ($result) {
        if ($result->num_rows > 0) {
            // Fetch each row and add to the games array
            while ($row = $result->fetch_assoc()) {
                $games[] = $row;
            }
        }
    } else {
        // Log SQL error
        error_log("SQL error: " . $conn->error);
    }
    // Set content type to JSON and output the data
    header('Content-Type: application/json');
    echo json_encode($games);
}
// Close the database connection
$conn->close();
?>