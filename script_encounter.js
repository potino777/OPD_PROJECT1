const loadingCircleAnim = document.getElementById("loading_circle_anim");
const tvBackground = document.getElementById("tv_background");
const dialogueText = document.getElementById("dialogue_text");

const opponentAnnouncement = document.getElementById("opponent_announcement");

const star = document.getElementById("star");

const warningElement = document.getElementById("warning");
const fireElement = document.getElementById("fire");
const pigeonsElement = document.getElementById("pigeons");
const pazElement = document.getElementById("paz");

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
const oppRussianDrunk = document.getElementById("opp_russiandrunk");
const oppBabushka = document.getElementById("opp_babushka");
const oppWidePutin = document.getElementById("opp_wideputin");

const putinMusic2Intro = new Audio("music/putin_theme2_intro.MP3");
putinMusic2Intro.loop = true;

const putinMusic2Start = new Audio("music/putin_theme2_start.MP3");

const putinMusic2 = new Audio("music/putin_theme2.MP3");
putinMusic2.loop = true;

async function imageIterator (frames, element, ms) {
    for (const newSrc of frames) {
        element.src = newSrc;
        
        await delay(ms);
    }
}

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

    //tvBackground.style.display = "none";
    loadingCircleAnim.style.display = "none";

    attackButton.style.display = "none";
    
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
    continueButton.style.display = "none";

    attackButton.style.display = "block";
    callButton.style.display = "block";

    dialogueText.style.left = "32vw";
    dialogueText.style.width = "50vw";
}

function setStandingStandPoint (pos) {
    if (oppStandingStandPoint == pos || blockedStandPoints[pos]) {return null};

    standingStandPoint = pos;

    star.style.left = standPointPositions[pos-1].toString() + "vw";
}
function setDamagingStandPoint (pos) {
    if (canPlaceDamagingStandPoint) {
        if (finalAttack && blockedStandPoints[pos]) {
            // good luck bro
        }
        else {
            damagingStandPoint = pos;

            standPoints[pos-1].style.border = ".3vh solid red";

            canPlaceDamagingStandPoint = false;
        }
    }
}

function standPointClicked (pos) {
    if (!attackEntered) {return null};
    
    if ((damagingStandPoint == 0) && canPlaceDamagingStandPoint) {
        setDamagingStandPoint(pos);
        
        document.dispatchEvent(startOppAttack);
    }
    else {
        setStandingStandPoint(pos);
    }
}
standPoint1.addEventListener("pointerdown", () => standPointClicked(1));
standPoint2.addEventListener("pointerdown", () => standPointClicked(2));
standPoint3.addEventListener("pointerdown", () => standPointClicked(3));
standPoint4.addEventListener("pointerdown", () => standPointClicked(4));

document.addEventListener("keydown", function(event) {
    const key = event.key;

    if (key == "1" || key == "2" || key == "3" || key == "4") {
        standPointClicked(Number(key));
    }
})

let screenIsRed = false;
async function setOppPos (pos) {
    oppStandingStandPoint = pos;

    if (oppStandingStandPoint == 0) {return null};

    if (standingStandPoint == oppStandingStandPoint) {
        damageStandPoint(standingStandPoint);
    }
    if (oppStandingStandPoint == damagingStandPoint) {
        if (finalAttack) {
            blockedStandPoints[pos] = pos;

            const standPoint = standPoints[damagingStandPoint-1]
            standPoint.style.transform = "rotate(0deg)";
            standPoint.src = "images/encounter/opp_wideputin/burning_stand_point.gif";
        }
        else {
            oppHP -= 1;
            document.getElementById("putin_hp_text").textContent = "HP: "+oppHP.toString();

            if (oppHP == 1) {
                finalAttack = true;
            }
        }

        standPoints[damagingStandPoint-1].style.border = "none";

        damagingStandPoint = 0;
    }
}
async function damageStandPoint (pos) {
    if (standingStandPoint != pos) {return null};
    
    hp -= 1;
    document.getElementById("self_hp_text").textContent = "HP: "+hp.toString();

    if (hp == 0) {
        location.reload();
    }

    if (!screenIsRed) {
        screenIsRed = true;

        document.body.style.backgroundColor = "rgb(90, 17, 17)";

        await delay(200);
        
        document.body.style.backgroundColor = "rgb(26, 24, 24)";
        
        screenIsRed = false;
    };
}
function damageAndBlockStandPoint (pos) {
    blockedStandPoints[pos] = pos;

    damageStandPoint(pos);
}
let putinTanking = false;
async function enterAttack () {
    continueButton.style.display = "none";

    standPoint1.style.display = "block";
    standPoint2.style.display = "block";
    standPoint3.style.display = "block";
    standPoint4.style.display = "block";

    star.style.display = "block";

    callButton.style.display = "none";
    attackButton.style.display = "none";
    dialogueText.style.display = "none";

    attackEntered = true;
    canPlaceDamagingStandPoint = true;

    let opponentNumber = 0;

    if (oppHP < 6) {
        putinAppearance.src = "images/encounter/wide_putin.gif";

        opponentNumber = 4;
    }
    else {
        opponentNumber = getRandomInt(1, 3);
    }

    opponentAnnouncement.textContent = attackNames[opponentNumber-1]+" INCOMING";
    opponentAnnouncement.style.display = "block";

    await new Promise((resolve) => {
        document.addEventListener("startOppAttack", resolve, { once: true });
    });
    
    await delay(1000);
    
    opponentAnnouncement.style.display = "none";
    
    switch (opponentNumber) {
        case 1:
            oppAttackBear();
            break;
        case 2:
            oppAttackRussianDrunk();
            break;
        case 3:
            oppAttackBabushka();
            break;
        case 4:
            oppAttackWidePutin();
            break;
    }

    await new Promise((resolve) => {
        document.addEventListener("attackEnded", resolve, { once: true });
    });
    
    await delay(1000);

    if (damagingStandPoint != 0) {
        standPoints[damagingStandPoint-1].style.border = "none";

        damagingStandPoint = 0;
    }

    oppStandingStandPoint = 0;

    standPoint1.style.display = "none";
    standPoint2.style.display = "none";
    standPoint3.style.display = "none";
    standPoint4.style.display = "none";

    star.style.display = "none";
    
    warningElement.style.display = "none";

    attackEntered = false;

    dialogueText.style.display = "block";
    
    switch (oppHP) {
        default:
            dialogueText.textContent = "...";
        case 11:
            dialogueText.textContent = "Putin: our culture will defeat any western spy shall one dare challenge us";
            break;
        case 10:
            dialogueText.textContent = "Putin: and you, you must have been sent out of the rotted west to stop our prosperity...";
            break;
        case 9:
            dialogueText.textContent = "Putin: and i am here to tell you, that will NOT happen!";
            break;
        case 8:
            dialogueText.textContent = "Putin: we will keep out any western propaganda out of the country...";
            break;
        case 7:
            dialogueText.textContent = "Putin: even if it takes to block any media consumed by my civilians";
            break;
        case 6:
            dialogueText.textContent = "Putin: i am their protector, their supreme leader, they must worship me";
            break;
        case 5:
            dialogueText.textContent = "Putin: they will do as I SAY";
            break;
        case 4:
            dialogueText.textContent = "Putin: and nobody will ask them";
            break;
        case 3:
            dialogueText.textContent = "Putin: my civilians...";
            break;
        case 2:
            dialogueText.textContent = "Putin: will be my slaves forever.";
            break;
        case 1:
            switch (putinTanking) {
                case false:
                    putinTanking = true;

                    dialogueText.style.left = "20vw";
                    dialogueText.style.width = "70vw";

                    dialogueText.textContent = "Putin: oh you think you can defeat me this easy?";

                    continueButton.style.display = "block";

                    await waitForEvent(continueButton, "click")

                    dialogueText.textContent = "Putin: watch THIS!";

                    await waitForEvent(continueButton, "click")

                    dialogueText.textContent = "*Putin is TANKING the next 3 hits*";

                    continueButton.style.display = "none";
                    break;
                case true:
                    dialogueText.textContent = "...";
                    break;
            }
            break;
    }

    dialogueText.style.left = "32vw";
    dialogueText.style.width = "50vw";

    callButton.style.display = "block";
    attackButton.style.display = "block";
    dialogueText.style.display = "block";
}

let widePutinLastAttackCount = 0;

async function oppAttackWidePutin () {
    putinAppearance.style.display = "none";

    oppWidePutin.style.display = "block";
    oppWidePutin.style.left = "-15vw";

    await delay(1000);

    let movesTotal = getRandomInt(8, 12); //8, 12
    let movesAmount = 0;
    
    let putinSpeed = 150;
    
    oppWidePutin.src = "images/encounter/opp_wideputin/walking_fast.gif";

    while (movesAmount < movesTotal) {
        movesAmount++;

        if (widePutinLastAttackCount == 3) {
            movesTotal = 20;

            if (hp == 1) {
                standPoint4.src = "images/encounter/stand_point.png"
                blockedStandPoints.splice(4-1, 1);

                oppWidePutin.src = "images/encounter/opp_wideputin/walking.gif";

                putinSpeed = 8000;

                async function funcA () {
                    await delay(1000);

                    callButton.style.display = "block";
                }

                funcA();

                async function funcB (pos) {
                    await delay(4000);

                    damageAndBlockStandPoint(pos);
                    const standPoint = standPoints[pos-1];

                    standPoint.style.transform = "rotate(0deg)";
                    standPoint.src = "images/encounter/opp_wideputin/burning_stand_point.gif";
                }

                funcB(1);
                funcB(2);
                funcB(3);
            }
        }

        oppWidePutin.style.transition = `left ${putinSpeed}ms linear`;

        oppWidePutin.style.left = "15vw";
        
        await delay(putinSpeed);

        setOppPos(1);
        setOppPos(0);
        
        oppWidePutin.style.left = "35vw";
        
        await delay(putinSpeed);
        
        setOppPos(2);
        setOppPos(0);

        oppWidePutin.style.left = "55vw";
        
        await delay(putinSpeed);
        
        setOppPos(3);
        setOppPos(0);

        oppWidePutin.style.left = "75vw";

        await delay(putinSpeed);
        
        setOppPos(4);
        setOppPos(0);
        
        oppWidePutin.style.left = "115vw";

        await delay(putinSpeed);
        
        oppWidePutin.style.transition = "";
        oppWidePutin.style.left = "-15vw";

        await delay(100);

        if (finalAttack && (widePutinLastAttackCount < 3)) {
            widePutinLastAttackCount++;

            break;
        }
    }
    
    oppWidePutin.style.display = "none";
    putinAppearance.style.display = "block";

    document.dispatchEvent(attackEnded);
}
async function oppAttackBabushka () {
    async function goToStandPoint (pos) {
        if (oppStandingStandPoint < pos) {
            while (oppStandingStandPoint != pos) {
                setOppPos(oppStandingStandPoint+1);

                oppBabushka.style.left = standPointPositions[oppStandingStandPoint-1].toString()+"vw";

                await delay(300);
            }
        }
        else if (oppStandingStandPoint > pos) {
            while (oppStandingStandPoint != pos) {
                setOppPos(oppStandingStandPoint-1);
                
                oppBabushka.style.left = standPointPositions[oppStandingStandPoint-1].toString()+"vw";

                await delay(300);
            }
        }
        else if (oppStandingStandPoint == pos) {
            setOppPos(oppStandingStandPoint);
            
            await delay(300);
        }
    }

    pazElement.style.left = "0vw";
    pazElement.style.display = "block";

    await delay(500);

    pazElement.style.left = "15vw";

    await delay(500);
    
    pazElement.style.left = "35vw";

    await delay(500);
    
    pazElement.style.left = "55vw";
    
    await delay(500);
    
    pazElement.style.left = "75vw";
    
    await delay(500);
    
    oppBabushka.style.left = "92vw";
    oppBabushka.style.display = "block";
    
    await delay(500);
    
    pazElement.style.display = "none";

    await delay(1000);

    setOppPos(4);
    oppBabushka.style.left = standPointPositions[4-1].toString()+"vw";
    
    await delay(500);

    const semkiThrowFrames = [
        "images/encounter/opp_babushka/semki_throw_frames/1.png",
        "images/encounter/opp_babushka/semki_throw_frames/2.png",
        "images/encounter/opp_babushka/semki_throw_frames/3.png",
        "images/encounter/opp_babushka/semki_throw_frames/4.png",
        "images/encounter/opp_babushka/semki_throw_frames/5.png",
        "images/encounter/opp_babushka/semki_throw_frames/6.png",
        "images/encounter/opp_babushka/semki_throw_frames/7.png",
    ];
    const semkiFrames = [
        "images/encounter/opp_babushka/semki_frames/1.png",
        "images/encounter/opp_babushka/semki_frames/2.png",
        "images/encounter/opp_babushka/semki_frames/3.png",
        "images/encounter/opp_babushka/semki_frames/4.png",
    ];

    const movesTotal = getRandomInt(16, 20);
    let movesAmount = 0;

    let pigeonsActive = false;

    while (movesAmount < movesTotal) {
        movesAmount++;

        const spawnPigeons = getRandomInt(1, 2);

        if (!pigeonsActive && (spawnPigeons == 1) && (oppStandingStandPoint != 3 && oppStandingStandPoint != 4)) {
            pigeonsActive = true;

            let frame = 0;

            for (const newSrc of semkiThrowFrames) {
                frame++;
            
                if (frame == 5) {
                    async function funcA () {
                        const semkiPos = oppStandingStandPoint+1;
                    
                        pigeonsElement.style.display = "block";
                        pigeonsElement.style.left = standPointPositions[semkiPos-1].toString()+"vw";

                        damageAndBlockStandPoint(semkiPos);
                    
                        for (const newSrc of semkiFrames) {
                            pigeonsElement.src = newSrc;

                            await delay(200);
                        }
                    
                        pigeonsElement.src = "images/encounter/opp_babushka/pigeons.gif";

                        await delay(4000);

                        blockedStandPoints.splice(semkiPos, 1);
                        
                        pigeonsElement.style.display = "none";
                        pigeonsActive = false;
                    }

                    funcA();
                }
                oppBabushka.src = newSrc;
            
                await delay(300);
            }

            oppBabushka.src = "images/encounter/opp_babushka/idle.gif";
        }
        else {
            const randomSpot = getRandomInt(1, 4);

            await goToStandPoint(randomSpot);
        }

        await delay(500);
    }

    oppBabushka.style.display = "none";
    pigeonsElement.style.display = "none";
    
    blockedStandPoints.length = 0;

    document.dispatchEvent(attackEnded);
}
async function oppAttackRussianDrunk () {
    oppRussianDrunk.style.display = "block";
    oppRussianDrunk.style.left = "-4vw";
    oppRussianDrunk.style.transform = "scaleX(1)";

    await delay(1000);

    setOppPos(1);

    oppRussianDrunk.style.left = standPointPositions[1-1].toString()+"vw";

    await delay(1000);

    setOppPos(2);

    oppRussianDrunk.style.left = standPointPositions[2-1].toString()+"vw";

    await delay(1000);

    const images = [
        "images/encounter/opp_russiandrunk/animation1_frames/1.png",
        "images/encounter/opp_russiandrunk/animation1_frames/2.png",
        "images/encounter/opp_russiandrunk/animation1_frames/3.png",
        "images/encounter/opp_russiandrunk/animation1_frames/4.png",
        "images/encounter/opp_russiandrunk/animation1_frames/5.png",
        "images/encounter/opp_russiandrunk/animation1_frames/6.png",
        "images/encounter/opp_russiandrunk/animation1_frames/7.png",
        "images/encounter/opp_russiandrunk/animation1_frames/8.png",
        "images/encounter/opp_russiandrunk/animation1_frames/9.png",
        "images/encounter/opp_russiandrunk/animation1_frames/10.png",
    ];
    const images2 = [
        "images/encounter/opp_russiandrunk/animation2_frames/1.png",
        "images/encounter/opp_russiandrunk/animation2_frames/2.png",
        "images/encounter/opp_russiandrunk/animation2_frames/3.png",
        "images/encounter/opp_russiandrunk/animation2_frames/4.png",
        "images/encounter/opp_russiandrunk/animation2_frames/5.png",
        "images/encounter/opp_russiandrunk/animation2_frames/6.png",
    ];
    
    let frame = 0;

    for (const newSrc of images) {
        frame++;

        if (frame == 7) {
            async function funcA () {
                const firePos = getRandomInt(3, 4);

                fireElement.style.display = "block";
                fireElement.style.left = standPointPositions[firePos-1].toString()+"vw";
                
                damageAndBlockStandPoint(firePos);

                for (const newSrc of images2) {
                    fireElement.src = newSrc;
                    
                    await delay(200);
                }

                fireElement.src = "images/encounter/opp_russiandrunk/fire.gif";
            }
            
            funcA();
        }
        oppRussianDrunk.src = newSrc;

        await delay(300);
    }
    
    const movesTotal = getRandomInt(12, 16);
    let movesAmount = 0;

    let previousDirection = 1;

    while (movesAmount < movesTotal) {
        movesAmount++;

        const direction = previousDirection == 1 ? 2: 1;

        previousDirection = direction;

        const burstAmount = 3;

        switch (direction) {
            case 1:
                oppRussianDrunk.style.transform = "scaleX(-1)";

                //await delay(500);

                oppRussianDrunk.src = "images/encounter/opp_russiandrunk/gunfire.gif";

                for (let i = 0; i < burstAmount; i++) {
                    if (!screenIsRed) {
                        damageStandPoint(3);
                        damageStandPoint(4);
                    }

                    await delay(120);
                }
                
                oppRussianDrunk.src = "images/encounter/opp_russiandrunk/aiming.png";
                
                await delay(60);
                break;
            case 2:
                oppRussianDrunk.style.transform = "scaleX(1)";

                //await delay(500);

                oppRussianDrunk.src = "images/encounter/opp_russiandrunk/gunfire.gif";
                
                for (let i = 0; i < burstAmount; i++) {
                    if (!screenIsRed) {
                        damageStandPoint(1);
                    }
                    
                    await delay(120);
                }

                oppRussianDrunk.src = "images/encounter/opp_russiandrunk/aiming.png";
                
                await delay(60);
                break;
        }

        await delay(500);
    }

    oppRussianDrunk.src = "images/encounter/opp_russiandrunk/idle.gif";
    oppRussianDrunk.style.display = "none";
    fireElement.style.display = "none";
    
    blockedStandPoints.length = 0;

    document.dispatchEvent(attackEnded);
}
async function oppAttackBear () {
    oppBear.style.display = "block";

    const startDirection = getRandomInt(1, 2);
    const startOffset = 16;

    const playBalalaika = getRandomInt(1, 3);

    async function move (direction, pos) {
        if (pos == null) {
            switch (direction) {
                case 1:
                    pos = oppStandingStandPoint+1
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

            switch (sprintAttackAmount > sprintAttackTotal) {
                case true:
                    oppBear.style.left = (normalPos+offset*operator+offset2*operator).toString()+"vw";
            
                    await delay(500*speedMultiplier);
                
                    oppBear.style.left = (normalPos-offset*operator+offset2*operator).toString()+"vw";
                    break;
                case false:
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

    async function main (pos, operator, transform) {
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
    
    const movesTotal = getRandomInt(30, 45);
    let movesAmount = 0;

    const sprintAttackTotal = 5;
    let sprintAttackAmount = 0;

    const onGoingSprintAttackTotal = 10;
    let onGoingSprintAttackAmount = 0;

    let speedMultiplier = 1;

    let attackState = "Chase";

    let previousDirection = 0;
    
    async function mainThing () {
        while (movesAmount < movesTotal) {
            movesAmount++;
            sprintAttackAmount++;

            if (sprintAttackAmount+1 > sprintAttackTotal) {
                warningElement.style.display = "block";
            }
            if (sprintAttackAmount > sprintAttackTotal) {
                onGoingSprintAttackAmount++;

                speedMultiplier = .4;
                attackState = "Rush";

                if (onGoingSprintAttackAmount > onGoingSprintAttackTotal) {
                    sprintAttackAmount = 0;
                    onGoingSprintAttackAmount = 0;

                    warningElement.style.display = "none";
                    
                    speedMultiplier = 1;
                    attackState = "Chase";
                }
            }

            await delay(600*speedMultiplier);

            let direction;
            
            if (oppStandingStandPoint == 1) {
                direction = 1;
            }
            else if (oppStandingStandPoint == 4) {
                direction = 2;
            }
            else if (attackState == "Chase") {
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
            else if (attackState == "Rush") {
                direction = previousDirection;
            }
            
            previousDirection = direction;
            move(direction);
        }

        warningElement.style.display = "none";
        oppBear.style.display = "none";
        
        document.dispatchEvent(attackEnded);
    }
        
    switch (startDirection) {
        case 1:
            main(1, -1, "scaleX(-1)");
            break;
        case 2:
            main(4, 1, "scaleX(1)");
            break;
    }
}
const startOppAttack = new CustomEvent("startOppAttack", {});
const attackEnded = new CustomEvent("attackEnded", {});

const standPoints = [standPoint1, standPoint2, standPoint3, standPoint4];
const standPointPositions = [15, 35, 55, 75];
const blockedStandPoints = [];

const attackNames = [
    "BEAR",
    "RUSSIAN DRUNK",
    "BABUSHKA",
    "WIDE PUTIN",
]

let finalAttack = false;

let hp = 6;
let oppHP = 12;

let attackEntered = false;

let standingStandPoint = 0;
let damagingStandPoint = 0;

let oppStandingStandPoint = 0;

let dialogueOptionTextClicked = 0;
let skipBeginning = false;

let canPlaceDamagingStandPoint = true;

let regenCount = 0;

dialogueText.addEventListener("click", function () {
    skipBeginning = true;
})
attackButton.addEventListener("click", enterAttack);
callButton.addEventListener("click", usePhone);

async function usePhone () {
    if (!attackEntered) {
        showDialogueOptions()

        dialogueOptionText1.textContent = "*Call for help*";
        dialogueOptionText2.textContent = "*check a picture of Levi in your gallery*";
        dialogueOptionText3.textContent = "";

        await buttonsListener([dialogueOptionText1, dialogueOptionText2, dialogueOptionText3]);

        showTalk();

        switch (dialogueOptionTextClicked) {
            case 1:
                dialogueText.textContent = "*you tried to call for help, but the cell service and the internet are blocked by Putin*"

                await waitForEvent(continueButton, "click");

                dialogueText.textContent = "Putin: harsh world environment creates harsh measures to protect our citizens, including the complete blocking of social media!";

                break;
            case 2:
                regenCount = Math.min(4, regenCount+1);

                switch (regenCount) {
                    case 1:
                        dialogueText.textContent = "*seeing Levi gives you a feeling of increased strength*";
                
                        await waitForEvent(continueButton, "click");
                
                        dialogueText.textContent = "*2 HP regenerated! (max HP: 6)*";

                        hp = Math.min(6, hp+2);
                        document.getElementById("self_hp_text").textContent = "HP: "+hp.toString();

                        await waitForEvent(continueButton, "click");
                
                        dialogueText.textContent = "Putin: you are so pretty yet so silly, Levi won't be coming to save you today.";
                        break;
                    case 2:
                        dialogueText.textContent = "*seeing Levi motivates you to keep fighting so you can keep seeing his face some more*";

                        await waitForEvent(continueButton, "click");

                        dialogueText.textContent = "*2 HP regenerated! (max HP: 6)*";

                        hp = Math.min(6, hp+2);
                        document.getElementById("self_hp_text").textContent = "HP: "+hp.toString();

                        await waitForEvent(continueButton, "click");

                        dialogueText.textContent = "Putin: keep praying to a fictional hero, you silly woman";
                        break;
                    case 3:
                        dialogueText.textContent = "*seeing Levi gives you hope that he will come by to save you*";

                        await waitForEvent(continueButton, "click");

                        dialogueText.textContent = "*2 HP regenerated! (max HP: 6)*";

                        hp = Math.min(6, hp+2);
                        document.getElementById("self_hp_text").textContent = "HP: "+hp.toString();
                        break;
                    case 4:
                        dialogueText.textContent = "*seeing Levi's face so many times makes reality hit you...*";

                        await waitForEvent(continueButton, "click");

                        dialogueText.textContent = "*you remember that he's a fictional character and your feelings are faded out*";

                        await waitForEvent(continueButton, "click");

                        dialogueText.textContent = "*HP regeneration is no more*";
                        break;
            }
        }

        await waitForEvent(continueButton, "click");

        enterAttack();
    }
    else {
        dialogueText.style.display = "block";
        continueButton.style.display = "block";

        callButton.style.display = "none";

        dialogueText.textContent = "CELL SERVICE AVAILABLE";

        await waitForEvent(continueButton, "click");

        dialogueText.textContent = 'NEW MESSAGE FROM IBA: "come let me moisture ur lips w my tongue"';
        
        await waitForEvent(continueButton, "click");
        
        dialogueText.textContent = `NEW MESSAGE FROM UNKNOWN CONTACT: "hey aren't you 7 years younger than me? happy birthday!"`;

        await waitForEvent(continueButton, "click");

        dialogueText.textContent = `NEW MESSAGE FROM HOT VOICE COUSIN: "HAPPY BIRTHDAY HONEY"`;

        await waitForEvent(continueButton, "click");

        dialogueText.textContent = `NEW MESSAGE FROM RUSSIA: "i didn't call you ugly btw ur rlly beautiful!!"`;

        await waitForEvent(continueButton, "click");

        dialogueText.textContent = `NEW MESSAGE FROM UNKNOWN CONTACT: "⚡ HOLD ONTO YOUR HATS! ⚡ The SALE You've Been Dreaming Of Is HERE!"`;

        await waitForEvent(continueButton, "click");

        dialogueText.textContent = "NEW CONTACT: LEVI ACKERMAN";

        await waitForEvent(continueButton, "click");

        dialogueText.style.display = "none";
        continueButton.style.display = "none";

        dialogueOptionText1.style.display = "block";
        dialogueOptionText2.style.display = "block";
        dialogueOptionText3.style.display = "block";

        dialogueOptionText1.textContent = "call for help";
        dialogueOptionText2.textContent = "...";
        dialogueOptionText3.textContent = "...";

        await waitForEvent(dialogueOptionText1, "click");
        
        dialogueOptionText1.textContent = "go to contacts";
        dialogueOptionText2.textContent = "...";
        dialogueOptionText3.textContent = "...";
        
        await waitForEvent(dialogueOptionText1, "click");
        
        dialogueOptionText1.textContent = "Contact: Levi Ackerman";
        dialogueOptionText2.textContent = "...";
        dialogueOptionText3.textContent = "...";
        
        await waitForEvent(dialogueOptionText1, "click");
        
        dialogueOptionText1.textContent = "Call: Levi Ackerman";
        dialogueOptionText2.textContent = "...";
        dialogueOptionText3.textContent = "...";
        await waitForEvent(dialogueOptionText1, "click");
        
        dialogueOptionText1.textContent = "Call: Levi Ackerman";
        dialogueOptionText2.textContent = "...";
        dialogueOptionText3.textContent = "...";
        
        hp = 100;

        await waitForEvent(dialogueOptionText1, "click");

        window.location.href = "finish.html";
    }
}
async function start () {
    dialogueText.textContent = "click continue to continue OR click this text and THEN click continue to skip the beginning dialogue";

    await waitForEvent(continueButton, "click");

    putinAppearance.style.display = "block";

    if (!skipBeginning) {
    putinMusic2Intro.play();

    dialogueText.textContent = "*Vladimir Putin appears!*";

    await waitForEvent(continueButton, "click");

    dialogueText.textContent = 'that video, and actually, any other part of the internet i deem "unsafe';

    await waitForEvent(continueButton, "click");

    dialogueText.textContent = "you will not need to watch them and you will not be able to watch them";

    await waitForEvent(continueButton, "click");

    dialogueText.textContent = "all of that is dirty western media that corrupts the brains of my citizens with all the propaganda";

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
    
    document.getElementById("self_icon").style.display = "block";
    document.getElementById("putin_icon").style.display = "block";
    document.getElementById("self_hp_text").style.display = "block";
    document.getElementById("putin_hp_text").style.display = "block";

    showActions();

    continueButton.style.display = "none";
    
    dialogueText.textContent = "*Vladimir Putin declares battle!*";

    putinAppearance.style.height = "64vh";

    await waitForEvent(callButton, "click");
}

document.addEventListener("keydown", function(event) {
    const key = event.key;

    if (key == "9") {
        hp = 10;
    }
})

setStandingStandPoint(1);
start();
