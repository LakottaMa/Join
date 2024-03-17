async function initSummary() {
    await includeHTML();
    await loadUsers();
    await loadTasks();
    greetingMessage();
}

// function greetingMessage() {
//     let isLoggedIn = sessionStorage.getItem('isLoggedIn');
//     let currentHour = checkHour();
//     let greeting = document.getElementById('greeting');
//     let greetingName = document.getElementById('greetingName');
//     if (currentHour >= 0 && currentHour <= 11) {
//         greeting.innerHTML = `Good Morning`;
//         greetingName.innerHTML = `${isLoggedIn}`;
//     } else if (currentHour > 11 && currentHour < 14) {
//         greeting.innerHTML = 'Good Day,'
//     } else if (currentHour >= 14 && currentHour < 18) {
//         greeting.innerHTML = 'Good afternoon'
//     } else {
//         greeting.innerHTML = 'Good Evening';
//     }
// }


function storeLoginStatus(Value) {
    sessionStorage.setItem('isLoggedIn', Value);
  }
  
  function checkLoginStatus() {
    let isLoggedIn = sessionStorage.getItem('isLoggedIn');
    return isLoggedIn;
  }
  
  function greetingMessage() {
    let isLoggedIn = checkLoginStatus();
    let currentHour = checkHour();
    let greeting = document.getElementById('greeting');
    let greetingName = document.getElementById('greetingName');  
    if (currentHour >= 0 && currentHour <= 11) {
      greeting.innerHTML = `Good Morning`;
      greetingName.innerHTML = `${isLoggedIn}`;
    } else if (currentHour > 11 && currentHour < 14) {
      greeting.innerHTML = 'Good Day,'
    } else if (currentHour >= 14 && currentHour < 18) {
      greeting.innerHTML = 'Good afternoon'
    } else {
      greeting.innerHTML = 'Good Evening';
    }
  }
 
  


function checkHour() {
    let currentDate = new Date();
    let currentHour = currentDate.getHours();
    return currentHour;
}