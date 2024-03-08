let checkBoxLogin = false;
function rememberMe() {
  const checkBoxImage = document.getElementById('remember-me');
  checkBoxImage.src = checkBoxImage.src.includes('unchecked') ? './assets/img/check_checked.png' : './assets/img/check_unchecked.png';
  checkBoxLogin = !checkBoxLogin; /*Der Wert der Variablen checkBoxLogin wird invertiert (wahr/falsch getauscht)*/
}



/** check Remember me in local storage speichern */