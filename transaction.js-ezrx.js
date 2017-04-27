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

        /*
            Create and styling template for search customer, and create same environment with default search customer.
            Create element for result search customer.
        */
        var parentOfSearchCustomer = $( searchCustomer ).parent();
        //hide searchCustomer 
        $( searchCustomer ).hide();
        //create element
        $("body").append( $("<div id='layer_search_customer' ></div>") );
        $("#layer_search_customer").css({ "position":"fixed", "top":"0", "right":"0", "bottom":"0", "left":"0", "z-index":"99999", "background":"white", "display":"none"});
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
        $(".customer-search").keyup(function(e){
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
        });

        /* this function give animation for form search customer slideDown for showing form, and slideup for hide form and call function doSearch */
        $("#search").on("click", function(){
            if( $("#form_search_customer").css("display") == "none" ){
                $("#form_search_customer").slideDown();
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
            }
        }

        /*
            End   : 29 March 2017
            Task  : Search customer on order page
            Page  : Order Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop  
        */

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