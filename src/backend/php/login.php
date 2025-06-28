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
        
    require_once 'db.php';

    if ($_SERVER["REQUEST_METHOD"] == "POST"){
        $name = $_POST["username"];
        $password = $_POST["password"];
        // echo($name);
    
        if (!empty($name) && !empty($password)){  
            // Check if username exists
            $sql = "SELECT * from users where username = '$name'";
            $res = mysqli_query($conn, $sql);
            if ($res){
                if (mysqli_num_rows($res) > 0){ //check num of rows returned 
                    // Fetch the row as an associative array
                    $user = mysqli_fetch_assoc($res);
                    if ($user['password'] == $password) // password matches
                        echo json_encode(['success' => true, 'message' => 'Login successful', 'user' => [
                        'id' => $user['user_id'],
                        'username' => $user['username'],
                        'email' => $user['email'],
                    ]]);
                    else
                        echo json_encode(['success' => false, 'error' => 'Incorrect password']);
                }
                else
                    echo json_encode(['success' => false, 'error' => 'Username not found.']);
            }
            mysqli_close($conn);
        }
        else
            echo json_encode(['success' => false, 'error' => 'All fields are required.']);
        }
    else
        echo json_encode(["success" => false, 'error' => 'All fields are required.']);