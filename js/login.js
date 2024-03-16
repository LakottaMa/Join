function guestLogIn(users) {
    let guestUser = users.find(user => user.name === 'Guest');
    if (guestUser) {
        sessionStorage.setItem('isLoggedIn', 'G');
        window.location.href = './summary.html';
    }
}

// function logIn(users) {
//     const emailInput = document.getElementById("email").value;
//     const passwordInput = document.getElementById("password").value;
//     const foundUser = users.find(user => user.email == emailInput && user.password == passwordInput);
//     if (foundUser == true) {
//         sessionStorage.setItem('isLoggedIn', foundUser.name);
//         window.location.href = './summary.html';
//     }
// }

function errorMsgLoginConfirm(emailInput, passwordInput) {
    if (passwordInput !== emailInput) {
        return false;
    }
    return true;
}

function logIn(users) {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const foundUser = users.find(user => user.email == emailInput.value && user.password == passwordInput.value);
  if (foundUser) {
    sessionStorage.setItem('isLoggedIn', foundUser.name);
  }
  window.location.href = './summary.html';
}