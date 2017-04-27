
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
        if (pagetitle == '') {
            setTimeout(function() {
                mobile_newlayout();
            }, 2000);

            return;
        }

        /* hide element if jg-overlay */
        $('#jg-overlay').hide();
        /* add class jg-mobilelayout */
        $('html').addClass('jg-mobilelayout');

        /* if pagetutle login then call function mobile_loginpage */
        if (pagetitle == 'login') {
            mobile_loginpage();
        }else{
            /* if pagetitle commerce then call transform_mainlayout and transform_orderspage */
            if (pagetitle == 'commerce management') {
                transform_mainlayout();
                transform_orderspage();
                mobile_commerce_management();
            }
            else if( pagetitle == "zuellig pharma products" || pagetitle == "zuellig pharma order process" ){
                /* 
                    if the value is zuellig pharma producst or zuelling pharma order process then
                    styling for view
                 */

                /*$("h1.ui-title").css({
                    "background": "#004A5B",
                    "color": "#fff",
                });
                $("span#quote-total").css({
                    "color": "#fff"
                });
                $(".jg-mobilelayout #header a.ui-btn-left").css({
                    "background": "#00575D",
                    "width": "30px",
                    "margin-left": "10px",
                    "padding-top": "10px",
                    "padding-left": "10px",
                });

                $(".jg-mobilelayout #header a.ui-btn-left span").css({
                    "background": 'url("'+rootFolder+'/image/images/lsm_home_icon.png")',
                    "background-repeat": "no-repeat",
                });*/
            }
            
            if (pagetitle == 'zuellig pharma order process') {

                /*console.log("execute");
                try{
                    console.log("try and catch");
                    setTimeout( function(){
                        console.log("execute tap");
                        $( document ).ajaxStop(function() {
                          $("a.tab-link").on("tap", function(){
                                console.log( $(this) );
                                if ($(this).attr('href') == '#tab-pricing') {
                                    console.log("tab tapping");
                                    setTimeout( function(){
                                        console.log("tab pricing active");
                                        var customerPORefParent = $("label[for='customerPORef_t']");
                                        var customerPORef = customerPORefParent[0];
                                        $(customerPORef).css("color","red");
                                    }, 4000 );
                                };
                            });
                        });
                    }, 4000 );
                }catch(err){
                    console.log(err);
                }*/
                /*$('.tab-link').bind("tap", function() {
                    
                });*/
            }
            /*
            else if (pagetitle == 'model configuration') {
                transform_modelconfig();
            }
            else if (pagetitle == "report manager") {
                transform_reportpage();
            }*/
            mobile_adjustcontenttop();
        }
        
            /*$('#tabs').before($("<div class='jg-box-workflow'>")
                .append($("<img src='' class='jg-img-workflow' />"))
            );

            if (pagetitle == 'zuellig pharma order process') {
                if ($('a[href=#tab-draftOrder]').hasClass('active')) {
                    $('.jg-img-workflow').attr('src', rootFolder+'/image/images/vi_order_created_active.png');
                }
                else if ($('a[href=#tab-customerSearch]').hasClass('active')) {
                    $('.jg-img-workflow').attr('src', rootFolder+'/image/images/vi_customer_selected_active.png');
                }
                else if ($('a[href=#tab-pricing]').hasClass('active')) {
                    $('.jg-img-workflow').attr('src', rootFolder+'/image/images/vi_order_submitted_active.png');
                }
            }
            else if (pagetitle == 'zuellig pharma products') {

                $(".jg-box-workflow").hide();
                // $('.jg-img-workflow').attr('src', rootFolder+'/image/images/vi_shoppping_cart_ready_active.png');

                // $('#PastOrders, #CurrentCustFav').parent().addClass('jg-box-table');
            }

            // events
            $('.tab-link').click(function() {
                if ($(this).attr('href') == '#tab-draftOrder') {
                    $('.jg-img-workflow').attr('src', rootFolder+'/image/images/vi_order_created_active.png');
                }
                else if ($(this).attr('href') == '#tab-customerSearch') {
                    $('.jg-img-workflow').attr('src', rootFolder+'/image/images/vi_customer_selected_active.png');
                }
                else if ($(this).attr('href') == '#tab-pricing') {
                    $('.jg-img-workflow').attr('src', rootFolder+'/image/images/vi_order_submitted_active.png');
                }

                mobile_adjustcontenttop();
            });*/
    }

    function mobile_adjustcontenttop() {
        /* give styling on mobile view, and call it after 500 milisecond */
        setTimeout(function() {
            $('#header').parent().css('paddingTop', $('#header').outerHeight()).css('margin', '0');
        }, 500);
    }
