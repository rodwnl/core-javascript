import { xhrData, insertLast } from "./lib/index.js";


/*
// xhrData.get 사용시 xhrData에 이렇게 전달하겠다.
xhrData.get(
  'https://jsonplaceholder.typicode.com/users/1',
  (result)=>{
    insertLast('body', JSON.stringify(result))
  },
  (err) => {
    insertLast('body', '데이터 로딩에 실패했습니다.')
  }
)
*/
