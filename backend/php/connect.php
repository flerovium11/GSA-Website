<?php
   require_once 'config.php';

   try {
      $conn = new PDO($dsn, $user, $password);
      $sql = 'select * from admin';
      $stmt = $conn->prepare($sql);
      $stmt->execute();
      $result = $stmt->fetchAll();
   }catch(PDOException $error) {
      $result = [
         'status' => 'connerror',
         'response' => $error->getCode(),
      ];

      echo json_encode($result);
      exit;
   }
?>