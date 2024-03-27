<?php 
    require_once 'initialize.php';

    if($loggedin) {
        try {
            execute('delete from admin where admin_id = ?', [$admin['admin_id']]);
        } catch (Exception $error) {
            $response['status'] = 'warning';
        }
    }

    echo json_encode($response)
?>
