async function initSignUp() {
  await loadUsers();
  await loadTasks();
}

async function register() {
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  let confirmedPassword = document.getElementById('confirmedPassword').value;
  const isEmailAvailable = !users.some(user => user.email === email); // Check if the email is available
  if (isEmailAvailable == true) {
    if (errorMsgPasswordConfirm(confirmedPassword, password)) {
      users.push({
        id: users.length + 1,
        name: name,
        email: email,
        password: password,
        phone: null,
      });
      await setItem('users', JSON.stringify(users));
      resetForm();
      signupPopup();
    } else {
      alert('Password does not match the confirmed password.'); // msg greate!!
    }
  } else {
    alert('Email already in use. Please try a different one.'); // msg greate!!
  }
}

/** Updated to "return true" when passwords match */
function errorMsgPasswordConfirm(confirmedPassword, password) {
  if (password !== confirmedPassword) {
    return false;
  }
  return true;
}

function backButton() {
  window.location.href = '/index.html';
}

function checkedSignup() {
  const checkbox = document.getElementById('accept-policy');
  let button = document.getElementById('signupBtn');
  checkbox.src.includes('unchecked') ? (
    checkbox.src = 'assets/img/check_checked.png', button.disabled = false, button.classList.remove('btn-disabled')
  ) : (
    checkbox.src = 'assets/img/check_unchecked.png', button.disabled = true, button.classList.add('btn-disabled')
  );
}

/** Popup nach erfolgreicher Registrierung */
function signupPopup() {
  const animation = document.getElementById('popup');
  animation.classList.remove('d-none');
  setTimeout(() => {
    window.location.href = './index.html';
  }, 2000);
}

/** zum leeren der Form und default checkBtn */
function resetForm() {
  const formFields = ['name', 'email', 'password', 'password'];
  formFields.forEach(field => document.getElementById(field).value = '');
}

function togglePasswordEye(inputId) {
  const inputValue = document.getElementById(inputId).value.trim();
  if (inputValue) {
    if (inputId === 'password') {
      document.getElementById('password-icon').src = './assets/img/visibility_off.png';
    } else if (inputId === 'confirmedPassword') {
      document.getElementById('confirmedPassword-icon').src = './assets/img/visibility_off.png';
    }
  }
}

function togglePasswordVisibility(inputId) {
  const input = document.getElementById(inputId);
  const inputValue = input.value.trim();
  if (inputValue) {
    if (input.type === "password") {
      input.type = "text";
      document.getElementById(inputId + '-icon').src = './assets/img/visibility.png';
    } else {
      input.type = "password";
      document.getElementById(inputId + '-icon').src = './assets/img/visibility_off.png';
    }
  }
}
