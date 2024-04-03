/** onclick pre-stored guest login, with storage of the name in sessionStorage */
function guestLogIn(localUsers) {
  let guestUser = localUsers.find(user => user.name === 'Guest');
  if (guestUser) {
    sessionStorage.setItem('isLoggedIn', 'Guest');
    window.location.href = './summary.html';
  }
}

/** onclick Log in, with verification of user data */
function logIn() {
  const emailInput = document.getElementById("email").value;
  const passwordInput = document.getElementById("password").value;
  if (verifiedLogin(emailInput, passwordInput)) {
    window.location.href = './summary.html';
  }
}

/** check function for saved user data, with error message if not correct */
function verifiedLogin(email, password) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email && users[i].password === password) {
      sessionStorage.setItem('isLoggedIn', users[i].name);
      return true;
    }
  }
  LoginMatchError();
  return false;
}

/** error message for the logIn function */
function LoginMatchError() {
  const confirmedPassword = document.getElementById('password');
  const errorMsgBox = document.getElementById('loginMatch');
  confirmedPassword.classList.add('inputerror');
  errorMsgBox.textContent = 'Wrong password or email Ups! Try again';
  document.getElementById('password').addEventListener('keyup', () => {
    errorMsgBox.textContent = '';
    confirmedPassword.classList.remove('inputerror');
  });
}

/** greeting-slider on mobile screen below 480px width */
function greetingScreen() {
  let greetingMobile = document.getElementById('greetingMobile');
  let sumContent = document.getElementById('sumContent');
  if (window.innerWidth <= 480) {
    sumContent.style.display = 'none';
    greetingMobile.style.height = '100dvh';
    setTimeout(function () {
      greetingMobile.style.height = '0';
      sumContent.style.display = 'flex';
      document.getElementById('greetMobile').style.display = 'none';
      document.getElementById('greetingNameMobile').style.display = 'none';
    }, 1300)    
  }  
}

