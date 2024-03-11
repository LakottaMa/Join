let signUpCheck = false;
let loginCheck = false;

function checkedSignup() {
  const checkbox = document.getElementById('accept-policy');
  let button = document.getElementById('signup-btn');
  checkbox.src.includes('unchecked') ? (
    checkbox.src = 'assets/img/check_checked.png',
    button.disabled = false, button.classList.add('cp')
  ) : (
    checkbox.src = 'assets/img/check_unchecked.png',
    button.disabled = true, button.classList.remove('cp')
  );
}



/** btn zum registrieren */
function signup(event) { 
  event.preventDefault();

  // signUpOkay();

  const animation = document.getElementById('popup');
  animation.classList.remove('d-none');
  setTimeout(() => {
    // window.location.href = './summary.html';
  }, 2000);
}

/** check ob push in web-storage erfolgreich */
function signUpOkay() {


  resetForm();
}

/** zum leeren der Form und default checkBtn */
function resetForm() {
  document.getElementById('signup-name').value = '';
  document.getElementById('login-email').value = '';
  document.getElementById('signup-password').value = '';
  document.getElementById('confirm-signup-password').value = '';
}
