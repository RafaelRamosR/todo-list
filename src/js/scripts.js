const form = document.getElementById('form');
const divTask = document.querySelector('.viewTask');
const fragment = document.createDocumentFragment();

/*
  Generate the countdown of the task
*/
const countDownDate = (dateTime) => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Set the date we're counting down to
  const countDownDatetime = new Date(dateTime).getTime();
  const taskDates = document.querySelectorAll('.task-date');
  if (taskDates) {
    taskDates.forEach((taskDate) => {
      const contentTask = document.createElement('ul');
      contentTask.classList.add('task-date-content');
      /*
        Update the count down every 1 millisecond
        to show result as soon as page loads
      */
      const t = setInterval(() => {
        // Get today's date and time
        const now = new Date().getTime();
        // Find the distance between now and the count down date
        const distance = countDownDatetime - now;
        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);
        contentTask.innerHTML = `
          <li class="task-date-items"><span class="up-clock">${days}</span>Días</li>
          <li class="task-date-items"><span class="up-clock">${hours}</span>Horas</li>
          <li class="task-date-items"><span class="up-clock">${minutes}</span>Minutos</li>
          <li class="task-date-items"><span class="up-clock">${seconds}</span>Segundo</li>
        `;
        // Show message when counter is at zero
        if (distance < 0) {
          contentTask.innerHTML = `
            <p class="finish">TAREA FINALIZADA</p>
          `;
        }
      }, 1);
      // Insert message for container with only one child
      if (taskDate.childNodes.length === 1) {
        fragment.appendChild(contentTask);
        taskDate.appendChild(fragment);
      }
    });
  }
};

/*
  Delete all tasks from localStorage
*/
document.getElementById('deleteAll').addEventListener('click', () => {
  divTask.textContent = '';
  localStorage.clear();
});

/*
  Remove parent container from button
  and delete an item from localStorage
*/
const deleteStorage = (key, divContent) => {
  divContent.remove();
  localStorage.removeItem(key);
};

/*
  Create the task structure
  And assign the corresponding attributes
*/
const insertData = (data) => {
  // Task container and countdown
  const contentTask = document.createElement('div');
  contentTask.classList.add('task');
  contentTask.classList.add(`${data.color}`);
  contentTask.innerHTML = `
    <div class="task-content-title">
      <h1 class="task-title">${data.task}</h1>
    </div>
    <div class="task-date">
    </div>
  `;
  // Button that deletes the task
  const deleteBtn = document.createElement('input');
  deleteBtn.classList.add('btn-delete');
  deleteBtn.setAttribute('type', 'button');
  deleteBtn.setAttribute('data-key', data.id);
  deleteBtn.setAttribute('value', 'X');
  contentTask.appendChild(deleteBtn);
  // Assign delete function to button
  deleteBtn.addEventListener('click', (e) => {
    deleteStorage(e.target.dataset.key, e.path[1]);
  });

  fragment.appendChild(contentTask);
  divTask.appendChild(fragment);
  // Insert countdown when container is created
  countDownDate(data.dateTime);
};

/*
  Save data to current localStorage
*/
const setStorage = (key, value) => {
  localStorage.setItem(key, value);
};

/*
  Access stored data
*/
const getStorage = (key) => {
  const data = JSON.parse(localStorage.getItem(key));
  insertData(data);
};

/*
  Iterate keys to show all tasks stored in localStorage
*/
const getAllStorage = () => {
  divTask.textContent = '';
  for (let i = 0; i <= localStorage.length - 1; i += 1) {
    const key = localStorage.key(i);
    getStorage(key);
  }
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const et = e.target;
  const task = et.typeTask.value;
  const color = et.radioColor.value;
  const date = et.inputDate.value;
  const time = et.inputTime.value;
  const dateTime = `${date} ${time}`;
  // generate supremely secure ID xd
  const id = btoa(dateTime + Math.random());

  if (!validateEmpty(task)) {
    return validationMessage('Debe especificar el nombre de la tarea.');
  }

  if (!validateEmpty(color)) {
    return validationMessage('Seleccione un color antes de enviar');
  }

  if (!validateDate(date, time)) {
    return validationMessage('La fecha es invalida, ingrese una fecha superior a la fecha y hora actual.');
  }
  // Create object containing the data to store
  const taskObject = {
    id,
    task,
    color,
    dateTime,
  };
  form.reset();
  // Clean up possible error messages
  cleanMessage();
  // Save task
  setStorage(taskObject.id, JSON.stringify(taskObject));
  // Show task
  return getAllStorage();
});

getAllStorage();
