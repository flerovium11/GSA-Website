<?php 
    require_once 'initialize.php';

    if($loggedin) {
        $response['status'] = 'warning';
        $response['text'] = "Du bist schon eingeloggt!";
    } else {
        $user = fetch('select * from admin where username = ?', [$_POST['username']]);

        if ($user == false) {
            $response['status'] = 'warning';
            $response['text'] = 'Dieser Admin existiert nicht!';
        } elseif (!password_verify($_POST['password'].$user['salt'], $user['password'])) {
            $response['status'] = 'warning';
            $response['text'] = 'Falsches Passwort!';
        } else {
            $response['status'] = 'success';
            $new_token = create_user_token();
            $response['token'] = $new_token;
            $response['username'] = $user['username'];
            execute('update admin set login_token = ? where admin_id = ?', [password_hash($new_token.$user['salt'], PASSWORD_DEFAULT), $user['admin_id']]);
        }
    }

    echo json_encode($response)
?>
