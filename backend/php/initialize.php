<?php
    require_once 'connect.php';
    require_once 'functions.php'; 

    header("Access-Control-Allow-Origin: {$frontend_path}");
    header('Access-Control-Allow-Methods: GET, POST');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, GSA-Username');
    
    session_start();
    $loggedin = false;

    if(
        isset($_SESSION['username']) 
        && fetch('select * from admin where username = ?', [$_SESSION['username']]) != false
    ) {
        $loggedin = true;
    } else if(
        !empty($_SERVER['HTTP_AUTHORIZATION'])
        && !empty($_SERVER['HTTP_GSA_USERNAME'])
        && fetch('select * from admin where login_token = ? and username = ?', [$_SERVER['HTTP_AUTHORIZATION'], $_SERVER['HTTP_GSA_USERNAME']]) != false
    ) {
        $loggedin = true;
        $_SESSION['username'] = $_SERVER['HTTP_GSA_USERNAME'];
    }

    if($loggedin) {
        $admin = fetch('select * from admin where username = ?', [$_SESSION['username']]);
    }
?>