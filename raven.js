class raven {


    constructor(ctx , position) {

        this.ctx = ctx;

        this.position = position;
        this.rav = new Image();
        this.rav.src = "raven.png";


        this.height = 194;
        this.width = 271;



        //
        this.frame = 1;
        this.count = 0;
        this.interval = 4;


        this.spriteWidth = this.width * 0.5;
        this.spriteHeight = this.height * 0.5;

        this.markAsDelete = false;


    }



    update(){
        if (this.frame > 4){
            this.position.x -= Math.random() * 50 + 10;
            this.frame = 0;

        }else {
            if (this.interval <  this.count){
                this.frame++;
                this.count = 0;
            }else {
                this.count++;
            }
        }
        if (this.position.x <= -this.spriteWidth){
            this.markAsDelete = true;
        }

        this.#draw();

    }


    #draw(){
        this.ctx.drawImage(this.rav,
            this.frame * this.width, 0,  this.width , this.height,
            this.position.x, this.position.y, this.spriteWidth ,this.spriteHeight );

    }



//





}

export default raven;