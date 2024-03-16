

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
        name: name,
        email: email,
        password: password,
        phone: null,
        tasks: []
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
  const formFields = ['name', 'email', 'password', 'confirmedPassword'];
  formFields.forEach(field => document.getElementById(field).value = '');
}

function togglePasswordVisibility(elementId) {
  const element = document.getElementById(elementId);
  if (element.type === "password") {
    visibillityOffIcon = document.getElementById('login-password-icon');
    visibillityOffIcon.src='./assets/img/visibility_off.png';
    element.type = "text";
    // icon visibillity
  } else {
    element.type = "password";
  }
}

document.getElementById("eingabefeld").addEventListener("focus", function() {
  var eingabeWert = document.getElementById("eingabefeld").value;
  if (eingabeWert) {
      console.log("Eingabe erfolgt: true");
  } else {
      console.log("Keine Eingabe erfolgt: false");
  }
});


