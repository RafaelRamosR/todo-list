const form = document.getElementById("form");
const divTask = document.querySelector(".viewTask")
const fragment = document.createDocumentFragment()

form.addEventListener('submit', e => {
  e.preventDefault();
  const task = e.target.typeTask.value
  const color = e.target.radioColor.value
  const newColor = e.target.inputColor.value
  const date = e.target.inputDate.value
  form.reset()

  const miObjeto = { 'id': date, 'task': task, 'date': date, 'color': color, 'newColor': newColor };
  setStorage(date, JSON.stringify(miObjeto))
  getStorage(date)
});

/*
  Getting the key of the task to be deleted
*/
divTask.addEventListener('click', (e) => {
  deleteStorage(e.target.dataset.key)
})

/*
  Create the task structure
  And assign the corresponding attributes
*/
const insertData = (data) => {
  const contentTask = document.createElement("div")
  contentTask.classList.add("task")
  contentTask.innerHTML = `
    <div class="task-title" style="background-color:${data.color}">
      <h1>${data.task}</h1>
    </div>
    <div class="task-date" style="background-color:${data.newColor}">
      <span class="task-date-item" id="day">${data.date}</span>
    </div>
    <input type="button" class="btn-delete" data-key="${data.id}" value="X">
  `

  fragment.appendChild(contentTask)
  divTask.appendChild(fragment)
}

/*
  Save data to current localStorage
*/
const setStorage = (key, value) => {
  localStorage.setItem(key, value);
}

/*
  Access stored data
*/
const getStorage = (key) => {
  const data = localStorage.getItem(key)
  insertData(JSON.parse(data))
}

/*
  Iterate keys to show all tasks stored in localStorage
*/
const getAllStorage = () => {
  for (i = 0; i <= localStorage.length - 1; i++) {
    key = localStorage.key(i);
    getStorage(key)
  }
}

/*
  Delete an item from localStorage
  Empty the task area
  And show all tasks again to create update effect
*/
const deleteStorage = (key) => {
  localStorage.removeItem(key);
  //localStorage.clear();
  divTask.textContent = ''
  divTask.appendChild(fragment)
  getAllStorage()
}

getAllStorage()