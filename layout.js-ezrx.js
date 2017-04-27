
	var transform_mainlayout = function() {
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

    var transform_newfooter = function() {
        // new footer
        $('.jg-box-mainarea').append($("<div class='jg-box-footer'>")
            .append($("<img src='"+rootFolder+"/image/images/dk-img-footer.png' class='jg-img-footer' />"))
        );
    }