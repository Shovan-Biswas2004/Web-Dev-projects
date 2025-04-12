const prob = (n)=>{
    let arr=[];
    for(let i=1;i<=n;i++){
        arr.push(i);
        if(i%3==0){
            arr.pop()
            arr.push("fizz");
        }
        if(i%5==0){
            arr.pop();
            arr.push("Buzz")
         }
        if(i%3==0 && i%5==0){
            arr.pop();
            arr.push("FizzBuzz");
         }  
    }
    
    return arr.join(" ");
}

console.log(prob(36));