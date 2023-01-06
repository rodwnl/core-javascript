/* ---------------------------------------------------------------------- */
/* Functions → Arrow                                                      */
/* ---------------------------------------------------------------------- */


const calculateTotal = function(moneyA, moneyB, moneyC, moneyD) {
  return moneyA + moneyB + moneyC + moneyD;
}

let resultX = calculateTotal(10000, 8900, 1360, 2100);
let resultY = calculateTotal(21500, 3200, 9800, 4700);
let resultZ = calculateTotal(9000, -2500, 5000, 11900);

console.log(resultX);
console.log(resultY);
console.log(resultZ);


// 함수 선언 → 화살표 함수 (표현)식
let calcAllMoney;


// 화살표 함수와 this


/* 다음 함수를 작성해봅니다. -------------------------------------------------- */

// pow(numeric: number, powerCount: number): number;
let pow = (numeric, powerCount) => {
  let result = 1;
  for(let i = 0; i < powerCount; i++){
    result *= numeric
  }
  return result;
};


let powExpression = (numeric, powerCount) => Array(powerCount).fill(null).reduce(acc=>acc * numeric,1)


// pow(2,53) // 9007199254740992


// repeat(text: string, repeatCount: number): string;
let repeat = (text, repeatCount) => {
let result = '';
for(let i = 0; i < repeatCount; i++){
  result += text;
}
return result;
}; 


// repeat('hello😘',3) //  'hello😘hello😘hello😘'
let repeatExpression = ()=>{

}

// repeat(text: string, repeatCount: number): string;