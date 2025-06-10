class Sprite {
    constructor({position,imageSrc,scale =1,frameMax =1,offSet={x:0,y:0}}){
       this.position = position;
       this.width = 50
       this.height = 150;
       this.image = new Image ()
       this.image.src = imageSrc;
       this.scale = scale;
       this.frameMax = frameMax;
       this.currentFrame =0;
       this.framesElapsed =0;
       this.frameHold = 15;
       this.offSet = offSet
    }
    draw(){
        c.drawImage(
            this.image,
            this.currentFrame*(this.image.width/this.frameMax),
            0,
             this.image.width / this.frameMax,
             this.image.height,
            this.position.x-this.offSet.x,
            this.position.y-this.offSet.y,
            (this.image.width/this.frameMax)*this.scale,
            this.image.height*this.scale);
    }
    animateFrame(){
          
         this.framesElapsed++;
        if(this.framesElapsed % this.frameHold ===0){
        if(this.currentFrame<this.frameMax-1){
            this.currentFrame++;
        } 
        else{
            this.currentFrame=0;
             
        }
     }
    }
    update(){
        this.draw(); 
        this.animateFrame()
    }
}

class Fighter extends Sprite {
  constructor({
    position,
    velocity,
    color = "red",
    imageSrc,
    scale = 1,
    frameMax = 1,
    offSet = { x: 0, y: 0 },spriteFolder = "samuraiMack", sprites = {},
    attackBox = {offSet: {},width: undefined,height: undefined}
  }) {
    super({
      imageSrc,
      scale,
      frameMax,
      position,
      offSet
    });

    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.isOnGround = false;
    this.lastKey;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y
      },
      offSet: attackBox.offSet,
      width: attackBox.width,
      height: attackBox.height
    };
    this.color = color;
    this.isAttackingHand = false;
    this.isAttackingLeg = false;
    this.originalHeight = this.height;
    this.originalY = this.position.y;
    this.health = 100;
    this.currentState = "";
    this.animationLock = false;
    this.spriteFolder = spriteFolder;
    this.sprites = sprites;
    
  }


  update() {
    this.draw();
    if (!this.dead) {
    this.animateFrame();
  }

    if (
  (this.currentState === "attack1" || this.currentState === "attack2") &&
  this.currentFrame === this.frameMax - 1
) {
  this.animationLock = false;
  this.isAttackingHand = false;
}
    if (this.currentState === "takehit" && this.currentFrame === this.frameMax - 1) {
        this.animationLock = false;
      }
    
    if (this.currentState === "death" && this.currentFrame === this.frameMax - 1) {
    this.dead = true;
    this.velocity.x = 0;
    this.velocity.y = 0;
    return; // stop further updates
  }

    // update attack box position
    this.attackBox.position.x = this.position.x + this.attackBox.offSet.x;
    this.attackBox.position.y = this.position.y + this.attackBox.offSet.y;

    //c.fillRect(this.attackBox.position.x,this.attackBox.position.y,this.attackBox.width,this.attackBox.height);
      /*c.fillStyle = "white";
    c.fillRect(
      this.attackBox.position.x,
      this.attackBox.position.y + (this.attackBox.height ),
      this.attackBox.width,
      this.attackBox.height
    );*/
      
    // movement
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // gravity
    if (this.position.y + this.height + this.velocity.y >= max_Height - 96) {
      this.velocity.y = 0;
      this.isOnGround = true;
      this.position.y = max_Height - this.height - 96;
    } else {
      this.velocity.y += gravity;
      this.isOnGround = false;
    }
  }

  attackHand() {
    if (this.spriteFolder === "kenji") {
    this.switchSprite("attack2"); // enemy uses attack2
  } else {
    this.switchSprite("attack1"); // player uses attack1
  }
    this.isAttackingHand = true;
    
  }

  attackLeg() {
    this.isAttackingLeg = true;
  setTimeout(() => {
    this.isAttackingLeg = false;
  }, 100);
  }

  switchSprite(spriteName) {
  if (this.animationLock && this.currentState === "attack1") return;
  if (this.animationLock && this.currentState === "takehit") return;
  if (this.currentState === "death") return;

  // Define all sprite frame counts
  const spriteConfig = {
    idle: 8,
    run: 8,
    jump: 2,
    fall: 2,
    attack1: 6
    // Add more as needed, like 'takeHit', 'death', etc.
  };

  const frames = this.sprites[spriteName];
  if (!frames) {
    console.warn("Unknown sprite:", spriteName);
    return;
  }

  const src = `./assets/${this.spriteFolder}/${spriteName}.png`;

  // Compare file names, not full paths
  const currentImageName = this.image.src.split("/").pop();
  const newImageName = src.split("/").pop();

  if (currentImageName === newImageName) return;

  this.image = new Image();
  this.image.src = src;
  this.frameMax = frames;
  this.currentFrame = 0;
  this.framesElapsed = 0;
  this.currentState = spriteName;

  if (spriteName === "attack1"  || spriteName === "takehit" || spriteName === "attack2") {
    this.animationLock = true;
  }
}


}


/*  goes in fighter class
    draw(){
      
      //attackbox
      if(this.isAttackingHand){
      c.fillStyle = "green";
      c.fillRect(this.attackBox.position.x,this.attackBox.position.y,this.attackBox.width,this.attackBox.height)}
      //attackbox down
      if(this.isAttackingLeg){
      c.fillStyle = "white";
      c.fillRect(this.attackBox.position.x,this.attackBox.position.y+(this.attackBox.height*2),this.attackBox.width,this.attackBox.height);}
    }*/

