






export const memo = (() => {
  const cache = {}

  return (key,callback) => {
    if(!callback) return cache[key];

    if(cache[key]){
      console.warn(`${key} 값은 이미 캐시된 값이 존재합니다.`);
      return;
    }
  
    cache[key] = callback();
  
    // console.log(cache);
  }
})()


// rendingUserList 함수 만들기 
// ajax (tiger) get user List


// 유저 카드 생성
// 생성된 카드로 랜더링 

async function rendingUserList(){

  let response = await tiger.get('https://jsonplaceholder.typicode.com/users/1')

  let userData = response.data;

  console.log(userData);


}





