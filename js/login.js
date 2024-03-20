function guestLogIn(users) {
  let guestUser = users.find(user => user.name === 'Guest');
  if (guestUser) {
    sessionStorage.setItem('isLoggedIn', 'Guest');
    window.location.href = './summary.html';
  }
}

function logIn() {
  const emailInput = document.getElementById("email").value;
  const passwordInput = document.getElementById("password").value;
  if (verifiedLogin(emailInput, passwordInput)) {
    window.location.href = './summary.html';
  }
}

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
