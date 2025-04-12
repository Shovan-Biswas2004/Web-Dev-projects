const prob = (string,str)=>{
    let count=0;
    let arr1= string.split("");
    let arr2= str.split("");
    let sort1= arr1.sort();
    let sort2= arr2.sort();
    for(let i=0; i<string.length;i++){ 
       if(sort1[i]===sort2[i]){
        count++
       }

    }
    if(string.length!=str.length)
        return false;
    if(count===str.length)
        return true;
    else return false;
}
     
console.log(prob("catta","actat"))