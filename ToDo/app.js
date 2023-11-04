document.addEventListener("DOMContentLoaded", function () {
  const addForm = document.querySelector(".add");
  const list = document.querySelector(".todos");
  const pendingList = document.getElementById("pending-list");
  const completedList = document.getElementById("completed-list");
  const search = document.querySelector(".input-field");

  const generateTemplate = (todo, timestamp) => {
    const html = `
      <li class="list-group-item d-flex justify-content-between align-items-center">
          <span>${todo} - ${timestamp.toLocaleString()}</span>
          <i class="fa fa-check-circle complete"></i>
          <i class="fa fa-pencil edit"></i>
          <i class="fa fa-trash-o delete"></i>
      </li>
    `;
    return html;
  };

  addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const todo = addForm.add.value.trim();
    
    if (todo.length) {
      const timestamp = new Date();
      const html = generateTemplate(todo, timestamp);
      list.innerHTML += html;
      addForm.reset();
    }
  });

  const handleEdit = (taskItem) => {
    const taskTextElement = taskItem.querySelector("span");
    const updatedText = prompt("Edit task:", taskTextElement.textContent);
    if (updatedText !== null && updatedText.trim() !== "") {
      taskTextElement.textContent = updatedText;
    }
  };

  list.addEventListener("click", (e) => {
    const targetIcon = e.target.classList;
    const taskItem = e.target.parentElement;

    if (targetIcon.contains("delete")) {
      taskItem.remove();
    } else if (targetIcon.contains("complete")) {
      const taskText = taskItem.querySelector("span").textContent;
      const timestamp = new Date();
      const completedHtml = generateTemplate(`Completed: ${taskText}`, timestamp);
      list.removeChild(taskItem);
      completedList.innerHTML += completedHtml;
    } else if (targetIcon.contains("edit")) {
      handleEdit(taskItem);
    }
  });

  completedList.addEventListener("click", (e) => {
    const targetIcon = e.target.classList;
    const taskItem = e.target.parentElement;

    if (targetIcon.contains("delete")) {
      taskItem.remove();
    } else if (targetIcon.contains("edit")) {
      handleEdit(taskItem);
    }
  });

  const filterTodos = (term) => {
    filterTasks(pendingList, term);
    filterTasks(completedList, term);
  };

  const filterTasks = (taskList, term) => {
    Array.from(taskList.children)
      .filter((task) => !task.textContent.toLowerCase().includes(term))
      .forEach((task) => task.classList.add("filtered"));

    Array.from(taskList.children)
      .filter((task) => task.textContent.toLowerCase().includes(term))
      .forEach((task) => task.classList.remove("filtered"));
  };

  search.addEventListener("keyup", () => {
    const term = search.value.trim().toLowerCase();
    filterTodos(term);
  });
});
