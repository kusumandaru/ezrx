$(document).ready(function(){
    $('.button').click(function(){
        var clickBtnValue = $(this).val();
        var ajaxurl = 'toggle.php',
            data =  {'action': clickBtnValue};
        $.post(ajaxurl, data, function (response) {
            $.getJSON("https://ndaru.click/ezrx/status.json", function(json) {
                alert('js and css : '+json.active);
            })
        });
    });

});
