var VIEW = VIEW || {}
VIEW.MAIN = (function(){

	var main = {};

	main.videoFullScreen = function() {

		var vidHeight = $(".fullscreen-video").height(),
			vidWidth = $(".fullscreen-video").width(),
			//vidRatio = 2; //use this until all video has same size
			vidRatio = parseFloat(vidWidth/vidHeight).toFixed(2);

		function onResize() {
			var bodyWidth = $('body').width(),
				bodyHeight = $('body').height(),
				bodyRatio = parseFloat(bodyWidth/bodyHeight).toFixed(2);

			if(bodyRatio > 1.75 && bodyRatio < 2.0) {
				bodyRatio = parseFloat(2.1).toFixed(2); //normalize awkward ratios
			}

			if(bodyRatio > vidRatio) {
				var vidHeight = Math.round((bodyWidth * 9)/ 16);

				$(".fullscreen-video").width("100%").height(vidHeight).css("margin-left", "0");
			} else {
				
				var vidWidth = Math.round((bodyHeight * 16)/9),
					offset = Math.round((bodyWidth - vidWidth)/2);

				$(".fullscreen-video").width(vidWidth).height("100%").css("margin-left", offset);
			}
		}

		$(window).resize(function(){
			onResize();
		});

		onResize();

	}

	main.updateStoryNav = function(el, index) {
		$(CONTROLLER.MAIN.storyNav).removeClass('selected');
		$(CONTROLLER.MAIN.storyNav).eq(index).addClass('selected');
	}

	main.init = function() {
		main.videoFullScreen();
	}


	$(document).ready(function(){
		console.log("=== View: story ready ===");
		main.init();
	});

	return main;

}(window));