const defaultOptions = {
  method: 'GET',
  mode: 'cors',
  body:null,
  cache: 'no-cache',
  credential: 'same-origin',
  redirect:'follow',
  referrerPolicy:'no-referrer',
  headers:{
    'Content-Type':'application/json; charset=UTF-8'
  }
}



export const tiger = async (options = {}) =>{

  // 객체 합성과 동시에 필요한 url와 restOptions만 뽑아오는 것
  // const{url, ...restOptions}={...defaultOptions, ...options,}
  const {url, ...restOptions} = {
    ...defaultOptions,
    ...options,
        // 없으면 빈객체로 만들어라 (?? 해석)
    headers: {...defaultOptions.headers ?? {}, ... options.headers ?? {}}
  }

  //fetch 용도 : 비동기를 위해 필요함
  //fetch가 값을 promise로 내뱉음. await으로 result 값을 뽑아냄
  let response = await fetch(url,restOptions)

  if(response.ok){
    // json의 메소드를 통해 가져와서 response의 data에 담기
    response.data = await response.json()
  }
  // console.log(response);
  return response;
}


tiger.get = async (url,options) => {
  return tiger({
    url,
    ...options
  })
}

tiger.post = (url,body,options) =>{
  return tiger({
    method:'POST',
    url,
    body:JSON.stringify(body),
    ...options
  })
}

tiger.put = (url,body,options) =>{
  return tiger({
    method:'PUT',
    url,
    body:JSON.stringify(body),
    ...options
  })
}

tiger.delete = (url,options) =>{
  return tiger({
    method:'DELETE',
    url,
    ...options
  })
}