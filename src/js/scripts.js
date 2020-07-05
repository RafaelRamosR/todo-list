const form = document.getElementById('form'),
  divTask = document.querySelector('.viewTask'),
  fragment = document.createDocumentFragment();

/*
  Delete all tasks from localStorage
*/
document.getElementById('deleteAll').addEventListener('click', () => {
  divTask.textContent = '';
  localStorage.clear();
});

/*
  Generate the countdown of the task
*/
const countDownDate = (dateTime) => {
  const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;

  // Set the date we're counting down to
  const countDownDatetime = new Date(dateTime).getTime(),
    taskDates = document.querySelectorAll('.task-date');
  if (taskDates) {
    taskDates.forEach((taskDate) => {
      const contentTask = document.createElement('ul');
      /*
        Update the count down every 1 millisecond
        to show result as soon as page loads
      */
      const t = setInterval(() => {
        // Get today's date and time
        const now = new Date().getTime(),
          // Find the distance between now and the count down date
          distance = countDownDatetime - now,
          // Time calculations for days, hours, minutes and seconds
          days = Math.floor(distance / day),
          hours = Math.floor((distance % day) / hour),
          minutes = Math.floor((distance % hour) / minute),
          seconds = Math.floor((distance % minute) / second);
        contentTask.innerHTML = `
          <ul>
            <li><span>${days}</span>Días</li>
            <li><span>${hours}</span>Horas</li>
            <li><span>${minutes}</span>Minutos</li>
            <li><span>${seconds}</span>Segundo</li>
          </ul>
        `;
        // Show message when counter is at zero
        if (distance < 0) {
          contentTask.innerHTML = `
            <p class="finish">TAREA FINALIZADA</p>
          `;
        }
      }, 1);
      // Show message when counter is at zero
      if (taskDate.childNodes.length === 1) {
        fragment.appendChild(contentTask);
        taskDate.appendChild(contentTask);
      }
    });
  }
};

/*
  Access stored data
*/
const getStorage = (key) => {
  const data = JSON.parse(localStorage.getItem(key));
  insertData(data);
};

/*
  Save data to current localStorage
*/
const setStorage = (key, value) => {
  localStorage.setItem(key, value);
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const et = e.target,
    task = et.typeTask.value,
    color = et.radioColor.value,
    date = et.inputDate.value,
    time = et.inputTime.value,
    dateTime = `${date} ${time}`,
    // generate supremely secure ID xd
    id = btoa(dateTime + Math.random());

  if (!validateEmpty(task)) {
    return validationMessage('Debe especificar el nombre de la tarea.');
  }

  if (!validateEmpty(color)) {
    return validationMessage('Seleccione un color antes de enviar');
  }

  if (!validateDate(date, time)) {
    return validationMessage('La fecha es invalida, ingrese una fecha superior a la fecha y hora actual.');
  }

  const taskObject = {
    id,
    task,
    color,
    dateTime,
  };
  form.reset();
  cleanMessage();
  // Save task
  setStorage(taskObject.id, JSON.stringify(taskObject));
  // Show task
  return getStorage(taskObject.id);
});

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

/*
  Delete an item from localStorage
  Empty the task area
  And show all tasks again to create update effect
*/
const deleteStorage = (key) => {
  localStorage.removeItem(key);
  getAllStorage();
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
    <div class="task-title">
      <h1>${data.task}</h1>
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
    deleteStorage(e.target.dataset.key);
  });

  fragment.appendChild(contentTask);
  divTask.appendChild(fragment);
  // Insert countdown when container is created
  countDownDate(data.dateTime);
};

getAllStorage();
