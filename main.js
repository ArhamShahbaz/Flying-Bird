import Raven from "./raven.js";
import Explosion from "./explosion.js";
// import Attack from "./attack.wav"

const mainCanvas = document.getElementById('mainCanvas');
const ctx= mainCanvas.getContext("2d");
mainCanvas.style.background= 'lightblue';
mainCanvas.width= window.innerWidth;
mainCanvas.height= window.innerHeight;
let ravens = [];
let previousTimeStamp = 0;
const timeInterval=1000;
let timeCounter=0;
let explosions =[];

const gameStats= {
    gameOver : false,
    score : 0
}

const attack = new Audio();
attack.src = "attack.wav";
function handleRaven(){
    ravens.push(new Raven(ctx, {
        x: mainCanvas.width,
        y: Math.random() *( mainCanvas.height -194)
    }, Math.random()*10, gameStats));

}
function addRaven(deltaTime){
    if(timeCounter>=timeInterval){
        timeCounter=0;
        handleRaven();
    }else {
        timeCounter+= deltaTime;
    }
}

window.addEventListener("click", (e) => {
   ravens.forEach((raven) => {
       if(e.offsetX>= raven.position.x && e.offsetX<= raven.position.x + raven.spriteWidth &&
           e.offsetY>= raven.position.y && e.offsetY<= raven.position.y + raven.spriteHeight){
           raven.markForDeletion= true;
           attack.play();
           explosions.push(new Explosion(ctx,{x: e.offsetX, y: e.offsetY}));
           gameStats.score++;
       }
   })
});

function drawScore(){
    ctx.font = "40px Fantasy";

    ctx.fillStyle = "black";
    ctx.fillText("Score : " + gameStats.score , 50 , 80);

    ctx.fillStyle = "orange";
    ctx.fillText("Score : " + gameStats.score , 52 , 82);
}

function drawGameOver(){
    ctx.textAlign = "center";
    ctx.font = "60px Fantasy";
    const x = mainCanvas.width *0.5;
    const y = mainCanvas.height * 0.5;
    ctx.fillStyle = "black";
    ctx.fillText("Game Over!  " , x , y);

    ctx.fillStyle = "orange";
    ctx.fillText("Game Over!  "  , x + 2, y + 2);
}
function animate(timeStamp) {
    ctx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
    const deltaTime=timeStamp-previousTimeStamp;
    previousTimeStamp=timeStamp;
    addRaven(deltaTime);
    const objects= [...ravens, ...explosions].filter((object) => !object.markForDeletion);
    objects.forEach(object => {
        object.update();
    });
    drawScore();
    if(!gameStats.gameOver) {
        requestAnimationFrame(animate);
    }else{
        drawGameOver();
    }
}
animate(0);
