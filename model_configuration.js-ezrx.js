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
	