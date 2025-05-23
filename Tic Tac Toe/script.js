const boxes = document.querySelectorAll(".box");
const reset = document.getElementById("reset");
const status = document.getElementById("status");
let turn = true;
const winarr = [ [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
boxes.forEach(box=>{box.addEventListener("click",()=>{
   if (turn){
    box.innerText = "X";
    box.style.color = "#50c386";
    box.style.border = " 3px solid #50c386"
    turn = false;
   }
   else{
   box.innerText = "O";
   box.style.color = "#f44232";
   box.style.border = " 3px solid #f44232"
   turn = true;
   }
   box.disabled= true;
   checkWinner()
})})
const disabledBoxes=()=>{
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
        box.style.border= "3px solid rgba(255,255,255, 50%)";
    }
}

const checkWinner= ()=>{
    for(let pattern of winarr){
        if(boxes[pattern[0]].innerText=== "X" && boxes[pattern[1]].innerText=== "X" && boxes[pattern[2]].innerText=== "X") {
            status.innerText = "X won";
             disabledBoxes();
        }
        else if (boxes[pattern[0]].innerText=== "O" && boxes[pattern[1]].innerText=== "O" && boxes[pattern[2]].innerText=== "O"){
        status.innerText= "O won";
          disabledBoxes();
    }}
   
}

const resett = ()=>{
   turn = true;
   enableBoxes();
   status.innerText = "";
}
reset.addEventListener("click", resett);