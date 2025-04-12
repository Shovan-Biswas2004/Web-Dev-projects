const prob = (n)=>{
 let k=0;
    m = n.length;
    for (let i=1; i<m;i++){
        if(n[i]>n[i-1]){
           k = n[i];
        }
    }
    console.log(k)
}
prob([3,6,1,2,7]);