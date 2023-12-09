<?php 
    require_once 'initialize.php';
    $response = [];

    if($loggedin) {
        $response['status'] = 'success';
        $response['text'] = json_encode([
            'username' => $admin['username'],
            'token' => $admin['login_token']
        ]);
    } else {
        $response['status'] = 'error';
        $response['text'] = 'Access denied';
    }

    echo json_encode($response);
?>