
	var desktop_newlayout = function() {
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
