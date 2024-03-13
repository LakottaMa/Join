async function init() {
  stored();
}

async function initLegalTopics() {
  await includeHTML();
}

/** rember me muss erst beim click des login btn aktiv sein!!! */
function unrememberMe() {
  let emailSaved = localStorage.getItem('email');
  let passwordSaved = localStorage.getItem('password');
  if (emailSaved && passwordSaved) {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
  }
}
/**
* log in data will be remembered for the next session
*/
let checkBoxLogin = false;
function rememberMe() {
  let checkBoxImage = document.getElementById('remember-me');
  let email = document.getElementById('email');
  let password = document.getElementById('password');
  checkBoxImage.src = checkBoxImage.src.includes('unchecked') ? './assets/img/check_checked.png' : './assets/img/check_unchecked.png';
  if (checkBoxLogin = !checkBoxLogin) {
    if (email.value && password.value) {
      localStorage.setItem('email', email.value);
      localStorage.setItem('password', password.value);
    }
  }
}

