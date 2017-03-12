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
            hideVisualProgress();
        }
        if (pagetitle.toLowerCase() == 'transaction') {
            refPORed();
        }
    }

    function hideVisualProgress(){
        document.getElementById('field_wrapper_1_visualWorkflow').style.display = 'none';           // Hide
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
            var theader = table.children[0];
            var theadList = theader.children;
            var trList = tbody.children;

            for(var i = 0, max = theadList.length; i < max; i++) {
                 var thead = theadList[i];

                 addHeaderDelete(thead);
            }

            for(var i = 0, max = trList.length; i < max; i++) {

                var tr = trList[i];
                addDelete(tr);

                var inStock = tr.querySelector(".cell-inStock").querySelector('input[name="inStock"]');
                var qty = tr.querySelector(".cell-qty_text").querySelector('input[name="qty_text"]');
                var inStockSpan = tr.querySelector(".cell-inStock").querySelector('span');
                var price = tr.querySelector(".cell-price").querySelector('input[name="price"]');
                var overridePrice = tr.querySelector(".cell-overridePrice").querySelector('input[name="overridePrice"]');
                var stockQty = tr.querySelector(".cell-stockQty").querySelector('input[name="stockQty"]');

                var typeInput = tr.querySelector(".cell-type").querySelector('input[name="type"]');
                var typeSelect = tr.querySelector(".cell-type").querySelector('select[name="type"]');
                var typeData = typeInput != null ? typeInput : typeSelect;

                if(inStockSpan != null){
                    if(inStock.value.toLowerCase() == "no")
                    {
                        inStockSpan.classList.add('sc-no-stock');
                    } else {
                        inStockSpan.classList.remove('sc-no-stock');
                    }
                }

                if(parseInt(overridePrice.value) != parseInt(price.value) && parseInt(overridePrice.value) != 0)
                {
                    overridePrice.classList.add('sc-zero-stock');
                } else {
                    overridePrice.classList.remove('sc-zero-stock');
                }

                if(parseInt(qty.value) > parseInt(stockQty.value) && qty.value != "" && typeData.value.toLowerCase() == "comm")
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

    function addHeaderDelete(thead){
        if(thead.childNodes[thead.children.length-1].className.search('array-remove-cell') < 0) { //if not contain
            var thDelete = document.createElement('th');
            thDelete.classList.add('array-remove-cell');
            thead.appendChild(thDelete);
        }
    }

    function addDelete(tr){
        if(tr.childNodes[tr.children.length-1].className.search('array-remove-cell') < 0) { //if not contain
            var tdDelete = document.createElement('td');
            tdDelete.classList.add('array-remove-cell');

            var aDelete = document.createElement('a');
            aDelete.classList.add('array-remove');
            aDelete.classList.add('delete-btn');

            aDelete.setAttribute("click", function(e) {
                e.preventDefault();
                deleteRow(tr);
            });
            tdDelete.appendChild(aDelete);

            var buttonbox = tr.appendChild(tdDelete);
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

    function deleteRow(tr){
        tr.remove();
    }

    function deleteRow(){
        $("#materialArrayset").find(".array-remove").click;
    }

    $(document).ready(function(){
        $("td input").on("change", function() {
            materialWarning();
        });
        $("td select").on("change", function() {
            materialWarning();
        });
        $('input[name=materialDescription]').hover(function(){
            if( $(this).val().length === 0 ) {
                $(this).autocomplete();
            }
        }, function(){

        });
    });

})( jQuery );
