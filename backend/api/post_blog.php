<?php 
    require_once 'initialize.php';

    if($loggedin && isset($_POST['content'])) {
        $content = $_POST['content'];

        try {
            if (isset($_POST['own-image-url'])) {
                $image = $_POST['own-image-url'];
            } else {
                $dom = new DOMDocument();
                @$dom->loadHTML($content);
                $images = $dom->getElementsByTagName('img');

                if ($images->length > 0) {
                    $firstImage = $images->item(0);
                    $image = $firstImage->getAttribute('src');
                } else {
                    $image = '';
                }
            }
             
            do {
                $string_id = randstr(5);
            } while (fetch('select string_id from blogpost where string_id = ?', [$string_id]) != false);

            execute('insert into blogpost (string_id, content, description, title_image, admin_id) values (?, ?, ?, ?, ?)', [$string_id, $content, $_POST['own-description'], $image, $admin['admin_id']]);
            $response['status'] = 'success';
            $response['text'] = $string_id;
        } catch (Exception $error) {
            $response['status'] = 'warning';
            $reponse['text'] = 'Ups, da ist etwas schiefgegangen. Versuche es später erneut!';
        }
    }

    echo json_encode($response)
?>
