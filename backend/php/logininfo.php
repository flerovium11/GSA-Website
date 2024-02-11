<?php 
    require_once 'initialize.php';
    $response = ['status' => 'error', 'text' => 'Access denied'];

    if($loggedin) {
        $response['status'] = 'success';
        $info = ['username' => $admin['username']];

        if(isset($new_token)) {
            $info['token'] = $new_token;
        }

        $response['text'] = json_encode($info);
    } elseif(isset($login_warning)) {
        $response['status'] = 'warning';
        $response['text'] = $login_warning;
    }

    echo json_encode($response);
?>
