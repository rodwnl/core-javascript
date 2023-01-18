import { xhrData, insertLast, xhrPromise, tiger, delayP } from "./lib/index.js";


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

/*
xhrPromise
.get('https://jsonplaceholder.typicode.com/users/1')
.then((res)=>{
  insertLast(document.body, JSON.stringify(res));

})
.catch((err)=>{
  console.log(err);
})
*/


async function render(){

  await delayP(2000);
  let response = await tiger.get('https://jsonplaceholder.typicode.com/users/1')

  console.log(response.data);
}


render()
