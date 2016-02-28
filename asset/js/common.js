$(function() {
    //PCとSPの切り替え
    function sizeSwitch() {
        var client = $('.js-switch').css('content'),
            $profileBtn = $('<div class="profile_btn js-profile">プロフィール</div>'),
            $profileBreakPoint = $('.profile').find('.js-profile');
        if (client === '"sp"') {
            //プロフィールボタンの設置
            if(!$profileBreakPoint.length) {
                $('.profile').append($profileBtn);
                $profileBtn.fadeIn(500, profileDisplay);
            }
        } else {
            $profileBreakPoint.remove();
        }
    }
    sizeSwitch();

    //ウィンドウリサイズした場合の挙動
    $(window).on('resize',function() {
        sizeSwitch();
    });

    //プロフィールボタンの挙動
    function profileDisplay() {
        $('.js-profile').on('click',function() {
            console.log('できた');
        });
    }
});