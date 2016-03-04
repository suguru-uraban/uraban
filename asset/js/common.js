$(function() {
    //PCとSPの切り替え
    function sizeSwitch() {
        var client = $('.js-switch').css('content'),
            $profileBtn = $('<div class="profile_btn js-profileBtn">プロフィール</div>'),
            $menuBtn = $('<div class="menu_btn js-menuBtn">メニュー</div>'),
            $profilePoint = $('.js-profileBtn'),
            $menuPoint = $('.js-menuBtn');
        if (client === '"sp"') {
            //プロフィールボタンの設置
            if((!$profilePoint.length) && (!$menuPoint.length)) {
                $('.js-header').after($profileBtn).after($menuBtn);
                $profileBtn.fadeIn(400, profileShow);
                $menuBtn.fadeIn(400, menuShow);
            }
        } else {
            $profilePoint.remove();
            $menuPoint.remove();
        }
    }
    sizeSwitch();

    //ウィンドウリサイズした場合の挙動
    $(window).on('resize',function() {
        sizeSwitch();
    });

    //プロフィールボタンの挙動
    function profileShow() {
        var $profileBack = $('<div class="profile_back js-back">閉じる</div>');
        $('.js-profileBtn').on('click',function() {
            $('.js-header').after($profileBack);
            $('.js-back').fadeIn(100, sideHide);
            $('.js-profile').css({
                '-webkit-transform':'translate3d(260px,0,0)', 
                '-webkit-transition':'-webkit-transform 100ms cubic-bezier(0,0,0.25,1)'
            });
        });
    }

    //メニューボタンの挙動
    function menuShow() {
        var $menuBack = $('<div class="menu_back js-back">閉じる</div>');
        $('.js-menuBtn').on('click',function() {
            $('.js-header').after($menuBack);
            $('.js-back').fadeIn(100, sideHide);
            $('.js-menu').css({
                '-webkit-transform':'translate3d(-260px,0,0)', 
                '-webkit-transition':'-webkit-transform 100ms cubic-bezier(0,0,0.25,1)'
            });
        });
    }

    //プロフィール、メニューを閉じる挙動
    function sideHide() {
        $('.js-back').on('click',function() {
            $(this).fadeOut(300).queue(function () {
                $(this).remove().dequeue();
            });
            if($(this).hasClass('profile_back')) {
                $('.js-profile').css({
                    '-webkit-transform':'translate3d(-260px,0,0)', 
                    '-webkit-transition':'-webkit-transform 200ms cubic-bezier(0,0,0.25,1)'
                });
                setTimeout(function() {
                    $('.js-profile').removeAttr('style');
                }, 300);
            } else if($(this).hasClass('menu_back')) {
                $('.js-menu').css({
                    '-webkit-transform':'translate3d(260px,0,0)', 
                    '-webkit-transition':'-webkit-transform 200ms cubic-bezier(0,0,0.25,1)'
                });
                setTimeout(function() {
                    $('.js-menu').removeAttr('style');
                }, 300);
            }
        });
    }
});