

async function init() {
  loadUsers();
}

let checkBoxLogin = false;
function rememberMe() {
  const checkBoxImage = document.getElementById('remember-me');
  checkBoxImage.src = checkBoxImage.src.includes('unchecked') ? './assets/img/check_checked.png' : './assets/img/check_unchecked.png';
  checkBoxLogin = !checkBoxLogin;
}

function guestLogIn(users) {
  // Find the Guest user in the provided users array
  let guestUser = users.find(user => user.name === 'Guest');
  // Check if Guest user exists
  if (guestUser) {
    sessionStorage.setItem('isLoggedIn', 'guest');
    window.location.href = './summary.html';
  }
}

function logIn(users) {
  // let userEmail = document.getElementById('email');
  // let userPassword = document.getElementById('password');
  // let user = users.find(user => user.email == userEmail.value && userPassword.value == user.Password);  
  // console.log(user);
  // if (!user) {
  //   alert('Invalid email or password. Please try again.');
  //   return;
  // }


const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const foundUser = users.find(user => user.email == emailInput.value && user.password == passwordInput.value);
if (foundUser) {  
  sessionStorage.setItem('isLoggedIn', foundUser);
  window.location.href = './summary.html';
}
}




