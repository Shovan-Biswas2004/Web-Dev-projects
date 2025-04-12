// write a function to print the smallest value of given nos.

const problem =(a,b,c)=>{
  let  ar = [a,b,c];
    ar.sort();
    return ar[0];
}

console.log(problem(2,6,4));