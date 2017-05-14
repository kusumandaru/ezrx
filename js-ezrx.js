
(function($) {
    /*
        Start : -
        Task  : -
        Page  : Global
        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
        Layout : Both

        @url        : get full path url.
        @pagetitle  : get page title of CPQ page.
        @rootFolder : set root folder for CPQ test or production
    */
    var url, pagetitle, rootFolder;
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
        /* call abstract function jquery for checking the selector variable is exists */
        $.fn.exists = function () {
            return this.length !== 0;
        }

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
            Start : -
            Task  : -
            Page  : Global
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Both

            Checking user access application from Mobile or Desktop.
        */
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

        /*
            End   : -
            Task  : -
            Page  : -
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Both
        */
    });

    function desktop_newlayout() {
        /* UI */
        /*
            Start : -
            Task  : -
            Page  : Global
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop

            Checking if user access login page, then access function transform_loginpage()
        */
        if ($('.-out').length == 1 || $('#login').length == 1 || $('#login-form-wrap').length > 0) {
            transform_loginpage();
        }
        else {
            /*
                if user access commerce management / transaction / model configuration / report manager page.
            */
                console.log(pagetitle);
            if (pagetitle == 'commerce management' || pagetitle == 'transaction' || pagetitle == 'model configuration' || pagetitle == "report manager") {
                transform_mainlayout();
                /*
                    if user access commerce management page, element of id=jg-mainmenu-orders add class active, and call function transfrom_orderspage()
                */
                if (pagetitle == 'commerce management') {
                    $('body').addClass('jg-page-orders');
                    $('#jg-mainmenu-orders').addClass('active');
                    $('#jg-submenu-myorders').addClass('active');
                    transform_orderspage();
                }
                else if (pagetitle == 'transaction') {
                    /*
                        if user access transaction page, set element id of readonly_1_visualWorkflow has child image to vi_shoppping_cart_ready_active.png
                        then add class active to element id of jg-mainmenu-orders then, remove element of jg-mainmenu-neworder and jg-mainmenu-copyorder
                    */
                    $('#readonly_1_visualWorkflow img').attr('src', rootFolder+'/image/images/vi_shoppping_cart_ready_active.png');
                    $('#jg-mainmenu-orders').addClass('active');
                    $('#jg-submenu-neworder').parent().remove();
                    $('#jg-submenu-copyorder').parent().remove();
                    
                    if (url.indexOf('copy_processing') != -1) {
                        /*
                            if position element of copy_processing in url is none, then add class jg-page-copyorder, then add class jg-page-copyorder
                            add text "Copy Order" to element id is jg-topbar-title, give text "Copy Order" to element title
                            and add class active to element id is jg-submenu-copyorder
                        */
                        $('body').addClass('jg-page-copyorder');
                        $('#jg-topbar-title').text("Copy Order");
                        $('title').text("Copy Order");

                        $('#jg-submenu-copyorder').addClass('active');
                    }
                    else if ($('#readonly_1_visualWorkflow').length > 0) {
                        /*
                            get image src from child element image of element readonly_1_visualWorkflow
                        */
                        var imgsrc = $('#readonly_1_visualWorkflow img').attr('src');

                        if (imgsrc.indexOf('vi_order_created_active.png') != -1 || imgsrc.indexOf('vi_customer_selected_active.png') != -1) {
                            /*
                                if image src is vi_order_created_active.png or vi_customer_selected_active.png
                                add class jg-page-neworder to body element
                                set text "New Order" to title element
                                add class active to element jg-submenu-neworder
                            */
                            $('body').addClass('jg-page-neworder');
                            $('#jg-topbar-title').text("New Order");
                            $('title').text("New Order");

                            $('#jg-submenu-neworder').addClass('active');
                        }
                        else if (imgsrc.indexOf('vi_shoppping_cart_ready_active.png')) {
                            /*
                                if image src is vi_shoppping_cart_ready_active.png then add class jg-page-shoppingcart to body element.
                                add text "Shopping Cart" to jg-topbar-title element
                                add text "Shopping Cart" to title element.
                            */
                            $('body').addClass('jg-page-shoppingcart');
                            $('#jg-topbar-title').text("Shopping Cart");
                            $('title').text("Shopping Cart");
                        }
                        else {
                            /*
                                set text "(Page title hasn't been set for this page.)" to jg-topbar-title element
                            */
                            $('#jg-topbar-title').text("(Page title hasn't been set for this page.)");
                        }

                        /*
                            Start : 20 March 2017
                            Task  : Order in Submitted Status the Logo(to guide the shopping stages) is missing
                            Page  : Order Page
                            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
                            Layout : Desktop
                            
                            if order created set src image child from readonly_1_visualWorkflow element to 'vi_order_created_active.png'
                        */
                        $('#readonly_1_visualWorkflow img').attr('src', rootFolder+'/image/images/vi_order_created_active.png');
                        //user click customer input form
                        /*
                            if user click element of customersNew_t then set readonly_1_visualWorkflow to vi_customer_selected_active.png
                        */
                        $("#customersNew_t").on("click", function(){
                            $('#readonly_1_visualWorkflow img').attr('src', rootFolder+'/image/images/vi_customer_selected_active.png');
                        });
                        /*
                            if element of readonly_1_status_t hasnt text "submitted" or customersNew_t val is not null then
                            set readonly_1_visualWorkflow to vi_customer_selected_active.png
                        */
                        if( ($("#readonly_1_status_t").text().toLowerCase() != 'submitted') && $("#customersNew_t").val() != '' ){
                           $('#readonly_1_visualWorkflow img').attr('src', rootFolder+'/image/images/vi_customer_selected_active.png'); 
                        }
                        /*
                            if user has add material, check it from table of line-item-grid has row with id emptyRow or not
                            set readonly_1_visualWorkflow to vi_shoppping_cart_ready_active.png
                        */
                        if( $("#line-item-grid tbody.line-item-grid-body").children('tr').attr('id') != 'emptyRow' ){
                            $('#readonly_1_visualWorkflow img').attr('src', rootFolder+'/image/images/vi_shoppping_cart_ready_active.png');
                        }
                        /*
                            if element of readonly_1_status_t has text "submitted"
                            set readonly_1_visualWorkflow to vi_order_submitted_active.png
                        */
                        if( $("#readonly_1_status_t").text().toLowerCase() == 'submitted')
                        {
                            $('#readonly_1_visualWorkflow img').attr('src', rootFolder+'/image/images/vi_order_submitted_active.png');
                        }

                        

                        /*
                            End   : 20 March 2017
                            Task  : Order in Submitted Status the Logo(to guide the shopping stages) is missing
                            Page  : Order Page
                            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
                            Layout : Desktop
                        */

                    }

                    transform_newcopypage();
                }
                else if (pagetitle == 'model configuration') {
                    /*
                        if user access model configuration page, add class active to jg-mainmenu-orders element.
                        remove jg-submenu-neworder and jg-submenu-copyorder element
                        and call function transform_modelconfig
                    */
                    $('#jg-mainmenu-orders').addClass('active');
                    $('#jg-submenu-neworder').parent().remove();
                    $('#jg-submenu-copyorder').parent().remove();

                    transform_modelconfig();
                }
                else if (pagetitle == "report manager") {
                    /*
                        if user access report manager page, add class jg-page-orders to body element.
                        add class active to jg-mainmenu-orders element, add class active to jg-submenu-myreports
                        remove jg-submenu-neworder and jg-submenu-copyorder element.
                        and call function transfrm_reportpage.
                    */
                    $('body').addClass('jg-page-orders');
                    $('#jg-mainmenu-orders').addClass('active');
                    $('#jg-submenu-myreports').addClass('active');
                    $('#jg-submenu-neworder').parent().remove();
                    $('#jg-submenu-copyorder').parent().remove();

                    transform_reportpage();
                }

                transform_newfooter();
            }else if( pagetitle == 'folders' ){
            /*
                if user access folders page then redirect to root url location of application.
            */
                window.location = 'https://'+window.location.host;
            }else if( pagetitle == 'my profile' ){
                /*
                    Start : 23 March 2017
                    Task  : Hide user profile details by typeUser
                    Page  : my profile
                    File Location : $BASE_PATH$/image/javascript/js-ezrx.js
                    Layout : Desktop

                    Checking if user access login page, then access function transform_loginpage()
                */
                var selectorRows = $("input[name='email']").closest('.bgcolor-form').next();
                var typeUser = $(selectorRows).children('.form-input').text().replace(/\s/g,'');
                if(typeUser.toLowerCase() != 'fullaccess'){
                    var listTable = $("table.dashed-table");
                    listTable.each(function(i, data){
                        if(i != 0){
                            $(data).hide();
                        }else{
                            $(data).children().children('tr.bgcolor-form').each(function(e, row){
                                $(row).hide();
                                $("input[name='password']").closest('tr.bgcolor-form').show();
                            });
                        }
                    });
                }
                /*
                    End : 23 March 2017
                    Task  : Hide user profile details by typeUser.
                    Page  : my profile
                    File Location : $BASE_PATH$/image/javascript/js-ezrx.js
                    Layout : Desktop
                */
            }
        }

        // remove white overlay
        $('#jg-overlay').hide();
        /*
            End : -
            Task  : -
            Page  : Global
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop
        */
    }

    function transform_loginpage() {
        var newlayout = $("<div class='jg-box-login'>")
            .append($("<div class='jg-box-login-inner'>")
                .append($("<img src='"+rootFolder+"/image/images/ezrx.png' class='jg-login-logo' />"))
                .append($("<span class='jg-login-welcome'>Welcome</span>"))
            )
            .append($("<div class='jg-box-login-bottom'>")
                .append($("<img src='"+rootFolder+"/image/images/zuellig.png' class='jg-login-logo' />"))
            )

            .prependTo('body');

        $('form[name=loginform]').appendTo('.jg-box-login-inner');
        $('input[name=username]').attr("placeholder", "Username");
        $('input[name=psword]').attr("placeholder", "Password");
        $('#login-form-head').remove();
        $('.login-links').insertBefore($('.login-button'));

        $('.extra-panes, .main-pane, #footer').hide();
    }

    function transform_mainlayout() {
        // Add new layout
        /*
            Start : 19 March 2017
            Task  : Edit left side menu design.
            Page  : All Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop
            
            if user login from zuelligpharma.com then show report menu page else dont show report menu.
        */
        if(/@zuelligpharma.com\s*$/.test(_BM_USER_LOGIN)){
            var newlayout = $("<div class='jg-box-mainlayout'>")
                .append($("<div class='jg-box-sidenav'></div>")
                    .append($("<ul class='jg-list-mainmenu'>")
                        .append($("<li class='jg-item-mainmenu'><a href='/commerce/profile/edit_profile.jsp?_bm_trail_refresh_=true&navType=1' id='jg-mainmenu-profile' class='jg-linkbtn profile' data-description='Profile' ></a></li>"))
                        .append($("<li class='jg-item-mainmenu'><a href='/commerce/display_company_profile.jsp?_bm_trail_refresh_=true' id='jg-mainmenu-home' class='jg-linkbtn home' data-description='Home' ></a></li>"))
                        .append($("<li class='jg-item-mainmenu'><a href='/commerce/buyside/reports/report_manager.jsp?process_id=36244034&from_hp=true&_bm_trail_refresh_=true' id='jg-submenu-myreports' class='jg-linkbtn my_report' data-description='My Reports' ></a></li>"))
                        .append($("<li class='jg-item-mainmenu jg-separator'></li>"))
                        .append($("<li class='jg-item-mainmenu'><a href='/commerce/buyside/commerce_manager.jsp?bm_cm_process_id=36244034&from_hp=true&_bm_trail_refresh_=true' id='jg-submenu-myorders' class='jg-linkbtn my_order' data-description='All Orders' ></a></li>"))
                        .append($("<li class='jg-item-mainmenu'><a href='#' id='jg-submenu-neworder' class='jg-linkbtn new_order' data-description='New Order' ></a></li>"))
                        .append($("<li class='jg-item-mainmenu'><a href='#' id='jg-submenu-copyorder' class='jg-linkbtn copy_order' data-description='Copy Order' ></a></li>"))
                        /*.append($("<li class='jg-item-mainmenu'><a id='jg-mainmenu-arrow' class='jg-linkbtn arrow'></a></li>"))
                        .append($("<li class='jg-item-mainmenu'><a href='/commerce/buyside/commerce_manager.jsp?bm_cm_process_id=36244034&from_hp=true&_bm_trail_refresh_=true' id='jg-mainmenu-orders' class='jg-linkbtn orders'></a></li>"))
                        .append($("<li class='jg-item-mainmenu jg-separator'></li>"))
                        */
                        .append($("<li class='jg-item-mainmenu jg-separator'></li>"))
                        .append($("<li class='jg-item-mainmenu'><a href='/admin/index.jsp?_bm_trail_refresh_=true' id='jg-mainmenu-settings' class='jg-linkbtn settings' data-description='Settings' ></a></li>"))
                        .append($("<li class='jg-item-mainmenu'><a href='/logout.jsp?_bm_trail_refresh_=true' id='jg-mainmenu-logout' class='jg-linkbtn logout' data-description='Logout' ></a></li>"))
                    )
                )
                .append($("<div class='jg-box-rightpanel'></div>")
                    // .append($("<div class='jg-box-submenu'></div>"))
                    .append($("<div class='jg-box-mainarea'>")
                        .append($("<div class='jg-box-topbar'></div>")
                            .append($("<h2 id='jg-topbar-title'></h2>"))
                        )
                        .append($("<div class='jg-box-toolbar'></div>")
                            .append($("<ul class='jg-list-tool'>"))
                            .append($("<ul class='jg-list-tool-right'>"))
                        )
                        .append($("<div class='jg-box-maincontent'></div>"))
                    )
                )
                .prependTo('body');
        }else{
            var newlayout = $("<div class='jg-box-mainlayout'>")
                .append($("<div class='jg-box-sidenav'></div>")
                    .append($("<ul class='jg-list-mainmenu'>")
                        .append($("<li class='jg-item-mainmenu'><a href='/commerce/profile/edit_profile.jsp?_bm_trail_refresh_=true&navType=1' id='jg-mainmenu-profile' class='jg-linkbtn profile' data-description='Profile' ></a></li>"))
                        .append($("<li class='jg-item-mainmenu'><a href='/commerce/display_company_profile.jsp?_bm_trail_refresh_=true' id='jg-mainmenu-home' class='jg-linkbtn home' data-description='Home' ></a></li>"))
                        .append($("<li class='jg-item-mainmenu jg-separator'></li>"))
                        .append($("<li class='jg-item-mainmenu'><a href='/commerce/buyside/commerce_manager.jsp?bm_cm_process_id=36244034&from_hp=true&_bm_trail_refresh_=true' id='jg-submenu-myorders' class='jg-linkbtn my_order' data-description='All Orders' ></a></li>"))
                        .append($("<li class='jg-item-mainmenu'><a href='#' id='jg-submenu-neworder' class='jg-linkbtn new_order' data-description='New Order' ></a></li>"))
                        .append($("<li class='jg-item-mainmenu'><a href='#' id='jg-submenu-copyorder' class='jg-linkbtn copy_order' data-description='Copy Order' ></a></li>"))
                        /*.append($("<li class='jg-item-mainmenu'><a id='jg-mainmenu-arrow' class='jg-linkbtn arrow'></a></li>"))
                        .append($("<li class='jg-item-mainmenu'><a href='/commerce/buyside/commerce_manager.jsp?bm_cm_process_id=36244034&from_hp=true&_bm_trail_refresh_=true' id='jg-mainmenu-orders' class='jg-linkbtn orders'></a></li>"))
                        .append($("<li class='jg-item-mainmenu jg-separator'></li>"))
                        */
                        .append($("<li class='jg-item-mainmenu jg-separator'></li>"))
                        .append($("<li class='jg-item-mainmenu'><a href='/admin/index.jsp?_bm_trail_refresh_=true' id='jg-mainmenu-settings' class='jg-linkbtn settings' data-description='Settings' ></a></li>"))
                        .append($("<li class='jg-item-mainmenu'><a href='/logout.jsp?_bm_trail_refresh_=true' id='jg-mainmenu-logout' class='jg-linkbtn logout' data-description='Logout' ></a></li>"))
                    )
                )
                .append($("<div class='jg-box-rightpanel'></div>")
                    // .append($("<div class='jg-box-submenu'></div>"))
                    .append($("<div class='jg-box-mainarea'>")
                        .append($("<div class='jg-box-topbar'></div>")
                            .append($("<h2 id='jg-topbar-title'></h2>"))
                        )
                        .append($("<div class='jg-box-toolbar'></div>")
                            .append($("<ul class='jg-list-tool'>"))
                            .append($("<ul class='jg-list-tool-right'>"))
                        )
                        .append($("<div class='jg-box-maincontent'></div>"))
                    )
                )
                .prependTo('body');
        }

        /*  add description on hover menu   */
        $("li.jg-item-mainmenu:not('.jg-separator')").each(function(i, data){
            var button = $(data).children();
            var description = $(button).data('description');
            $(this).mouseenter(function(){
                var spanDescription = '<div>'+description+'</div>';
                $('#myMenuModal').css({
                    "background": "#FFFFFF",
                    "box-shadow": "0 2px 4px 0 rgba(0,0,0,0.30)",
                    "border-radius": "4px",
                    "width": "100px",
                    "text-align": "center",
                })
                $('#myMenuModal').addClass("hover-modal-content").html(spanDescription);
                $('#myMenuModal').css("display", "block");
                $(this).mouseleave(function(){
                    $('#myMenuModal').css("display", "none");
                })
            })
        });

        /*
            Show modal Description of left side menu.
        */
        $("li.jg-item-mainmenu:not('.jg-separator')").mousemove(function(e){
            $('#myMenuModal').css('top', e.pageY - $(document).scrollTop() + 'px').css('left', e.pageX - $(document).scrollLeft() + 50 + 'px');
        })

        /*
            End   : 19 March 2017
            Task  : Edit left side menu design.
            Page  : All Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop
        */

        // mainmenu status
        var page = $('.commerce-sidebar-current').text().toLowerCase();

        // adjust rightpanel to submenu width
        // $('.jg-box-mainarea').css('paddingLeft', $('.jg-box-submenu').outerWidth());

        // remove table padding
        $('.jg-box-maincontent table').attr('cellspacing', '0').attr('cellpadding', '0');

        // header & footer
        $('.header-bordercolor, .commerce-bordercolor, #footer').hide();

        // errors box
        var errorsbox = $("<div class='column-layout clearfix'>").insertAfter($('#attr_wrapper_1_visualWorkflow').closest('.column-layout'));
        $('#actionErrorMessagesBox').appendTo(errorsbox);

        // modal box
        $('<div id="myModal" >').appendTo('.jg-box-mainlayout');
        $('<div id="myMenuModal" >').appendTo('.jg-box-mainlayout');

        /* EVENTS */

        //always hide menu
        // $('.jg-box-submenu').css('paddingLeft', '-100px');
        // $('.jg-box-submenu').show();

        $('#jg-submenu-neworder').click(function(e) {
            e.preventDefault();

            newTransaction();
        });

        // $('.jg-box-toolbar').toggle();
        // $('.jg-box-mainarea').css('paddingLeft', '150px');

        /*var status_hover_menu = true;

        var show_menu = function(){
            $('.jg-box-submenu').fadeIn();
            // $('.jg-box-submenu').animate({paddingLeft: '150px'}, 2000);
            // $('.jg-box-mainarea').css('paddingLeft', '150px');
            $('.jg-box-mainarea').animate({paddingLeft: '150px'},1500);
            // $('.jg-box-toolbar').slideDown(1500);

        }

        var hide_menu = function(){
            $('.jg-box-submenu').fadeOut();
            // $('.jg-box-submenu').animate({paddingLeft: '0px'}, 2000);
            // $('.jg-box-mainarea').css('paddingLeft', '0');
            $('.jg-box-mainarea').animate({paddingLeft: '0'},1500);
            $('.jg-box-toolbar').slideUp(1500);
        }*/

        /*var show_manage_folder = function(){

        }

        var hide_manage_folder = function(){

        }*/

        //show menu on hover
        /*$('#jg-mainmenu-orders').mouseenter(function(e) {
            show_menu();
        });*/
        //hide menu when mouse leave
        /*$('.jg-box-maincontent').mouseenter(function(e) {
            if(status_hover_menu){
                hide_menu();
            }
        });*/

        /*function AnimateRotate(id_element,d){
            var first = 180;
            if(d == 180){
                first = 0;
            }
            $({deg: first}).animate({deg: d}, {
                step: function(now, fx){
                    $("#"+id_element).css({
                         transform: "rotate(" + now + "deg)"
                    });
                }
            });
        }

        var showOrHide = function(condition){
            if(condition){
                //show
                $('.jg-box-submenu').animate({left: "50px"},1000);
                AnimateRotate('jg-mainmenu-arrow', 360);

            }else{
                //hide
                $('.jg-box-submenu').animate({left: "-150px"},1000);
                AnimateRotate('jg-mainmenu-arrow', 180);
            }
        }
        var hide = false;
        $('#jg-mainmenu-orders').bind('click', function(e) {
            e.preventDefault();
            hide = !hide;
            showOrHide(hide);

        });*/
    }

    function transform_newfooter() {
        // new footer
        $('.jg-box-mainarea').append($("<div class='jg-box-footer'>")
            .append($("<img src='"+rootFolder+"/image/images/dk-img-footer.png' class='jg-img-footer' />"))
        );
    }

    function tranform_ordersubmenu() {
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
    }

    function transform_orderspage() {
        // toolbar
        /*
            add menu on top commerce management.
        */
        $('.jg-list-tool')
            .append($("<li class='jg-item-tool'>")
                /* .append($("<input type='text' class='jg-txt-search' />")) */
                    .append($("<a href='#' id='jg-tool-search' class='jg-linkbtn search'>Search</a>"))
            )
            .append($("<li class='jg-item-tool jg-separator'>"))
            .append($("<li class='jg-item-tool'>")
                .append($("<select id='jg-tool-select' class='jg-tool-select'>")
                    // .append($("<option>View</option>"))
                )
            )
            .append($("<li class='jg-item-tool'>")
                .append($("<a href='#' id='jg-tool-manage' class='jg-linkbtn manage'>Manage</a>"))
            )
            .append($("<li class='jg-item-tool'>")
                .append($("<a href='#' id='jg-tool-refine' class='jg-linkbtn refine'>Refine</a>"))
            )
            .append($("<li class='jg-item-tool jg-separator'>"))
            /*.append($("<li class='jg-item-tool'>")
                .append($("<a href='/commerce/buyside/commerce_manager.jsp?bm_cm_process_id=36244034&from_hp=true&_bm_trail_refresh_=true' class='jg-linkbtn jg-tool-refresh'></a>"))
            );*/
            .append($("<li class='jg-item-tool'>")
                .append($("<a href='#' id='jg-tool-folder-default' class='jg-linkbtn default'>Default</a>"))
            )
            .append($("<li class='jg-item-tool'>")
                .append($("<a href='#' id='jg-tool-folder-fav' class='jg-linkbtn fav'>Favorite</a>"))
            )
            .append($("<li class='jg-item-tool'>")
                .append($("<a href='#' id='jg-tool-folder-trash' class='jg-linkbtn trash'>Trash</a>"))
            )
            .append($("<li class='jg-item-tool'>")
                .append($("<a href='#' id='jg-tool-folder-edit' class='jg-linkbtn edit'>Edit</a>"))
            )
            .append($("<li class='jg-item-tool jg-separator'>"));

        // dropdown
        $('#jg-tool-select').html($('select[name=new_search_id]').html());
        $('#jg-tool-select').change(function() {
            var selectval = $(this).val();
            $('select[name=new_search_id]').val(selectval);

            $('a.list-field')[0].click();
        });

        /*
            Start : 8 March 2017
            Task  : Create Management Folder
            Page  : Commerce Management
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop

            this function for check create name folder isn't default or trash.
        */
        function addFolder(form)
        {
            if(form.name.value == "[Default]" || form.name.value == "[Trash]"){
                bmErrorString += "[Default] and [Trash] folders already exist";
            }
            bmCheckString(form.name, "Folder Name");
        }
        /*
            this function for check rename folder isn't default or trash.
        */
        function renameFolder(form)
        {
            for(var i=0; i<form.id.length; i++)
            {
                if(form.id.options[i].selected){
                    if(form.id.options[i].text == "[Default]" || form.id.options[i].text == "[Trash]"){
                        bmErrorString += "[Default] and [Trash] folders are mandatory and cannot be renamed";
                    }
                }
            }
            if(form.name.value == "[Default]" || form.name.value == "[Trash]"){
                bmErrorString += "[Default] and [Trash] folders already exist";
            }

            bmCheckString(form.name, "New Name");
        }
        /*
            this function for check delete folder name isnt default or trash.
        */
        function deleteFolder(form)
        {
            for(var i=0; i<form.id.length; i++)
            {
                if(form.id.options[i].selected){
                    if(form.id.options[i].text == "[Default]" || form.id.options[i].text == "[Trash]"){
                        bmErrorString += "[Default] and [Trash] folders are mandatory and cannot be deleted";
                        return false;
                    }
                    if(form.id.options[i].value == form.folder_id.value){
                        form.folder_id.value=-1;
                    }
                }
            }
        }
        /*
            fetch list of folder from CPQ and give some icon.
            when the folder isnt default / trash / favourites then add some function to manage folder
            add button rename, remove, save and close.
        */
        var listFolder = [];
        var list_folder = "<table style='background-color:#0C727A;' >";
        var optionsFolder = "";
        $('#dropzone .dropTarget td[title]').each(function(i, target) {
            var nama_folder = $(target).attr('title').replace(/[^\w\s]/gi, '');
            var id_folder = $(target).parent().attr("id");
            var button_folder = "<tr><td>";
            var link_folder = $(target).prev().find('a').attr('href');
            if(nama_folder.toLowerCase() == "default"){
                /* add icon and name folder default */
                button_folder += "<a href='"+link_folder+"' id='jg-tool-folder-default' class='jg-linkbtn list-folder default'>"+nama_folder+"</a>";
                $("#jg-tool-folder-default").attr("href", link_folder);
            }else if(nama_folder.toLowerCase() == "trash"){
                /* add icon and name folder trash */
                button_folder += "<a href='"+link_folder+"' id='jg-tool-folder-trash' class='jg-linkbtn list-folder trash'>"+nama_folder+"</a>";
                $("#jg-tool-folder-trash").attr("href", link_folder);
            }else if(nama_folder.toLowerCase() == "favourites"){
                /* add icon and name favourites */
                button_folder += "<a href='"+link_folder+"' id='jg-tool-folder-fav' class='jg-linkbtn list-folder fav'>"+nama_folder+"</a>";
                $("#jg-tool-folder-fav").attr("href", link_folder);
            }else{
                /* add icon and name folder other name */
                button_folder += "<a href='"+link_folder+"' id='display_folder_"+id_folder+"' class='jg-linkbtn list-folder default'>"+nama_folder+"</a><input id='input_"+id_folder+"' name='name' class='input-folder' style='display:none;' />";
                button_folder_toolbar = "<li class='jg-item-tool' ><a href='"+link_folder+"' class='jg-linkbtn default'>"+nama_folder+"</a></li>";
                $(".jg-list-tool").append($(button_folder_toolbar));
                optionsFolder += "<option value="+id_folder+" ></option>";
                button_folder += "</td><td style='padding-top:30px;' >";
                /*
                    add button rename, remove, save for management folder.
                */
                button_folder += "<a href='#' class='tmp-folder tmp-folder-rename' id='btn_rename_"+id_folder+"' data-id='"+id_folder+"' ></a>";
                button_folder += "<a href='#' class='tmp-folder tmp-folder-remove' id='btn_remove_"+id_folder+"' data-id='"+id_folder+"' ></a>";
                button_folder += "<a href='#' class='tmp-folder tmp-folder-save' style='display:none;' id='btn_save_"+id_folder+"' data-id='"+id_folder+"' ></a>";
                button_folder += "<a href='#' class='tmp-folder tmp-folder-close' style='display:none;' id='btn_close_"+id_folder+"' data-id='"+id_folder+"' ></a>";
                button_folder += "</td></tr>";
            }
            list_folder += button_folder;
            listFolder.push(nama_folder);
        });
        list_folder += "</table>";
        /* get folder id */
        var bm_cm_process_id_val = $("input[name='bm_cm_process_id']").val();
        var folder_id_val = $("input[name='folder_id']").val();
        $('.jg-list-tool-right')
            .append($("<li class='jg-item-tool'>")
                // .append($("<a href='#' id='browse_folder' class='jg-linkbtn browse'>Browse</a>"))
                .append($("<div class='jg-box-foldermenu'>"+
                            "<p class='jg-linkbtn' >Create New Folder<br/><br/>"+
                            "Folder Name : </p>"+
                            "<form name='templateFolder1' method='post' action='admin_folder.jsp' >"+
                            "<input type='hidden' name='formaction' value='addCmFolder' >"+
                            "<input type='hidden' name='bm_cm_process_id' value='"+ bm_cm_process_id_val +"' >"+
                            "<input type='hidden' name='folder_id' value='"+ folder_id_val +"' >"+
                            "<input type='text' style='padding:5px;width:83%;margin-bottom:10px;' name='name' size='20' maxlength='30' >"+
                            "<button style='padding:5px;border-radius:20px;width:70px;height:30px;color:white;background-color:#0C727A;border:2px solid white;margin-left:160px;' onclick='javascript:bmSubmitForm('admin_folder.jsp', document.templateFolder1, addFolder);bmCancelBubble(event)' >Create</button>"+
                            "</form>"+
                            "<form name='templateFolder2' method='post' action='admin_folder.jsp' >"+
                            "<input type='hidden' name='formaction' value='addCmFolder' >"+
                            "<input type='hidden' name='bm_cm_process_id' value='"+ bm_cm_process_id_val +"' >"+
                            "<input type='hidden' name='folder_id' value='"+ folder_id_val +"' >"+
                            "<input type='hidden' name='name' id='hidden_name_folder2' >"+
                            "<select name='id' id='folder' style='display:none;' >"+
                            optionsFolder+
                            "</select>"+
                            "</form>"+
                            "<hr/>"+list_folder+
                          "</div>"))
            );
        /* listen folder remove clicked, set option id folder value, and give alert if continue to delete. */
        $(".tmp-folder-remove").on("click", function(){
            var id = $(this).data('id');
            $("#folder option[value='"+id+"']").attr("selected","");
            bmSubmitFormConfirm('Deleting this folder will send all of its contents to the trash.  Do you wish to continue?', 'admin_folder.jsp', document.templateFolder2, deleteFolder, 'deleteCmFolder');
            bmCancelBubble(event);
        });
        /* listen folder rename show form input name folder, hide icon and folder name */
        var isAnotherRenameToo = false;
        $(".tmp-folder-rename").on("click", function(){
            if(!isAnotherRenameToo){
                isAnotherRenameToo = true;
                var id = $(this).data('id');
                $("#folder option[value='"+id+"']").attr("selected","");
                //hide element
                $("#display_folder_"+id).hide();
                $("#btn_rename_"+id).hide();
                $("#btn_remove_"+id).hide();
                //show element
                $("#input_"+id).show();
                $("#btn_save_"+id).show();
                $("#btn_close_"+id).show();
            }else{
                alert("Please save / close another rename");
            }
        });

        /* listen folder rename close, hide form input name folder, show icon and folder name */

        $(".tmp-folder-close").on("click", function(){
            isAnotherRenameToo = false;
            var id = $(this).data('id');
            //hide element
            $("#input_"+id).hide();
            $("#btn_save_"+id).hide();
            $("#btn_close_"+id).hide();
            //show element
            $("#display_folder_"+id).show();
            $("#btn_rename_"+id).show();
            $("#btn_remove_"+id).show();
        });

        /* listen folder rename save, hide form input name folder, show icon and folder name and call function save folder name. */

        $(".tmp-folder-save").on("click", function(){
            isAnotherRenameToo = false;
            var id = $(this).data('id');
            $("#hidden_name_folder2").val( $("#input_"+id).val() );
            bmSubmitForm('admin_folder.jsp', document.templateFolder2, renameFolder);
            bmCancelBubble(event);
            //hide element
            $("#input_"+id).hide();
            $("#btn_save_"+id).hide();
            $("#btn_close_"+id).hide();
            //show element
            $("#display_folder_"+id).show();
            $("#btn_rename_"+id).show();
            $("#btn_remove_"+id).show();
        });

        $(".jg-box-foldermenu").css("right","-400px");

        //show or hide menu folder on click
        var hide = false;
        $("#jg-tool-folder-edit").on("click", function(){
            if(!hide){
                hide = true;
                $('.jg-box-foldermenu').animate({right: '0px'},1000);
            }else{
                hide = false;
                $('.jg-box-foldermenu').animate({right: '-400px'},1000);
            }
            
        });

        /*
            End   : 8 March 2017
            Task  : Create Management Folder
            Page  : Commerce Management
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop
        */

        // page title
        pagetitle = $('#cm-manager-content').closest('table').prev().find('td').text().trim();
        $('#jg-topbar-title').text(pagetitle);

        // content
        $('form[name=bmDocForm]').appendTo('.jg-box-maincontent');

        // tweaks original
        $('.jg-box-maincontent .tabular-data-container > br').eq(0).remove();
        $('.jg-box-maincontent .tabular-data-container > table').eq(0).hide();
        $('.jg-box-maincontent .tabular-data-container > table').eq(1).hide();
        $('.jg-box-maincontent .tabular-data-container > table').eq(5).hide();
        $('#move').closest('table').parent().css('paddingBottom', '4px');


        /* EVENTS */
        // search
        /* custom search button */
        $('#jg-tool-search').click(function(e) {
            e.preventDefault();

            $('#search').click();
        });

        // manage
        /* custom search and refine list order. */
        $('.commerce-sidebar-item').each(function(i, sbitem) {
            if ($(sbitem).text().toLowerCase().indexOf('manage') != -1) {
                $('#jg-tool-manage').attr('href', $(sbitem).attr('href'));
            }
            else if ($(sbitem).text().toLowerCase().indexOf('refine') != -1) {
                $('#jg-tool-refine').attr('href', $(sbitem).attr('href'));
            }
        });

        // folders
        
        
        /*$('#dropzone .dropTarget td[title]').each(function(i, target) {
            if ($(target).attr('title').toLowerCase().indexOf('default') != -1) {
                $('#jg-tool-folder-default').attr('href', $(target).prev().find('a').attr('href'));
            }
            else if ($(target).attr('title').toLowerCase().indexOf('trash') != -1) {
                $('#jg-tool-folder-trash').attr('href', $(target).prev().find('a').attr('href'));
            }
            else if ($(target).attr('title').toLowerCase().indexOf('fav') != -1) {
                $('#jg-tool-folder-fav').attr('href', $(target).prev().find('a').attr('href'));
            }
        });*/

        // custome edit folder
        /*$('#jg-tool-folder-edit').click(function(e) {
            e.preventDefault();

            // $('#edit').click();
        });*/

        // custom button copy order
        $('#jg-submenu-copyorder').click(function(e) {
            e.preventDefault();

            $('#copy_order').click();
        });

        /* custom button export */
        $('#jg-submenu-export').click(function(e) {
            e.preventDefault();

            $('#export').click();
        });
    }

    function transform_newcopypage() {
        // toolbar
        // $('.jg-box-toolbar').addClass('invert');
        /*
         $('.jg-list-tool')
         .append($("<li class='jg-item-tool'>")
         .append($("<a href='#' id='jg-tool-update' class='jg-linkbtn update'>Update</a>"))
         )
         .append($("<li class='jg-item-tool'>")
         .append($("<a href='#' id='jg-tool-startover' class='jg-linkbtn startover'>Start Over</a>"))
         )
         .append($("<li class='jg-item-tool'>")
         .append($("<a href='#' id='jg-tool-createtrans' class='jg-linkbtn createtrans'>Create Transaction</a>"))
         )
         .append($("<li class='jg-item-tool'>")
         .append($("<a href='#' id='jg-tool-addtofav' class='jg-linkbtn addtofav'>Add to Favorite</a>"))
         )
         .append($("<li class='jg-item-tool'>")
         .append($("<a href='#' id='jg-tool-pipelineviewer' class='jg-linkbtn pipelineviewer'>Pipeline Viewer</a>"))
         )
         .append($("<li class='jg-item-tool jg-separator'>"))

         if ($('#save').length > 0) {
         $('.jg-list-tool').append($("<li class='jg-item-tool'>")
         .append($("<button id='btn-neworder-save' class='jg-btn'>Save</button>"))
         )
         }

         // refresh button
         $('.jg-list-tool-right')
         .append($("<li class='jg-item-tool jg-separator'>"))
         .append($("<li class='jg-item-tool'>")
         .append($("<a href='#' id='jg-tool-troubleshooting' class='jg-linkbtn troubleshooting'>Troubleshooting</a>"))
         )
         */
        /* hide class jg-box-toolbar */
        $('.jg-box-toolbar').hide();
        /* move element document-form to class jg-box-maincontent */
        $('#document-form').appendTo('.jg-box-maincontent');

        // tweak originals
        // $('#sticky-actions').hide();

        /* styling on add material */
        $('select[name=orderType_t]').css('width', 'auto');
        $('#field_wrapper_1_visualWorkflow').css('paddingLeft', '0');
        $('#add_material').closest('.column').prev().remove();
        $('#add_material').closest('.column').css('width', 'auto');
        $('#add_material').closest('.form-element').css('paddingLeft', '6px');
        $('#add_material').closest('.form-element').prev().remove();

        // styling on cust & address area
        var newcontainer = $("<div class='column label-left' style='width:70%'>");
        var custcol = $("<div class='jg-order-box-cust'>").appendTo(newcontainer);
        var addresscol = $("<div class='jg-order-box-address'>").appendTo(newcontainer);
        var custleft = $('#attr_wrapper_1_customersNew_t').closest('.column');
        var rowbox = custleft.closest('.column-layout');
        var custright = $(custleft).next();
        custleft.css('width', '50%');
        custright.css('width', '50%');
        $('label[for=customerId__t]').css('width', '135px');
        $('#field_wrapper_1_customerId__t').css('paddingLeft', '135px');
        rowbox.append(newcontainer);
        custcol.append($('#attr_wrapper_1_customersNew_t'));
        addresscol.append(custleft).append(custright);
        $('#attr_wrapper_1_shipToAddress_html_t').css('marginTop', '35px').prependTo('.jg-order-box-address');
        custleft.find('.attr-spacer').remove();
        custright.find('.attr-spacer').remove();

        // styling on Summary area
        $('#content36594406 .form-element').css('paddingLeft', '200px');
        $('#custom_transaction_manager').closest('.form-element').css('paddingLeft', '0');
        $('#custom_transaction_manager').closest('.form-element').prev().remove();
        $('#custom_transaction_manager').closest('.form-item').css('margin', '10px 0');

        var totalcol = $('#attr_wrapper_1_totalContractValue_t').closest('.column');
        totalcol.css('width', '50%');
        totalcol.prev().prev().remove();
        var custpocol = totalcol.prev();
        custpocol.css('width', '50%').removeClass('spacer-column');
        custpocol.find('.attr-spacer').remove();
        $('#attr_wrapper_1_customerPORef_t').appendTo(custpocol);
        $('label[for=customerPORef_t]').css('width', 'auto');
        $('label[for=orderingRequestNoMoreThan90Characters_t]').addClass('blocklabel').css('width', 'auto');
        $('#customerPORef_t').closest('.text-wrapper').css('width', 'auto');
        $('#field_wrapper_1_customerPORef_t').css('width', '50%').css('float', 'left').css('paddingLeft', '0').css('marginLeft', '5px');
        $('#field_wrapper_1_orderingRequestNoMoreThan90Characters_t').css('paddingLeft', '0');
        $('#1_totalContractValue_t').closest('.form-element').addClass('inlinevalue');
        $('#attr_wrapper_1_totalContractValue_t .form-label').css('width', 'auto');
        $('#field_wrapper_1_note_t').css('paddingLeft', '60px');
        $('#attr_wrapper_1_note_t').parent().css('width', 'auto');
        $('#content36267614 .column-layout .spacer-column').remove();
        $('label[for=customerPORef_t], label[for=totalContractValue_t]').addClass('jg-textheader');
        $('label[for=importMaterials]').addClass('jg-buttonheader');
        $('#_file_importMaterials').closest('.form-element').css('paddingLeft', '120px');

        // page buttons
        var buttonbox = $("<div class='jg-box-buttons'>")
        // .append($("<button id='jg-btn-addtofav' class='jg-btn'>Add to Favorite</button>"))
            .append($("<button id='jg-btn-pipelineviewer' class='jg-btn'>Pipeline Viewer</button>"))
            .appendTo('.jg-box-maincontent');

        adjust_tooltip();

        $("#pipeline_viewer").closest('.button-middle').hide();

        /*
            Start : 22 March 2017
            Task  : Need to Move this Field above customer field. We kept the Customer Search Field above the Customer in the design layout. Some CSS changes Pushing the field down.
            Page  : Order Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop

        */
        /* clone class jg-order-box-cust for the result of moving element customerSearchFilter  */
        $('.jg-order-box-cust').parent().prepend( $('.jg-order-box-cust').clone().html( $("select[name='customerSearchFilter']").closest('div.column') ) );
        
        /* remove class clearfix for stable styling */
        $("#attr_wrapper_1_owner_t").parent().parent().removeClass('clearfix');

        /* hide element of class spacer-column */
        $( $("#attr_wrapper_1_customerShipToId_t").parent().siblings('.spacer-column') ).hide();
        /*var kolom_customer_sold = $("#attr_wrapper_1_customerSoldToId_t").parent();
        $( kolom_customer_sold ).css({
            "position" : "absolute",
            "margin-top" : "35px",
        });*/
        /* sales rep name dll */
        // $("#attr_wrapper_1_owner_t").css("width","35%");

        /*$("select[name='orderType_t']").closest('.column-layout').removeClass('clearfix').append( $("#attr_wrapper_1_customerSoldToId_t").parent() );
        $( $("#attr_wrapper_1_customerSoldToId_t").parent().parent() ).next().removeClass('clearfix');
        $("#panel_36350863").css({ "padding-top":"150px" });*/
        /*
            End   : 22 March 2017
            Task  : Need to Move this Field above customer field. We kept the Customer Search Field above the Customer in the design layout. Some CSS changes Pushing the field down.
            Page  : Order Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop
        */

        /*
            Start : 6-4-2017
            Task  : address is not completely shown
            Page  : Order Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop
        */
        /* add styling wordwrap on address coloumn */
        $("div[id*='shipTo_t_address']").each(function(e, dataAddress){
            if( /attr_wrapper/i.test($(dataAddress).attr('id')) ){
                $( "#"+$(dataAddress).attr('id') ).find('.readonly-wrapper').css({"white-space":"normal"})
            }
        });
        /* add styling wordwrap on address coloumn */
        $("div[id*='customerAddressLine']").each(function(e, dataAddress){
            if( /attr_wrapper/i.test($(dataAddress).attr('id')) ){
                $( "#"+$(dataAddress).attr('id') ).find('.readonly-wrapper').css({"white-space":"normal"})
            }
        });

        /*
            End   : 6-4-2017
            Task  : address is not completely shown
            Page  : Order Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop
        */

        /*
            Start : 11-3-2017
            Task  : if isPriceOverride give red color
            Page  : Order Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop  
        */
        // data with color red
        // find column with id is isPriceOverride when the value is True then give red color
        $("td[id*='isPriceOverride']").each(function(i, data){
            if($(data).text() !== "False"){
                var line = $(data).parent();
                var unitPrice = $(line).find("td[id*='unitPrice']")
                var remove_attr = $(unitPrice).attr("id").split("attr_wrapper");
                var object_span = $( "#readonly"+remove_attr[1] );
                object_span.css("color","red");
            }
        });
        /*
            Start : 13-3-2017
            Task  : if Type Bonus Change row collor with grey #EEE
            Page  : Order Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop  
        */

        // find column with id is refNo_text when the value is bonus then give background color row with #EEE
        $("td[id*='refNO_text']").each(function(i, data){
            var refNo = $(this).attr("id").split("attr_wrapper");
            var object_span = $("#readonly"+refNo[1]);
            // console.log(object_span.text());
            if(object_span.text().toLowerCase() == "bonus"){
                // console.log("bonus");
                $(this).parent().css("background-color","#EEE").removeClass('child-line-item');
            }
        });
        /*
            End   : 13-3-2017
            Task  : if Type Bonus Change row collor with grey #EEE
            Page  : Order Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop  
        */

        /*
            Start : 8-3-2017
            Task  : if Type Bonus Overide Flag is true then give red color
            Page  : Order Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop  
        */        
        /* find column with id is bonusOverideFlag_l when the value is True then give red color on text  */
        $("td[id*='bonusOverideFlag_l']").each(function(i, data){
            var refNo = $(this).attr("id").split("attr_wrapper");
            var object_span = $("#readonly"+refNo[1]);
            if(object_span.text() == "True"){
                var line = $(this).parent();
                var qty = $(line).find("td[id*='qty_l']");
                var remove_attr = $(qty).attr("id").split("attr_wrapper");
                var qty_span = $( "#readonly"+remove_attr[1] );
                qty_span.css("color", "red");
            }
        });
        /*
            End   : 8-3-2017
            Task  : if Type Bonus Overide Flag is true then give red color
            Page  : Order Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop  
        */        

        /*
            Start : 21 March 2017
            Task  : - Highlight "In Stock" No In commerce to Red and Qty to Red for Commercial Material Line (Comm)
                    - Highlight "In Stock" No In commerce to Red for Bonus Material Line (Bonus).
            Page  : Order Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop  
        */
        /* find column with id is inStock when value is no then give red color text inStock, then check type of material, if comm then give text red color on qty coloumn */
        $("td[id*='inStock']").each(function(i, data){
            var refNo = $(this).attr("id").split("attr_wrapper");
            var object_span = $("#readonly"+refNo[1]);
            if(object_span.text().toLowerCase() == 'no'){
                // object_span.addClass('sc-no-stock');
                object_span.css("color", "red");
                var line = $(this).parent();
                var type = $(line).find("td[id*='refNO_text']");
                var remove_attr = $(type).attr("id").split("attr_wrapper");
                var type_span = $( "#readonly"+remove_attr[1] );
                if(type_span.text().toLowerCase() == 'comm'){
                    var qty = $(line).find("td[id*='qty_l']");
                    var remove_attr = $(qty).attr("id").split("attr_wrapper");
                    var qty_span = $( "#readonly"+remove_attr[1] );
                    qty_span.css("color", "red");
                }
            }
        });

        /*
            End   : 21 March 2017
            Task  : - Highlight "In Stock" No In commerce to Red and Qty to Red for Commercial Material Line (Comm)
                    - Highlight "In Stock" No In commerce to Red for Bonus Material Line (Bonus).
            Page  : Order Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop  
        */

        /*
            Start : 20 March 2017
            Task  : Bonus Override Flag Should be hidden using CSS
            Page  : Order Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop  
        */
        var bonusOverride = 0;
        /* find coloumn th which had bonus override then give class rule-hide and set temp id bonusOverride */
        $("th").each(function(i, data){

            if( $( data ).children().text().toLowerCase() == "bonus overide" ){
                bonusOverride = $( data ).data("colid");
                $( data ).addClass("rule-hide");
            }

            if( bonusOverride != 0 ){
                if($(data).data("colid") == bonusOverride){
                    $(data).addClass('rule-hide');
                }
            }
            
        });

        /* find coloumn which had id bonusOverride and add class rule-hide */
        $("col").each(function(i, data){
            if(this.id == bonusOverride){
                $(this).addClass('rule-hide');
            }
        });
        /* find coloumn has id bonusOverride and add class rule-hide */
        $("td[id*='"+bonusOverride+"']").each(function(i, data){
            $(this).addClass('rule-hide');
        });

        /*
            End : 20 March 2017
            Task  : Bonus Override Flag Should be hidden using CSS
            Page  : Order Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop  
        */

        global_searchCustomer('desktop');

        /* EVENTS */
        /* custom button for add to fav */
        $('#jg-tool-addtofav, #jg-btn-addtofav').click(function(e) {
            e.preventDefault();

            $('#').click();
        });

        /* custome button for pipeline viewer */
        $('#jg-tool-pipelineviewer, #jg-btn-pipelineviewer').click(function(e) {
            e.preventDefault();

            $('#').click();
        });

        $('#btn-neworder-save').click(function(e) {
            e.preventDefault();

            $('#save').click();
        });
    }

    function global_searchCustomer(device){
        /*
            Start : 29 March 2017
            Task  : Search customer on order page
            Page  : Order Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop  
        */
        /*
            styling on search customer.
        */
        var version_id, document_id, action_id;
        console.log("Search Customer");
        /*
            Create and styling template for search customer, and create same environment with default search customer.
            Create element for result search customer.
        */

        $("body").append( $("<div id='layer_search_customer' ></div>") );
        $("#layer_search_customer").css({ "position":"fixed", "top":"0", "right":"0", "bottom":"0", "left":"0", "z-index":"99999", "background":"white", "display":"none"});
        
        if(device == 'desktop'){

            if( $("#search_customer").exists() ){
                var searchCustomer = $("#search_customer").closest(".bm-actionstrip-horiz");
                //remove last div 
                searchCustomer.closest('.column.label-left').css({"width":"70%"});
                searchCustomer.closest('.column.label-left').next().remove();
                var tableSearchCustomer = $("#search_customer").closest("table");
                var getBmOpenWindow = $( tableSearchCustomer ).attr("onclick");
                /*
                    each value getBmOpenWindow value on click,
                    execute javascript function except bmOpenWindow & bmCancelBubble
                    if function is setDocFormIds then get document_id and action_id value
                    if function is bmOpenWindow then get version_id value
                */
                $(getBmOpenWindow.replace("javascript:","").split(";")).each(function(e, data){
                    if(!(/bmOpenWindow/i.test(data)) && !(/bmCancelBubble/i.test(data))){
                      eval( data );
                    }
                    if( /setDocFormIds/i.test(data) ){
                      var valueDocForm = data.replace("setDocFormIds(","");
                      var valueDocForm = valueDocForm.replace(")","");
                      var valueDocForm = valueDocForm.split(",");
                      console.log(valueDocForm);
                      document_id = parseInt(valueDocForm[0]);
                      action_id = parseInt(valueDocForm[2]);
                    }
                    if( /bmOpenWindow/i.test(data) ){
                      var urlData = data.split(',');
                      urlData = urlData[0].replace("bmOpenWindow(").split("&");
                      $(urlData).each(function(e, dataGet){
                        if( /version_id/i.test(dataGet) ){
                          version_id = parseInt( dataGet.replace("version_id=", "") );
                        }
                      });
                    }
                });
                var parentOfSearchCustomer = $( searchCustomer ).parent();
                //hide searchCustomer 
                $( searchCustomer ).hide();
                //create element
                $( parentOfSearchCustomer ).append( "<div class='bm-actionstrip-horiz' >"+
                                                    "<table>"+
                                                    "<body>"+
                                                    "<tr>"+
                                                    "<td class='button-middle' >"+
                                                    "<div style='margin: 0px 0px 1px;' >"+
                                                    "<a class='button-text' id='show_search_customer' style='cursor:pointer;' >Search Customer</a>"+
                                                    "</div>"+
                                                    "</td>"+
                                                    "</tr>"+
                                                    "</tbody>"+
                                                    "</table>"+
                                                    "</div>"
                                                    );
                $( "#layer_search_customer" ).append( "<form name='SearchCustomer' method='post' action='/commerce/buyside/crm_browse_dialog.jsp' id='templateSearchCustomer' >"+
                                                "<input type='hidden' name='from' value='1' >"+
                                                "<input type='hidden' name='version_id' value='"+version_id+"' >"+
                                                "<input type='hidden' name='document_id' value='"+document_id+"' >"+
                                                "<input type='hidden' name='curpos' value='0' >"+
                                                "<input type='hidden' name='next_cursor' >"+
                                                "<input type='hidden' name='current_cursor' >"+
                                                "<input type='hidden' name='prev_cursor' >"+
                                                "<input type='hidden' name='order_dir' value='ASC' >"+
                                                "<input type='hidden' name='order_by' >"+
                                                "<input type='hidden' name='search' value='false' >"+
                                                "<table id='form_search_customer' style='width:100%;border-spacing: 0px!important;' >"+
                                                "<thead>"+
                                                "<tr class='bgcolor-form' >"+
                                                    "<td class='view-header' colspan='5' style='text-align:center;padding:15px;background-color:#00575d;color:#fff;border-bottom: 0px!important;' >Search for Customer</td>"+
                                                "</tr>"+
                                                "</thead>"+
                                                "<tbody style='background-color:#0C727A;' >"+
                                                "<tr>"+
                                                "<td>"+
                                                "<table style='width:100%;margin-top:10px' >"+
                                                "<tbody style='background-color:#0C727A;' >"+
                                                "<tr>"+
                                                "<td>"+
                                                "<table style='margin-left:200px; border-spacing: 5px;' >"+
                                                "<tr class='bgcolor-form' style='background-color:#0C727A;'> "+
                                                  "<td class='form-label' style='color:#fff;' >"+
                                                    "Company Name:"+
                                                  "</td>"+
                                                  "<td class='form-input'>"+
                                                    "<input style='width:300px;border-radius: 5px;' type='text' name='_company_name~0' class='form-input customer-search' size='20' maxlength='128' value='' ></td>"+
                                                "</tr>"+
                                                "<tr class='bgcolor-form' style='background-color:#0C727A;'> "+
                                                  "<td class='form-label' style='color:#fff;' >"+
                                                    "Customer Ship To Id:"+
                                                  "</td>"+
                                                  "<td class='form-input'>"+
                                                    "<input style='width:300px;border-radius: 5px;' type='text' name='_customer_id~0' class='form-input customer-search' size='20' maxlength='128' value='' ></td>"+
                                                "</tr>"+
                                                "<tr class='bgcolor-form' style='background-color:#0C727A;'> "+
                                                  "<td class='form-label' style='color:#fff;' >"+
                                                    "Customer Sold To Id:"+
                                                  "</td>"+
                                                  "<td class='form-input'>"+
                                                    "<input style='width:300px;border-radius: 5px;' type='text' name='_Customer Sold To Id~0' class='form-input customer-search' size='20' maxlength='128' value='' ></td>"+
                                                "</tr>"+
                                                "</table>"+
                                                "</td>"+
                                                "<td style='vertical-align:top;' >"+
                                                "<table style='margin-right:200px; border-spacing: 5px;' >"+
                                                "<tr class='bgcolor-form' style='background-color:#0C727A;' > "+
                                                  "<td class='form-label' style='color:#fff;' >"+
                                                    "Ship To Postal Code:"+
                                                  "</td>"+
                                                  "<td class='form-input' >"+
                                                    "<input style='width:300px;border-radius: 5px;' type='text' name='_Ship To Postal Code~0' class='form-input customer-search' size='20' maxlength='128' value='' ></td>"+
                                                "</tr>"+
                                                "<tr class='bgcolor-form' style='background-color:#0C727A;' > "+
                                                  "<td class='form-label' style='color:#fff;' >"+
                                                    "Ship To Phone:"+
                                                  "</td>"+
                                                  "<td class='form-input'>"+
                                                    "<input style='width:300px;border-radius: 5px;' type='text' name='_Ship To Phone~0' class='form-input customer-search' size='20' maxlength='128' value='' ></td>"+
                                                "</tr>"+
                                                "</table>"+
                                                "</td>"+
                                                "</tr>"+
                                                "</tbody>"+
                                                "</table>"+
                                                "</td>"+
                                                "</tr>"+
                                                "</tbody>"+
                                                "</table>"+
                                                "<div style='background-color:#0C727A!important;width:100%;' >"+
                                                "<div class='bm-actionstrip-horiz' style='padding:10px;margin:0px auto!important;width:240px;'  >"+
                                                "<table style='margin-right: 15px!important;' >"+
                                                "<body>"+
                                                "<tr>"+
                                                "<td class='button-middle' style='background-color: #B8CA41!important;background-image: none!important;border-radius:20px!important;width:90px;color:#0C727A!important;' >"+
                                                "<div style='margin: 0px 0px 1px;' >"+
                                                "<a class='button-text' id='search' style='cursor:pointer;' >Search</a>"+
                                                "</div>"+
                                                "</td>"+
                                                "</tr>"+
                                                "</tbody>"+
                                                "</table>"+
                                                "<table>"+
                                                "<body>"+
                                                "<tr>"+
                                                "<td class='button-middle' style='background-color: #0C727A!important;background-image: none!important;border-radius: 20px!important;border: 1px solid #fff;width:90px;' >"+
                                                "<div style='margin: 0px 0px 1px;' >"+
                                                "<a class='button-text' id='close' style='cursor:pointer;color:#fff!important;' >Close</a>"+
                                                "</div>"+
                                                "</td>"+
                                                "</tr>"+
                                                "</tbody>"+
                                                "</table>"+
                                                "</div>"+
                                                "</div>"+
                                                "</form>"+
                                                "<div id='resultSearchCustomer'></div>"+
                                                "<div id='loadingCustomer' style='width:10%;margin:0px auto;display:none;' >"+
                                                "<img src='"+rootFolder+"/image/images/loading-icon.gif' >"+
                                                "</div>" );
            
            }

        }else if(device == 'mobile'){
            version_id = parseInt( $("#version_id").val() );
            document_id = parseInt( $("#document_id").val() );
            /*var originalCustomerBtn = $(".action-type-browse").parent();
            var customCustomerBtn = "<div class='action-strip' >"+
                                        "<button id='show_search_customer' class='action action-type-browse ui-btn ui-btn-inline ui-shadow ui-corner-all'>"+
                                            "Search Customer"+
                                        "</button>"+
                                    "</div>";
            $(customCustomerBtn).insertBefore( originalCustomerBtn );
            $( originalCustomerBtn ).hide();*/
            if( $("#layer_search_customer").children().length == 0 ){
                $( "#layer_search_customer" ).css("background-color","#0C727A");
                $( "#layer_search_customer" ).append( 
                                                "<div id='formSearchCustomer'  >"+
                                                    "<div id='headerSearchCustomer' style='background-color:#00575D;color:#fff;width:100%;height:25px;font-size:15px;text-align:center;padding-top:5px;' >"+
                                                    "Search - Customer"+
                                                    "</div>"+
                                                "</div>"+
                                                "<div id='body_form_cust' >"+
                                                "<p style='color:#AFC008;margin:0px 0px 0px 20px;' >Search For Customers</p><hr style='width:96%;' />"+
                                                "<div id='form_search_customer' style='height: 51px;overflow: scroll;padding: 0px 0px 0px 10px;' >"+
                                                "<form name='SearchCustomer' style='width:6000px;' >"+
                                                "<input type='hidden' name='from' value='1' >"+
                                                "<input type='hidden' name='version_id' value='"+version_id+"' >"+
                                                "<input type='hidden' name='document_id' value='"+document_id+"' >"+
                                                "<input type='hidden' name='curpos' value='0' >"+
                                                "<input type='hidden' name='next_cursor' >"+
                                                "<input type='hidden' name='current_cursor' >"+
                                                "<input type='hidden' name='prev_cursor' >"+
                                                "<input type='hidden' name='order_dir' value='ASC' >"+
                                                "<input type='hidden' name='order_by' >"+
                                                "<input type='hidden' name='search' value='false' >"+
                                                "<input class='form-search-cust' placeholder='Customer Name' />"+
                                                "<input class='form-search-cust' placeholder='Customer Ship To Id' />"+
                                                "<input class='form-search-cust' placeholder='Customer Sold To Id' />"+
                                                "<input class='form-search-cust' placeholder='Address Line 1' />"+
                                                "<input class='form-search-cust' placeholder='Address Line 2' />"+
                                                "<input class='form-search-cust' placeholder='Address Line 3' />"+
                                                "<input class='form-search-cust' placeholder='Address Line 4' />"+
                                                "<input class='form-search-cust' placeholder='Postal Code' />"+
                                                "<input class='form-search-cust' placeholder='Phone' />"+
                                                "</form>"+
                                                "</div>"+
                                                "<div style='width:100%;margin-left:20px;margin-top:5px;' >"+
                                                "<button id='prev_mobile' style='float:left;width:90px;padding:5px;' >Previous</button>"+
                                                "<button id='search' style='float:none;margin-left:280px;width:90px;padding:5px;' >Search</button>"+
                                                "<button id='close' style='margin-left:50px;width:90px;padding:5px;' >Close</button>"+
                                                "<button id='next_mobile' style='float:right;width:90px;padding:5px;margin-right:30px;' >Next</button>"+
                                                "</div>"+
                                                "</div>"+
                                                "<div id='resultSearchCustomer' style='overflow:scroll;height:370px;' ></div>"+
                                                "<div id='loadingCustomer' style='width:10%;margin:0px auto;display:none;' >"+
                                                "<img src='"+rootFolder+"/image/images/loading-icon.gif' >"+
                                                "</div>" 
                                                );
            }

        }
        
        /*
            function get_detail for get detail of customer from page detail customer.
        */
        function get_detail(url_customer){
          console.log(url_customer);
          url_customer = url_customer.replace("'","");
          $.ajax({
            url: url_customer,
            data: $("form[name='bmForm']").serialize() + "&token=" + _BM_CSRF_TOKEN,
            success: function(result){
              console.log(result);
            },error: function(){
              console.log("failed get data");
            }
          })
        }

        /*
            function submit for get result of search customer
            when search customer then environment get from searchCustomer
            when search customer for pagging and sorting then environment get from bmForm
            for all type set variable token for security
        */
        function submit(form) {
          $("#loadingCustomer").show();
          $("#resultSearchCustomer").hide();
          var dataSearchCustomer = $("form[name='"+form+"']").serialize() + "&token=" + _BM_CSRF_TOKEN;
          $.ajax({
             url: "/commerce/buyside/crm_browse_dialog.jsp",
             /*beforeSend: function(xhr) { 
              xhr.setRequestHeader("Authorization", "Basic " + btoa("username:password")); 
             },*/
             type: 'GET',
             data: dataSearchCustomer,
             // dataType: 'html',
             // contentType: 'text/plain',
             // processData: false,
             // async: false,
             success: function (data) {
              // alert(JSON.stringify(data));
              // console.log( JSON.stringify(data) );
              $("#resultSearchCustomer").html( $( data ).find("form[name='bmForm']") );
              $("#loadingCustomer").hide();
              $("#resultSearchCustomer").show();
              /* override function next_iter_link and previous_iter_link */
              $("#next_iter_link").attr("href", "#");
              $("#previous_iter_link").attr("href", "#");

              /* custom listen next_iter_link then call function submit */
              $("#next_iter_link").on("click", function nextSearch(){
                  if(true)
                  {
                     bmForm.curpos.value = parseInt(bmForm.curpos.value)+10;
                     bmForm.current_cursor.value = bmForm.next_cursor.value;
                     submit('bmForm'); 
                  }
                  else{
                    alert("There are no more records to display.");
                    return;
                  }
               })

              /* custom listen previous_iter_link then call function submit */
              $("#previous_iter_link").on("click", function(){
                  if(true)
                  {
                    bmForm.curpos.value = bmForm.curpos.value - 10;
                    bmForm.current_cursor.value = bmForm.prev_cursor.value;
                    submit('bmForm'); 
                  }
                  else{
                    alert("There are no previous records to display");
                    return;
                  }
              });

              /*
                cant select table parent of menu bottom,
                just pick parent spesific and remove it.
              */
              var bottomMenu = $("#search_again").parent().parent().parent().parent().parent().parent().parent().parent().parent();
              var contentTable = $( bottomMenu ).prev().prev().prev();

              //change text of Accounts to Customer
              $( $(".top-bar")[0] ).text("Customers");

              // remove header all addresses.
              var header = $( $('#resultSearchCustomer').children().children('table')[1] ).children().children('tr.view-header').children()[1];
              $( $('#resultSearchCustomer').children().children('table')[1] ).attr("cellspacing","0");
              $( $('#resultSearchCustomer').children().children('table')[1] ).attr("cellpadding","3");
              $( header ).remove();

              // add styling for background color when has class bgcolor-list-even
              $(".bgcolor-list-even").each(function(e, dataEven){
                $( dataEven ).css({"background-color":"lightgrey"});
              })

              // add styling for header result table.
              $($( $('#resultSearchCustomer').children().children('table')[1] ).find('td.view-header')).each(function(e, dataHeader){
                $( dataHeader ).css({"background-color":"#0C727A!important", "color":"#fff", "padding":"10px 0px 10px 0px"});
              });

              // each content of row table
              $( contentTable ).find('tr').each(function(e, dataContent){
                //remove all href in content
                $(dataContent).find('a').each(function(i, data_href){
                  if( typeof( $( dataContent ).find("input[name='_customer_id']").val() ) != 'undefined' ){
                    
                    // when coloumn is view remove it
                    if( $( data_href ).text().toLowerCase() == 'view' ){
                        $( data_href ).parent().remove();
                    }else{
                    // else just remove link and display only text
                        $( data_href ).replaceWith( $( data_href ).text() );
                    }

                    /*var link_data = $( data_href ).attr("href");
                        link_data = link_data.replace("javascript:bmSubmitForm","");
                        link_data = link_data.replace("(","");
                        link_data = link_data.replace(")","");
                        link_data = link_data.split(",");
                        link_data = link_data[0];

                        $( data_href ).attr("href","#");
                        $( data_href ).on("click", function(){
                          get_detail( link_data );
                        });*/
                  }else{
                    $( data_href ).css({"background-color":"#0C727A!important", "color":"#fff", "padding": "10px 0px 10px 0px"});
                  }
                });

                //implementation select customer on row
                $( dataContent ).find("input[name='populate']").each(function(i, dataRadio){
                  var button = "<a href='#' >Select</a>";
                  $(dataRadio).replaceWith($(button).on("click", function(e){
                                e.preventDefault();
                                var customer_id = parseInt($( dataContent ).find("input[name='_customer_id']").val());
                                
                                save(customer_id);
                              }));
                });

              });

              // remove bottom Menu for default content.
              $( bottomMenu ).remove();
            },
              error: function(){
                /* if system can't get result of customer */
               $("#loadingCustomer").hide();
               $("#resultSearchCustomer").show();
               console.log("Cannot get data");
             }
            });
        }

        /* this function to set variable on SearchCustomer and call function submit */
        function doSearch(){
          $("#prev_mobile").hide();
          $("#next_mobile").hide();
          document.SearchCustomer.search.value = true;
          document.SearchCustomer.curpos.value=0;
          submit('SearchCustomer');
        }

        /* this function custom for save selected customer */

        function save(_customer_id)
        {       
          close_customer_search();
          if(window.mobileSaveBrowseData){
              window.mobileSaveBrowseData(_customer_id, 36313484);
          } else {
              win = null;
              try {
                Bm.setAttrVal('_customer_id', _customer_id);
              } catch(e) {
                console.log(e);
              }     
              
              setDocFormIds(document_id, window.document.bmDocForm.document_number.value, 36313484);
              bmSubmitForm('/commerce/buyside/document.jsp', window.document.bmDocForm, bmValidateForm, 'performAction');
          }
        }  //end of save(_customer_id) method


        /* this function customer for sorting result customer search. */
        function search(form, orderField){
    
            form.curpos.value=0;
          
          var oldOrderBy = form.order_by.value;
          form.order_by.value=orderField;
          var dir = form.order_dir;
              if(oldOrderBy == orderField){
                if(dir.value=='ASC') dir.value='DESC';
                else dir.value='ASC';
              }else{
            dir.value='ASC';
          }
              submit('bmForm');
        } 

        /* listen if form customer search has pressed enter by user then call function doSearch */
        $(".customer-search, .form-search-cust").keyup(function(e){
            if(e.keyCode == 13){
                $("#form_search_customer").slideUp();
                doSearch();
            }
        })

        /*function submitOnReturnKey(e) {
          var charCode;
          if (window.event) charCode = window.event.keyCode;
          else if (e) charCode = e.which;
          else return true;

            if (charCode == 13) {
            doSearch();
          }
        }*/

        /* this function for show search customer and give background color and hide scroll on window */

        $("#show_search_customer").on("click", function(){
            $("#layer_search_customer").show();
            $("body").css({"overflow":"hidden"});
            if( device == 'mobile' ){
                $("#form_search_customer :first").focus();
            }
        });

        /* this function give animation for form search customer slideDown for showing form, and slideup for hide form and call function doSearch */
        $("#search").on("click", function(){
            if( $("#form_search_customer").css("display") == "none" ){
                $("#form_search_customer").slideDown();
                $("#prev_mobile").show();
                $("#next_mobile").show();
            }else{
                $("#form_search_customer").slideUp();
                doSearch();
            }
        });

        /* custom function to reset all value, hide element and show srolling in window */
        function close_customer_search(){
          console.log("close search customer")
          $("form[name='SearchCustomer']").find('input.form-input').each(function(e, data){
            $( data ).val("");
          })
          $("#resultSearchCustomer").html('');
          $("#layer_search_customer").hide();
          $("body").css({"overflow":"scroll"});
        }

        /* if user click close in customer search then call function close_customer_search */
        $("#close").on("click", function(){
          close_customer_search();
        });

        /* if page is formaction=create then trigger auto open search customer */
        if( window.location.href.split("?").length > 1){
            if( /formaction=create/i.test(window.location.href.split("?")[1]) ){
                $("#layer_search_customer").show();
                $("body").css({"overflow":"hidden"});
                if( device == 'mobile' ){
                    $("#form_search_customer :first").focus();
                }
            }
        }

        /*
            End   : 29 March 2017
            Task  : Search customer on order page
            Page  : Order Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop  
        */

        /*  Start   : 14 May 2017
            Task  : Search customer on mobile page
            Page  : Order Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Mobile
         */

         /* this function for moving next elemet focus input on mobile device */
         var current_position = 0;
         $("#next_mobile").on("click", function(){
            current_position += 1;
            console.log( current_position );
            $($("#form_search_customer").parent()).animate({
             scrollLeft: current_position*640
            }, 500);
            $( $("#form_search_customer").children()[ current_position ] ).focus();
         });

         /* this function for moving previous elemet focus input on mobile device */
         $("#prev_mobile").on("click", function(){
            if( current_position >= 0 ){
                current_position -= 1;
            }
            console.log( current_position );
            $($("#form_search_customer").parent()).animate({
             scrollLeft: current_position*640
            }, 500);
            $( $("#form_search_customer").children()[ current_position ] ).focus();
         });
         //if user click input
         $(".form-search-cust").on("click", function(){
            current_position = $(this).index();
            $($("#form_search_customer").parent()).animate({
             scrollLeft: current_position*640
            }, 500);
         });

         /* End   : 14 May 2017
            Task  : Search customer on mobile page
            Page  : Order Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Mobile
         */

    }

    function transform_modelconfig() {
        /* add class jg-page-cartpage to body */
        $('body').addClass('jg-page-cartpage');
        /*$('#jg-topbar-title').text("Shopping Cart");
        $('title').text("Shopping Cart");*/

        // console.log($('.cell-promotion').html());

        /* form has class configuration-form move to element has class jg-box-maincontent */
        $('form[class=configuration-form]').appendTo('.jg-box-maincontent');

        $('#config-header').hide();

        var flowimg = $("<div class='column-layout clearfix '><div class='column label-left last' style='width:100%'><div class='form-item clearfix null' id='attr_wrapper_1_visualWorkflow'><label class='form-label' for='visualWorkflow' style='width: 100px;visibility:hidden'><span style='padding-right: 5px'>Visual Workflow</span></label><div class='form-element field-wrapper' id='field_wrapper_1_visualWorkflow' style='padding-left: 0px;'><div id='readonly_1_visualWorkflow'><img width='70%' src='"+rootFolder+"/image/images/vi_shoppping_cart_ready_active.png' alt='Broken Visual Workflow'></div><div id='msg_1_visualWorkflow' class='error-hover' data-action-message='' message=''></div></div></div></div></div>")
            .insertBefore('.page-tabs');

        // toolbar
        /* add button Update */
        $('.jg-list-tool')
            .append($("<li class='jg-item-tool'>")
                .append($("<button id='btn-cart-update' class='jg-btn jg-btn-icon cart-update'></span>Update</button>"))
            )

        if ($('#start_over').length == 1) {
            /* add button Start over when add material page has element start_over */
            /* add button add to order when add material page has element start over */
            $('.jg-list-tool')
                .append($("<li class='jg-item-tool'>")
                    .append($("<button id='btn-cart-startover' class='jg-btn jg-btn-icon cart-startover'>Start Over</button>"))
                )
                .append($("<li class='jg-item-tool'>")
                    .append($("<button id='btn-cart-addtoorder' class='jg-btn jg-btn-icon cart-addtoorder'>Add to Order</button>"))
                );
        }
        else if ($('#save').length == 1) {
            /* add button Save when add material page has element save */
            $('.jg-list-tool')
                .append($("<li class='jg-item-tool'>")
                    .append($("<button id='btn-cart-save' class='jg-btn jg-btn-icon cart-save'>Save</button>"))
                );
        }

        /* add button Cancel Shopping */
        $('.jg-list-tool').append($("<li class='jg-item-tool'>")
            .append($("<button id='btn-cart-cancelshopping' class='jg-btn jg-btn-icon cart-cancelshopping'>Cancel Shopping</button>"))
        );

        /* Start : 17 March 2017 */
        /* Task  : Change header of override price to 2 lines display */
        /* Page  : Add Material Page
           File Location : $BASE_PATH$/image/javascript/js-ezrx.js
           Layout : Desktop  

           This function override element of attribute-overidePrice with <br/> to make 2 line display.

        */
        $("#attribute-overridePrice").children('.attribute-label').html( $("#attribute-overridePrice").children('.attribute-label').text().replace(" ","<br/>") );
        
        /* End   : 17 March 2017 */
        /* Task  : Change header of override price to 2 lines display */
        /* 
           Page  : Add Material Page
           File Location : $BASE_PATH$/image/javascript/js-ezrx.js
           Layout : Desktop  
        */

        /* Start : 18 March 2017 */
        /* Task  : Change width of material code */
        /* Page  : Add Material Page
           File Location : $BASE_PATH$/image/javascript/js-ezrx.js
           Layout : Desktop  

           this function override styling width of input element
        */
        $('td.cell-material').children('.attribute-field-container').children('input').css("width","75px");
        /* End   : 18 March 2017 */
        /* Task  : Change width of material code */
        /* Page  : Add Material Page
           File Location : $BASE_PATH$/image/javascript/js-ezrx.js
           Layout : Desktop  
        */

        /* Start : 17 March 2017 */
        /* Task  : Change header of Material Description to 2 lines display */
        /* Page  : Add Material Page
           File Location : $BASE_PATH$/image/javascript/js-ezrx.js
           Layout : Desktop  

           this function override element of attibute-materialDescription with <br> to make 2 line display
        */
        $("#attribute-materialDescription").children('.attribute-label').html( $("#attribute-materialDescription").children('.attribute-label').text().replace(" ","<br/>") );
        /* Start : 17 March 2017 */
        /* Task  : Change header of override price to 2 lines display */
        /* Page  : Add Material Page
           File Location : $BASE_PATH$/image/javascript/js-ezrx.js
           Layout : Desktop  
        */

        /* Start : 17 March 2017 */
        /* Task  : hide icon for first row on additional bonus table */
        /* Page  : Add Material Page
           File Location : $BASE_PATH$/image/javascript/js-ezrx.js
           Layout : Desktop  
        */
        $("#additionalMaterialArrayset tbody tr:first").children('.array-remove-cell').children('.array-remove').hide();
        /*
            needs to hide delete button for the first row of table additional bonus.
            first we need to find id additionalMaterialArrayset and then select tbody and then select the :first of tr.
            and then find children of this selector who have class array-remove-cell,
            and then find element who have class array-remove and then hide it.
        */
        /* End  : 17 March 2017 */
        /* Task : hide icon for first row on additional bonus table */
        /* Page  : Add Material Page
           File Location : $BASE_PATH$/image/javascript/js-ezrx.js
           Layout : Desktop  
        */

        /*
            Start : 6 April 2017
            Task  : align customer information
            Page  : Add Material Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop  

            override styling on customer information
        */
        var parentOfCustomerInfo = $( "#attribute-duplicateMaterialsPresentMessageHTML" );
        $( parentOfCustomerInfo ).next().css({"margin-top":"20px"});
        var customerSoldtoID = $( $( parentOfCustomerInfo ).next().children()[0] ).children()[1];
        var row2 = $( parentOfCustomerInfo ).next().children()[1];

        $( customerSoldtoID ).appendTo( $(row2) );

        $( row2 ).children().each( function(e, customerData){
            $( customerData ).css({"width":"30%"});
            $( customerData ).find('.attribute-label-container').css({"width":"100%"}).children('.attribute-label').css("cssText", "color: #00575d!important");
            $( customerData ).find('.attribute-field-container').css({"width":"100%"});
        });

        /*
            End   : 6 April 2017
            Task  : align customer information
            Page  : Add Material Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop  
        */

        /*
            Start : 6 April 2017
            Task  : Auto scroll to result search material
            Page  : Add Material Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop  

            this function trigger auto scroll to materal result when material Search text or material desc searcg text is not null
        */

        var materialSearchText = $("#material_s").val();
        var materialDescSearchText = $("#materialDescription_s").val();

        if( materialSearchText.length > 0 || materialDescSearchText.length > 0 ){
            console.log( $("#materialResults").offset().top )
            $('html, body').animate({
                scrollTop: $("#materialResults").offset().top-250
            }, 2000);
        }
            
        /*
            End   : 6 April 2017
            Task  : Auto scroll to result search material
            Page  : Add Material Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop  
        */

        /*
            Start : 5 April 2017
            Task  : replace style width for handle low resolution
            Page  : Add Material Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop  

            override styling width for every row in child of search_html
        */

        $("#search_html").closest('.row').children().each(function(e, dataColumn){
            $(dataColumn).css({"width":"30%"});
        });

        /*
            End   : 5 April 2017
            Task  : replace style width for handle low resolution
            Page  : Add Material Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop  
        */

        /*
            Start : 4 April 2017
            Task : remove button delete
            Page  : Add Material Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop  

            this functions earch row type of bonus then set last coloumn element of delete button.
        */
        $(".cell-type").each(function(e, dataType){
            if($(dataType).text().toLowerCase() == "bonus" ){
                $(dataType).parent().find("td:last").children().hide();
            }
        });
        /*
            End : 4 April 2017
            Task : remove button delete
            Page  : Add Material Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop  
        */

        /*
            Start : 23 March 2017
            Task  : hide + button in additional bonus table.
            Page  : Add Material Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop  

            this function hide button array-add on additional bonus tabel.
        */
        $('#additionalMaterialArrayset thead tr th:first').children('a.array-add').hide();    
        /*
            End   : 23 March 2017
            Task  : hide + button in additional bonus table.
            Page  : Add Material Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop  
        */

        // tweak originals
        $('#sticky-actions').hide();
        $('#tab-material').closest('ul').hide();
        /* change width override price */
        /* Start : 17 March 2017 */
        /* Task  : Change header of override price to 2 lines display */
        /* Page  : Add Material Page
           File Location : $BASE_PATH$/image/javascript/js-ezrx.js
           Layout : Desktop  

           override styling display.
        */
        $("td.cell-overridePrice").children().children('input').each(function(){
            $(this).css("width","60px");
        });
        /* End   : 17 March 2017 */
        /* Task  : Change header of override price to 2 lines display */
        /* Page  : Add Material Page
           File Location : $BASE_PATH$/image/javascript/js-ezrx.js
           Layout : Desktop  
        */
        
        /*
            Task  : Make material description long text without scrolling.
            Page  : Add Material Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop  
        */
        var MaterialSize = $("#materialArrayset").data("size");
        var oldMaterialSize = 0;
        setInterval(function(){
            oldMaterialSize = $("#materialArrayset").data("size");
            if(MaterialSize != oldMaterialSize){
                MaterialSize = $("#materialArrayset").data("size");
                $("td.cell-overridePrice").children().children('input').each(function(){
                    $(this).css("width","110px");
                });     

                $("td.cell-materialDescription").children().children('input').each(function(){
                    var id_input = this.id;
                    textbox = $(document.createElement('textarea')).attr({
                        id : "area_"+id_input,
                        name : "area_"+this.name,
                        value : $(this).val(),
                        style : ($(this).attr("style") != 'undefined')? $(this).attr("style") : '',
                        "class" : $(this).attr("class")+" textarea-listen ",
                        cols : 25
                    });
                    // $(this).replaceWith(textbox);
                    $(this).hide();
                    $(this).parent().parent().append(textbox);
                    /* Start : 17 March 2017 */
                    /* Task  : Reduce height of material description textarea */
                    $("#area_"+id_input).css("height", (document.getElementById("area_"+id_input).scrollHeight)+"px");
                    /* End   : 17 March 2017 */
                    /* Task  : Reduce height of material description textarea */
                });
            }
        }, 50);
        /* change input in material description to textarea */
        $("td.cell-materialDescription").children().children('input').each(function(){
            var id_input = this.id;
            textbox = $(document.createElement('textarea')).attr({
                id : "area_"+id_input,
                name : "area_"+this.name,
                value : $(this).val(),
                style : ($(this).attr("style") != 'undefined')? $(this).attr("style") : '',
                "class" : $(this).attr("class")+" textarea-listen ",
                cols : 25
            });
            // $(this).replaceWith(textbox);
            $(this).hide();
            $(this).parent().parent().append(textbox);
            /* Start : 17 March 2017 */
            /* Task  : Reduce height of material description textarea */
            /* Page  : Add Material Page
               File Location : $BASE_PATH$/image/javascript/js-ezrx.js
               Layout : Desktop  
            */
            $("#area_"+id_input).css("height", (document.getElementById("area_"+id_input).scrollHeight)+"px");
            /* End   : 17 March 2017 */
            /* Task  : Reduce height of material description textarea */
            /* Page  : Add Material Page
               File Location : $BASE_PATH$/image/javascript/js-ezrx.js
               Layout : Desktop  
            */
        });
        $(".textarea-listen").keydown(function(){
            this.style.height = "1px";
            this.style.height = (this.scrollHeight)+"px";
            $("#"+this.id.replace("area_","")).val( $(this).val() );
        });

        $("#tab-material-content").css({"width":"98%"});

        /* Task  : Make material description long text without scrolling. */
        /* Page  : Add Material Page
           File Location : $BASE_PATH$/image/javascript/js-ezrx.js
           Layout : Desktop  
        */

        /*
            Start : 10 March 2017
            Task  : Make content Fav Freq Req on right side, and give animation for show and hide.
            Page  : Add Material Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop  
        */
        var tabelMaterial = $("#tab-material-content").children('.grid.clearfix').children().children('.column-0');
        var tabelFavFreqReq = $("#tab-material-content").children('.grid.clearfix').children().children('.column-1');

        /* total price on top table material */
        var rowGrid = $( tabelMaterial ).children().children('.grid.clearfix');
        var totalPriceTop = rowGrid[0];
        $( totalPriceTop ).css('marginBottom', '10px');
        // $('#grid-36595617').css('marginBottom', '10px');

        $('#PastOrders, #CurrentCustFav').parent().addClass('jg-box-table small');
        $('.tab-content button').addClass('jg-btn');
        $('.attribute-label[for=principalCode]').parent().css('marginTop', '5px');
        $('.attribute-label[for=showPrincipalFavorites]').parent().css('marginTop', '5px');
        /* Toolbar on bottom table. */
        /*
            Start : 22 March 2017
            Task  : Remove all the icons in top row
            Page  : Add Material Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop  
        */
        $("#materialArrayset").after( $(".jg-box-toolbar") ); //for bottom
        /*
            End   : 22 March 2017
            Task  : Remove all the icons in top row
            Page  : Add Material Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop  
        */
        /* override styling width 100% */
        $( tabelMaterial ).css({ "width": "100%" });
        // $("#grid-36397039").children('.row').children('.column-0').css({width: "100%"});
        /* Right Panel Content */
        /* add element class column into new element class jg-inner-column */
        $( totalPriceTop ).closest('.column').wrapInner($("<div class='jg-inner-column'>"));
        // $('#grid-36595617').closest('.column').wrapInner($("<div class='jg-inner-column'>"));
        /* override styling margin of tabel Fav Freq and Req */
        $( tabelFavFreqReq ).css({"margin-top": "8px"});
        // $('#grid-36561838').closest('.column').css('marginTop', '8px');
        //transisi right side
        /* override min height of material table */
        $('.jg-box-maincontent').css({"overflow": "hidden", "min-height": "800px"});

        /* this function give new element img to each row tabel fav freq dan req */
        var listRightSideMenu = $( tabelFavFreqReq ).children();
        listRightSideMenu.each(function(i, data){
            var iconRightSideBar = "";
            $( data ).addClass("collapsed");
            if(i == 0){
                //frequently
                // $( data ).addClass("collapsed");
                iconRightSideBar = "<img src='"+rootFolder+"/image/images/rsm-frequently.png' >"
            }else if( i == 1 ){
                //recomended
                iconRightSideBar = "<img src='"+rootFolder+"/image/images/rsm-recommended.png' >"
            }else if( i == 2 ){
                //favourite
                iconRightSideBar = "<img src='"+rootFolder+"/image/images/rsm-favourite.png' >"
            }
            $( data ).children('.group-content')
                           .css('margin','0px')
                           .children('.group-header').children('span').prepend( iconRightSideBar );
        });
        // $('#grid-36561838').addClass("collapsed");

        // var rightPanel = $('#grid-36397039').children('.row').children('.column-1');
        /*$('#grid-36561838').children('.group-content')
                           .css('margin','0px')
                           .children('.group-header').children('span').prepend("<img src='"+rootFolder+"/image/images/rsm-frequently.png' >");
        $('#grid-36565572').children('.group-content')
                           .css('margin','0px')
                           .children('.group-header').children('span').prepend("<img src='"+rootFolder+"/image/images/rsm-recommended.png' >");
        $('#grid-36701507').children('.group-content')
                           .css('margin','0px')
                           .children('.group-header').children('span').prepend("<img src='"+rootFolder+"/image/images/rsm-favourite.png' >");*/
        /* set value of right position on different display */
        var mainContentWidth = $(".jg-box-maincontent").width();
        var rightValue = -(mainContentWidth/4);

        /* override style of table Fav Freq and Req */
        $( tabelFavFreqReq ).css({'position': 'fixed', 'right': rightValue+'px', 'height': '800px'});
        // $(rightPanel).css({'position': 'absolute', 'right': rightValue+'px', 'height': '800px'});

        /* Show or Hide right panel content */
        $( tabelFavFreqReq ).mouseenter(
            function(e){
                $( tabelFavFreqReq ).stop().animate({right: '0px'}, 2000);

                listRightSideMenu.each( function(i, data){
                    //mouse enter
                    $( data ).mouseenter(function(e){
                        if( $(data).hasClass("collapsed") ){
                            $( data ).removeClass("collapsed");
                        }else{
                            $( data ).addClass("collapsed");
                            $( data ).removeClass("collapsed");
                        }
                    });
                    //mouse leave
                    $( data ).mouseleave(function(e){
                        $( data ).addClass("collapsed");
                    });
                } );

                /*$('#grid-36561838').mouseenter(function(e){
                    $('#grid-36561838').addClass("collapsed");
                    $('#grid-36561838').removeClass("collapsed");
                });
                $('#grid-36565572').mouseenter(function(e){
                    $('#group-36565572').addClass("collapsed");
                    $('#group-36565572').removeClass("collapsed");
                });
                $('#grid-36701507').mouseenter(function(e){
                    $('#group-36701507').addClass("collapsed");
                    $('#group-36701507').removeClass("collapsed");
                });
                $('#grid-36561838').mouseleave(function(e){
                    $('#grid-36561838').addClass("collapsed");
                });
                $('#grid-36565572').mouseleave(function(e){
                    $('#group-36565572').addClass("collapsed");
                });
                $('#grid-36701507').mouseleave(function(e){
                    $('#group-36701507').addClass("collapsed");
                });*/
            }
        );

        /* this function listen if mouse leave table fav freq and req */
        $( tabelFavFreqReq ).mouseleave(
            function(e){
                listRightSideMenu.each( function(i, data){
                    $( data ).addClass("collapsed");
                } );
                /*$('#grid-365618381').addClass("collapsed");
                $('#group-36565572').addClass("collapsed");
                $('#group-36701507').addClass("collapsed");*/
                $( tabelFavFreqReq ).stop().animate({right: rightValue+'px'}, 2000);
            }
        );

        /*
            End   : 10 March 2017
            Task  : Make content Fav Freq Req on right side, and give animation for show and hide.
            Page  : Add Material Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop  
        */

        /*  Start : 1 April 2017
            Task  : Change style of content material search
            Page  : Add Material Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop  

            this function override styling and re-position button on search material.
            and add custom button next and previous on search material.
        */
        // allign search button
        $("#search_html").parents('.attribute-inner').css({"padding": "0px"});
        // remove add material flag
        $("#attribute-previous_res").hide();
        $("#attribute-next_res").hide();
        $("#attribute-addMaterialsFlag").hide();
        //add bottom menu
        $("<div id='menu_bottom' width='100%' ></div>").insertAfter("#materialResults")
        //move to bottom menu
        // $("#menu_bottom").append($("<div id='area_add' style='float:left;' ></div>"));
        /* add bottom menu area */
        $("#menu_bottom").append($("<div id='area_paging' style='float:right;width:400px;' ></div>"));
        /* styling add material button */
        $("#attribute-addMaterials").css({"float":"left"});
        /* styling add material button */
        $("#addMaterials").children('p').children().css("width","100px");
        /* mobing add material button on area paging */
        $("#area_paging").append($("#attribute-addMaterials"));
        /* create custom previous and next button and append after add material */
        $("#area_paging").append( $('<div class="attribute-inner clearfix" style="float:left;padding-left:0px;" ><div class="attribute-label-container"></div><div class="attribute-field-container"><div class="unreset read-only-html" id="prev_custom"><p><button class="jg-btn">Previous</button></p></div></div></div>') )
                         .append( $('<div class="attribute-inner clearfix" style="float:left;padding-left:0px;" ><div class="attribute-label-container"></div><div class="attribute-field-container"><div class="unreset read-only-html" id="next_custom" ><p><button class="jg-btn" style="width:100px;" >Next</button></p></div></div></div>') );
        /* trigger previous button to original button click */
        $("#prev_custom").on("click", function(){
            $("#previous_res_true").click();
        });

        /* trigger next button to original button click */
        $("#next_custom").on("click", function(){
            $("#next_res_true").click();
        });


        /*  End   : 1 April 2017
            Task  : Change style of content material search
            Page  : Add Material Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop  
        */

        /* Events */

        /* Start : 18 March 2017 */
        /* Task  : When button array-add clicked, it trigger update button too */
        /* Page  : Add Material Page
           File Location : $BASE_PATH$/image/javascript/js-ezrx.js
           Layout : Desktop  

           this function listen array-add in tabel material, triggered update function.
        */
        $('.array-add').bind('click', function(e){
            $(".textarea-listen").remove();
            setTimeout(function(){
                $('#update')[0].click();
            }, 4000);
        });
        /* Start : 18 March 2017 */
        /* Task  : When button array-add clicked, it trigger update button too */
        /* Page  : Add Material Page
           File Location : $BASE_PATH$/image/javascript/js-ezrx.js
           Layout : Desktop  
        */

        /* custom update button */
        $('.cart-update').bind('click', function(e) {
            e.preventDefault();

            $('#update')[0].click();
        });

        /* custom button add to cart */
        $('.cart-addtoorder').bind('click', function(e) {
            e.preventDefault();

            $('#add_to_cart')[0].click();
        });

        /* custom button start over */
        $('.cart-startover').bind('click', function(e) {
            e.preventDefault();

            $('#start_over')[0].click();
        });

        /* custom button save */
        $('.cart-save').bind('click', function(e) {
            e.preventDefault();

            $('#save')[0].click();
        });

        /* custom button cancel shopping */
        $('.cart-cancelshopping').bind('click', function(e) {
            e.preventDefault();

            if ($('#cancel_shopping_cart').length) {
                $('#cancel_shopping_cart')[0].click();
            }
            else {
                $('#cancel')[0].click()
            }
        });

        adjust_tooltip();
        
    }

    function transform_reportpage() {
        /* add class jg-pg-reportpage */
        $('body').addClass('jg-page-reportpage');
        /* add text 'Report Manager' on element jg-topbar-title */
        $('#jg-topbar-title').text("Report Manager");
        /* move element class extra-panes to jg-box-maincontent */
        $('.extra-panes').appendTo('.jg-box-maincontent');
        /* move element class main-pane to jg-box-maincontent */
        $('.main-pane').appendTo('.jg-box-maincontent');

        // toolbar
        /* add custom button add, update, stylsheet, refresh, default, favorite, trash, edit */
        $('.jg-list-tool')
            .append($("<li class='jg-item-tool report'>")
                .append($("<a href='#' id='jg-tool-report-add' class='jg-linkbtn report-add'>Add</a>"))
            )
            .append($("<li class='jg-item-tool report'>")
                .append($("<a href='#' id='jg-tool-report-update' class='jg-linkbtn report-update'>Update</a>"))
            )
            .append($("<li class='jg-item-tool report'>")
                .append($("<a href='#' id='jg-tool-report-stylesheet' class='jg-linkbtn report-stylesheet'>Stylesheet</a>"))
            )
            .append($("<li class='jg-item-tool report'>")
                .append($("<a href='#' id='jg-tool-report-refresh' class='jg-linkbtn report-refresh'>Refresh</a>"))
            )
            .append($("<li class='jg-item-tool jg-separator'>"))
            .append($("<li class='jg-item-tool'>")
                .append($("<a href='#' id='jg-tool-folder-default' class='jg-linkbtn default'>Default</a>"))
            )
            .append($("<li class='jg-item-tool'>")
                .append($("<a href='#' id='jg-tool-folder-fav' class='jg-linkbtn fav'>Favorite</a>"))
            )
            .append($("<li class='jg-item-tool'>")
                .append($("<a href='#' id='jg-tool-folder-trash' class='jg-linkbtn trash'>Trash</a>"))
            )
            .append($("<li class='jg-item-tool'>")
                .append($("<a href='#' id='jg-tool-folder-edit' class='jg-linkbtn edit'>Edit</a>"))
            );

        // refresh button
        $('.jg-list-tool-right')
            .append($("<li class='jg-item-tool'>")
                .append($("<a href='#' class='jg-linkbtn jg-tool-refresh'></a>"))
            );

        // get list folder and override href to default link
        $('#foders .dropTarget td[title]').each(function(i, target) {
            if ($(target).attr('title').toLowerCase().indexOf('default') != -1) {
                $('#jg-tool-folder-default').attr('href', $(target).prev().find('a').attr('href'));
            }
            else if ($(target).attr('title').toLowerCase().indexOf('trash') != -1) {
                $('#jg-tool-folder-trash').attr('href', $(target).prev().find('a').attr('href'));
            }
            else if ($(target).attr('title').toLowerCase().indexOf('fav') != -1) {
                $('#jg-tool-folder-fav').attr('href', $(target).prev().find('a').attr('href'));
            }
        });

        /* hide element of form-label has class .toolbar */
        $('.form-label.toolbar').hide();
        /* hide element table in element of class .refresh-date */
        $('.refresh-date').closest('table').hide();
        /* remove element of br in element has id reportManager */
        $('#reportManager br').eq(0).remove();

        /* EVENTS */
        /* custom report add button */
        $('#jg-tool-report-add').click(function(e) {
            e.preventDefault();

            $('#add')[0].click();
        });

        /* custom report stylesheet button */
        $('#jg-tool-report-stylesheet').click(function(e) {
            e.preventDefault();

            $('#stylesheet')[0].click();
        });

        /* custom update button */
        $('#jg-tool-report-update').click(function(e) {
            e.preventDefault();

            $('#update')[0].click();
        });

        /* custom refresh button */
        $('.jg-tool-refresh').click(function(e) {
            e.preventDefault();

            $('#refresh_reporting_data')[0].click();
        });
    }

    /* mobile */

    function mobile_newlayout() {

        /* get url string */
        var urlarr = url.split('/');
        // console.log(urlarr);
        /* check if url have mobile and have 4 element data then redirect to the string link */
        if ( ( urlarr[3].match("mobile") !== null ) && (urlarr.length == 4) ) {
            location.href = "/commerce/buyside/commerce_manager.jsp?bm_cm_process_id=36244034&from_hp=true&_bm_trail_refresh_=true";
            return false;
        }

        /* get title text */
        pagetitle = $('title').text().toLowerCase().trim();
        console.log(pagetitle);

        /*
        $('.tab-link').bind("tap", function() {
            console.log($(this));
        });*/
        /* if if pagetitle is empty then call functoon mobile_newlayout() */

        /* comment this function for showing page without checkin page title */
        /*if (pagetitle == '') {
            setTimeout(function() {
                mobile_newlayout();
            }, 2000);

            return;
        }*/

        /* hide element if jg-overlay */
        $('#jg-overlay').hide();

        /*
            Start : 4 Mei 2017 
            Task  : Debug order page + create filter page mobile with URL.
            Page  : Global mobile page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Mobile
            
            if pagetile not null call default function
        */

        $('html').addClass('jg-mobilelayout');
        if(pagetitle != ''){
            
            /* add class jg-mobilelayout */
            if (pagetitle == 'login') {
                /* if pagetitle login then call function mobile_loginpage */
                mobile_loginpage();
            }else{
            /* if pagetitle commerce then call transform_mainlayout and transform_orderspage */
                if (pagetitle == 'commerce management') {
                    $('html').addClass('jg-mobilelayout');
                    transform_mainlayout();
                    transform_orderspage();
                    mobile_commerce_management();
                }
                else if( pagetitle == "zuellig pharma products" || pagetitle == "zuellig pharma order processData" ){

                }
                else if( pagetitle == 'zuellig pharma order process' ){

                }

                mobile_adjustcontenttop();
            }

        }else{
            /* if oagetitle is null call custom filter from URL */
            /* create filterPage get last string of URL */
            var filterPage = urlarr[ urlarr.length-1 ];
            /* if filterPage contains with commerce */
            if( filterPage.search( "commerce" ) != -1 ){
                //[new] order & material page
                // var checkVariable = filterPage.split("?");
                if($("#tab-draftOrder").exists()){
                    //[new] order
                    console.log("New order");
                    mobile_orderpage();
                }else{
                    // material page.
                    console.log("Material page");
                    mobile_materialpage();
                }
            }
            else if( filterPage.search( "config" ) != -1 ){
                // material page.
                console.log("Material page");
                mobile_materialpage();
            }
            /* if filterPage contains with copy_processing.jsp */
            else if( filterPage.search( "copy_processing.jsp" ) != -1 ){
                //[copy] order
                console.log("Copy Order order");
                mobile_orderpage();

            /* if filterPage contains with document.jsp */
            }else if( filterPage.search( "document.jsp" ) != -1 ){
                //[process] order
                console.log("Proses Order page");
                mobile_orderpage();

            /* if filterPage contains with commerce_manager.jsp */
            }else if( filterPage.search( "commerce_manager.jsp" ) != -1 ){
                //Commerce Management
                console.log("Commerce page");

            /* if filterPage contains with edit_profile.jsp */
            }else if( filterPage.search( "edit_profile.jsp" ) != -1 ){
                //Profile
                console.log("Profile page");
            }

        }
        /*
            End : 4 Mei 2017 
            Task  : Debug order page + create filter page mobile with URL.
            Page  : Global mobile page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Mobile
        */
    }

    function mobile_loginpage() {

        /*
            give image for logo, and styling for login form.
        */
        /*
            Start : 17 April 2017
            Task  : Custom Login page on mobile
            Page  : Login Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Mobile

            change logo for mobile, change position and styling.
        */
        var imglogin = $("<img src='"+rootFolder+"/image/images/logo-ezrx-mobile.png' class='jg-login-logo'>")
            .prependTo('#login-form')
            .after("<span class='jg-login-welcome'>Hello,<br/>Please Login</span>")
            /*.append($("<div class='jg-box-login-bottom'>")
                .append($("<img src='"+rootFolder+"/image/images/zuellig.png' class='jg-login-logo' />"))
            );*/
        /* add class login-mobile-box on main-content element */
        /*
            Start : 3 Mei 2017
            Task  : Repair login animation and view.
            Page  : Login Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Mobile

            Hide header from new style.

        */
            $("#header").css("display","none");
        /*
            End   : 3 Mei 2017
            Task  : Repair login animation and view.
            Page  : Login Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Mobile

        */

        $("#main-content").addClass('login-mobile-box');
        /* hide element of label username and psword */
        $('label[for=username], label[for=psword]').hide();
        /* add element forgot password */
        $('#forgotpassword').insertAfter($('label[for=psword]').next().next());
        /* hide element footer */
        $('footer').hide();
        /*
            End : 17 April 2017
            Task  : Custom Login page on mobile
            Page  : Login Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Mobile
        */
        /*
            Start : 18 April 2017
            Task  : Custom Login page on mobile
            Page  : Login Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Mobile

            give animation on mobile login page, focus on username and password.
        */
          $("#login-form").attr("autocomplete","off");

          $("<div id='mobile-login-animation' style='position:fixed;top:0;right:0;bottom:0;left:0;background-color:#fff;z-index:2;display:none;' ></div>").insertBefore("#jg-overlay");
          $("#mobile-login-animation").append("<div id='form-login-animation' style='position:fixed;bottom:0;right:0;left:0;width:auto;padding:0px 100px 20px 100px;' ></div>");
          var textHeaderLogo = "<div style='height:70px!important;' ><span class='jg-login-welcome' style='float:left!important;margin:25px 0px 0px 0px!important;' >Hello, Please Login</span><img src='"+
                                rootFolder+"/image/images/logo-ezrx-mobile.png' class='jg-login-logo'></div>";
          var loginForm = "<div style='width:100%;float:left;' ><input type='text' name='focus_username' id='id_focus_username' class='focus-item' style='padding:10px 20px;font-size:18px;border-radius:5px;width:40%;' autocomplete='off' placeholder='Username' >"+
                          "<input type='password' name='focus_password' id='id_focus_password' class='focus-item' style='padding:10px 20px;font-size:18px;border-radius:5px;width:40%;float:right;' autocomplete='off' placeholder='password' ></div>";
          var loginButton = "<div style='width: 100%;float:left;margin-top:15px;height:40px;' ><div style='margin:0px auto; width:200px;background:#B8C942;border-radius:5px;' data-corners='true' data-shadow='true' data-iconshadow='true' data-wrapperels='span' data-theme='c' data-disabled='false' class='ui-submit ui-btn ui-btn-up-c ui-shadow ui-btn-corner-all' aria-disabled='false'>"+
                            "<span class='ui-btn-inner'>"+
                            "<span class='ui-btn-text'>Log In</span>"+
                            "</span>"+
                            "<button class='ui-block-b ui-btn-hidden' style='display:none;' id='login_mobile_animation' data-disabled='false'>Log In</button>"+
                            "</div>"+
                            "<div id='forgotpassword' style='position:relative;right:0px;bottom:45px;' >"+
                              "<a href='/mobile/reset-password' data-transition='slide' class='ui-link'>Forgot password?</a>"+
                            "</div>"
                            "</div>";

           // $("#mobile-login-animation").append("<>")

          $("#form-login-animation").append( $(textHeaderLogo) )
                                    .append( $(loginForm) )
                                    .append( $(loginButton) );

          var _originalSize = $(window).width() + $(window).height();
          var statusOpen = false;

          function keyboardShow(){
            setTimeout(function(){
                console.log( statusOpen );

                if($(window).width() + $(window).height() != _originalSize){
                  if( !statusOpen ){
                    statusOpen = true;
                    console.log("keyboard show up");
                    $("#mobile-login-animation").show();
                    $("#id_focus_username").focus();
                  }
                }
              }, 1000);
          }

          function keyboardHide(){
            setTimeout( function(){
                statusOpen = false;
                console.log("keyboard closed");
                $("#mobile-login-animation").hide();
            }, 1000 );
          }

          console.log( _originalSize );
          $(".ui-input-text > input").on("click", function(){
            console.log( "on tap" );
            keyboardShow();
          });

          $( $("#login_mobile_animation").siblings() ).on("click", function(){
            $("#username").val( $("#id_focus_username").val() );
            $("#password").val( $("#id_focus_password").val() );
            console.log( $("#username").val() );
            console.log( $("#password").val() );
            $("#login-form").children('button[type="submit"]').click();
          });
        
        /*
            End : 17 April 2017
            Task  : Custom Login page on mobile
            Page  : Login Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Mobile
        */

    }

    function mobile_commerce_management(){
        /*
            Start : 24 April 2017 
            Task  : Show and hide menu side bar
            Page  : Commerce Management
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Mobile
            
            set default hide side nav and give style to mainarea, when user clicked bar menu, show sidenav.
        */
        $(".jg-box-sidenav").css("display","none");
        $(".jg-box-mainarea").css("padding-left","0px");
        $(".jg-box-topbar").prepend("<a href='#' id='menu_mobile' ><img src='"+rootFolder+"/image/images/bars-icon.png' style='width:40px;float:left;padding:5px;' ></a");
        $("#menu_mobile").click(function(){
            var timeAnimation = 1000;
            if( $(".jg-box-sidenav").css("display") == "none" ){
                $(".jg-box-sidenav").show(timeAnimation);
                $(".jg-box-mainarea").animate({"padding-left": "50px"}, timeAnimation);
            }else{
                $(".jg-box-sidenav").hide(timeAnimation);
                $(".jg-box-mainarea").animate({"padding-left": "0px"}, timeAnimation);
            }
        });
        /*
            End   : 24 April 2017 
            Task  : Show and hide menu side bar
            Page  : Commerce Management
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Mobile
            
        */

    }

    function mobile_orderpage(){

        /*
            Start : 5 Mei 2017 
            Task  : Create script for handle view on Order Page
            Page  : Order Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Mobile
        */
        console.log("Order Page Controller");
        // var hasExecute = false;
        //re-align struktur

        var $div         = $("html").addClass('ui-loading');
        var hasExecute   = false;
        var firstExecute = true;
        var countChange = 1;
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === "class") {
                    var attributeValue = $(mutation.target).prop(mutation.attributeName);
                    countChange++;
                    if( (attributeValue.search("ui-loading") != -1)||(countChange==4) )
                    {
                        hasExecute = true;
                    }
                    if( attributeValue.search("ui-loading") == -1 ){
                        $(".ui-controlgroup-controls").parent().css("width","100%");
                        $(".ui-controlgroup-label").css("width","17%");
                        $(".ui-controlgroup-label").next().css({"width":"auto", "margin-top":"5px"});
                        $("label[for='orderType_t']").css({ "padding-left":"15px", "width":"19%" });
                        $("label[for='orderType_t']").next().css("width","75%");
                        if(hasExecute){
                            hasExecute = false;
                            if( $("#swipe-sidebar").hasClass("sidebar-state-1") == false ){
                                global_searchCustomer('mobile');
                            }

                            $(".tab-link").each(function(i, data){
                                if( $(data).hasClass("active") == true ){
                                    var hrefData = $(data).attr("href");
                                    if( hrefData == "#tab-draftOrder" ){
                                        //draftOrder
                                    }else if( hrefData == "#tab-customerSearch" ){
                                        
                                    }else if( hrefData == "#tab-pricing" ){
                                        console.log("tab-pricing");
                                        $("label[for='customerPORef_t']").css("color","red");
                                    }
                                }
                            });
                        }
                    }
                }
            });
        });    

        observer.observe($div[0],  {
            attributes: true
        });

        /*$( document ).ajaxComplete(function(){
            console.log("ajax complete")
            if(hasExecute == false){
                hasExecute = true;
                console.log("do each");
                global_searchCustomer('mobile');
                $(".tab-link").each(function(i, data){
                    if( $(data).hasClass("active") == true ){
                        var hrefData = $(data).attr("href");
                        if( hrefData == "#tab-draftOrder" ){
                            //draftOrder
                        }else if( hrefData == "#tab-customerSearch" ){
                            
                        }else if( hrefData == "#tab-pricing" ){
                            console.log("tab-pricing");
                            $("label[for='customerPORef_t']").css("color","red");
                        }
                    }
                });
            }
        });

        $( document ).ajaxStart(function() {
          console.log("Listen Ajax Start");
          hasExecute = false;
        });*/

        /*
            End   : 5 Mei 2017 
            Task  : Create script for handle view on Order Page
            Page  : Order Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Mobile
        */
    }

    function mobile_materialpage(){
        /*
            End   : 6 Mei 2017 
            Task  : Hide testing fields from the layout
            Page  : Material page / product page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Mobile
        */
        /* hide testing fields */
        $("#attribute-firstLoad").hide();
        $("#attribute-typeHeadScriptTagHolder").hide();
        $("#attribute-masterString").hide();
        $("#attribute-applicableProducts").hide();
        $("#attribute-materialResultsString").hide();
        /* align all component on material page */
        $(".ui-controlgroup-controls").parent().css("width","100%");
        $(".ui-controlgroup-label").css("width","auto");
        $(".ui-controlgroup-label").next().css({"width":"auto", "margin-top":"15px"});

        /* align material search*/
        setTimeout(function(){
            $("#attribute-addMaterials").children('.ui-controlgroup').children().children('.ui-controlgroup-label').css("display","none", "important");
            $("#attribute-addMaterials").children('.ui-controlgroup').children().children('.ui-controlgroup-controls').css("width","130px", "important");
            $( $( $("#tab-content").children()[1] ).children('.ui-body-inherit').children()[0] ).css("padding-bottom","100px", "important");
            $("<div id='form_controlsearchmaterial' ></div>").insertBefore("#attribute-addMaterials");
            $("#form_controlsearchmaterial").css({"width":"400px", "min-height":"90px", "float":"right"});
            $("#attribute-addMaterials").css({"padding":"0px","margin":"0px", "float":"left"});
            $("#attribute-addMaterials").appendTo("#form_controlsearchmaterial");

            if( $("#attribute-previous_res").hasClass("hidden") == false ){
                $("#attribute-previous_res").hide();
                $("#form_controlsearchmaterial").append("<div class='ui-controlgroup-controls ' style='width: 100px; float:left; margin-top: 15px;'>"+
                                                            "<div class='html-attr form-field'>"+
                                                                "<p><button id='cust_prevResult' class='ui-btn ui-shadow ui-corner-all ui-first-child ui-last-child'>Previous</button></p>"+
                                                            "</div>"+
                                                        "</div>");
                $("#cust_prevResult").on("click", function(){
                    $( $("#attribute-previous_res").children()[1] ).click();
                });
            }

            if( $("#attribute-next_res").hasClass("hidden") == false ){
                $("#attribute-next_res").hide();
                $("#form_controlsearchmaterial").append("<div class='ui-controlgroup-controls ' style='width: 100px; float:left; margin-top: 15px;margin-left:30px;'>"+
                                                            "<div class='html-attr form-field'>"+
                                                                "<p><button id='cust_nextResult' class='ui-btn ui-shadow ui-corner-all ui-first-child ui-last-child'>Next</button></p>"+
                                                            "</div>"+
                                                        "</div>");
                $("#cust_nextResult").on("click", function(){
                    $( $("#attribute-next_res").children()[1] ).click();
                });
            }
        }, 2000);

        /*
            End   : 6 Mei 2017 
            Task  : Hide testing fields from the layout
            Page  : Material page / product page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Mobile
        */
    }

    function mobile_adjustcontenttop() {
        /* give styling on mobile view, and call it after 500 milisecond */
        setTimeout(function() {
            $('#header').parent().css('paddingTop', $('#header').outerHeight()).css('margin', '0');
        }, 500);
    }

    /* monic's script */
    function adjust_tooltip() {
        /* create tootip for contract bonus */
        $('td.cell-contractBonus').attr('tooltip', function() {
            var button_helper;
            /* get the text of contract bonus 
                if value is not null then button helper is lens icon
                if it is null then button helper is -
                then replace html with button helper
            */
            var valueOfBonus = $( $(this).children().children() ).val();
            if ( valueOfBonus != '') {
                button_helper = '<i class="material-lens" aria-hidden="true" ></i>';
            } else {
                button_helper = '-';
            }
            // $(this).children('.attribute-field-container').children('span').html(button_helper);
            $( $(this).children().children() ).hide();
            $( $(this).children().children() ).parent().append( button_helper );
            return valueOfBonus;
        }).mouseenter(function() {
            /* Start : 17 March 2017 */
            /* Task  : Add header column Product Description 
               Page  : Add Material Page
               File Location : $BASE_PATH$/image/javascript/js-ezrx.js
               Layout : Desktop  

               if mouse hover on element contractBonus (lens icon) then showing table of ordered qty, bonus material, material desc, material qty

            */
            var table = '<table style="text-align:center;width:100%;border-collapse: collapse;">'+
                        '<thead style="padding:5px;font-weight:bold"><tr style="background-color:#EEE;">'+
                        '<th style="border: 1px solid #999;padding:5px;">Ordered Qty</th>'+
                        '<th style="border: 1px solid #999;padding:5px;">Bonus Material</th>'+
                        '<th style="border: 1px solid #999;padding:5px;">Material  Desc</th>'+
                        '<th style="border: 1px solid #999;padding:5px;">Bonus Qty</th></tr></thead>';
            /* End : 17 March 2017 */
            /* Task  : Add header column Product Description */
            /* Page  : Add Material Page
               File Location : $BASE_PATH$/image/javascript/js-ezrx.js
               Layout : Desktop  
           */
           /*
                Set element of row and coloumn in hover table.
            */
            var x = $(this).attr('tooltip').trim();
            if (x != "") {
                var col = x.trim().split(",");
                if (col.length > 0) {
                    table += "<tbody>";
                    col.forEach(function(row) {
                        table += '<tr>';
                        row = row.trim().split('#@#');
                        if (row.length > 0) {
                            row.forEach(function(item) {
                                table = table + '<td style="border: 1px solid #999;padding:5px;">' + item + '</td>';
                            });
                        }
                        table += '</tr>';
                    });
                    table += '</tbody>';

                }
            }
            table += '</table>';
            /*
                showing element if the content is not null
            */
            if ($(this).attr('tooltip').trim() != '') {
                $('#myModal').addClass('hover-modal-content').html(table);
                $('#myModal').css("display", "block");
            }
            $('.cell-contractBonus').mouseleave(function() {
                $('#myModal').css("display", "none");
            });
        });

        /* prepare tooltip for cell-promotion */
        $('td.cell-promotion').attr('tooltip', function() {
            var button_helper;
            var valueOfPromotion = $( $(this).children().children() ).val();
            /* get the text of value of promotion
                if value is not null then button helper is lens icon
                if it is null then button helper is -
                then replace html with button helper
            */
            if ( valueOfPromotion != '') {
                button_helper = '<i class="material-lens" aria-hidden="true" ></i>';
            } else {
                button_helper = '-';
            }
            // $(this).children('.attribute-field-container').children('span').html(button_helper);
            $( $(this).children().children() ).hide();
            $( $(this).children().children() ).parent().append( button_helper );
            return valueOfPromotion;
        }).mouseenter(function() {
            /*
                if mouse hover on element promotion (lens icon) then showing table of Ordered Quantity and contract price
            */
            var table = '<table style="text-align:center;width:100%;border-collapse: collapse;"><thead style="padding:5px;font-weight:bold"><tr style="background-color:#EEE;"><th style="border: 1px solid #999;padding:5px;">Ordered Quantity</th><th style="border: 1px solid #999;padding:5px;">Contract Price</th></tr></thead>';
            var x = $(this).attr('tooltip').trim();
            if (x != "") {
                var col = x.trim().split(",");
                if (col.length > 0) {
                    table += "<tbody>";
                    col.forEach(function(row) {
                        table += '<tr>';
                        row = row.trim().split('#@#');
                        if (row.length > 0) {
                            row.forEach(function(item) {
                                table = table + '<td style="border: 1px solid #999;padding:5px;">' + item + '</td>';
                            });
                        }
                        table += '</tr>';
                    });
                    table += '</tbody>';

                }
            }
            table += '</table>';
            /*
                showing element if the content is not null
            */
            if ($(this).attr('tooltip').trim() != '') {
                $('#myModal').addClass('hover-modal-content').html(table);
                $('#myModal').css("display", "block");
            }
            $('.cell-promotion').mouseleave(function() {
                $('#myModal').css("display", "none");
            });
        });

        //material description
        //for add material page.
        var input_val;
        /* prepare for tooltip on material description */
        $('td.cell-materialDescription').attr("tooltip", function(){
            var input_text = $(this).children(".attribute-field-container").children("textarea");
            /* get text of material description */
            input_val = $( input_text ).val();
            return input_val;
        }).mouseenter(function(){
            /* get text of material desciption */
            var input_text = $(this).children(".attribute-field-container").children("textarea");
            input_val = $( input_text ).val();
            /*
                if mouse hover on element material description then showing table of Material Description.
            */
            var table = '<table style="text-align:center;width:100%;border-collapse: collapse;"><thead style="padding:5px;font-weight:bold"><tr style="background-color:#EEE;"><th style="border: 1px solid #999;padding:5px;">Material Description</th></thead>';
            table += "<tbody>";
            table += "<tr><td>"+input_val+"</td></tr>";
            table += "</tbody></table>";
            // if ($(this).attr('tooltip') != '') {
            /* always showing table of material description */
            $('#myModal').addClass('hover-modal-content').html(table);
            $('#myModal').css("display", "block");
            // }
            $('.cell-materialDescription').mouseleave(function() {
                $('#myModal').css("display", "none");
            });
        });

        //for order page.
        /* prepare tootip for material description in order page */
        $("td[id*='part_desc']").each(function(i, data){
            /* Start : 17 March 2017 */
            /* Task  : Make 2 or more line, for descripton material */
            /* Page  : Order Page
               File Location : $BASE_PATH$/image/javascript/js-ezrx.js
               Layout : Desktop

               replace css for displaying material description, this need word wrap view text.
            */
            $(data).css("white-space","normal");
            /* add css white-space then give value normal */
            /* Start : 17 March 2017 */
            /* Task  : Make 2 or more line, for descripton material */
            /* Page  : Order Page
               File Location : $BASE_PATH$/image/javascript/js-ezrx.js
               Layout : Desktop
            */
            /* get material description on table material in order page */
            var remove_attr = data.id.split("attr_wrapper");
            var object_span = $( "#readonly"+remove_attr[1] );
            var input_val = object_span.text();
            object_span.attr("tooltip", function(){
                            return input_val;
                        })
                        .html('<i class="material-lens" aria-hidden="true" ></i>'+input_val)
                        .mouseenter(function(){
                            /*
                                if mouse hover on element material description then showing table of Material Description.
                            */
                            var table = '<table style="text-align:center;width:100%;border-collapse: collapse;"><thead style="padding:5px;font-weight:bold"><tr style="background-color:#EEE;"><th style="border: 1px solid #999;padding:5px;">Material Description</th></thead>';
                            table += "<tbody>";
                            table += "<tr><td>"+input_val+"</td></tr>";
                            table += "</tbody></table>";
                            /* if the content is not null then show the table. */
                            if ($(this).attr('tooltip') != '') {
                                $('#myModal').addClass("hover-modal-content").html(table);
                                $('#myModal').css("display", "block");
                            }
                            $(this).mouseleave(function() {
                                $('#myModal').css("display", "none");
                            });
                        });
        });

        /* listen all class in the list, for following position above all code of modal table  */
        $('td.cell-contractBonus, td.cell-promotion, td[id*="part_desc"], td.cell-materialDescription')
            .hover(function(e) {
                e.preventDefault();
            })
            .mousemove(function(e) {
                $('#myModal').css('top', e.pageY - $(document).scrollTop() + 10 + 'px').css('left', e.pageX - $(document).scrollLeft() + 10 + 'px');
            });
    }

})( jQuery );