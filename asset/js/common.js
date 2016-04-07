;(function($) {
    //PCナビゲーションの処理
    $.fn.pcNavHover = function() {
        return this.each(function() {
            var $this = $(this);
            $this.off().on({
                'mouseenter':function() {
                    console.log('aaa');
                },
                'mouseleave':function() {
                    console.log('bbb');
                }
            });
        });
    };

    //SPナビゲーションの処理
    $.fn.spNavClick = function() {
        return this.each(function() {
            var $this = $(this);
            $this.off().on({
                'mouseenter':function() {
                    console.log('ccc');
                },
                'mouseleave':function() {
                    console.log('ddd');
                }
            });
        });
    };
})(jQuery);

$(function() {
    //変数格納
    var $win = $(window),
        $switch = $('.js-switch'),
        $nav = $('.js-nav li'),
        timer = false;

    //PCとSPの切り替え
    $win.on('load resize', function() {
        if (timer !== false) {
            clearTimeout(timer);
        }
        timer = setTimeout(function() {
            if (!$switch.is(':visible')) {
                $nav.pcNavHover();
            } else {
                $nav.spNavClick();
            }
        }, 300);
    });
});