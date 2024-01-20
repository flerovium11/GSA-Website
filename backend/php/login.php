<?php 
    require_once 'initialize.php';
    $response = ['status' => 'error', 'text' => "Nope, try again later :("];

    if($loggedin) {
        $response['text'] = "You're already logged in!";
    } else {
        $user = fetch('select * from admin where username = ?', [$_POST['username']]);

        if ($user == false) {
            $response['text'] = 'This admin does not exist!';
        } elseif (!password_verify($_POST['password'].$user['salt'], $user['password'])) {
            $response['text'] = 'This admin does not exist!';
        } else {
            $_SESSION['username'] = $user['username'];
            $response['status'] = 'success';
            $response['text'] = create_user_token();
        }
    }
?>
