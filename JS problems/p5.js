const prob = (num)=>{
    let nar = 0
    let string  = num.toString();
    let arr = string.split("").map(Number);
    for(let i=0; i<=arr.length-1;i++){
        nar = nar+ arr[i];
    }
    return nar;
}
console.log(prob(4023));

