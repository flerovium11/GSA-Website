<?php
    require_once 'connect.php';
    require_once 'functions.php'; 

    header("Access-Control-Allow-Origin: {$frontend_path}");
    header('Access-Control-Allow-Methods: GET, POST');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, GSA-Username');
    
    $loggedin = false;
    $headers = apache_request_headers();

    if(
        !empty($headers['Authorization'])
        && !empty($headers['GSA-Username'])
    ) {
        $user = fetch('select * from admin where username = ?', [$headers['GSA-Username']]);

        if($user != false) {
            if(password_verify(str_replace('Bearer ', '', $headers['Authorization']).$user['salt'], $user['login_token'])) {
                $new_token = create_user_token();
                execute('update admin set login_token = ? where admin_id = ?', [password_hash($new_token.$user['salt'], PASSWORD_DEFAULT), $user['admin_id']]);
                $loggedin = true;
            } else {
                $login_warning = "Login with token failed! If you didn't login from another device, please change your password!";
            }
        } else {
            $login_warning = "Login with cookie failed, this user doesn't exist!";
        }
    }

    if($loggedin) {
        $admin = $user;
    }
?>
