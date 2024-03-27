<?php 
    require_once 'initialize.php';

    if($loggedin && isset($_POST['old-password'], $_POST['new-password'], $_POST['repeat-password'])) {
        try {
            if (!password_verify($_POST['old-password'].$admin['salt'], $admin['password'])) {
                $response['status'] = 'warning';
                $response['text'] = 'Old password wrong!';
            } else {
                execute('update admin set password = ? where admin_id = ?', [password_hash($_POST['new-password'].$admin['salt'], PASSWORD_DEFAULT), $admin['admin_id']]);
                $response['status'] = 'success';
                $response['text'] = 'Password changed successfully!';
            }

        } catch (Exception $error) {
            $response['status'] = 'warning';
        }
    }

    echo json_encode($response)
?>
