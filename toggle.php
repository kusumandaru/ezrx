<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <title>toggle management</title>

    <input type="submit" class="button" name="enable" value="enable" />
    <input type="submit" class="button" name="disable" value="disable" />
</head>


<body>

<?php

if (isset($_POST['action'])) {
    switch ($_POST['action']) {
        case 'disable':
            disable();
            break;
        case 'enable':
            enable();
            break;
    }
}

function disable() {
    save("false")
}

function enable() {
    save("true")
}

function save($status){
    $file = 'status.json';

    // Open the file to get existing content
    $current = file_get_contents($file);

    // Rewrite status
    $current = $status;

    // Write the contents to the file,
    // using the FILE_APPEND flag to append the content to the end of the file
    // and the LOCK_EX flag to prevent anyone else writing to the file at the same time
    file_put_contents($file, $current, FILE_APPEND | LOCK_EX);
}

?>

</body>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="toggle-status.js"></script>
</html>