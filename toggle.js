$(function() {
    var $css =$('link[rel~="js-ezrx.css"]');

    $.getJSON("ezrx-config.json", function(json) {
        console.log('js and css : '+json.active); // this will show the info it in firebug console
        activate(json.active, $css);
    })
});

function activate(toggle, $css) {
    if (toggle) {
        $css.prop('disabled', true);
    } else {
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