<?php 
    require_once 'initialize.php';
    $response = ['status' => 'error', 'text' => "Nope, try again later :("];

    if($loggedin && isset($_POST['new_username'])) {
        try {
            $new_name = $_POST['new_username'];
            $exists = fetch('select * from admin where username = ?', [$new_name]);

            if ($exists != false) {
                $response['status'] = 'warning';
                $response['test'] = 'This admin already exists';
            } else {
                execute('update admin set username = ? where admin_id = ?', [$new_name, $admin['admin_id']]);
            }

        } catch (Exception $error) {
            $response['status'] = 'warning';
        }
    } else {
        $user = fetch('select * from admin where username = ?', [$_POST['username']]);

        if ($user == false) {
            $response['status'] = 'warning';
            $response['text'] = 'This admin does not exist!';
        } elseif (!password_verify($_POST['password'].$user['salt'], $user['password'])) {
            $response['status'] = 'warning';
            $response['text'] = 'Wrong password!';
        } else {
            $response['status'] = 'success';
            $info = ['username' => $user['username']];
            
            if($_POST['remember'] == 'true') {
                $new_token = create_user_token();
                $info['token'] = $new_token;
                execute('update admin set login_token = ? where admin_id = ?', [password_hash($new_token.$user['salt'], PASSWORD_DEFAULT), $user['admin_id']]);
            }

            $response['text'] = json_encode($info);
        }
    }

    echo json_encode($response)
?>
