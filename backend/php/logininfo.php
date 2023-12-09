<?php 
    require_once 'initialize.php';
    $response = ['status' => 'error', 'text' => 'Access denied'];

    if($loggedin) {
        $response['status'] = 'success';
        $response['text'] = json_encode([
            'username' => $admin['username'],
            'token' => $admin['login_token']
        ]);
    }

    echo json_encode($response);
?>