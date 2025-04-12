const prob = (string)=>{
    let count1 = 0;
    let count2 = 0;
    let count3 = 0;
    let count4 = 0;
    let arr = string.split("");
    for(let i=0; i<arr.length;i++){
        if(string[i].charCodeAt(0)>= 97 && string[i].charCodeAt(0)<=122 )
            count1++;
        if(string[i].charCodeAt(0)>= 65 && string[i].charCodeAt(0)<=90)
            count2++;
        if(string[i].charCodeAt(0)>= 48 && string[i].charCodeAt(0)<=57)
            count3++;
        else
          count4++;
    }
    if(count1!=0 && count2!=0 && count3!=0 && count4!=0)
        return "strong password";
    else return "weak password";
}
console.log(prob("Shovan4^"));