<?php 
    require_once 'initialize.php';

    try {
        if (isset($_POST['reaction-add-id'])) {
            execute('insert into blogpost_reaction (blogpost_id, reaction_id) values (?, ?)', [$_POST['blogpost-id'], $_POST['reaction-add-id']]);

            $response['status'] = 'success';
        }

        if (isset($_POST['reaction-del-id'])) {
            $exists = fetch('select * from blogpost_reaction where blogpost_id = ? and reaction_id = ?', [$_POST['blogpost-id'], $_POST['reaction-del-id']]);

            if ($exists != false) {
                execute('delete from blogpost_reaction where br_id = (select br_id from blogpost_reaction where blogpost_id = ? and reaction_id = ? limit 1)', [$_POST['blogpost-id'], $_POST['reaction-del-id']]);
            }
            
            $response['status'] = 'success';
        }
        
    } catch (Exception $error) {
        $response['status'] = 'warning';
    }

    echo json_encode($response)
?>
