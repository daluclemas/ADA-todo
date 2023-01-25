const hr = document.querySelector(".hr");
const min = document.querySelector(".min");
const sec = document.querySelector(".sec");
const weekDay = document.querySelector(".day");
const currentDate = document.querySelector(".date");
const meridian = document.querySelector(".meridian");
const yr = document.querySelector(".yr");
const currentMonth = document.querySelector(".month");
const todoWrapper = document.querySelector(".todo-wrapper");
const searchInput = document.querySelector(".search");
const addBtn = document.querySelector(".add-btn");

// set todos
let todos = [];

if (!todos.length) {
  todoWrapper.innerHTML = ` <div class="w-100 h-100 no-todo">
              <p class="text-muted fs-1 empty ">No added task!</p>
            </div>`;
}

// add todo
const addTodo = () => {
  let searchValue = searchInput.value.toLowerCase();
  let id = Math.floor(Math.random() * 10000) + 1;

  if (!searchValue) {
    return;
  }

  let newTodo = {
    id: id,
    todo: searchValue,
    isComplete: false,
  };

  todos.push(newTodo);

  let addTask = todos.map((item) => {
    return `
      <div class="w-100 d-flex align-items-center gap-3 mb-3" id=${item.id}>
            
                <div class="w-75 d-flex align-items-center gap-3">
                  <div class="form-check">
                    <input class="form-check-input checks" type="checkbox"  />
                    <label class="form-check-label" > </label>
                  </div>

               
                  <p
                    class="p-0 m-0 text-capitalize todo-item"
                    style="font-size: 18px"
                  >
                   ${item.todo}
                  </p>
                </div>

                <div class=" w-25 text-end pe-2">
                <i class="fas fa-pencil me-2 text-blue" ></i>
                  <i class="fas fa-times-circle text-danger" ></i>
                </div>
              </div>
    `;
  });

  todoWrapper.innerHTML = addTask.join("");
  searchInput.value = "";
  deleteTodo();
  completeTask();
  editTodo();
};

addBtn.addEventListener("click", addTodo);

// delete todo

function deleteTodo() {
  let deleteBtns = document.querySelectorAll(".fa-times-circle");
  deleteBtns = [...deleteBtns];

  deleteBtns.forEach((item) => {
    item.addEventListener("click", (e) => {
      let taskid = e.target.parentElement.parentElement.id;
      todos = todos.filter((task) => task.id !== Number(taskid));
      todoWrapper.removeChild(e.target.parentElement.parentElement);

      if (!todos.length) {
        todoWrapper.innerHTML = ` <div class="w-100 h-100 no-todo">
              <p class="text-muted fs-1 empty ">No added task!</p>
            </div>`;
      }
    });
  });
}

// is complete

function completeTask() {
  let checkBox = document.querySelectorAll(".checks");

  checkBox = [...checkBox];
  checkBox.forEach((item) => {
    item.addEventListener("input", (e) => {
      let todoiItem = e.target.parentElement.nextElementSibling;

      let taskid = e.target.parentElement.parentElement.parentElement.id;
      let index = todos.findIndex((item) => item.id === Number(taskid));
      if (e.target.checked) {
        todos[index].isComplete = true;
        todoiItem.style.textDecoration = "line-through";
        todoiItem.style.opacity = 0.5;
      } else {
        todos[index].isComplete = false;
        todoiItem.style.textDecoration = "none";
        todoiItem.style.opacity = 1;
      }
    });
  });
}

function editTodo() {
  let editBtns = document.querySelectorAll(".fa-pencil ");
  editBtns = [...editBtns];
  editBtns.forEach((item) => {
    item.addEventListener("click", (e) => {
      let taskid = e.target.parentElement.parentElement.id;
      todos = todos.filter((task) => task.id !== Number(taskid));
      todoWrapper.removeChild(e.target.parentElement.parentElement);

      if (!todos.length) {
        todoWrapper.innerHTML = ` <div class="w-100 h-100 no-todo">
              <p class="text-muted fs-1 empty ">No added task!</p>
            </div>`;
      }

      let task =
        e.target.parentElement.previousElementSibling.children[1].textContent;

      searchInput.value = task.trim();
    });
  });
}

// set date and time

const setTime = () => {
  let dt = new Date();
  let secs = dt.getSeconds() < 10 ? `0${dt.getSeconds()}` : dt.getSeconds();
  let mins = dt.getMinutes() < 10 ? `0${dt.getMinutes()}` : dt.getMinutes();
  let hrs = dt.getHours() < 10 ? `0${dt.getHours()}` : dt.getHours();

  sec.innerHTML = secs;
  min.innerHTML = mins;
  hr.innerHTML = hrs > 12 ? hrs - 12 : hrs;
  meridian.innerHTML = hrs > 12 ? " p.m" : " a.m";
};

setInterval(() => {
  setTime();
}, 1000);

// set DAY

const setDayOfTheWeek = (day) => {
  switch (day) {
    case 0:
      weekDay.innerHTML = "Sunday,";
      break;

    case 1:
      weekDay.innerHTML = "Monday,";
      break;

    case 2:
      weekDay.innerHTML = "Tuesday,";
      break;

    case 3:
      weekDay.innerHTML = "Wednesday,";
      break;

    case 4:
      weekDay.innerHTML = "Thursday,";
      break;

    case 5:
      weekDay.innerHTML = "Friday,";
      break;

    case 6:
      weekDay.innerHTML = "Saturday,";
      break;

    default:
      weekDay.innerHTML = "Wrong day";
  }
};

const setCurrentDate = (currentDt) => {
  let dateString = currentDt.toString().charAt(1);
  switch (dateString) {
    case "1":
      currentDate.innerHTML = `${currentDt}st`;
      break;

    case "2":
      currentDate.innerHTML = `${currentDt}nd`;
      break;

    case "3":
      currentDate.innerHTML = `${currentDt}rd`;
      break;

    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case "0":
      currentDate.innerHTML = `${currentDt}th`;
      break;
    default:
      currentDate.innerHTML = "no date";
  }
};

const setCurrentMonth = (month) => {
  switch (month) {
    case 0:
      currentMonth.innerHTML = "Jan,";
      break;
    case 1:
      currentMonth.innerHTML = "Feb,";
      break;
    case 2:
      currentMonth.innerHTML = "Mar,";
      break;
    case 3:
      currentMonth.innerHTML = "Apr,";
      break;
    case 4:
      currentMonth.innerHTML = "May,";
      break;
    case 5:
      currentMonth.innerHTML = "Jun,";
      break;
    case 6:
      currentMonth.innerHTML = "Jul,";
      break;
    case 7:
      currentMonth.innerHTML = "Aug,";
      break;
    case 8:
      currentMonth.innerHTML = "Sep,";
      break;
    case 9:
      currentMonth.innerHTML = "Oct,";
      break;
    case 10:
      currentMonth.innerHTML = "Nov,";
      break;
    case 11:
      currentMonth.innerHTML = "Dec,";
      break;

    default:
      currentMonth.innerHTML = "no month";
  }
};

const setDate = () => {
  let dt = new Date();

  let day = dt.getDay();
  let date = dt.getDate();
  let month = dt.getMonth();
  let year = dt.getFullYear();

  setDayOfTheWeek(day);
  setCurrentDate(date);
  setCurrentMonth(month);
  yr.innerHTML = year;
};

setDate();
