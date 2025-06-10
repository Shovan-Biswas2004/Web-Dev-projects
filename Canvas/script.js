let canvas = document.getElementById("board");
let max_Width = 500;
let max_Height = 500;
let rect_Width = 50;
let rect_height = 100;
canvas.width = max_Width; // sets width to canvas
canvas.height = max_Height; // sets height to canvas
var context = canvas.getContext('2d');


// Rectangles
/*context.fillStyle = "yellow"
context.fillRect(50,max_Height-rect_height,rect_Width,rect_height); // draws a rectange


// Lines
context.beginPath(); // starts to draw an unfinished path
context.moveTo(50,50); // starting coordinate of the path
context.lineTo(400,50); // end coordinate of the path
context.strokeStyle = "blue" 
context.stroke() // adds stroke to the path

// arc 
context.beginPath(); // to make a new path and not a connected path with the earlier one
context.arc(300,300,50,0,Math.PI * 2,false);
context.stroke();

var color = ['red', 'blue', 'yellow', 'black', 'grey', 'green', 'orange'];


for (let i = 0 ; i<= 10; i++) {
    let x = Math.random() * max_Width;
    let y = Math.random() * max_Height;
    let  z =  parseInt(Math.random()*10);
    context.beginPath()
    context.arc(x,y,50,0,Math.PI * 2,false);
    for(let j =0;j<=10;j++){
      var strokeStylee = color[Math.floor(Math.random() * color.length)];
      context.strokeStyle =  strokeStylee;
    }
    context.stroke();
}*/
var mouse ={
    x: undefined,
    y: undefined
}
var maxRadius = 40;
canvas.addEventListener("mousemove", function(event) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
    console.log(mouse);
});
function Circle (x,y, dx,dy,radius){
    this.x = x;
    this.y= y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;

    this.draw = function (){
       context.beginPath();
      context.arc(this.x,this.y,this.radius,0,Math.PI * 2, false);
       context.stroke()
    }

    this.update = function(){
         if (this.x + this.radius>max_Width || this.x - this.radius<0){
             this.dx =-this.dx;
            }
         if (this.y + this.radius>max_Width || this.y - this.radius<0){
              this.dy =-this.dy;
            }
        this.x+= this.dx;
        this.y+= this.dy;
        // inneractivity
        if(mouse.x - this.x < 50 && mouse.x -this.x >-50 && mouse.y-this.y <50 && mouse.y -this.y >-50){
            if(this.radius < maxRadius){
            this.radius+=1
            }
        }
        else if( this.radius >2){
            this.radius -= 1;
        }

        this.draw()
    }
}
var cirlceArray = [];

for(let i=0;i<=100;i++){
    var radius = 100;
    var x = Math.random()*(max_Width-radius*2)+radius;
    var y = Math.random()*(max_Height-radius*2)+radius;
    var dx = (Math.random()-0.5);
    var dy = (Math.random()-0.5);
    cirlceArray.push(new Circle(x,y,dx,dy,radius));
}


/*let sp = 2;
let x = 110; 
let y = 110;
let radius = 100;*/
function animate(){
    requestAnimationFrame(animate);
    context.clearRect(0,0,max_Width,max_Height);
     for(let i = 0; i<cirlceArray.length;i++){
        cirlceArray[i].update();
    }
    
    /*context.beginPath();
    context.arc(x,y,radius,0,Math.PI * 2, false);
    context.stroke()
    if (x+radius>max_Width || x-radius<0)
        sp =-sp;
    if(y+radius>max_Width || y-radius<0)
        sp =--sp;
    x+=sp;
    y+= sp;*/
   
}

animate()