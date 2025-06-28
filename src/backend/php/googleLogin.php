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
    $username = $_POST["username"];
    $email = $_POST["email"];
    $password = "google";
   // echo($name);
    
    if (!empty($username) && !empty($email)){
        // $servername = "sql102.infinityfree.com"; // Updated with your server hostname
        // $username = "if0_37568701"; // Your database username from the image
        // $password = "teoh0628"; // The password provided in the image
        // $dbname = "if0_37568701_gns"; // Use the actual database name provided in the image
        
        // // Create connection
        // $conn = mysqli_connect($dbHost, $dbUsername, $dbPassword, $dbName);
        // // if (!$conn)
        // //     die('Could not connect to the database: ' . mysqli_connect_error());
        // // else
        // //     echo 'Connection successful!';

        require_once 'db.php';
        
        $sql = "SELECT * from users where username = '$username'";
        $res = mysqli_query($conn, $sql);
        if (mysqli_num_rows($res) === 0){ //first time google login
            // Fetch the row as an associative array
            $sql = "INSERT INTO users (username, email, password) VALUES ('$username', '$email', '$password')";
            $res = mysqli_query($conn, $sql);
            if ($res){
                $sql = "SELECT * from users where username = '$username'";
                $res = mysqli_query($conn, $sql);
                $user = mysqli_fetch_assoc($res);

                echo json_encode(["success" => true, "message" => "User registered successfully", 'user' => [
                        'id' => $user['user_id'],
                        'username' => $user['username'],
                        'email' => $user['email'],
                        ],
                        "register" => true
            ]);
            }
            else
                echo json_encode(['success' => false, 'error' => 'User registration failed.']);
        }
        else{ //previously logged already
            $user = mysqli_fetch_assoc($res);

            echo json_encode(["success" => true, "message" => "User registered successfully", 'user' => [
                    'id' => $user['user_id'],
                    'username' => $user['username'],
                    'email' => $user['email'],
                    ],
                    "register" => false
            ]);
        }
        mysqli_close($conn);
    }
    else
        echo json_encode(['success' => false, 'error' => 'All fields are required.']);
}
else
    echo json_encode(["success" => false, 'error' => 'All fields are required.']);