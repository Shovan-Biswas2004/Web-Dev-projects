const prob =(string)=>{
    string = string.toLowerCase();
    let arr ={};
    console.log(arr);
    for(let i=0;i<string.length;i++){
       if(!arr[string[i]]){
        arr[string[i]]=0;
       }
       arr[string[i]]++;
    }
    return arr;
}
console.log(prob("shovan"));