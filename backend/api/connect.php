<?php
require_once 'config.php';

try {
    $conn = new PDO($dsn, $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $sql = 'SELECT * FROM admin';
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchAll();
} catch(PDOException $error) {
    $result = [
        'status' => 'connerror',
        'response' => $error->getMessage(),
    ];

    echo json_encode($result);
    exit;
}
?>