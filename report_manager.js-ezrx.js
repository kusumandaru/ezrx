	function transform_reportpage() {
        /* add class jg-pg-reportpage */
        $('body').addClass('jg-page-reportpage');
        /* add text 'Report Manager' on element jg-topbar-title */
        $('#jg-topbar-title').text("Report Manager");
        /* move element class extra-panes to jg-box-maincontent */
        $('.extra-panes').appendTo('.jg-box-maincontent');
        /* move element class main-pane to jg-box-maincontent */
        $('.main-pane').appendTo('.jg-box-maincontent');

        // toolbar
        /* add custom button add, update, stylsheet, refresh, default, favorite, trash, edit */
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

        // get list folder and override href to default link
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

        /* hide element of form-label has class .toolbar */
        $('.form-label.toolbar').hide();
        /* hide element table in element of class .refresh-date */
        $('.refresh-date').closest('table').hide();
        /* remove element of br in element has id reportManager */
        $('#reportManager br').eq(0).remove();

        /* EVENTS */
        /* custom report add button */
        $('#jg-tool-report-add').click(function(e) {
            e.preventDefault();

            $('#add')[0].click();
        });

        /* custom report stylesheet button */
        $('#jg-tool-report-stylesheet').click(function(e) {
            e.preventDefault();

            $('#stylesheet')[0].click();
        });

        /* custom update button */
        $('#jg-tool-report-update').click(function(e) {
            e.preventDefault();

            $('#update')[0].click();
        });

        /* custom refresh button */
        $('.jg-tool-refresh').click(function(e) {
            e.preventDefault();

            $('#refresh_reporting_data')[0].click();
        });
    }
	