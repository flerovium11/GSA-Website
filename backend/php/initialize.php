<?php
    require_once 'connect.php';
    require_once 'functions.php'; 

    header("Access-Control-Allow-Origin: {$frontend_path}");
    header('Access-Control-Allow-Methods: GET, POST');
    header('Access-Control-Allow-Headers: Content-Type');
    
    session_start();
    $loggedin = false;
?>