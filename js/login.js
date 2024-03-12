
let checkBoxLogin = false;
function rememberMe() {
  const checkBoxImage = document.getElementById('remember-me');
  checkBoxImage.src = checkBoxImage.src.includes('unchecked') ? './assets/img/check_checked.png' : './assets/img/check_unchecked.png';
  checkBoxLogin = !checkBoxLogin;
}

function guestLogIn(users) {
  let guestUser = users.find(user => user.name === 'Guest');
  if (guestUser) {
    sessionStorage.setItem('isLoggedIn', 'guest');
    window.location.href = './summary.html';
  }
}

function logIn(users) {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const foundUser = users.find(user => user.email == emailInput.value && user.password == passwordInput.value);
  if (foundUser) {
    sessionStorage.setItem('isLoggedIn', foundUser.name);
    window.location.href = './summary.html';
  }
}

let currentUser;
