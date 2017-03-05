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
    save("false");
}

function enable() {
    save("true");
}

function save($status){
    $file = 'https://ndaru.click/ezrx/status.json';

    // Open the file to get existing content
    $current = file_get_contents($file);

    $newStatus = array(
        "active" => $status
    );

    // Write the contents to the file,
    file_put_contents($file, json_encode($newStatus));
    console.log($file);
}

?>

</body>
<script src="https://code.jquery.com/jquery-1.6.4.min.js"></script>
<script src="https://ndaru.click/ezrx/toggle-status.js"></script>
</html>