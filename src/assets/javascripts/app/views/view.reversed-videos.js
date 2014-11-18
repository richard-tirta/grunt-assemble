
VIEW.REVERSED = (function(){

	var reversed = {};

	reversed.videoStoryPlay = function(videoAs, videoBs, index, direction) {

		var isContentUpdated = false;

		function onContentUpdate() {
			$('.animation-module').eq(CONTROLLER.MAIN.index).children('.content-text').addClass('show');
			isContentUpdated = true;
		}

		function onVideoAsUpdate() {
			videoAs.progress = parseFloat(videoAs.player.currentTime).toFixed(2);
			//console.log(videoAs.progress)

			if(videoAs.progress >= videoAs.pause - 2 && !isContentUpdated) {
				onContentUpdate();
			}

			if(videoAs.progress >= videoAs.pause) {
				videoAs.player.pause();
				videoAs.currentTime = videoAs.pause;

				videoAs.player.removeEventListener('timeupdate', onVideoAsUpdate, false);

				CONTROLLER.MAIN.canScroll = true;
				isContentUpdated = false;
			}
		}

		function onVideoBsUpdate() {
			videoBs.progress = parseFloat(videoBs.player.currentTime).toFixed(2);
			//console.log(videoBs.progress)

			if(videoBs.progress >= videoBs.pause - 2) {
				onContentUpdate();
			}

			if(videoBs.progress >= videoBs.pause) {
				console.log(videoBs.progress, videoBs.pause);
				videoBs.player.pause();
				videoBs.currentTime = videoBs.pause;

				videoBs.player.removeEventListener('timeupdate', onVideoBsUpdate, false);

				CONTROLLER.MAIN.canScroll = true;
				isContentUpdated = false;
			}
		}

		videoAs.player.currentTime = videoAs.start;
		videoBs.player.currentTime = videoBs.start;
		$('.animation-module .content-text').removeClass('show');

		if(direction === "up"){
			$(videoAs.player).removeClass('selected');
			$(videoBs.player).addClass("selected");

			videoBs.player.play();

			videoBs.player.addEventListener('timeupdate', onVideoBsUpdate, false);
		} else {
			$(videoBs.player).removeClass('selected');
			$(videoAs.player).addClass("selected");

			videoAs.player.play();

			videoAs.player.addEventListener('timeupdate', onVideoAsUpdate, false);
		}
	}

	return reversed;

}(window));