todoList = [];
todoIdx = 0;

//todo추가 클릭 시
const addTodoButton = document.getElementById("add-todo");
addTodoButton.addEventListener("click", addTodo);

function addTodo() {
  //새로운 할 일 div 만들고 자식 요소로 추가
  //여기에 할일 넣기
  //content editable
  const $newTodo = document.createElement("div");
  $newTodo.className = "todo-list";

  const $todoContainer = document.querySelector(".todo-list-container");
  $todoContainer.appendChild($newTodo);

  const $todoInput = document.createElement("input");
  $todoInput.id = `input-${todoIdx}`;
  $todoInput.type = "text";
  $newTodo.appendChild($todoInput);

  const $editButtons = document.createElement("div");
  $editButtons.className = "edit-buttons";
  $newTodo.appendChild($editButtons);

  const $saveButton = document.createElement("button");
  $saveButton.innerText = "저장";
  $saveButton.className = "edit-button";
  $saveButton.id = `save-${todoIdx}`;
  $editButtons.appendChild($saveButton);

  $saveButton.addEventListener("click", saveTodo);

  const $editButton = document.createElement("button");
  $editButton.innerText = "수정";
  $editButton.style.display = "none";
  $editButton.id = `edit-${todoIdx}`;
  $editButton.addEventListener("click", updateTodo);
  $editButtons.appendChild($editButton);

  const $deleteButton = document.createElement("button");
  $deleteButton.innerText = "삭제";
  $deleteButton.style.display = "none";
  $deleteButton.id = `delete-${todoIdx}`;
  $deleteButton.addEventListener("click", deleteTodo);
  $editButtons.appendChild($deleteButton);

  $editButton.className = "edit-button";
  $deleteButton.className = "edit-button";
  console.log("지금인덱스 ", todoIdx);

  todoIdx++;
  todoList.push(todoIdx);
  //배열 내 객체가 들어가야 관리가 편함
  //id : unique, text:밥먹기 iscompleted:false(default)
  //데이터 변화 시마다 localstorage update
}

//저장 버튼 클릭 시
function saveTodo(event) {
  //저장 버튼 > input 값 데이터에 전달, 데이터 리렌더링
  const $nowTodoDiv = event.currentTarget.parentNode;
  const $nowInput = $nowTodoDiv.previousSibling;
  const nowIdx = parseInt(event.currentTarget.nextSibling.id.split("-")[1]);

  todoList.push($nowInput.value);
  localStorage.setItem(nowIdx, $nowInput.value);

  const $nowSaveButton = event.target;
  $nowInput.disabled = true;
  $nowSaveButton.style.display = "none";
  $nowSaveButton.nextSibling.style.display = "inline";
  $nowSaveButton.nextSibling.nextSibling.style.display = "inline";
}

//결과 렌더링
function renderTodo() {
  // 여기를 더 깔끔하게 짜보기
  for (let i = 0; i < localStorage.length; i++) {
    addTodo();

    const $nowInput = document.querySelector(`#input-${i}`);
    console.log(todoList);
    console.log(localStorage.key(i));
    $nowInput.value = localStorage.getItem(todoList[i]);
    $nowInput.disabled = true;

    const $newSaveButton = document.querySelector(`#save-${i}`);

    $newSaveButton.style.display = "none";
    $newSaveButton.nextSibling.style.display = "inline";
    $newSaveButton.nextSibling.nextSibling.style.display = "inline";
  }
  todoIdx++;
}

function updateTodo(event) {
  const $nowEditButtonsDiv = event.currentTarget.parentNode;

  $nowEditButtonsDiv.previousSibling.disabled =
    !$nowEditButtonsDiv.previousSibling.disabled;

  console.log($nowEditButtonsDiv.querySelector("button:nth-child(2)"));
  if (
    $nowEditButtonsDiv.querySelector("button:nth-child(2)").innerText === "수정"
  ) {
    $nowEditButtonsDiv.querySelector("button:nth-child(2)").innerText =
      "수정완료";
  } else {
    $nowEditButtonsDiv.querySelector("button:nth-child(2)").innerText = "수정";
  }

  const nowIdx = parseInt(
    $nowEditButtonsDiv.querySelector("button:nth-child(2)").id.split("-")[1]
  );
  todoList[nowIdx] = $nowEditButtonsDiv.previousSibling.value;
  localStorage[nowIdx] = $nowEditButtonsDiv.previousSibling.value;
}

function deleteTodo(event) {
  const $nowTodoList = event.currentTarget.parentNode.parentNode;
  const isConfirmed = confirm("정말 삭제하시겠습니까?");

  if (isConfirmed === true) {
    $nowTodoList.remove();
    const nowIdx = parseInt(
      $nowTodoList.querySelector("button:nth-child(2)").id.split("-")[1]
    );
    todoList = todoList.splice(nowIdx, 1);
    localStorage.removeItem(nowIdx);
  }
}

renderTodo();
