import { addClass, clearContents, getInputValue, getNode, getRandom, insertLast, isNumbericString, removeClass, showAlert } from './lib/index.js'
import { jujeobData } from "./data/data.js";

const submit = getNode('#submit');
const result = getNode('.result');

console.log(submit);

function clickSubmitHandler(e){
  e.preventDefault();

  let name = getInputValue('#nameField');
  let list = jujeobData(name)
  let pick = list[getRandom(list.length-1)];

  console.log(pick);

  if (!name) {
    showAlert(".alert", "이름을 입력해주세요", 3000);
    return;
  }

  if (isNumericString(name)) {
    showAlert(".alert", "제대로된 이름을 입력해주세요", 3000);
    return;
  }

  clearContents(result);
  insertLast(result,pick);
}

submit.addEventListener('click', clickSubmitHandler)