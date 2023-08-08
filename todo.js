window.onload = () => {
  const toDoWrite = document.querySelector(".todo__write");
  const toDoForm = document.querySelector(".todo-form");
  const mainList = document.querySelector(".main__list");

  let toDos = [];

  function saveToDos() {
    localStorage.setItem("todos", JSON.stringify(toDos));
  }

  const deleteToDo = (event) => {
    const li = event.target.parentElement;
    // JavaScript에서 사용되는 속성으로, 이벤트 핸들러 내에서 이벤트가 발생한 요소의 부모 요소를 나타낸다.
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    li.remove();
    saveToDos();
  };

  const handleCheckBox = (event) => {
    const li = event.target.parentElement;
    const span = li.querySelector("span");
    span.style.textDecoration = event.target.checked ? "line-through" : "none";
    /* target.checked는 이벤트가 발생한 요소의 체크 여부를 나타내는 속성이다.
    이벤트 핸들러 내에서 event.target은 이벤트가 발생한 요소를 참조한다.
    체크박스의 경우, target.checked는 체크박스가 선택되어 있는지 여부를 나타내는 불리언 값이다.
    선택되어 있을 경우 true를 반환하고, 선택되어 있지 않을 경우 false를 반환한다. */
  };

  const paintToDo = (newTodo) => {
    const li = document.createElement("li");
    li.id = newTodo.id;
    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.addEventListener("change", handleCheckBox);
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    const button = document.createElement("button");
    button.innerText = "❌";
    button.addEventListener("click", deleteToDo);

    li.appendChild(checkBox);
    li.appendChild(span);
    li.appendChild(button);
    mainList.appendChild(li);
  };

  const handleToDoSubmit = (event) => {
    event.preventDefault();
    const newTodo = toDoWrite.value;
    toDoWrite.value = "";
    const newTodoObj = {
      text: newTodo,
      id: Date.now(),
    };
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
  };

  const savedToDos = localStorage.getItem("todos");

  toDoForm.addEventListener("submit", handleToDoSubmit);
  if (savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
  }
};
