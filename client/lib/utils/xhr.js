/* readyState 
import { typeError } from './../error/typeError';
0: uninitalized //초기화 (선언 안함)
1: loading //로딩 (오픈만 한 상태)
2: loaded //로딩완료 (서버에 요청)
3:interative //인터렉티브 (작동중)
4:complete //완료
 */


export function xhrData({
  url='',
  method='GET',
  body=null,
  onSuccess=null,
  onFail=null,
  headers={
    'Content-Type' : 'application/json',
    'Access-Control-Allow-Origin' : '*'
  },
}){
  
  //객체 구조 분해 할당
  //const {method,url,body} = options

  const xhr = new XMLHttpRequest();
  // 비동기 통신 오픈 (이런걸 오픈할 거고)
  xhr.open(method,url);

  // console.log(Object.entries(headers));

  // Object.entries(headers).forEach(([key, value]) => {
  // 헤더를 리퀘스트할 때 세팅하는 내장함수. 키, 값을 받아서 헤더값에 추가
  // xhr.setRequestHeader(key, value);
  // });

  // 변경이 일어났을 때마다 호출이 되는 애
  xhr.addEventListener('readystatechange', ()=>{

    const {status, readyState, response} =xhr; //객체 구조 분해 할당
    // 계속 xhr.staus~ xhr.readyState~ 이렇게 쓰니까

    if(xhr.status>=200 && xhr.status < 400){
      //200~399 통신성공
      if(xhr.readyState===4){
        console.log('통신 성공');
        // 통신성공으로 가져온 데이터는 객체화되지 않은 상태 (문자열 상태)
        // console.log(typeof xhr.response);

        onSuccess(JSON.parse(xhr.response));

        // JSON.parse를 이용해 **객체화** 시킴. String -> Object
        // console.log(JSON.parse(xhr.response));
      }
    }else{
      onFail('통신 실패');
    }
  })
  
  // 서버에 요청 (보내줘!!). 보내줄 땐 **문자화** 시킬 필요 있음. JSON.stringify()
  xhr.send(JSON.stringify(body));
}

/*
xhrData({
  url: 'https://jsonplaceholder.typicode.com/users/1',
  onSuccess : (result) => {
    console.log(result);
  },
  onFail: (err) => {
    console.log(err);
  }
})
*/

// 메서드 추가
xhrData.get=(url,onSuccess,onFail) => {
  xhrData({
    url,
    onSuccess,
    onFail
  })
}

// xhrData 함수(객체) 안에 post라는 키를 만들고, 그 안의 값은 (url,  onSucess, onFail을 패러미터로 받는) 함수
xhrData.post=(url,body,onSuccess,onFail)=>{
  xhrData({
    method:'POST',
    body,
    url,
    onSuccess,
    onFail
  })
}

xhrData.put = (url,body,onSuccess,onFail) =>{
  xhrData({
    method:'PUT',
    body,
    url,
    onSuccess,
    onFail
  })
}



xhrData.delete = (url,body,onSuccess,onFail) =>{
  xhrData({
    method:'DELETE',
    url,
    onSuccess,
    onFail
  })
}


// promise API

const defaultOptions={
  url:'',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  body:null
}

export function xhrPromise(options={}){
  const xhr = new XMLHttpRequest();

  // 앞에 빈 객체가 없으면 defaultOptions가 만들어짐
  const {method, url, body, headers} = Object.assign({},defaultOptions,options);

  if(!url) typeError('서버와 통신할 url 인자는 반드시 필요합니다.');

  xhr.open(method,url);
  
  xhr.send(body?JSON.stringify(body):null)
  
  return new Promise((resolve, reject) => {
    xhr.addEventListener('readystatechange',()=>{
      const {status, readyState, response} = xhr;
      if(status >= 200 && status < 400){
         if(readyState === 4){
           resolve(JSON.parse(response));
         }
      }else{
        reject('에러입니다.');
      }
    })
  })
}


xhrPromise.get = (url) => {
  return xhrPromise({
    url
  })
}


xhrPromise.post = (url,body) => {
  return xhrPromise({
    url,
    body,
    method:'POST'
  })
}


xhrPromise.put = (url,body) => {
  return xhrPromise({
    url,
    body,
    method:'PUT'
  })
}

xhrPromise.delete = (url) => {
  return xhrPromise({
    url,
    method:'DELETE'
  })
}

//async await

//async를 붙이면 무조건 반환값이 항상 프라미스를 반환. resolve임
async function delayA(){
  return '완료'
}

//await : 1. promise가 반환하는 result를 가져오기 2. 코드 실행 흐름 제어

let result = await delayA()

console.log(result);