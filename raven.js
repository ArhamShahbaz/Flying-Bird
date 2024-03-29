class Raven{
    constructor(ctx , position, speed, gameStats){
        this.ctx=ctx;
        this.img=new Image();
        this.img.src="raven.png";
        this.gameStats=gameStats;
        this.position=position;
        this.width=271;
        this.height=194;
        this.frame =0;
        this.frameInterval = 4;
        this.frameCount=0;
        this.spriteWidth= this.width * 0.5;
        this.spriteHeight= this.height * 0.5;
        this.markForDeletion=false;
        this.speed=speed;
    }
    update(){
        if(this.position.x <=0 ){
            this.gameStats.gameOver = true;
        }
        if(this.frame>4){
            this.frame=0;
        }else{
            if(this.frameCount>this.frameInterval){
                this.frame++;
                this.position.x -= this.speed + 5;
                this.frameCount=0;
            }else{
                this.frameCount++;
            }

        }
        if(this.position.x <= -this.spriteWidth){
            this.markForDeletion=true;
        }

        this.#draw();

    }

    #draw(){
        this.ctx.drawImage(this.img,
            this.frame * this.width,0,this.width, this.height,
            this.position.x,this.position.y,this.spriteWidth,this.spriteHeight);

    }

} export default Raven;