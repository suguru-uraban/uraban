$(function() {
    //PCとSPの切り替え
    function sizeSwitch() {
        var client = $('.js-switch').css('content'),
            $profileBtn = $('<div class="profile_btn js-profileBtn">プロフィール</div>'),
            $profilePoint = $('.profile').find('.js-profileBtn');
        if (client === '"sp"') {
            //プロフィールボタンの設置
            if(!$profilePoint.length) {
                $('.js-header').append($profileBtn);
                $profileBtn.fadeIn(500, profileShow);
            }
        } else {
            $profilePoint.remove();
        }
    }
    sizeSwitch();

    //ウィンドウリサイズした場合の挙動
    $(window).on('resize',function() {
        sizeSwitch();
    });

    //プロフィールボタンの挙動
    function profileShow() {
        var $profileBack = $('<div class="profile_back js-profileBack">閉じる</div>');
        $('.js-profileBtn').on('click',function() {
            $('.js-header').append($profileBack);
            $('.js-profileBack').fadeIn(100, profileHide);
            $('.js-profile').css({
                '-webkit-transform':'translate3d(260px,0,0)', 
                '-webkit-transition':'-webkit-transform 100ms cubic-bezier(0,0,0.25,1)'
            });
        });
    }

    //プロフィールを閉じる挙動
    function profileHide() {
        $('.js-profileBack').on('click',function() {
            $(this).fadeOut(400).queue(function () {
                $(this).remove().dequeue();
            });
            $('.js-profile').css({
                '-webkit-transform':'translate3d(-260px,0,0)', 
                '-webkit-transition':'-webkit-transform 300ms cubic-bezier(0,0,0.25,1)'
            });
            setTimeout(function() {
                $('.js-profile').removeAttr('style');
            }, 400);
        });
    }
});