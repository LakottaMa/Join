function checkedSignup() {
  const checkbox = document.getElementById('accept-policy');
  let button = document.getElementById('signup-btn');
  checkbox.src.includes('unchecked') ? (
    checkbox.src = 'assets/img/check_checked.png',
    button.disabled = false, button.classList.add('cp')
  ) : (
      checkbox.src = 'assets/img/check_unchecked.png',
      button.disabled = true
    );
}

/** btn zum registrieren */
function signup() {

  signUpOkay();
}

/** check ob push in web-storage erfolgreich */
function signUpOkay() {
  const popover = document.getElementById('sign-up-popover');



  resetForm();
}

/** zum leeren der Form und default checkBtn */
function resetForm() {
  document.getElementById('signup-name').value = '';
  document.getElementById('login-email').value = '';
  document.getElementById('signup-password').value = '';
  document.getElementById('confirm-signup-password').value = '';
}

