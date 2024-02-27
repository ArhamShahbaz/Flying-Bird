class Explosion{
    constructor(ctx , position){
        this.ctx=ctx;
        this.img=new Image();
        this.img.src="boom.png";
        this.audio = new Audio();
        this.audio.src= "explosion.mp3";
        this.position=position;
        this.width=200;
        this.height=180;

        this.spriteWidth= this.width * 0.5;
        this.spriteHeight= this.height * 0.5;
        this.markForDeletion=false;
        this.position.x -= this.spriteWidth;
        this.position.y -= this.spriteHeight;
        this.frame = 0;
        this.frameInterval = 4;
        this.frameCount=0;
    }
    update(){
        this.audio.play();
        if(this.frame>4){
            this.markForDeletion=true;
        }else{
            if(this.frameCount>this.frameInterval){
                this.frame++;
            }else{
                this.frameCount++;
            }

        }
        this.#draw();

    }

    #draw(){
        this.ctx.drawImage(this.img,
            this.frame * this.width,0,this.width, this.height,
            this.position.x,this.position.y,this.spriteWidth,this.spriteHeight);

    }

} export default Explosion;