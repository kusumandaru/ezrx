var urlSite = "https://ndaru.click/ezrx/";

$(function() {
    var $css =$('link[rel~="'+urlSite+'js-ezrx.css"]');

    $.ajax({
        url: urlSite+'status.json',
        dataType:'JSON',
        success:function(json) {
            console.log('js and css : ' + json.active); // this will show the info it in firebug console
            activate(json.active, $css);
        },
        error: function() {
            // Here's where you handle an error response.
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
    runSecond.setAttribute("src", urlSite+"js-ezrx.js");
    document.body.appendChild(runSecond);
}

document.write("<script type='application/x-suppress'>");
