const prob = (string)=>{
    let check =false;
    let arr = string.split("");
    for (let i=0; i<=arr.length/2; i++){
        if(arr[i]===arr[arr.length-i-1])
            check = true;
        else 
         check=false;
    }
    return check;
}
console.log(prob("ee"));