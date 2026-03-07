const playvideoButton = document.getElementById("playvideo_button");
const bdayVideo = document.getElementById("bday_video");
const loadingCircleAnim = document.getElementById("loading_circle_anim");
const dialogueText = document.getElementById("dialogue_text");

const putinAppearance = document.getElementById("putin_appearance");

const putinMusic = new Audio("music/putin_theme.mp3");
putinMusic.volume = .5;

const speedUpThisBoringStuff = 1;
bdayVideo.playbackRate = 1;

function delay (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let clickedPlayButton = false;

playvideoButton.addEventListener("click", () => {
    if (clickedPlayButton) {return null}

    clickedPlayButton = true;

    bdayVideo.play();
})
bdayVideo.addEventListener("ended", async function () {
    await delay(2000*speedUpThisBoringStuff);
    
    loadingCircleAnim.style.display = "block";

    await delay(2000*speedUpThisBoringStuff);
    
    dialogueText.textContent = "hey";

    await delay(4000*speedUpThisBoringStuff);
    
    dialogueText.textContent = "is that a video you're watching?";
    
    await delay(4000*speedUpThisBoringStuff);
    
    dialogueText.textContent = "better question..";
    
    await delay(2000*speedUpThisBoringStuff);
    
    putinMusic.play();
    
    await delay(2000*speedUpThisBoringStuff);
    
    dialogueText.textContent = "as that the internet you're using right now?";
    
    await delay(4000*speedUpThisBoringStuff);

    dialogueText.textContent = "oh dear don't you know that,";
    
    await delay(4000*speedUpThisBoringStuff);
    
    dialogueText.textContent = "we russians don't do that here";
    
    await delay(4000*speedUpThisBoringStuff);
    
    dialogueText.textContent = "the internet is full of all that extremist western propaganda rotting the minds of our citizens";
    
    await delay(2000*speedUpThisBoringStuff);
    
    dialogueText.textContent = "and therefore";
    
    await delay(4000*speedUpThisBoringStuff);
    
    dialogueText.textContent = "it is my JOB to block everything";
    
    await delay(4000*speedUpThisBoringStuff);
    
    dialogueText.textContent = "that is remotely considered...";
    
    await delay(4000*speedUpThisBoringStuff);
    
    dialogueText.textContent = '"harmful"';
    
    await delay(4000*speedUpThisBoringStuff);
    
    dialogueText.textContent = "to my people.";
    
    await delay(4000*speedUpThisBoringStuff);
    
    dialogueText.textContent = "now you may wanna know the name of such a hero like me";
    
    await delay(4000*speedUpThisBoringStuff);
    
    dialogueText.textContent = "but...";
    
    await delay(3000*speedUpThisBoringStuff);
    
    dialogueText.textContent = "...";
    
    await delay(3000);

    putinAppearance.style.display = "block";
    putinAppearance.style.height = "60vh";

    await delay(1000);
    
    putinAppearance.style.height = "70vh";

    await delay(1000);
    
    putinAppearance.style.height = "80vh";

    await delay(1000);
    
    putinAppearance.style.height = "90vh";

    await delay(1000);
    
    putinAppearance.src = "images/encounter/putin.gif";
    dialogueText.textContent = "i am pretty sure you already know my name";

    await delay(6000);

    window.location.href = "encounter.html";
})