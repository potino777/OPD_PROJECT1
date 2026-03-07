const loadingCircleAnim = document.getElementById("loading_circle_anim");
const tvBackground = document.getElementById("tv_background");
const dialogueText = document.getElementById("dialogue_text");

const star = document.getElementById("star");

const warningElement = document.getElementById("warning");

const attackButton = document.getElementById("attack_button")
const continueButton = document.getElementById("continue_button");
const callButton = document.getElementById("call_button");

const dialogueOptionText1 = document.getElementById("dialogue_option_text1");
const dialogueOptionText2 = document.getElementById("dialogue_option_text2");
const dialogueOptionText3 = document.getElementById("dialogue_option_text3");

const standPoint1 = document.getElementById("stand_point1");
const standPoint2 = document.getElementById("stand_point2");
const standPoint3 = document.getElementById("stand_point3");
const standPoint4 = document.getElementById("stand_point4");

const putinAppearance = document.getElementById("putin_appearance");

const oppBear = document.getElementById("opp_bear");

const putinMusic2Intro = new Audio("music/putin_theme2_intro.mp3");
putinMusic2Intro.loop = true;

const putinMusic2Start = new Audio("music/putin_theme2_start.mp3");

const putinMusic2 = new Audio("music/putin_theme2.mp3");
putinMusic2.loop = true;
            
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function delay (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function waitForEvent(element, eventName) {
    return new Promise((resolve) => {
        element.addEventListener(eventName, resolve, { once: true });
    });
}
function buttonsListener (buttons) {
    return new Promise((resolve) => {

        function handleClick(event) {
            for (const button of buttons) {
                button.removeEventListener('click', handleClick);
            }
            
            resolve(event.target);
        }
        
        for (const button of buttons) {
            button.addEventListener('click', handleClick);
        }
    });
}
{
    function callback (number) {
        dialogueOptionTextClicked = number;
    }

    dialogueOptionText1.addEventListener("click", () => callback(1));
    dialogueOptionText2.addEventListener("click", () => callback(2));
    dialogueOptionText3.addEventListener("click", () => callback(3));
}
function showDialogueOptions () {
    dialogueText.style.display = "none";
    continueButton.style.display = "none";

    callButton.style.display = "none";

    tvBackground.style.display = "none";
    loadingCircleAnim.style.display = "none";
    
    dialogueOptionText1.style.display = "block";
    dialogueOptionText2.style.display = "block";
    dialogueOptionText3.style.display = "block";
}
function showTalk () {
    dialogueText.style.left = "20vw";
    dialogueText.style.width = "70vw";

    dialogueText.style.display = "block";
    continueButton.style.display = "block";
    
    dialogueOptionText1.style.display = "none";
    dialogueOptionText2.style.display = "none";
    dialogueOptionText3.style.display = "none";
}
function showActions () {
    attackButton.style.display = "block";
    callButton.style.display = "block";

    dialogueText.style.left = "32vw";
    dialogueText.style.width = "50vw";
}

function setStandingStandPoint (pos) {
    if (oppStandingStandPoint == pos) {return null};
    
    standingStandPoint = pos;
    
    star.style.left = standPointPositions[pos-1].toString() + "vw";
}
function setDamagingStandPoint (pos) {
    damagingStandPoint = pos;

    standPoints[pos-1].style.border = ".3vh solid red";
}

function standPointClicked (pos) {
    if (!attackEntered) {return null};
    
    if (damagingStandPoint == 0) {
        setDamagingStandPoint(pos);

        document.dispatchEvent(startOppAttack);
    }
    else {
        setStandingStandPoint(pos);
    }
}
standPoint1.addEventListener("click", () => standPointClicked(1));
standPoint2.addEventListener("click", () => standPointClicked(2));
standPoint3.addEventListener("click", () => standPointClicked(3));
standPoint4.addEventListener("click", () => standPointClicked(4));

document.addEventListener("keydown", function(event) {
    const key = event.key;

    if (key == "1" || key == "2" || key == "3" || key == "4") {
        standPointClicked(Number(key));
    }
})

function setOppPos (pos) {
    oppStandingStandPoint = pos;

    if (standingStandPoint == oppStandingStandPoint) {
        // damage mechanic here
    }
}
async function enterAttack () {
    standPoint1.style.display = "block";
    standPoint2.style.display = "block";
    standPoint3.style.display = "block";
    standPoint4.style.display = "block";

    star.style.display = "block";

    callButton.style.display = "none";
    attackButton.style.display = "none";
    dialogueText.style.display = "none";

    attackEntered = true;

    await new Promise((resolve) => {
        document.addEventListener("startOppAttack", resolve, { once: true });
    });
    
    await delay(1000);

    oppAttackBear();
}
async function oppAttackBear () {
    oppBear.style.display = "block";

    const startDirection = getRandomInt(1, 2);
    const startOffset = 16;

    const playBalalaika = getRandomInt(1, 3);

    async function starting (pos, operator, transform) {
        oppBear.style.left = (standPointPositions[pos-1]+startOffset*operator).toString()+"vw";
        oppBear.style.transform = transform;

        if (playBalalaika == 1) {
            oppBear.src = "images/encounter/opp_bear/balalaika.gif";
            oppBear.style.height = "35vh";

            await delay(5000);
            
            oppBear.style.height = "20vh";
            oppBear.src = "images/encounter/opp_bear/idle.png";
        }

        await delay(1000);
        
        oppBear.src = "images/encounter/opp_bear/roaring.png";
        oppBear.style.height = "35vh";

        await delay(500);

        oppBear.src = "images/encounter/opp_bear/running.gif";
        oppBear.style.height = "20vh";

        move(startDirection, pos);

        mainThing();
    }

    async function move (direction, pos) {
        if (pos == null) {
            switch (direction) {
                case 1:
                    pos = oppStandingStandPoint+1;
                    break;
                case 2:
                    pos = oppStandingStandPoint-1;
                    break;
            }
        }

        const offset = 4;

        async function move2 (operator, offset2, transform) {
            setOppPos(pos);

            oppBear.style.transform = transform;

            const normalPos = standPointPositions[oppStandingStandPoint-1]

            switch (onGoingSprintAttackAmount > onGoingSprintAttackTotal) {
                case 1:
                    oppBear.style.left = (normalPos+offset*operator+offset2*operator).toString()+"vw";
            
                    await delay(500*speedMultiplier);
                
                    oppBear.style.left = (normalPos-offset*operator+offset2*operator).toString()+"vw";
                    break;
                case true, false:
                    oppBear.style.left = (normalPos+offset2*operator).toString()+"vw";
            }
        }
        switch (direction) {
            case 1:
                move2(-1, 4, "scaleX(-1)");
                break;
            case 2:
                move2(1, 0, "scaleX(1)");
                break;
        }
    }

    const movesTotal = getRandomInt(50, 51);
    let movesAmount = 0;

    let sprintAttackTotal = 5;
    let sprintAttackAmount = 0;

    let onGoingSprintAttackTotal = 10;
    let onGoingSprintAttackAmount = 0;

    let specialAttackActive = false;

    let speedMultiplier = 1;
    
    async function mainThing () {
        while (movesAmount < movesTotal) {
            movesAmount++;
            sprintAttackAmount++;

            if (sprintAttackAmount > sprintAttackTotal) {
                onGoingSprintAttackAmount++;
                
                warningElement.style.display = "block";

                specialAttackActive = true;

                if (onGoingSprintAttackAmount > onGoingSprintAttackTotal) {
                    sprintAttackAmount = 0;
                    onGoingSprintAttackAmount = 0;

                    warningElement.style.display = "none";
                    
                    specialAttackActive = false;
                }
            }

            await delay(600*speedMultiplier);

            let direction;
            let pos;
            
            if (specialAttackActive) {
                if (oppStandingStandPoint == 1) {
                    direction = 1;
                }
                else if (oppStandingStandPoint == 4) {
                    direction = 2;
                }
                else {
                    if (standingStandPoint < oppStandingStandPoint) {
                        direction = 2;
                    }
                    else if (standingStandPoint > oppStandingStandPoint) {
                        direction = 1;
                    }
                    else if (standingStandPoint == oppStandingStandPoint) {
                        direction = getRandomInt(1, 2);
                    }
                }
            }
            else {
                if (oppStandingStandPoint+1 == standingStandPoint) {
                    direction = 1;
                }
                else if (oppStandingStandPoint+2 == standingStandPoint) {
                    direction = 1;
                }
            }

            move(direction);
        }
    }
        
    switch (startDirection) {
        case 1:
            starting(1, -1, "scaleX(-1)");
            break;
        case 2:
            starting(4, 1, "scaleX(1)");
            break;
    }
}
const startOppAttack = new CustomEvent("startOppAttack", {});

const standPoints = [standPoint1, standPoint2, standPoint3, standPoint4];
const standPointPositions = [15, 35, 55, 75];

let attackEntered = false;

let standingStandPoint = 0;
let damagingStandPoint = 0;

let oppStandingStandPoint = 0;

let dialogueOptionTextClicked = 0;
let skipBeginning = false;

dialogueText.addEventListener("click", function () {
    skipBeginning = true;
})
attackButton.addEventListener("click", enterAttack);

async function start () {
    dialogueText.textContent = "click continue to continue OR click this text and THEN click continue to skip the beginning dialogue";

    await waitForEvent(continueButton, "click");

    putinAppearance.style.display = "block";

    if (!skipBeginning) {
    putinMusic2Intro.play();

    dialogueText.textContent = "*Vladimir Putin appears!*";

    await waitForEvent(continueButton, "click");

    dialogueText.textContent = "you won't need to watch that video till the end";

    await waitForEvent(continueButton, "click");

    dialogueText.textContent = "after all i am only trying to protect my russian citizens";

    await waitForEvent(continueButton, "click");

    dialogueText.textContent = "that dirty western media corrupts their brains with all the propaganda";

    await waitForEvent(continueButton, "click");
    
    dialogueOptionText1.textContent = "*Insist on finishing the video*";
    dialogueOptionText2.textContent = "*Confess love*";
    dialogueOptionText3.textContent = '"fuck off"';

    showDialogueOptions();

    await buttonsListener([dialogueOptionText1, dialogueOptionText2, dialogueOptionText3]);

    showTalk();

    switch(dialogueOptionTextClicked) {
        case 1:
            dialogueText.textContent = "why do you wanna finish the video?";

            await waitForEvent(continueButton, "click");

            dialogueText.textContent = "does that video contain instructions from western agencies aimed towards professional espionage within the borders of the Russian Federation?";

            await waitForEvent(continueButton, "click");

            dialogueText.textContent = "who are you...";

            await waitForEvent(continueButton, "click");

            dialogueText.textContent = "a western spy?";

            await waitForEvent(continueButton, "click");

            dialogueText.textContent = "sorry lady but i'll have to step in";

            await waitForEvent(continueButton, "click");

            dialogueText.textContent = "to eliminate you";

            await waitForEvent(continueButton, "click");
            break;
        case 2:
            dialogueText.textContent = "!..";

            await waitForEvent(continueButton, "click");

            dialogueText.textContent = "what are you talking about?";

            await waitForEvent(continueButton, "click");

            dialogueText.textContent = "why would a foreigner confess love to me?";

            await waitForEvent(continueButton, "click");

            dialogueText.textContent = "...";

            await waitForEvent(continueButton, "click");

            dialogueText.textContent = "only to deceive me";

            await waitForEvent(continueButton, "click");

            dialogueText.textContent = "to make me pull my guard down and create an opportunity to stab me in the back!";

            await waitForEvent(continueButton, "click");

            dialogueText.textContent = "i know what game you are playing...";

            await waitForEvent(continueButton, "click");

            dialogueText.textContent = "the americans must've sent you trick me";

            await waitForEvent(continueButton, "click");

            dialogueText.textContent = "you cowardish american spy";

            await waitForEvent(continueButton, "click");

            dialogueText.textContent = "i will have to kill you for this.";

            await waitForEvent(continueButton, "click");
            break;
        case 3:
            dialogueText.textContent = "...";

            await waitForEvent(continueButton, "click");

            dialogueText.textContent = "i will not stand such disrespect";

            await waitForEvent(continueButton, "click");

            dialogueText.textContent = "you are not only disrespecting me";

            await waitForEvent(continueButton, "click");

            dialogueText.textContent = "you are disrespecting my people";

            await waitForEvent(continueButton, "click");

            dialogueText.textContent = "that is something that only a brainwashed westerner would do";

            await waitForEvent(continueButton, "click");

            dialogueText.textContent = "or worse...";

            await waitForEvent(continueButton, "click");

            dialogueText.textContent = "a foreign spy!";

            await waitForEvent(continueButton, "click");

            dialogueText.textContent = "you wanna know the punishment for being a western spy on russian land?";

            await waitForEvent(continueButton, "click");

            dialogueText.textContent = "death.";

            await waitForEvent(continueButton, "click");
    }
    }

    putinMusic2Intro.pause();
    putinMusic2Start.play();

    putinMusic2Start.addEventListener("ended", function () {
        putinMusic2.play();
    })

    //tvBackground.style.display = "block";
    //loadingCircleAnim.style.display = "block";

    showActions();

    continueButton.style.display = "none";
    
    dialogueText.textContent = "*Vladimir Putin declares battle!*";

    putinAppearance.style.height = "64vh";

    await waitForEvent(callButton, "click");
}

start();
setStandingStandPoint(1);