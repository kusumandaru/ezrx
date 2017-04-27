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