(function($) {

    var url, pagetitle;

    $(document).ready(function() {
        url = window.location.href;
        pagetitle = $('title').text().toLowerCase();

        setTimeout(function() {
            if (!$('html').hasClass('ui-mobile')) {
                desktop_newlayout();
            }
            else {
                mobile_newlayout();
            }
        }, 1000);
    });

    function desktop_newlayout() {
        /* UI */
        if (pagetitle.toLowerCase() == 'shopping cart' || pagetitle.toLowerCase() == 'model configuration') {

            materialWarning();
            refPORed();
        }
    }

    function materialWarning(){
        var elem = document.getElementById('materialArrayset');
        if (elem !== null) {
            var table = elem.children[0];
            var tbody = table.children[1];
            var trList = tbody.children;

            /**Array.from(trList).forEach(tr=>{
                **/
            for(var i = 0, max = trList.length; i < max; i++) {

                var tr = trList[i];

                var inStock = tr.querySelector(".cell-inStock").querySelector('input[name="inStock"]');
                var qtyText = tr.querySelector(".cell-qty_text").querySelector('input[name="qty_text"]');
                var inStockSpan = tr.querySelector(".cell-inStock").querySelector('span');
                var overridePrice = tr.querySelector(".cell-overridePrice").querySelector('input[name="overridePrice"]');

                if(inStock.value.toLowerCase() == "no")
                {
                    qtyText.classList.add('sc-no-stock');
                    inStockSpan.classList.add('sc-no-stock');
                }

                if(tr.querySelector(".cell-overridePrice").querySelector('input[name="overridePrice"]').value.toLowerCase() != "0.0")
                {
                    overridePrice.classList.add('sc-zero-stock');
                }
            }
        }

    }

    function refPORed(){
        var customerPORefParent = $("label[for='customerPORef_t']");
        var customerPORef = customerPORefParent[0];
        customerPORef.querySelector('span').classList.add('sc-red-po-ref');
        //var customerPORefLabel = customerPORef.children("label");
        //var selector = customerPORefLabel.selector;
        // var style = selector.style.add('sc-red-po-ref');
    }

    /* mobile */
    function mobile_newlayout() {

    }


    $(document).ready(function(){
        $('.sc-zero-stock:contains("0.0")').css('background-color', 'red');
        $('.sc-zero-stock:not(:contains("0.0"))').css('background-color', 'white');
        $('.sc-no-stock:contains("No")').css('background-color', 'red');
        $('.sc-no-stock:contains("Yes")').css('background-color', 'white');
    });

})( jQuery );