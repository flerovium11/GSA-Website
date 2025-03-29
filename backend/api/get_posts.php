<?php 
    require_once 'initialize.php';

    try {
        $blogs = fetch_all('select *, username as admin_name, (select count(reaction_date) from blogpost_reaction br where br.blogpost_id = b.blogpost_id) as views from blogpost b inner join admin a on b.admin_id = a.admin_id', []);
        $response['status'] = 'success';
        $response['text'] = json_encode($blogs);
    } catch (Exception $error) {
        $response['status'] = 'warning';
    }
    
    echo json_encode($response)
?>
