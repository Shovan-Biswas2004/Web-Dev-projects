const canvas = document.getElementById("board");
const max_Width = 500;
const max_Height = 500;
canvas.width = max_Width;
canvas.height = max_Height;

var c = canvas.getContext("2d");

function Ball (x,y,dx,dy,radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    let friction = 0.2;
    this.draw = function(){
    c.beginPath()
    c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
    c.stroke();
    }
    this.update = function(){
        // gravity 
        if(this.y +this.radius >max_Height ){
            this.dy= -this.dy*friction;
        }
        else{
        this.dy++;}
        this.y+= this.dy;
        this.draw()
    }
}
let circle = new Ball (200,200,1,1,50);
function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,max_Width,max_Height);
    
    circle.update();
    
}
animate()