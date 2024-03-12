

async function init() {
  loadUsers();
}


let checkBoxLogin = false;
function rememberMe() {
  const checkBoxImage = document.getElementById('remember-me');
  checkBoxImage.src = checkBoxImage.src.includes('unchecked') ? './assets/img/check_checked.png' : './assets/img/check_unchecked.png';
  checkBoxLogin = !checkBoxLogin; /*Der Wert der Variablen checkBoxLogin wird invertiert (wahr/falsch getauscht)*/
}


function guestLogIn(users) {
  // Find the Guest user in the provided users array
  const guestUser = users.find(user => user.user === 'Guest');

  // Check if Guest user exists
  if (guestUser) {
    console.log("Guest user found. Performing Guest Login...");

    // Simulate Guest Login logic (replace with your actual implementation)
    // This could involve setting a flag, storing data in session storage, etc.
    sessionStorage.setItem('isLoggedIn', 'guest');

    // Redirect to the summary page after successful Guest Login
    window.location.href = './summary.html';
  } else {
    console.error("Guest user not found in the provided data.");
  }
}

// function logout() {
//   sessionStorage.clear();
//   window.location.href = './index.html';
//   console.log("Ist der Session Storage leer?", sessionStorage.getItem(key) === null);
// }


