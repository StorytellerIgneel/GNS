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
    $password = $_POST["password"];
    $email  = $_POST["email"];
    
    if (!empty($username) && !empty($password) && !empty($email)){

        // // TWH outsourced to InfinityFree db
        // $servername = "sql102.infinityfree.com"; // Updated with your server hostname
        // $username = "if0_37568701"; // Your database username from the image
        // $password = "teoh0628"; // The password provided in the image
        // $dbname = "if0_37568701_gns"; // Use the actual database name provided in the image

        // // Localhost connection parameters
        // $dbHost = "localhost"; // Updated with your server hostname 
        // $dbUsername = "root"; // Your database username from the image
        // $dbPassword = ""; // The password provided in the image
        // $dbName = "y2s2_wad"; // Use the actual database name
        
        // // Create connection
        // $conn = mysqli_connect($dbHost, $dbUsername, $dbPassword, $dbName);
        // if (!$conn) {
        //     die('Could not connect to the database: ' . mysqli_connect_error());
        // } else {
        //     echo 'Connection successful!';
        // }

        require_once 'db.php';
        
        //check if username already exists
        $sql = "SELECT * from users where username = '$username'";
        $res = mysqli_query($conn, $sql);
        if (mysqli_num_rows($res) > 0) //check num of rows returned 
            echo json_encode(['success' => false, 'error' => 'Username already exists.']);
        else { //check if email exists
            $sql = "SELECT * from users where email = '$email'";
            $res = mysqli_query($conn, $sql);
            if(mysqli_num_rows($res) > 0) //check num of rows returned 
                echo json_encode(['success' => false, 'error' => 'Email already exists.']);
            else {
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
                        ]]);
                }
                else
                    echo json_encode(["success" => false, "message" => "User registration failed."]);
            }
        mysqli_close($conn);
        }
    }
    else
        echo json_encode(['success' => false, 'error' => 'All fields are required.']);
}
else
    echo json_encode(["success" => false, 'error' => 'All fields are required.']);