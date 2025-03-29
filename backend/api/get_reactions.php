<?php 
    require_once 'initialize.php';

    try {
        $reactions = fetch_all('select *, (select count(*) from blogpost_reaction br where br.blogpost_id = ? and br.reaction_id = r.reaction_id) as num from reaction r', [$_POST['id']]);
        $response['status'] = 'success';
        $response['text'] = json_encode($reactions);
    } catch (Exception $error) {
        $response['status'] = 'warning';
    }
    
    echo json_encode($response)
?>
