<?php
    function create_user_token():string {
        do {
            $token = randstr(20);
        } while (fetch('select * from admin where login_token = ?', [$token]) != false);

        return $token;
    }

    function rand_item(iterable $array) {
        return $array[rand(0, count($array)-1)];
    }

    function norm_dist_rand(float $mean, float $std_dev):float {
        // Generate two random numbers between 0 and 1
        $u1 = mt_rand() / mt_getrandmax();
        $u2 = mt_rand() / mt_getrandmax();
    
        // Calculate the radius and angle from the two random numbers
        $radius = sqrt(-2 * log($u1));
        $angle = 2 * M_PI * $u2;
    
        // Calculate the random number from the polar coordinates
        $random_num = $mean + $std_dev * $radius * cos($angle);
    
        return $random_num;
    }

    function delete_dir(string $path):bool {
        if (empty($path)) { 
            return false;
        }
        return is_file($path) ?
                @unlink($path) :
                array_map(__function__, glob($path.'/*')) == @rmdir($path);
    }

    function fetch_cols(string $sql, iterable $parameters):iterable|false {
        global $conn;
        $stmt = $conn->prepare($sql);
        $stmt->execute($parameters);
        return $stmt->fetchAll(PDO::FETCH_COLUMN);
    }

    function fetch_all(string $sql, iterable $parameters):iterable|false {
        global $conn;
        $stmt = $conn->prepare($sql);
        $stmt->execute($parameters);
        return $stmt->fetchAll();
    }

    function fetch(string $sql, iterable $parameters):object|false {
        global $conn;
        $stmt = $conn->prepare($sql);
        $stmt->execute($parameters);
        return $stmt->fetch();
    }

    function execute(string $sql, iterable $params):void {
        global $conn;
        $stmt = $conn->prepare($sql);
        $stmt->execute($params);
    }

    function redirect(string $href):void {
        echo "<script>window.location.href = '$href'</script>";
    }

    function refresh():void {
        echo "<script>window.location.href = window.location.href</script>";
    }
    
    function flrand(float $min, float $max, int $decimal_places = 10):float {
        $m = pow(10, $decimal_places);
        return rand($min * $m, $max * $m) / $m;
    }

    function timespan_since(string $timestamp):string {
        $timespans = array(
            365*24*60*60 => 'year',
            30*24*60*60 => 'month',
            7*24*60*60 => 'week',
            24*60*60 => 'day',
            60*60 => 'hour',
            60 => 'minute',
            1 => 'second'
        );

        $time_passed = time() - strtotime($timestamp);

        foreach($timespans as $seconds => $spanname){
            if($time_passed < 1) {
                return 'just now';
            }

            if($time_passed >= $seconds) {
                $quantity = floor($time_passed / $seconds);
                $suffix = $quantity == 1 ? '' : 's';
                return $quantity.' '.$spanname.$suffix;
            }
        }
    }

    function randstr(int $length = 10, string $charspace = 'abcdefghijklmnopqrstuvwxyz'):string {
        if ($length < 1) {
            throw new \RangeException("Length must be a positive integer");
        }

        $pieces = [];
        $max = mb_strlen($charspace, '8bit') - 1;

        for ($i = 0; $i < $length; ++$i) {
            $pieces []= $charspace[random_int(0, $max)];
        }

        return implode('', $pieces);
    }

    function returnSuccess(string $response):void {
        $result = [
            'status' => 'success',
            'response' => $response
        ];
        
        echo json_encode($result);
        exit;
    }

    function returnError(string $response):void {
        $result = [
            'status' => 'error',
            'response' => $response
        ];
        
        echo json_encode($result);
        exit;
    }

    // require_once $source_path.'assets/PHPMailer/src/PHPMailer.php';
    // require_once $source_path.'assets/PHPMailer/src/Exception.php';
    // require_once $source_path.'assets/PHPMailer/src/SMTP.php';

    // // update the email and password here before sending emails
    // function use_php_mailer(string $to, string $subject, string $body):bool {       
    //     $mail = new PHPMailer\PHPMailer\PHPMailer();
    //     $mail->isSMTP();
    //     $mail->Host = 'smtp.gmail.com';
    //     $mail->Port = 587;
    //     $mail->SMTPAuth = true;
    //     $mail->Username = 'noreply.cleft@gmail.com';
    //     $mail->Password = 'lmiqipfwatlrmrcp';
    //     $mail->setFrom("noreply.cleft@gmail.com", 'Cleft');
    //     $mail->addAddress($to, $to);
    //     $mail->Subject = $subject;
    //     $mail->Body = $body;
    //     $mail->AltBody = "HTML Emails not supported by your Client.";
    //     $mail->CharSet = 'UTF-8';  

    //     if ($mail->Send()) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
?>