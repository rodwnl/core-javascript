// 1. 인풋 벨류값 가져오기

const firstInput=getNode('#firstNumber');
const secondInput=getNode('#secondNumber');
const done=getNode('#done');
const result=getNode('#result');

// 2. 이벤트 핸들러 연결하기
// 3. 이벤트 기본동작 차단하기
function getInputValue(node) {
  if(typeof node ==='string') node=getNode(node);

  // 노드가 입력값 타입이 아닐 경우
  if(node.tagName !== 'INPUT') refError('getInputValue 함수는 INPUT ELEMENT만 허용합니다.')
  return node.value
  
}


function sum(valueA,valueB){ return valueA+valueB;}

function clearContents(node){
  if(typeof node === 'string') node=getNode(node);
  node.textContent='';
}

function handler(e){
  //요소의 액션을 막아준다. 계속 새로 고침되서? submit이 순간 새로고침이 되는게 폼의 기본 동작인데, 저희는 그걸 원하지 않아서 그 이벤트를 멈춰주는것
  e.preventDefault();

  let firstValue =+getInputValue(firstInput);
  let secondValue =+getInputValue(secondInput);
  console.log(firstValue, secondValue);

  // 4. 두 수의 합을 더해주기
  let total=sum(firstValue,secondValue);
  console.log(total);

  // 5. 화면에 출력하기
  clearContents(result);
  insertLast(result, total)
}

// 값 변경할 때마다 자동적으로 표시해주기
function inputHandler(){
  let firstValue= +getInputValue(firstInput);
  let secondValue= +getInputValue(secondInput);
  let total = sum(firstValue, secondValue);
  console.log(firstValue);
  
  clearContents(result);
  insertLast(result, total);
}

done.addEventListener('click', handler);

firstInput.addEventListener('change', inputHandler);
secondInput.addEventListener('change', inputHandler);