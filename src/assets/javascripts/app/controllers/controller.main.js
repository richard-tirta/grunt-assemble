var CONTROLLER = CONTROLLER || {}
CONTROLLER.MAIN = (function(){

	var main = {}

	var _isTouch = $("html").hasClass("touch");
		_playType = undefined;

	main.canScroll = true;
	main.index = 0;
	main.storyNav = undefined;
	main.panelIndex = 0;

	main.onScroll = function(direction, click) {

		if(direction === 'up' && !click) {
			main.index--;
		}

		this.canScroll = false;

		if( _playType === 'reversedVideos') {
			CONTROLLER.REVERSED.onScroll(direction, main.index, click);
		} else if (_playType === 'splitVideos') {
			CONTROLLER.SPLIT.onScroll(direction, main.index, click);
		} else {
			CONTROLLER.SEQUENCE.onScroll(direction, main.index, click);
		}

		if(direction === 'down' && !click) {
			main.index++;
		}


		VIEW.MAIN.updateStoryNav(main.storyNav, main.index);
	}

	main.scrollListen = function() {

		function onMouseWheel (event) {
			event.preventDefault();
			event.stopPropagation();

			if(event.deltaY > 0  &&  main.index > 0 && main.canScroll){
				main.onScroll("up");
			} else if(event.deltaY < 0 && main.index < main.panelIndex - 1 && main.canScroll){
				main.onScroll("down");
			}
		}

		$(document).on('mousewheel', onMouseWheel);

		document.addEventListener('keydown', function(e){
			if(e.keyCode === 38 && main.index > 0 && main.canScroll) {
				e.preventDefault();
				e.stopPropagation();
				main.onScroll('up');
			} else if(e.keyCode === 40 && main.index < main.panelIndex - 1 && main.canScroll) {
				e.preventDefault();
				e.stopPropagation();
				main.onScroll('down');
			}
		});

	}

	main.swipeListen = function() {
		var initialTouchY,
			newTouchY;

		document.addEventListener('touchstart', function(e){
			initialTouchY = e.changedTouches[0].screenY;

			e.preventDefault();
			e.stopPropagation();
		}, false);

		document.addEventListener('touchend', function(e){

			newTouchY = e.changedTouches[0].screenY;

			if(initialTouchY > newTouchY && main.index < main.panelIndex - 1 && main.canScroll) {
				console.log('swipe up');
				main.onScroll('down');
			} else if (initialTouchY < newTouchY && main.index > 0 && main.canScroll) {
				console.log('swipe down');
				main.onScroll('up');
			}

			e.preventDefault();
			e.stopPropagation();

		}, false);
	}

	main.listenStoryNav = function() {

		$(main.storyNav).on('click', function(e) {
			var curIndex = main.index;

			main.index = parseInt(this.dataset.index);

			if(curIndex < main.index) {
				main.onScroll('down', true);
			} else {
				main.onScroll('up', true);
			}
			
		});
	}

	main.initNavListener = function() {
		if( !_isTouch) {
			main.scrollListen();
		} else {
			main.swipeListen();
		}
		
		main.listenStoryNav();
	}

	main.init = function() {

		var productStory = document.getElementById('product-story');
		main.storyNav = $('#story-nav a');

		$(".animation-module").each(function(i){
			main.panelIndex++;
		});

		if($(productStory).hasClass('reversed-videos')) {
			_playType = 'reversedVideos';
			CONTROLLER.REVERSED.init();
		} else if ($(productStory).hasClass('split-videos')) {
			_playType = 'splitVideos';
			CONTROLLER.SPLIT.init();
		} else {
			_playType = 'jpegSequence';
			CONTROLLER.SEQUENCE.init();
		}
	}


	$(document).ready(function(){
		main.init();
	});

	return main;

}(window));