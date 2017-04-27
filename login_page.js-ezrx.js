	function transform_loginpage() {
        var newlayout = $("<div class='jg-box-login'>")
            .append($("<div class='jg-box-login-inner'>")
                .append($("<img src='"+rootFolder+"/image/images/ezrx.png' class='jg-login-logo' />"))
                .append($("<span class='jg-login-welcome'>Welcome</span>"))
            )
            .append($("<div class='jg-box-login-bottom'>")
                .append($("<img src='"+rootFolder+"/image/images/zuellig.png' class='jg-login-logo' />"))
            )

            .prependTo('body');

        $('form[name=loginform]').appendTo('.jg-box-login-inner');
        $('input[name=username]').attr("placeholder", "Username");
        $('input[name=psword]').attr("placeholder", "Password");
        $('#login-form-head').remove();
        $('.login-links').insertBefore($('.login-button'));

        $('.extra-panes, .main-pane, #footer').hide();
    }

    function mobile_loginpage() {

        /*
            give image for logo, and styling for login form.
        */
        /*
            Start : 17 April 2017
            Task  : Custom Login page on mobile
            Page  : Login Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Mobile

            change logo for mobile, change position and styling.
        */
        var imglogin = $("<img src='"+rootFolder+"/image/images/logo-ezrx-mobile.png' class='jg-login-logo'>")
            .prependTo('#login-form')
            .after("<span class='jg-login-welcome'>Hello,<br/>Please Login</span>")
            /*.append($("<div class='jg-box-login-bottom'>")
                .append($("<img src='"+rootFolder+"/image/images/zuellig.png' class='jg-login-logo' />"))
            );*/
        /* add class login-mobile-box on main-content element */
        $("#main-content").addClass('login-mobile-box');
        /* hide element of label username and psword */
        $('label[for=username], label[for=psword]').hide();
        /* add element forgot password */
        $('#forgotpassword').insertAfter($('label[for=psword]').next().next());
        /* hide element footer */
        $('footer').hide();
        /*
            End : 17 April 2017
            Task  : Custom Login page on mobile
            Page  : Login Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Mobile
        */
        /*
            Start : 18 April 2017
            Task  : Custom Login page on mobile
            Page  : Login Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Mobile

            give animation on mobile login page, focus on username and password.
        */
          $("#login-form").attr("autocomplete","off");

          $("<div id='mobile-login-animation' style='position:fixed;top:0;right:0;bottom:0;left:0;background-color:#fff;z-index:2;display:none;' ></div>").insertBefore("#jg-overlay");
          $("#mobile-login-animation").append("<div id='form-login-animation' style='position:fixed;bottom:0;right:0;left:0;width:auto;padding:0px 100px 20px 100px;' ></div>");
          var textHeaderLogo = "<div style='height:70px!important;' ><span class='jg-login-welcome' style='float:left!important;margin:25px 0px 0px 0px!important;' >Hello, Please Login</span><img src='"+
                                rootFolder+"/image/images/logo-ezrx-mobile.png' class='jg-login-logo'></div>";
          var loginForm = "<div style='width:100%;float:left;' ><input type='text' name='focus_username' id='id_focus_username' class='focus-item' style='padding:10px 20px;font-size:18px;border-radius:5px;width:40%;' autocomplete='off' placeholder='Username' >"+
                          "<input type='password' name='focus_password' id='id_focus_password' class='focus-item' style='padding:10px 20px;font-size:18px;border-radius:5px;width:40%;float:right;' autocomplete='off' placeholder='password' ></div>";
          var loginButton = "<div style='width: 100%;float:left;margin-top:15px;height:40px;' ><div style='margin:0px auto; width:200px;background:#B8C942;border-radius:5px;' data-corners='true' data-shadow='true' data-iconshadow='true' data-wrapperels='span' data-theme='c' data-disabled='false' class='ui-submit ui-btn ui-btn-up-c ui-shadow ui-btn-corner-all' aria-disabled='false'>"+
                            "<span class='ui-btn-inner'>"+
                            "<span class='ui-btn-text'>Log In</span>"+
                            "</span>"+
                            "<button class='ui-block-b ui-btn-hidden' id='login_mobile_animation' data-disabled='false'>Log In</button>"+
                            "</div>"+
                            "<div id='forgotpassword' style='position:relative;right:0px;bottom:45px;' >"+
                              "<a href='/mobile/reset-password' data-transition='slide' class='ui-link'>Forgot password?</a>"+
                            "</div>"
                            "</div>";

           // $("#mobile-login-animation").append("<>")

          $("#form-login-animation").append( $(textHeaderLogo) )
                                    .append( $(loginForm) )
                                    .append( $(loginButton) );

          var _originalSize = $(window).width() + $(window).height();
          var statusOpen = false;

          function keyboardShow(){
            setTimeout(function(){
                console.log( statusOpen );

                if($(window).width() + $(window).height() != _originalSize){
                  if( !statusOpen ){
                    statusOpen = true;
                    console.log("keyboard show up");
                    $("#mobile-login-animation").show();
                    $("#id_focus_username").focus();
                  }
                }
              }, 1000);
          }

          function keyboardHide(){
            setTimeout( function(){
                statusOpen = false;
                console.log("keyboard closed");
                $("#mobile-login-animation").hide();
            }, 1000 );
          }

          console.log( _originalSize );
          $("input.ui-input-text").on("click", function(){
            console.log( "on tap" );
            keyboardShow();
          });

          $("#login_mobile_animation").on("click", function(){
            $("#username").val( $("#id_focus_username").val() );
            $("#password").val( $("#id_focus_password").val() );
            console.log( $("#username").val() );
            console.log( $("#password").val() );
            $("#login-form").children('.ui-submit').children('button').click();
          });
        
        /*
            End : 17 April 2017
            Task  : Custom Login page on mobile
            Page  : Login Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Mobile
        */

    }