;(function($) {
    //変数格納
    var $win = $(window),
        $switch = $('.js-switch'),
        $nav = $('.js-nav li'),
        timer = false;

    //PCナビゲーションの処理
    $.fn.pcNavHover = function() {
        return this.each(function() {
            var $this = $(this);
            //hover時の挙動
            $this.off().on({
                'mouseenter':function() {
                    $this.addClass('navEnter navBefore');
                    setTimeout(function() {
                        $this.removeClass('navBefore').addClass('navAfter on');
                    },190);
                    setTimeout(function() {
                        $this.addClass('on');
                    },290);
                    setTimeout(function() {
                        $this.removeClass('navEnter navAfter');
                    },300);
                },
                'mouseleave':function() {
                    $this.addClass('navLeave navBefore');
                    setTimeout(function() {
                        $this.removeClass('navBefore on').addClass('navAfter');
                    },190);
                    setTimeout(function() {
                        $this.removeClass('on');
                    },290);
                    setTimeout(function() {
                        $this.removeClass('navLeave navAfter');
                    },300);
                }
            });
        });
    };

    //SPナビゲーションの処理
    $.fn.spNavClick = function() {
        return this.each(function() {
            var $this = $(this);
            //click時の挙動
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
})(jQuery);