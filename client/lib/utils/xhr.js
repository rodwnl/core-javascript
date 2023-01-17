/* readyState 
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


/*
xhrData('POST', 'https://jsonplaceholder.typicode.com/users',
{
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
  }
}
)
*/




