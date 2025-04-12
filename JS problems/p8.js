const prob = (a,b)=>{
    let n=1;
   for(let i=1;i<=b;i++){
     n*=a;
   }
   return n;
}
console.log(prob(3,2))