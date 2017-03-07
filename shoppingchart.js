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
        if (pagetitle.toLowerCase() == 'shopping cart') {

            var elem = document.getElementById('materialArrayset');
            var table = elem.children[0];
            var tbody = table.children[1];
            var trList = tbody.children;

            Array.from(trList).forEach(tr=>
            {
                if(tr.querySelector(".cell-inStock").querySelector('input[name="inStock"]').value.toLowerCase() == "no")
                {
                    var qtyText = tr.querySelector(".cell-qty_text").querySelector('input[name="qty_text"]');
                    qtyText.classList.add('sc-no-stock');
                    var inStock = tr.querySelector(".cell-inStock").querySelector('span');
                    inStock.classList.add('sc-no-stock');
                }
            });
        }
    }

    /* mobile */

    function mobile_newlayout() {

    }

})( jQuery );