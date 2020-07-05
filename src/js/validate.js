/* Validate that the input is not empty */
const validateEmpty = (input) => {
  if (input.trim() === '') {
    return false;
  }
  return true;
};

/* Validate date and time */
const validateDate = (date, time) => {
  if (!validateEmpty(date) || !validateEmpty(time)) {
    return false;
  }

  /*
    Get current date
    The month is represented from 0 to 11, 0 = January and 11 = December
    1 is added to the obtained month and a 0 is prepended if it is less than 10
  */
  const n = new Date(),
    year = n.getFullYear(),
    month = n.getMonth() + 1,
    day = n.getDate();

  // We obtain the year, month and day entered by the user
  const dateYear = parseInt(date.split('-')[0], 10),
    dateMonth = parseInt(date.split('-')[1], 10),
    dateDay = parseInt(date.split('-')[2], 10);

  /*
    If the selected year is less than the current year, bye
    If the selected year is equal to the current one,
    but the month is less than the current month, bye again
  */
  if (dateYear < year) {
    return false;
  }

  if (dateYear === year && dateMonth < month) {
    return false;
  }

  /*
    If it reaches this point, it means that the year
    and month are greater than or equal to the current date
    If they are the same, the day cannot be allowed to be less than the current day
  */
  if (dateYear === year && dateMonth === month && dateDay < day) {
    return false;
  }

  // Get current time
  const hour = n.getHours(),
    minute = n.getMinutes(),
    // Get the time selected by the user
    dateHour = parseInt(time.split(':')[0], 10),
    dateMinute = parseInt(time.split(':')[1], 10);

  //  The time only needs to be validated if the task is for today
  if (dateYear === year && dateMonth === month && dateDay === day) {
    /*
      If you select a time lower than the current time, bye
      If the hour is equal to the current one, the minutes cannot be less than the current minutes
    */
    if (dateHour < hour) {
      return false;
    }

    if (dateHour === hour && dateMinute < minute) {
      return false;
    }
  }
  return true;
};

const cleanMessage = () => {
  // Possible previous messages are deleted
  if (document.querySelector('.error')) {
    document.querySelector('.error').remove();
  }
};

/* Show validation message on screen */
const validationMessage = (message) => {
  cleanMessage();
  // Create message
  const contentMessage = document.createElement('div');
  contentMessage.classList.add('error');
  contentMessage.innerHTML = `
    <p class="error-message">${message}</p>
  `;
  // The message is inserted before the first child
  fragment.prepend(contentMessage);
  divTask.prepend(fragment);
};
