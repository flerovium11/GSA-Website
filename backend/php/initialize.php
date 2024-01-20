<?php
    require_once 'connect.php';
    require_once 'functions.php'; 

    header("Access-Control-Allow-Origin: {$frontend_path}");
    header('Access-Control-Allow-Methods: GET, POST');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, GSA-Username');
    
    session_start();
    $loggedin = false;
    $headers = apache_request_headers();

    if(
        isset($_SESSION['username']) 
        && fetch('select * from admin where username = ?', [$_SESSION['username']]) != false
    ) {
        $loggedin = true;
    } else if(
        !empty($headers['Authorization'])
        && !empty($headers['GSA-Username'])
    ) {
        $user = fetch('select * from admin where username = ?', [$headers['GSA-Username']]);

        if($user != false) {
            if(password_verify($headers['Authorization'].$user['salt'], $user['login_token'])) {
                $new_token = generate_login_token();
                execute('update admin set login_token = ? where admin_id = ?', [password_hash($new_token.$user['salt'], PASSWORD_DEFAULT)]);
                $loggedin = true;
                $_SESSION['username'] = $headers['GSA-Username'];
            } else {
                $login_warning = "Login with token failed! If you didn't login from another device, please change your password!";
            }
        } else {
            $login_warning = "Login with cookie failed, this user doesn't exist!";
        }
    }

    if($loggedin) {
        $admin = fetch('select * from admin where username = ?', [$_SESSION['username']]);
    }
?>
