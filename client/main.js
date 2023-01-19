/* global gsap */ 

import { getNode, xhrData, insertLast, xhrPromise, tiger, delayP, renderUserCard, changeColor, renderSpinner, attr, renderEmptyCard } from "./lib/index.js";


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

// 유저 카드 생성
// 생성된 카드로 렌더링

// 1. userList.js 로 간다
// 2. renderUserCard 함수를 만들기
// 3. 만들어진 함수 안에 createUserCard 를 던지고,
// 4. renderUserCard 함수를 사용했을 때 렌더링이 잘 될 수 있도록

const userCardContainer = getNode('.user-card-inner');

async function rendingUserList() {

  renderSpinner(userCardContainer)

  try{
    await delayP(2000)
    getNode('.loadingSpinner').remove();

    let response = await tiger.get( 'http://localhost:3000/users' );

    let userData = response.data;
    // userData.forEach(data=> renderUserCard(userCardContainer,data))
    //배열 순환에는 forEach...
    //리턴이 필요한 건 map, reduce, 리턴이 필요없는 건 forEach
    userData.forEach((data)=> {
      renderUserCard(userCardContainer,data)
    })

    changeColor('.user-card');

    gsap.to(gsap.utils.toArray('.user-card'),{
      x:0,
      opacity:1,
      duration:1.5,
      stagger: 0.2,
    })
  }catch(err){
    console.log(err);
    renderEmptyCard(userCardContainer);
  }
}

rendingUserList();

// 삭제 버튼을 클릭하면 콘솔창에 '삭제' 글자가 출력이 될 수 있도록 만들어 주세요.

function handler(e){
  let deleteButton = e.target.closest('button');
  let article = e.target.closest('article');

  // 버튼이 아니면 실행 안함
  // 누른 대상의 인접한 대상이 article이 아니면 실행 안함
  if(!deleteButton|| !article) return;
  console.log(deleteButton);

  let id=attr(article, 'data-index').slice(5); //index-1 로 표시되서 숫자만 나오겠끔 잘랐음

  tiger.delete(`http://localhost:3000/users/${id}`).then(()=>{
    userCardContainer.innerHTML= '';
    rendingUserList();
  })


}

userCardContainer.addEventListener('click', handler);