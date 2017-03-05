$(function() {
    var $css =$('link[rel~="https://ndaru.click/ezrx/js-ezrx.css"]');

    $.ajax({
        url: 'https://ndaru.click/ezrx/status.json',
        dataType:'JSON',
        success:function(json) {
            console.log('js and css : ' + json.active); // this will show the info it in firebug console
            activate(json.active, $css);
        }
    })
});

function activate(toggle, $css) {
    if (toggle == "false") { //load css and js
        $css.prop('disabled', true);
    }
    if (toggle == "true") { //disable css and js
        $css.prop('disabled', false);
        loadEzrx();
    }
}


function loadEzrx()
{
    var runSecond = document.createElement("script");
    runSecond.setAttribute("src", "js-ezrx.js");
    document.body.appendChild(runSecond);
}

document.write("<script type='application/x-suppress'>");
