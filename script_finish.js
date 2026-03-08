const theEndVideo = document.getElementById("the_end_video");
const bdayVideoFull = document.getElementById("bday_video");

const tvBackground = document.getElementById("tv_background");

const playButton = document.getElementById("playvideo_button");

let clickedPlayButton = false;

playButton.addEventListener("click", () => {
    if (clickedPlayButton) {return null}

    clickedPlayButton = true;

    theEndVideo.style.display = "block";
    theEndVideo.play();
})
theEndVideo.addEventListener("ended", () => {
    theEndVideo.style.display = "none";

    bdayVideoFull.style.display = "block";
    tvBackground.style.display = "block";

    document.body.style.backgroundColor = "rgb(26, 24, 24)";

    bdayVideoFull.play();
})