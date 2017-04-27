	
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
            var valueOfBonus = $(this).text();
            if ($(this).text().trim() != '') {
                button_helper = '<i class="material-lens" aria-hidden="true" ></i>';
            } else {
                button_helper = '-';
            }
            $(this).children('.attribute-field-container').children('span').html(button_helper);
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
            var valueOfPromotion = $(this).text();
            /* get the text of value of promotion
                if value is not null then button helper is lens icon
                if it is null then button helper is -
                then replace html with button helper
            */
            if ($(this).text().trim() != '') {
                button_helper = '<i class="material-lens" aria-hidden="true" ></i>';
            } else {
                button_helper = '-';
            }
            $(this).children('.attribute-field-container').children('span').html(button_helper);
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