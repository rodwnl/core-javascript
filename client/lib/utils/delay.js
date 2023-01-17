import { getNode } from './../dom/getNode.js';

const first=getNode('.first');


function delay(callback,timeout=1000) {
  setTimeout(callback, timeout);
  
}

delay(()=>{
  first.style.top='-100px';
  delay(()=>{
    delay(()=>{
      first.style.top = '0px';
    })
    first.style.transform = 'rotate(360deg)';
  })
})



