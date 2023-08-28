todoList = [];
todoIdx = 0;
const addTodoButton = document.getElementById("add-todo");
addTodoButton.addEventListener("click", addTodo);

function addTodo() {
  console.log("addtodo");
  console.log(todoIdx);
  //새로운 할 일 div 만들고 자식 요소로 추가
  const $newTodo = document.createElement("div");
  $newTodo.className = "todo-list";

  const $todoContainer = document.querySelector(".todo-list-container");
  $todoContainer.appendChild($newTodo);

  const $todoInput = document.createElement("input");
  $newTodo.appendChild($todoInput);

  const $editButtons = document.createElement("div");
  $editButtons.className = "edit-buttons";
  $newTodo.appendChild($editButtons);

  const $saveButton = document.createElement("button");
  $saveButton.innerText = "저장";
  $saveButton.className = "edit-button";
  $editButtons.appendChild($saveButton);

  $saveButton.addEventListener("click", saveTodo);

  const $editButton = document.createElement("button");
  $editButton.innerText = "수정";
  $editButton.style.display = "none";
  $editButton.id = `edit-${todoIdx}`;
  $editButton.addEventListener("click", updateTodo);

  const $deleteButton = document.createElement("button");
  $deleteButton.innerText = "삭제";
  $deleteButton.style.display = "none";
  $deleteButton.id = `delete-${todoIdx}`;
  $deleteButton.addEventListener("click", deleteTodo);

  $editButton.className = "edit-button";
  $deleteButton.className = "edit-button";

  $editButtons.appendChild($editButton);
  $editButtons.appendChild($deleteButton);

  todoIdx++;

  console.log(document.querySelectorAll("#edit"));
}

function saveTodo(event) {
  //저장 버튼 > input 값 데이터에 전달, 데이터 리렌더링
  const $nowTodoDiv = event.currentTarget.parentNode;
  const $nowInput = $nowTodoDiv.previousSibling;
  console.log($nowInput);

  todoList.push($nowInput.value);
  console.log(todoList);

  //결과 렌더링
  todoList.forEach((element, idx) => {
    $inputs = document.querySelectorAll("input");
    $inputs[idx].value = element;
    $inputs[idx].disabled = true;
    const $nowSaveButton = event.target;
    $nowSaveButton.style.display = "none";
    $nowSaveButton.nextSibling.style.display = "inline";
    $nowSaveButton.nextSibling.nextSibling.style.display = "inline";
  });
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
}

function deleteTodo(event) {
  const $nowTodoList = event.currentTarget.parentNode.parentNode;

  const isConfirmed = confirm("정말 삭제하시겠습니까?");

  if (isConfirmed === true) {
    $nowTodoList.remove();
  }
  const nowIdx = parseInt(
    $nowTodoList.querySelector("button:nth-child(2)").id.split("-")[1]
  );
  todoList.splice(nowIdx, 1);
}
