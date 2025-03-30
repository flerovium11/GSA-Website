<?php 
    require_once 'initialize.php';
    
    if($loggedin) {
        $response['status'] = 'success';
        $response['text'] = 'Erfolgreich eingeloggt!';
    } elseif(isset($login_warning)) {
        $response['status'] = 'warning';
        $response['text'] = $login_warning;
    }

    echo json_encode($response);
?>
