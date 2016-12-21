/*================ Get elements:  ================*/

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');

const progress = player.querySelector('.progress');
const progress_bar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skip_buttons = player.querySelectorAll('[data-skip');
const ranges = player.querySelectorAll('.player__slider');

/*================ Section: Build out functions ================*/

// Toggle play on/off
function toggle_play() {
	if (video.paused) {
		video.play();
	} else {
		video.pause();
	}
}

function update_button() {
	const icon = this.paused ? '►' : '❚ ❚';
	toggle.textContent = icon; // toggle button; defined above
}

function skip() {
	console.log('skipping');
	console.log(this.dataset.skip);
	video.currentTime += parseFloat(this.dataset.skip);
}

function handle_range_update() {
	video[this.name] = this.value;
}

function handle_progress() {
	const percent = (video.currentTime / video.duration ) * 100;

	progress_bar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
	console.log(e);
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
}

/*================ Section: Hook up event listeners ================*/
video.addEventListener('click', toggle_play);

video.addEventListener('play', update_button);
video.addEventListener('pause', update_button);

toggle.addEventListener('click', toggle_play);

skip_buttons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handle_range_update));
ranges.forEach(range => range.addEventListener('mousemove', handle_range_update));


// Listen for video to emit TimeUpdate - when timecode changes
video.addEventListener('timeupdate', handle_progress);


let mouse_down = false;
// Listen for movement of the progress update
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mouse_down && scrub(e) );


progress.addEventListener('mousedown', () => mouse_down = true);
progress.addEventListener('mouseup', () => mouse_down = false);