const form = document.getElementById("form");
const divTask = document.querySelector(".viewTask")
const fragment = document.createDocumentFragment()

form.addEventListener('submit', e => {
  e.preventDefault();
  const task = e.target.typeTask.value
  const color = e.target.radioColor.value
  const date = e.target.inputDate.value
  const time = e.target.inputTime.value
  const dateTime = date + " " + time

  if (!validateEmpty(task)) {
    return validationMessage('Debe especificar el nombre de la tarea.')
  }

  if (!validateEmpty(color)) {
    return validationMessage('Seleccione un color antes de enviar')
  }

  if (!validateDate(date, time)) {
    return validationMessage('La fecha es invalida, ingrese una fecha superior a la fecha y hora actual.')
  }

  form.reset()
  const miObjeto = { 'id': date, 'task': task, 'color': color, 'date': dateTime, 'time': time };
  deleteStorage()
  setStorage(date, JSON.stringify(miObjeto))
  getStorage(date)
});

/*
  Getting the key of the task to be deleted
*/
const countDownDate = (dateTime) => {
  console.log(dateTime.date)
  const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;

  // Set the date we're counting down to
  const countDownDate = new Date(dateTime.date).getTime();
  const taskDates = document.querySelectorAll(".task-date")
  if (taskDates) {
    taskDates.forEach((taskDate) => {
      //taskDate.textContent = ''
      const contentTask = document.createElement("ul")
      let distance2 = ""

      // Update the count down every 1 second
      const x = setInterval(() => {
        // Get today's date and time
        const now = new Date().getTime();
        // Find the distance between now and the count down date
        const distance = countDownDate - now;
        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);
        contentTask.innerHTML = `
          <ul>
            <li><span>${days}</span>Días</li>
            <li><span>${hours}</span>Horas</li>
            <li><span>${minutes}</span>Minutos</li>
            <li><span>${seconds}</span>Segundo</li>
          </ul>
        `
        if (distance < 0) {
          contentTask.innerHTML = `<p class="finish">TAREA FINALIZADA</p>`
        }
      }, second);

      if (taskDate.childNodes.length == 1) {
        fragment.appendChild(contentTask)
        taskDate.appendChild(contentTask)
      }

    })
  }
}

/*
  Create the task structure
  And assign the corresponding attributes
*/
const insertData = (data) => {
  const contentTask = document.createElement("div")
  contentTask.classList.add("task")
  contentTask.classList.add(`${data.color}`)
  contentTask.innerHTML = `
    <div class="task-title">
      <h1>${data.task}</h1>
    </div>
    <div class="task-date">
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
  countDownDate(JSON.parse(data))
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