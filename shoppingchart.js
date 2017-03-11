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
        }
        if (pagetitle.toLowerCase() == 'transaction') {
            refPORed();
        }
    }

    function materialWarning(){
        materialArraySet();
        additionalMaterialArraySet();
    }

    function materialArraySet(){
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
                var qty = tr.querySelector(".cell-qty_text").querySelector('input[name="qty_text"]');
                var inStockSpan = tr.querySelector(".cell-inStock").querySelector('span');
                var price = tr.querySelector(".cell-price").querySelector('input[name="price"]');
                var overridePrice = tr.querySelector(".cell-overridePrice").querySelector('input[name="overridePrice"]');
                var type = tr.querySelector(".cell-type").querySelector('input[name="type"]');
                var stockQty = tr.querySelector(".cell-stockQty").querySelector('input[name="stockQty"]');

                if(inStock.value.toLowerCase() == "no")
                {
                    inStockSpan.classList.add('sc-no-stock');
                } else {
                    inStockSpan.classList.remove('sc-no-stock');
                }

                if(parseInt(overridePrice.value) != parseInt(price.value))
                {
                    overridePrice.classList.add('sc-zero-stock');
                } else {
                    overridePrice.classList.remove('sc-zero-stock');
                }

                if(parseInt(qty.value) > parseInt(stockQty.value) && qty.value != "")
                {
                    qty.classList.add('sc-zero-stock');
                } else {
                    qty.classList.remove('sc-zero-stock');
                }
            }
        }
    }

    function additionalMaterialArraySet(){
        var elem = document.getElementById('additionalMaterialArrayset');
        if (elem !== null) {
            var table = elem.children[0];
            var tbody = table.children[1];

            if (tbody != null) {

                var trList = tbody.children;

                for (var i = 0, max = trList.length; i < max; i++) {

                    var tr = trList[i];

                    var inStock = tr.querySelector(".cell-inStockAdditional").querySelector('input[name="inStockAdditional"]');
                    var qty = tr.querySelector(".cell-additionalMaterialQty").querySelector('input[name="additionalMaterialQty"]');

                    var stockQty = tr.querySelector(".cell-stockQty_Additional").querySelector('input[name="stockQty_Additional"]');

                    var inStockSpan = tr.querySelector(".cell-inStockAdditional").querySelector('span');
                    var inStockInput = tr.querySelector(".cell-inStockAdditional").querySelector('input');

                    var typeInput = tr.querySelector(".cell-type_additional").querySelector('input[name="type_additional"]');
                    var typeSelect = tr.querySelector(".cell-type_additional").querySelector('select[name="type_additional"]');

                    var inStockData = inStockSpan != null ? inStockSpan : inStockInput;
                    var inStockValue = inStockSpan != null ? inStockSpan.innerText : inStockInput.value;
                    var typeData = typeInput != null ? typeInput : typeSelect;
                    var typeValue = typeInput != null ? typeInput.value : typeSelect.value;

                    if (inStockValue.toLowerCase() == "no" && typeValue.toLowerCase() == "bonus") {
                        inStockData.classList.add('sc-no-stock');
                    } else {
                        inStockData.classList.remove('sc-no-stock');
                    }

                    if (parseInt(qty.value) > parseInt(stockQty.value) && qty.value != "") {
                        qty.classList.add('sc-zero-stock');
                    } else {
                        qty.classList.remove('sc-zero-stock');
                    }
                }
            }
        }
    }

    function refPORed(){
        var customerPORefParent = $("label[for='customerPORef_t']");
        var customerPORef = customerPORefParent[0];
        customerPORef.querySelector('span').classList.add('sc-red-po-ref');
    }

    /* mobile */
    function mobile_newlayout() {

    }


    $(document).ready(function(){
        $("td input").on("change", function() {
            materialWarning();
        });
        $("td select").on("change", function() {
            materialWarning();
        });
    });
  
})( jQuery );