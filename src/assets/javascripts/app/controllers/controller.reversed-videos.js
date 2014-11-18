
CONTROLLER.REVERSED = (function(){

	var reversed = {}

	reversed.videoAs = {
		player: undefined,
		table: [0, 4, 7.5, 9, 11, 13, 13.5, 16],
		start: 0,
		pause: 0,
		progress: 0
	}

	reversed.videoBs = {
		player: undefined,
		table: [16, 12, 8.5, 7, 5, 3, 2.5, 0],
		start: 0,
		pause: 0,
		progress: 0
	}

	reversed.onScroll = function(direction, index, click) {

		if(direction ==='down' && click ) {
			this.videoAs.start = this.videoAs.table[index - 1];
			this.videoAs.pause = this.videoAs.table[index];

			this.videoBs.start = this.videoBs.table[index];
			this.videoBs.pause = this.videoBs.table[index + 1];
		} else {
			this.videoAs.start = this.videoAs.table[index];
			this.videoAs.pause = this.videoAs.table[index + 1];

			this.videoBs.start = this.videoBs.table[index + 1];
			this.videoBs.pause = this.videoBs.table[index];
		}
			

		VIEW.REVERSED.videoStoryPlay(this.videoAs, this.videoBs, index, direction);
	}

	reversed.init = function() {

		this.videoAs.player = document.getElementById('video-bg-forward');
		this.videoBs.player = document.getElementById('video-bg-backward');
		
		this.videoAs.player.addEventListener('loadedmetadata', function() {
			CONTROLLER.MAIN.initNavListener();
		});

		this.videoBs.player.addEventListener('loadedmetadata', function() {
		});
	}

	return reversed;

}(window));