import { getNode } from './../dom/getNode.js';
import { isNumber, isObject } from './typeOf.js';

const first=getNode('.first');


function delay(callback,timeout=1000) {
  setTimeout(callback, timeout);
  
}

/*
delay(()=>{
  first.style.top='-100px';
  delay(()=>{
    delay(()=>{
      first.style.top = '0px';
    })
    first.style.transform = 'rotate(360deg)';
  })
})

//프로미스 사용이 원래 위의 코드에 비해 가독성이 good
delayP()
.then(()=>{
  first.style.top = '-100px';
  return delayP()
})
.then(()=>{
  first.style.transform = 'rotate(360deg)';
  return delayP()
})
.then(()=>{
  first.style.top = '0px';
})
*/

const defaultOptions={
  shouldReject:false, 
  timeout:1000, 
  data:'성공했습니다.',
  errorMessage:'알 수 없는 오류가 발생했습니다.'
}

export function delayP(options={}){
  
  //통으로 복사 let config = defaultOptions 는 참조하는 것 {...defaultOptions}는 통으로 복사하는 것
  // let config =Object.assign({}, defaultOptions) 랑 똑같다. 깊은 복사
  let config = {...defaultOptions};

  if(isNumber(options)){
    config.timeout=options;
  }

  if(isObject(options)){
    // 객체 합성 mixin (기본 값에 바뀐 값을 바꿔서 넣으려면 둘이 섞여야함)
    // 뒤에 있는 애가 덮어쓰기됨. option의 내용이 config로 덮어씌워짐
    config = {...config, ...options};
    
  }

  const {shouldReject,data,errorMessage,timeout} = config;


  return new Promise((resolve, reject)=> {
    setTimeout(() => {
      !shouldReject ? resolve(data) : reject(errorMessage);
    }, timeout);
  })
}

delayP(false,1000,'진짜 성공','오류가 발생했다!!!').then((res)=>{
  console.log(res);
})
