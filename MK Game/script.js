const canvas = document.getElementById("board");
const c = canvas.getContext("2d");
const enemyHealth = document.getElementById("enemyHealth");
const playerHealth = document.getElementById("playerHealth");
const clock = document.getElementById("clock")
const text = document.getElementById("text")

const max_Width = 1024;
const max_Height = 576;
canvas.width = max_Width;
canvas.height = max_Height;

c.fillRect(0,0,max_Width,max_Height);
const gravity = 0.2;

var backgroundd = ["./assets/background.png","./assets/mk.jpg","./assets/pekka.jpg"];
const selectedBackground = backgroundd[Math.floor(Math.random() * backgroundd.length)];

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: selectedBackground
})

let shop = null;
if (selectedBackground === "./assets/background.png") {
    shop = new Sprite({
    position: {
        x: 600,
        y: 128
    },
    imageSrc: "./assets/shop.png",
    scale: 2.75,
    frameMax: 6
    
})
}


const player = new Fighter({
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    offSet: { x: 215, y: 157 },
    imageSrc: "./assets/samuraiMack/idle.png",
    frameMax: 8,
    scale: 2.5,
    spriteFolder: "samuraiMack",
  sprites: {
    idle: 8,
    run: 8,
    jump: 2,
    fall: 2,
    attack1: 6,
    takehit: 4,
    death: 6,
    attack2: 6
    
  },
  attackBox: {
    offSet: {
        x: 100,
        y: 50,
        
    },
    width: 160,
     height: 50
  }
    
});




const enemy = new Fighter({
    position:{
    x: 400,
    y: 100
},
velocity:{
    x: 0,
    y: 0
},
color: "blue",
 imageSrc: "./assets/kenji/idle.png",
    frameMax: 4,
    scale: 2.5,
     offSet: { x: 215, y: 157 },
    spriteFolder: "kenji",
  sprites: {
    idle: 4,
    run: 8,
    jump: 2,
    fall: 2,
    attack1: 4,
    takehit: 3,
     death: 7,
     attack2: 4
  },
  attackBox: {
    offSet: {
        x: -171,
        y: 50,
    },
    width: 171,
    height: 50
  }
});

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
}
let lastKey 

function rectangularCollision({rectangle1, rectangle2}) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
    rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  );
}

function determineWinner({player,enemy,timeId}){
    clearTimeout(timeId)
    text.style.display = "flex";
    if(player.health===enemy.health){
       text.innerHTML= "Tie";
      }
    else if(player.health>enemy.health){
        text.innerHTML = "Player 1 won";
      }
    else if(player.health<enemy.health){
        text.innerHTML = "Player 2 won";
      }
}

let timer = 60;
let timeId
function clockTimer(){
    if(timer>0){
       timeId= setTimeout(clockTimer,1000);
        timer--;
        clock.innerHTML = timer;
    }
    if(timer===0){
     determineWinner({player,enemy,timeId});
    }
}
clockTimer();

function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = "black";
     c.fillRect(0,0,max_Width,max_Height);
     background.update();
     if (shop) {
        shop.update();
    }
     player.update();
     enemy.update()

     player.velocity.x =0;
     enemy.velocity.x =0;

     if (!player.animationLock) {
     if(keys.a.pressed && lastKey === "a"){
        player.velocity.x= -3;
        player.switchSprite("run");
     }
     else if(keys.d.pressed && lastKey === "d"){
        player.velocity.x= 3;
        player.switchSprite("run");
     }
     else if(player.velocity.y<0){
        player.switchSprite("jump");
     }
     else if(player.velocity.y>0){
        player.switchSprite("fall");
     }
      else {
    player.switchSprite("idle");
     }
    }

    
     if (!enemy.animationLock) {
     if(keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft"){
        enemy.velocity.x= -3;
         enemy.switchSprite("run");
     }
     else if(keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight"){
        enemy.velocity.x= 3;
        enemy.switchSprite("run");
     }
      else if(enemy.velocity.y<0){
        enemy.switchSprite("jump");
     }
     else if(enemy.velocity.y>0){
        enemy.switchSprite("fall");
     }
     else{
         enemy.switchSprite("idle");
     }
     }
     // collision
     if (player.isAttackingHand && rectangularCollision({ rectangle1: player, rectangle2: enemy }) && player.currentFrame === 4) {
         player.isAttackingHand = false;
         
         enemy.health -= 10
         enemyHealth.style.width = enemy.health + "%";
         if(enemy.health <=0 ){
            enemy.switchSprite("death");
         }
         else{
            enemy.switchSprite("takehit");
         }
        }

     if(player.isAttackingHand && player.currentFrame === 4){
         player.isAttackingHand = false;
     }
     
     

    if (player.isAttackingLeg && rectangularCollision({ rectangle1: player, rectangle2: enemy })) {
         player.isAttackingLeg = false;
          enemy.health -= 20
         enemyHealth.style.width = enemy.health + "%";
          if(enemy.health <=0 ){
            enemy.switchSprite("death");
         }
         else{
            enemy.switchSprite("takehit");
         }
        }
     if(player.isAttackingLeg && player.currentFrame === 4){
         player.isAttackingLeg = false;
     }

     if (enemy.isAttackingHand && rectangularCollision({ rectangle1: enemy, rectangle2: player })&& enemy.currentFrame === 2 ) {
         enemy.isAttackingHand = false;
          
         player.health -= 10
         playerHealth.style.width = player.health + "%";
         if(player.health <=0 ){
            player.switchSprite("death");
         }
         else{
            player.switchSprite("takehit");
         }
        }

     if(enemy.isAttackingHand && enemy.currentFrame === 2){
         enemy.isAttackingHand = false;
     }


    if (enemy.isAttackingLeg && rectangularCollision({ rectangle1: enemy, rectangle2: player }) ) {
         enemy.isAttackingLeg = false;
          player.health -= 20
         playerHealth.style.width = player.health + "%";
         if(player.health <=0 ){
            player.switchSprite("death");
         }
         else{
            player.switchSprite("takehit");
         }
        }
     if(enemy.isAttackingLeg && enemy.currentFrame === 2){
         enemy.isAttackingLeg = false;
     }

    if(enemy.health<= 0 || player.health<=0){
        determineWinner({player,enemy,timeId});
    }

}
animate()


window.addEventListener("keydown", (event)=>{
    
   switch(event.key){
    case "d":
      keys.d.pressed = true;
      lastKey = "d";
      break;
    case "a":
        keys.a.pressed = true;
        lastKey = "a";
        break;
    case "w":
        if (player.isOnGround) {
          player.velocity.y = -10;
          
        }
        break;
    case " ":
        player.attackHand();
        player.switchSprite("attack1");
        break;
    case "Enter":
        enemy.attackHand();
         enemy.switchSprite("attack2");
        break;
    case "f":
        player.attackLeg();
         player.switchSprite("attack2");
        break;
    case "0":
        enemy.attackLeg();
        enemy.switchSprite("attack1");
        break;
    


    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      enemy.lastKey = "ArrowRight";
      break;
    case "ArrowLeft":
        keys.ArrowLeft.pressed = true;
        enemy.lastKey = "ArrowLeft";
        break;
    case "ArrowUp":
        if (enemy.isOnGround) {
          enemy.velocity.y = -10;
        }
        break;
   }
   }
   
)

window.addEventListener("keyup", (event)=>{
   switch(event.key){
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
        keys.a.pressed = false;
        break;

    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowLeft":
        keys.ArrowLeft.pressed = false;
        break;
   }
})