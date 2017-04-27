
(function($) {
    /*
        Start : -
        Task  : -
        Page  : Global
        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
        Layout : Both

        @url        : get full path url.
        @pagetitle  : get page title of CPQ page.
        @rootFolder : set root folder for CPQ test or production.
        @listFile   : set array list of library js-ezrx needed.
    */
    var url, 
        pagetitle, 
        rootFolder,
        listFile = [
                    'layout.js-ezrx.js',
                    'login_page.js-ezrx.js',
                    'desktop.js-ezrx.js',
                    'mobile.js-ezrx.js',
                    'commerce_management.js-ezrx.js',
                    'tool_tip.js-ezrx.js',
                    'transaction.js-ezrx.js',
                    'model_configuration.js-ezrx.js',
                    'report_manager.js-ezrx.js',
                   ];
    /*
        End   : -
        Task  : -
        Page  : Global
        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
        Layout : Both
    */

    $(document).ready(function() {

        /*
            Start : -
            Task  : -
            Page  : Global
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Both

            Get Url of appliction, and get page title of Application.
        */
        url = window.location.href;
        pagetitle = $('title').text().toLowerCase();
        /*
            End   : -
            Task  : -
            Page  : Global
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Both
        */
        
        /*
            Start : 24 March 2017
            Task  : Change all link to dynamic url.
            Page  : Global
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Both

            get full url split it to get subdomain, and generate url of assets.
        */
        var fullUrl = window.location.host;
        var parts = fullUrl.split('.');
        var sub = parts[0];
        rootFolder = '/bmfsweb/'+sub;
        /*
            End   : 24 March 2017
            Task  : Change all link to dynamic url.
            Page  : Global
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Both
        */

        /*  
            Start : 27 April 2017 
            Task  : -
            Page  : Global
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Both

            Call all library ezrx needed
        */

        /*listFile.forEach( function(fileName){
            var directory = rootFolder+"/image/javascript/";
            $.getScript( directory+fileName )
              .done(function( script, textStatus ) {
                console.log( textStatus );
              })
              .fail(function( jqxhr, settings, exception ) {
                console.log("Error! Please check file : " + fileName + " on " + directory);
            });
        } );*/

        /*  
            End   : 27 April 2017 
            Task  : -
            Page  : Global
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Both
        */
        
        /*
            Start : -
            Task  : -
            Page  : Global
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Both

            Checking user access application from Mobile or Desktop.
        */
        
        $( document ).ajaxStop(function(){
            setTimeout(function() {
                /*
                    if User access application from mobile, then application call function mobile_newlayout().
                */
                if( navigator.userAgent.match(/Android/i)
                 || navigator.userAgent.match(/webOS/i)
                 || navigator.userAgent.match(/iPhone/i)
                 || navigator.userAgent.match(/iPad/i)
                 || navigator.userAgent.match(/iPod/i)
                 || navigator.userAgent.match(/BlackBerry/i)
                 || navigator.userAgent.match(/Windows Phone/i)
                 ){
                    mobile_newlayout();
                }
                else {
                    /*
                        else if user access application from desktop, then application call function desktop_newlayout().
                    */
                    /*
                        Start : 5 April 2017
                        Task  : Replace variable _loadingImage for new Loading.
                        Page  : Global
                        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
                        Layout : Dekstop

                        Replace loading animation.
                    */
                    _loadingImage = rootFolder+"/image/images/loading-icon.gif";closeLoadingDialog();
                    $('#jg-overlay').hide();
                    $("#loading-mask").children("#loading-dialog").children('img').attr("src", rootFolder+"/image/images/loading-icon.gif");
                    desktop_newlayout();
                    /*
                        End   : 5 April 2017
                        Task  : Replace variable _loadingImage for new Loading.
                        Page  : Global
                        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
                        Layout : Dekstop
                    */
                }
            }, 1000);
        });

        /*
            End   : -
            Task  : -
            Page  : -
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Both
        */
    });

    /*function tranform_ordersubmenu() {
        // orders submenu
        if(/@zuelligpharma.com\s*$/.test(_BM_USER_LOGIN)){
            $('.jg-box-submenu')
                .append($("<img src='"+rootFolder+"/image/images/dk-submenu-icon-orders.png' class='jg-img-submenu-icon' />"))
                .append($("<ul class='jg-list-submenu'>")
                        .append($("<li class='jg-item-submenu'><a href='/commerce/buyside/commerce_manager.jsp?bm_cm_process_id=36244034&from_hp=true&_bm_trail_refresh_=true' id='jg-submenu-myorders'>My Orders</a></li>"))
                        .append($("<li class='jg-item-submenu'><a href='/commerce/buyside/reports/report_manager.jsp?process_id=36244034&from_hp=true&_bm_trail_refresh_=true' id='jg-submenu-myreports'>My Reports</a></li>"))
                        .append($("<li class='jg-item-submenu'><a href='#' id='jg-submenu-neworder'>New Order</a></li>"))
                        .append($("<li class='jg-item-submenu'><a href='#' id='jg-submenu-copyorder'>Copy Order</a></li>"))
                    // .append($("<li class='jg-item-submenu'><a href='#' id='jg-submenu-export'>Export</a></li>"))
                );
        }else{
            $('.jg-box-submenu')
                .append($("<img src='"+rootFolder+"/image/images/dk-submenu-icon-orders.png' class='jg-img-submenu-icon' />"))
                .append($("<ul class='jg-list-submenu'>")
                        .append($("<li class='jg-item-submenu'><a href='/commerce/buyside/commerce_manager.jsp?bm_cm_process_id=36244034&from_hp=true&_bm_trail_refresh_=true' id='jg-submenu-myorders'>My Orders</a></li>"))
                        .append($("<li class='jg-item-submenu'><a href='#' id='jg-submenu-neworder'>New Order</a></li>"))
                        .append($("<li class='jg-item-submenu'><a href='#' id='jg-submenu-copyorder'>Copy Order</a></li>"))
                    // .append($("<li class='jg-item-submenu'><a href='#' id='jg-submenu-export'>Export</a></li>"))
                );
        }

        // new order
        $('#jg-submenu-neworder').click(function(e) {
            e.preventDefault();

            newTransaction();
        });
    }*/

})( jQuery );