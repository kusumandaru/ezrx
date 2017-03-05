var urlSite = "https://ndaru.click/ezrx/";

$(document).ready(function(){
    $('.button').click(function(){
        var clickBtnValue = $(this).val();
        var ajaxurl = urlSite+'toggle.php',
            data =  {'action': clickBtnValue};
        $.post(ajaxurl, data, function (response) {
            $.ajax({
                url: urlSite+'status.json',
                dataType:'JSON',
                success:function(json) {
                    alert('js and css : ' + json.active);
                }
            })
        });
    });

});
