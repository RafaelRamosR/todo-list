/*
  Validate that the input is not empty
*/
const validateEmpty = (input, type) => {
  if(input.trim() === ""){
    return false
  }

  return true
}

/*
  Validate date and time
*/
const validateDate = (date, time) => {
  if(!validateEmpty(date) || !validateEmpty(time)){
    return false
  }

  /*
    Get current date
  */
  const n =  new Date(),
  year = n.getFullYear(),
  /*
    The month is represented from 0 to 11, 0 = January and 11 = December
    1 is added to the obtained month and a 0 is prepended if it is less than 10
  */
  mouth = n.getMonth() + 1,
  month = mouth > 10 ? mouth : '0'+mouth,
  day = n.getDate() > 10 ? n.getDate() : '0'+n.getDate()
  
  /*
    We obtain the year, month and day entered by the user
  */
  const dateYear = date.split('-')[0],
  dateMonth = date.split('-')[1],
  dateDay = date.split('-')[2]

  /*
    If the selected year is less than the current year, bye
    If the selected year is equal to the current one, but the month is less than the current month, bye again
  */
  if(dateYear < year || dateYear == year && dateMonth < month){
    return false
  }

  /*
    If it reaches this point, it means that the year and month are greater than or equal to the current date
    If they are the same, the day cannot be allowed to be less than the current day
  */
  if(dateYear == year && dateMonth == month && dateDay < day){
    return false
  }

  /*
    Get current time
  */
  const hour = n.getHours(),
  minute = n.getMinutes();

  /*
    Get the time selected by the user
  */
  const dateHour = time.split(':')[0],
  dateMinute = time.split(':')[1];

  /*
    The time only needs to be validated if the task is for today
  */
  if(dateYear == year && dateMonth == month && dateDay == day){
    /*
      If you select a time lower than the current time, bye
      If the hour is equal to the current one, the minutes cannot be less than the current minutes
    */
    if(dateHour < hour || dateHour == hour && dateMinute < minute){
      return false
    }
  }
  
  return true
}

/*
  Show validation message on screen
*/
const validationMessage = (message) => {
  // Possible previous messages are deleted
  deleteStorage()
  const contentMessage = document.createElement("div")
  contentMessage.classList.add("error")
  contentMessage.innerHTML = `
    <p class="error-message">${message}</p>
  `
  //The message is inserted before the first child
  fragment.prepend(contentMessage)
  divTask.prepend(fragment)
}