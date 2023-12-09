<?php
    require_once 'connect.php';
    require_once 'functions.php'; 

    header("Access-Control-Allow-Origin: {$frontend_path}");
    header('Access-Control-Allow-Methods: GET, POST');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, GSA-Username');
    
    session_start();
    $loggedin = false;

    if(
        isset($_SESSION['username']) 
        && fetch('select * from admin where username = ?', [$_SESSION['username']]) != false
    ) {
        $loggedin = true;
    } else if(
        !empty($_SERVER['HTTP_AUTHORIZATION'])
        && !empty($_SERVER['HTTP_GSA_USERNAME'])
    ) {
        $user = fetch('select * from admin where username = ?', [$_SERVER['HTTP_GSA_USERNAME']]);

        if($user != false) {
            if(password_verify($_SERVER['HTTP_AUTHORIZATION'].$user['salt'], $user['login_token'])) {
                $new_token = generate_login_token();
                execute('update admin set login_token = ? where admin_id = ?', [password_hash($new_token.$user['salt'], PASSWORD_DEFAULT)]);
                $loggedin = true;
                $_SESSION['username'] = $_SERVER['HTTP_GSA_USERNAME'];
            } else {
                // warning you token was used
            }
        } else {
            // this user doesn't exist
        }
    }

    if($loggedin) {
        $admin = fetch('select * from admin where username = ?', [$_SESSION['username']]);
    }
?>