<?php 
    require_once 'initialize.php';

    if($loggedin && isset($_POST['username'])) {
        try {
            $name = $_POST['username'];
            $exists = fetch('select * from admin where username = ?', [$name]);

            if ($exists != false) {
                $response['status'] = 'warning';
                $response['text'] = 'Username taken!';
            } else {
                $salt = randstr(10);
                execute('insert into admin (username, email, password, salt) values (?, ?, ?, ?)', [$name, $_POST['email'], password_hash($_POST['new-password'].$salt, PASSWORD_DEFAULT), $salt]);
                $response['status'] = 'success';
                $response['text'] = 'Admin erfolgreich hinzugefügt!';
            }

        } catch (Exception $error) {
            $response['status'] = 'warning';
        }
    }

    echo json_encode($response)
?>
