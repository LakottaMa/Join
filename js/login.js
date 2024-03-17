function guestLogIn(users) {
  let guestUser = users.find(user => user.name === 'Guest');
  if (guestUser) {
    sessionStorage.setItem('isLoggedIn', 'G');
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
  alert('Email oder Passwort stimmen nicht überein');
  return false;
}
