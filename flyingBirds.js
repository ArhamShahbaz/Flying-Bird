import Raven from "./raven.js";

const mainCanvas = document.getElementById("mainCanvas");

mainCanvas.style.background = "skyblue";
mainCanvas.width = window.innerWidth;
mainCanvas.height = window.innerHeight;

const ctx = mainCanvas.getContext("2d");


let ravensCount = 5;

const audio = new Audio();
audio.src = "attack.wav";


 let ravens = [];
 function handleRavens(){

        for (let i = 0 ; i < ravensCount -ravens.length ; i++  ){
            ravens.push(new Raven(ctx ,{
                x : mainCanvas.width,
                y : Math.random() * (mainCanvas.height - 194)
            }));

        }



}

const halfMin = 500;
 let timeCount = 0;

let  previousTimestamp = 0;


function addRaven(time){
    if (timeCount >= halfMin){
        handleRavens();
    }else {
        timeCount += time;
    }
}

window.addEventListener("click" , (e)  => {
    ravens.forEach(raven =>{
        console.log("event", "x" ,e.x, "y" , e.y );
        console.log("raven",raven);
        console.log("e.offsetX" ,e.offsetX ,"raven.position.x", raven.position.x
           ,"e.offsetX",e.offsetX ,"raven.position.x +raven.spriteWidth" ,
            raven.position.x +raven.spriteWidth ,
            "e.offsetY",e.offsetY , "raven.position.y",raven.position.y ,
            "e.offsetY",e.offsetY )

        if (e.offsetX >= raven.position.x && e.offsetX <= raven.position.x +raven.spriteWidth &&
            e.offsetY >= raven.position.y && e.offsetY <= raven.position.y +raven.spriteHeight
        ){

            raven.markAsDelete =true;
            audio.play();
        }
    })
})


    function animation(timestamp){
    ctx.clearRect(0 ,0, mainCanvas.width, mainCanvas.height)
        
    const deltaTime = timestamp -previousTimestamp;
        previousTimestamp = timestamp;
        addRaven(deltaTime);
        ravens = [...ravens].filter(raven => !raven.markAsDelete);

        ravens.forEach((raven , index ) =>  {
            if ( raven.markAsDelete){
                 ravens.splice(index ,1);
            }else {

                raven.update();
            }
            }
        );



    requestAnimationFrame(animation);

}

animation(0);

