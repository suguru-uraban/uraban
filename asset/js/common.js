$(function() {
	//PCとSPの切り替え
	var client = $('.js-switch').css('content');
	if (client === '"sp"') {
		//プロフィールボタンの設置
   		var $profileBtn = $('<div class="profile_btn js-profile">プロフィール</div>');
   		$('.profile').append($profileBtn);
   		$profileBtn.fadeIn(500, profileDisplay);
   		//プロフィールボタンの挙動
   		function profileDisplay() {
   			$('.js-profile').on('click',function() {
   				console.log('できた');
   			});
   		}
  	}
});