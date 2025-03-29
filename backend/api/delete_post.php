<?php 
    require_once 'initialize.php';

    if($loggedin) {
        try {
            execute('delete from blogpost where string_id = ?', [$_POST['string_id']]);
            $response['status'] = 'success';
        } catch (Exception $error) {
            $response['status'] = 'warning';
        }
    }

    echo json_encode($response)
?>
