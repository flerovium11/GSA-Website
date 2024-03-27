<?php 
    require_once 'initialize.php';

    if($loggedin && isset($_POST['new_username'])) {
        try {
            $new_name = $_POST['new_username'];
            $exists = fetch('select * from admin where username = ?', [$new_name]);

            if ($exists != false) {
                $response['status'] = 'warning';
                $response['text'] = 'Username taken!';
            } else {
                execute('update admin set username = ? where admin_id = ?', [$new_name, $admin['admin_id']]);
                $response['status'] = 'success';
                $response['text'] = 'Username changed successfully!';
                $response['username'] = $new_name;
            }

        } catch (Exception $error) {
            $response['status'] = 'warning';
        }
    }

    echo json_encode($response)
?>
