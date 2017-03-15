var urlSite = "https://ndaru.click/ezrx/";

(function($) {

    var url, pagetitle;

    $(document).ready(function() {
        url = window.location.href;
        pagetitle = $('title').text().toLowerCase();

        setTimeout(function() {
            if (!$('html').hasClass('ui-mobile')) {
                $('#jg-overlay').hide();
                desktop_newlayout();
            }
            else {
                mobile_newlayout();
            }
        }, 1000);
    });

    function desktop_newlayout() {
        /* UI */
        if ($('.-out').length == 1 || $('#login').length == 1 || $('#login-form-wrap').length > 0) {
            transform_loginpage();
        }
        else {
            // if ($('input[name=pageName][value=commerce_manager]').length == 1) {
            if (pagetitle == 'commerce management' || pagetitle == 'transaction' || pagetitle == 'model configuration' || pagetitle == "report manager") {
                transform_mainlayout();
                tranform_ordersubmenu();

                if (pagetitle == 'commerce management') {
                    $('body').addClass('jg-page-orders');
                    $('#jg-mainmenu-orders').addClass('active');
                    $('#jg-submenu-myorders').addClass('active');
                    transform_orderspage();
                }
                else if (pagetitle == 'transaction') {
                    $('#jg-mainmenu-orders').addClass('active');
                    $('#jg-submenu-neworder').parent().remove();
                    $('#jg-submenu-copyorder').parent().remove();

                    if (url.indexOf('copy_processing') != -1) {
                        $('body').addClass('jg-page-copyorder');
                        $('#jg-topbar-title').text("Copy Order");
                        $('title').text("Copy Order");

                        $('#jg-submenu-copyorder').addClass('active');
                    }
                    else if ($('#readonly_1_visualWorkflow').length > 0) {
                        var imgsrc = $('#readonly_1_visualWorkflow img').attr('src');

                        if (imgsrc.indexOf('vi_order_created_active.png') != -1 || imgsrc.indexOf('vi_customer_selected_active.png') != -1) {
                            $('body').addClass('jg-page-neworder');
                            $('#jg-topbar-title').text("New Order");
                            $('title').text("New Order");

                            $('#jg-submenu-neworder').addClass('active');
                        }
                        else if (imgsrc.indexOf('vi_shoppping_cart_ready_active.png')) {
                            $('body').addClass('jg-page-shoppingcart');
                            $('#jg-topbar-title').text("Shopping Cart");
                            $('title').text("Shopping Cart");
                        }
                        else {
                            $('#jg-topbar-title').text("(Page title hasn't been set for this page.)");
                        }
                    }

                    transform_newcopypage();
                }
                else if (pagetitle == 'model configuration') {
                    $('#jg-mainmenu-orders').addClass('active');
                    $('#jg-submenu-neworder').parent().remove();
                    $('#jg-submenu-copyorder').parent().remove();

                    transform_modelconfig();
                }
                else if (pagetitle == "report manager") {
                    $('body').addClass('jg-page-orders');
                    $('#jg-mainmenu-orders').addClass('active');
                    $('#jg-submenu-myreports').addClass('active');
                    $('#jg-submenu-neworder').parent().remove();
                    $('#jg-submenu-copyorder').parent().remove();

                    transform_reportpage();
                }

                transform_newfooter();
            }else if( pagetitle == 'folders' ){
                window.location = 'https://'+window.location.host;
            }
        }

        // remove white overlay
        $('#jg-overlay').hide();
    }

    function transform_loginpage() {
        var newlayout = $("<div class='jg-box-login'>")
            .append($("<div class='jg-box-login-inner'>")
                .append($("<img src="+urlSite+"images/ezrx.png class='jg-login-logo' />"))
                .append($("<span class='jg-login-welcome'>Welcome</span>"))
            )
            .append($("<div class='jg-box-login-bottom'>")
                .append($("<img src="+urlSite+"images/zuellig.png class='jg-login-logo' />"))
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
        var newlayout = $("<div class='jg-box-mainlayout'>")
            .append($("<div class='jg-box-sidenav'></div>")
                .append($("<ul class='jg-list-mainmenu'>")
                    .append($("<li class='jg-item-mainmenu'><a href='/commerce/profile/edit_profile.jsp?_bm_trail_refresh_=true&navType=1' id='jg-mainmenu-profile' class='jg-linkbtn profile'></a></li>"))
                    .append($("<li class='jg-item-mainmenu'><a href='/commerce/display_company_profile.jsp?_bm_trail_refresh_=true' id='jg-mainmenu-home' class='jg-linkbtn home'></a></li>"))
                    .append($("<li class='jg-item-mainmenu jg-separator'></li>"))
                    .append($("<li class='jg-item-mainmenu'><a id='jg-mainmenu-arrow' class='jg-linkbtn arrow'></a></li>"))
                    .append($("<li class='jg-item-mainmenu'><a href='/commerce/buyside/commerce_manager.jsp?bm_cm_process_id=36244034&from_hp=true&_bm_trail_refresh_=true' id='jg-mainmenu-orders' class='jg-linkbtn orders'></a></li>"))
                    .append($("<li class='jg-item-mainmenu jg-separator'></li>"))
                    .append($("<li class='jg-item-mainmenu jg-separator'></li>"))
                    .append($("<li class='jg-item-mainmenu'><a href='/admin/index.jsp?_bm_trail_refresh_=true' id='jg-mainmenu-settings' class='jg-linkbtn settings'></a></li>"))
                    .append($("<li class='jg-item-mainmenu'><a href='/logout.jsp?_bm_trail_refresh_=true' id='jg-mainmenu-logout' class='jg-linkbtn logout'></a></li>"))
                )
            )
            .append($("<div class='jg-box-rightpanel'></div>")
                .append($("<div class='jg-box-submenu'></div>"))
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

        /* EVENTS */

        //always hide menu
        // $('.jg-box-submenu').css('paddingLeft', '-100px');
        $('.jg-box-submenu').show();
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

        function AnimateRotate(id_element,d){
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

        });
    }

    function transform_newfooter() {
        // new footer
        $('.jg-box-mainarea').append($("<div class='jg-box-footer'>")
            .append($("<img src='https://zuelligpharmatest1.bigmachines.com/bmfsweb/zuelligpharmatest1/image/images/dk-img-footer.png' class='jg-img-footer' />"))
        );
    }

    function tranform_ordersubmenu() {
        // orders submenu
        if(/@zuelligpharma.com\s*$/.test(_BM_USER_LOGIN)){
            $('.jg-box-submenu')
                .append($("<img src='https://zuelligpharmatest1.bigmachines.com/bmfsweb/zuelligpharmatest1/image/images/dk-submenu-icon-orders.png' class='jg-img-submenu-icon' />"))
                .append($("<ul class='jg-list-submenu'>")
                        .append($("<li class='jg-item-submenu'><a href='/commerce/buyside/commerce_manager.jsp?bm_cm_process_id=36244034&from_hp=true&_bm_trail_refresh_=true' id='jg-submenu-myorders'>My Orders</a></li>"))
                        .append($("<li class='jg-item-submenu'><a href='/commerce/buyside/reports/report_manager.jsp?process_id=36244034&from_hp=true&_bm_trail_refresh_=true' id='jg-submenu-myreports'>My Reports</a></li>"))
                        .append($("<li class='jg-item-submenu'><a href='#' id='jg-submenu-neworder'>New Order</a></li>"))
                        .append($("<li class='jg-item-submenu'><a href='#' id='jg-submenu-copyorder'>Copy Order</a></li>"))
                    // .append($("<li class='jg-item-submenu'><a href='#' id='jg-submenu-export'>Export</a></li>"))
                );
        }else{
            $('.jg-box-submenu')
                .append($("<img src='https://zuelligpharmatest1.bigmachines.com/bmfsweb/zuelligpharmatest1/image/images/dk-submenu-icon-orders.png' class='jg-img-submenu-icon' />"))
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

        function addFolder(form)
        {
            if(form.name.value == "[Default]" || form.name.value == "[Trash]"){
                bmErrorString += "[Default] and [Trash] folders already exist";
            }
            bmCheckString(form.name, "Folder Name");
        }

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
        
        var listFolder = [];
        var list_folder = "<table style='background-color:#0C727A;' >";
        var optionsFolder = "";
        $('#dropzone .dropTarget td[title]').each(function(i, target) {
            var nama_folder = $(target).attr('title').replace(/[^\w\s]/gi, '');
            var id_folder = $(target).parent().attr("id");
            var button_folder = "<tr><td>";
            var link_folder = $(target).prev().find('a').attr('href');
            if(nama_folder.toLowerCase() == "default"){
                button_folder += "<a href='"+link_folder+"' id='jg-tool-folder-default' class='jg-linkbtn list-folder default'>"+nama_folder+"</a>";
                $("#jg-tool-folder-default").attr("href", link_folder);
            }else if(nama_folder.toLowerCase() == "trash"){
                button_folder += "<a href='"+link_folder+"' id='jg-tool-folder-trash' class='jg-linkbtn list-folder trash'>"+nama_folder+"</a>";
                $("#jg-tool-folder-trash").attr("href", link_folder);
            }else if(nama_folder.toLowerCase() == "favourites"){
                button_folder += "<a href='"+link_folder+"' id='jg-tool-folder-fav' class='jg-linkbtn list-folder fav'>"+nama_folder+"</a>";
                $("#jg-tool-folder-fav").attr("href", link_folder);
            }else{
                button_folder += "<a href='"+link_folder+"' id='display_folder_"+id_folder+"' class='jg-linkbtn list-folder default'>"+nama_folder+"</a><input id='input_"+id_folder+"' name='name' class='input-folder' style='display:none;' />";
                button_folder_toolbar = "<li class='jg-item-tool' ><a href='"+link_folder+"' class='jg-linkbtn default'>"+nama_folder+"</a></li>";
                $(".jg-list-tool").append($(button_folder_toolbar));
                optionsFolder += "<option value="+id_folder+" ></option>";
                button_folder += "</td><td style='padding-top:30px;' >";
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

        $(".tmp-folder-remove").on("click", function(){
            var id = $(this).data('id');
            $("#folder option[value='"+id+"']").attr("selected","");
            bmSubmitFormConfirm('Deleting this folder will send all of its contents to the trash.  Do you wish to continue?', 'admin_folder.jsp', document.templateFolder2, deleteFolder, 'deleteCmFolder');
            bmCancelBubble(event);
        });
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

        //show menu and folder on click
        var hide = false;
        $("#jg-tool-folder-edit").on("click", function(){
            if(!hide){
                hide = true;
                // $(this).animate({marginRight: '240px'}, 1500);
                $('.jg-box-foldermenu').animate({right: '0px'},1000);
            }else{
                hide = false;
                // $(this).animate({marginRight: '0px'}, 1500);
                $('.jg-box-foldermenu').animate({right: '-400px'},1000);
            }
            
        });

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
        $('#jg-tool-search').click(function(e) {
            e.preventDefault();

            $('#search').click();
        });

        // manage
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

        // edit
        $('#jg-tool-folder-edit').click(function(e) {
            e.preventDefault();

            // $('#edit').click();
        });

        // copy order
        $('#jg-submenu-copyorder').click(function(e) {
            e.preventDefault();

            $('#copy_order').click();
        });

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
        $('.jg-box-toolbar').hide();

        $('#document-form').appendTo('.jg-box-maincontent');

        // tweak originals
        // $('#sticky-actions').hide();
        $('select[name=orderType_t]').css('width', 'auto');
        $('#field_wrapper_1_visualWorkflow').css('paddingLeft', '0');
        $('#add_material').closest('.column').prev().remove();
        $('#add_material').closest('.column').css('width', 'auto');
        $('#add_material').closest('.form-element').css('paddingLeft', '6px');
        $('#add_material').closest('.form-element').prev().remove();

        // cust & address area
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

        // Summary area
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

        // data with color red
        // if isPriceOverride give red color
        $("td[id*='isPriceOverride']").each(function(i, data){
            if($(data).text() !== "False"){
                var baris = $(data).parent();
                var unitPrice = $(baris).find("td[id*='unitPrice']")
                var remove_attr = $(unitPrice).attr("id").split("attr_wrapper");
                var object_span = $( "#readonly"+remove_attr[1] );
                object_span.css("color","red");
            }
        });

        // if Type Bonus Change row collor with grey #EEE;
        $("td[id*='refNO_text']").each(function(i, data){
            var refNo = $(this).attr("id").split("attr_wrapper");
            var object_span = $("#readonly"+refNo[1]);
            if(object_span.text().toLowerCase() == "bonus"){
                console.log(object_span.parent('line-item'));
            }
        });

        /* EVENTS */
        $('#jg-tool-addtofav, #jg-btn-addtofav').click(function(e) {
            e.preventDefault();

            $('#').click();
        });

        $('#jg-tool-pipelineviewer, #jg-btn-pipelineviewer').click(function(e) {
            e.preventDefault();

            $('#').click();
        });

        $('#btn-neworder-save').click(function(e) {
            e.preventDefault();

            $('#save').click();
        });
    }

    function transform_modelconfig() {
        $('body').addClass('jg-page-cartpage');
        $('#jg-topbar-title').text("Shopping Cart");
        $('title').text("Shopping Cart");

        // console.log($('.cell-promotion').html());


        $('form[class=configuration-form]').appendTo('.jg-box-maincontent');

        $('#config-header').hide();

        var flowimg = $("<div class='column-layout clearfix '><div class='column label-left last' style='width:100%'><div class='form-item clearfix null' id='attr_wrapper_1_visualWorkflow'><label class='form-label' for='visualWorkflow' style='width: 100px;visibility:hidden'><span style='padding-right: 5px'>Visual Workflow</span></label><div class='form-element field-wrapper' id='field_wrapper_1_visualWorkflow' style='padding-left: 0px;'><div id='readonly_1_visualWorkflow'><img width='70%' src='/bmfsweb/zuelligpharmatest1/image/images/vi_shoppping_cart_ready_active.png' alt='Broken Visual Workflow'></div><div id='msg_1_visualWorkflow' class='error-hover' data-action-message='' message=''></div></div></div></div></div>")
            .insertBefore('.page-tabs');

        // toolbar
        $('.jg-list-tool')
            .append($("<li class='jg-item-tool'>")
                .append($("<button id='btn-cart-update' class='jg-btn jg-btn-icon cart-update'></span>Update</button>"))
            )

        if ($('#start_over').length == 1) {
            $('.jg-list-tool')
                .append($("<li class='jg-item-tool'>")
                    .append($("<button id='btn-cart-startover' class='jg-btn jg-btn-icon cart-startover'>Start Over</button>"))
                )
                .append($("<li class='jg-item-tool'>")
                    .append($("<button id='btn-cart-addtoorder' class='jg-btn jg-btn-icon cart-addtoorder'>Add to Order</button>"))
                );
        }
        else if ($('#save').length == 1) {
            $('.jg-list-tool')
                .append($("<li class='jg-item-tool'>")
                    .append($("<button id='btn-cart-save' class='jg-btn jg-btn-icon cart-save'>Save</button>"))
                );
        }

        $('.jg-list-tool').append($("<li class='jg-item-tool'>")
            .append($("<button id='btn-cart-cancelshopping' class='jg-btn jg-btn-icon cart-cancelshopping'>Cancel Shopping</button>"))
        );

        // tweak originals
        $('#sticky-actions').hide();
        $('#tab-material').closest('ul').hide();

        $('#grid-36595617').css('marginBottom', '10px');
        $('#PastOrders, #CurrentCustFav').parent().addClass('jg-box-table small');
        $('.tab-content button').addClass('jg-btn');
        $('.attribute-label[for=principalCode]').parent().css('marginTop', '5px');
        $('.attribute-label[for=showPrincipalFavorites]').parent().css('marginTop', '5px');
        /* Toolbar on bottom table. */
        $("#materialArrayset").after( $(".jg-box-toolbar").clone() ); //for bottom
        $("#grid-36397039").children('.row').children('.column-0').css({width: "100%"});
        /* Right Panel Content */
        $('#grid-36595617').closest('.column').wrapInner($("<div class='jg-inner-column'>"));
        $('#grid-36561838').closest('.column').css('marginTop', '8px');
        //transisi right side
        $('.jg-box-maincontent').css({"overflow": "hidden", "min-height": "800px"});

        $('#grid-36561838').addClass("collapsed");

        var rightPanel = $('#grid-36397039').children('.row').children('.column-1');
        $('#grid-36561838').children('.group-content')
                           .css('margin','0px')
                           .children('.group-header').children('span').prepend("<img src='/bmfsweb/zuelligpharmatest1/image/images/rsm-frequently.png' >");
        $('#grid-36565572').children('.group-content')
                           .css('margin','0px')
                           .children('.group-header').children('span').prepend("<img src='/bmfsweb/zuelligpharmatest1/image/images/rsm-recommended.png' >");
        $('#grid-36701507').children('.group-content')
                           .css('margin','0px')
                           .children('.group-header').children('span').prepend("<img src='/bmfsweb/zuelligpharmatest1/image/images/rsm-favourite.png' >");
        var mainContentWidth = $(".jg-box-maincontent").width();
        var rightValue = -(mainContentWidth/4);

        $(rightPanel).css({'position': 'absolute', 'right': rightValue+'px', 'height': '800px'});

        /* Show or Hide right panel content */
        $(rightPanel).mouseenter(
            function(e){
                $(rightPanel).animate({right: '0px'}, 2000);
                $('#grid-36561838').mouseenter(function(e){
                    console.log('grid-36561838');
                    $('#grid-36561838').addClass("collapsed");
                    $('#grid-36561838').removeClass("collapsed");
                });
                $('#grid-36565572').mouseenter(function(e){
                    console.log('grid-36565572');
                    $('#group-36565572').addClass("collapsed");
                    $('#group-36565572').removeClass("collapsed");
                });
                $('#grid-36701507').mouseenter(function(e){
                    console.log('grid-36701507');
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
                });
            }
        );

        $(rightPanel).mouseleave(
            function(e){
                $('#grid-365618381').addClass("collapsed");
                $('#group-36565572').addClass("collapsed");
                $('#group-36701507').addClass("collapsed");
                $(rightPanel).animate({right: rightValue+'px'}, 2000);
            }
        );

        /* Events */

        $('#btn-cart-update').bind('click', function(e) {
            e.preventDefault();

            $('#update')[0].click();
        });

        $('#btn-cart-addtoorder').bind('click', function(e) {
            e.preventDefault();

            $('#add_to_cart')[0].click();
        });

        $('#btn-cart-startover').bind('click', function(e) {
            e.preventDefault();

            $('#start_over')[0].click();
        });

        $('#btn-cart-save').bind('click', function(e) {
            e.preventDefault();

            $('#save')[0].click();
        });

        $('#btn-cart-cancelshopping').bind('click', function(e) {
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
        $('body').addClass('jg-page-reportpage');
        $('#jg-topbar-title').text("Report Manager");

        $('.extra-panes').appendTo('.jg-box-maincontent');
        $('.main-pane').appendTo('.jg-box-maincontent');

        // toolbar
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

        // folders
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

        $('.form-label.toolbar').hide();
        $('.refresh-date').closest('table').hide();
        $('#reportManager br').eq(0).remove();

        /* EVENTS */
        $('#jg-tool-report-add').click(function(e) {
            e.preventDefault();

            $('#add')[0].click();
        });
        $('#jg-tool-report-stylesheet').click(function(e) {
            e.preventDefault();

            $('#stylesheet')[0].click();
        });
        $('#jg-tool-report-update').click(function(e) {
            e.preventDefault();

            $('#update')[0].click();
        });
        $('.jg-tool-refresh').click(function(e) {
            e.preventDefault();

            $('#refresh_reporting_data')[0].click();
        });
    }

    /* mobile */

    function mobile_newlayout() {
        var urlarr = url.split('/');
        if (urlarr[3] == "mobile" && urlarr.length == 4) {
            // $('#jg-overlay').hide();
            location.href = "/commerce/buyside/commerce_manager.jsp?bm_cm_process_id=36244034&from_hp=true&_bm_trail_refresh_=true";
            return false;
        }

        pagetitle = $('title').text().toLowerCase().trim();

        if (pagetitle == '') {
            setTimeout(function() {
                mobile_newlayout();
            }, 1000);

            return;
        }

        $('#jg-overlay').hide();
        $('html').addClass('jg-mobilelayout');

        if (pagetitle == 'login') {
            mobile_loginpage();
        }
        else if (pagetitle == 'zuellig pharma order process' || pagetitle == 'zuellig pharma products') {
            $('#tabs').before($("<div class='jg-box-workflow'>")
                .append($("<img src='' class='jg-img-workflow' />"))
            );

            if (pagetitle == 'zuellig pharma order process') {
                if ($('a[href=#tab-draftOrder]').hasClass('active')) {
                    $('.jg-img-workflow').attr('src', '/bmfsweb/zuelligpharmatest1/image/images/vi_order_created_active.png');
                }
                else if ($('a[href=#tab-customerSearch]').hasClass('active')) {
                    $('.jg-img-workflow').attr('src', '/bmfsweb/zuelligpharmatest1/image/images/vi_customer_selected_active.png');
                }
                else if ($('a[href=#tab-pricing]').hasClass('active')) {
                    $('.jg-img-workflow').attr('src', '/bmfsweb/zuelligpharmatest1/image/images/vi_order_submitted_active.png');
                }
            }
            else if (pagetitle == 'zuellig pharma products') {
                $('.jg-img-workflow').attr('src', '/bmfsweb/zuelligpharmatest1/image/images/vi_shoppping_cart_ready_active.png');

                $('#PastOrders, #CurrentCustFav').parent().addClass('jg-box-table');
            }

            // events
            $('.tab-link').click(function() {
                if ($(this).attr('href') == '#tab-draftOrder') {
                    $('.jg-img-workflow').attr('src', '/bmfsweb/zuelligpharmatest1/image/images/vi_order_created_active.png');
                }
                else if ($(this).attr('href') == '#tab-customerSearch') {
                    $('.jg-img-workflow').attr('src', '/bmfsweb/zuelligpharmatest1/image/images/vi_customer_selected_active.png');
                }
                else if ($(this).attr('href') == '#tab-pricing') {
                    $('.jg-img-workflow').attr('src', '/bmfsweb/zuelligpharmatest1/image/images/vi_order_submitted_active.png');
                }

                mobile_adjustcontenttop();
            });

            mobile_adjustcontenttop();
        }
    }

    function mobile_loginpage() {
        var imglogin = $("<img src='https://ndaru.click/ezrx/images/ezrx.png' class='jg-login-logo'>")
            .prependTo('#login-form')
            .after("<span class='jg-login-welcome'>Welcome</span>")
            .append($("<div class='jg-box-login-bottom'>")
                .append($("<img src='https://ndaru.click/ezrx/images/zuellig.png' class='jg-login-logo' />"))
            );

        $('label[for=username], label[for=psword]').hide();
        $('#forgotpassword').insertAfter($('label[for=psword]').next());
        $('footer').hide();
    }

    function mobile_adjustcontenttop() {
        setTimeout(function() {
            $('#header').parent().css('paddingTop', $('#header').outerHeight()).css('margin', '0');
        }, 500);
    }

    /* monic's script */
    function adjust_tooltip() {
        $('td.cell-contractBonus').attr('tooltip', function() {
            return $(this).text()
        });

        //material description
        //for add material page.
        var input_val;
        $('td.cell-materialDescription').attr("tooltip", function(){
            var input_text = $(this).children(".attribute-field-container").children("input");
            input_val = $( input_text ).val();
            return input_val;
        }).mouseenter(function(){
            var input_text = $(this).children(".attribute-field-container").children("input");
            input_val = $( input_text ).val();
            var table = '<table style="text-align:center;width:100%;border-collapse: collapse;"><thead style="padding:5px;font-weight:bold"><tr style="background-color:#EEE;"><th style="border: 1px solid #999;padding:5px;">Material Description</th></thead>';
            table += "<tbody>";
            table += "<tr><td>"+input_val+"</td></tr>";
            table += "</tbody></table>";
            // if ($(this).attr('tooltip') != '') {
            $('#myModal').addClass('hover-modal-content').html(table);
            $('#myModal').css("display", "block");
            // }
            $('.cell-materialDescription').mouseleave(function() {
                $('#myModal').css("display", "none");
            });
        });

        //for order page.
        $("td[id*='part_desc']").each(function(i, data){
            var remove_attr = data.id.split("attr_wrapper");
            var object_span = $( "#readonly"+remove_attr[1] );
            var input_val = object_span.text();
            object_span.attr("tooltip", function(){
                            return input_val;
                        })
                        .html('<i class="fa fa-search" aria-hidden="true" style="padding:15px"></i>'+input_val)
                        .mouseenter(function(){
                            var table = '<table style="text-align:center;width:100%;border-collapse: collapse;"><thead style="padding:5px;font-weight:bold"><tr style="background-color:#EEE;"><th style="border: 1px solid #999;padding:5px;">Material Description</th></thead>';
                            table += "<tbody>";
                            table += "<tr><td>"+input_val+"</td></tr>";
                            table += "</tbody></table>";
                            if ($(this).attr('tooltip') != '') {
                                $('#myModal').addClass("hover-modal-content").html(table);
                                $('#myModal').css("display", "block");
                            }
                            $(this).mouseleave(function() {
                                $('#myModal').css("display", "none");
                            });
                        });
        });

        $('td.cell-contractBonus, td.cell-promotion, td[id*="part_desc"], td.cell-materialDescription')
            .hover(function(e) {
                e.preventDefault();
            })
            .mousemove(function(e) {
                $('#myModal').css('top', e.pageY - $(document).scrollTop() + 10 + 'px').css('left', e.pageX - $(document).scrollLeft() + 10 + 'px');
            });
    }

})( jQuery );