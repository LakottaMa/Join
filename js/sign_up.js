let storedContacs = []
let users = [
  {
    "name": "Guest",
    "email": "guest@guest.de",
    "password": "12345",
    "tasks": []
  },
  {
    "name": "Tim Cook",
    "email": "tim.cook@example.com",
    "password": "Cook#Apple5",
    "phone": "017852546",
    "id": "1",
    "tasks": []
  },
  {
    "name": "Steve Jobs",
    "email": "steve.jobs@example.com",
    "password": "Jobs#Apple1",
    "phone": "017852546",
    "id": "2",
    "tasks": []
  },
  {
    "name": "Bill Gates",
    "email": "bill.gates@example.com",
    "password": "Gates@Microsoft2",
    "phone": "017852546",
    "id": "3",
    "tasks": []
  },
  {
    "name": "Linus Torvalds",
    "email": "linus.torvalds@example.com",
    "password": "Torvalds#Linux3",
    "phone": "017852546",
    "id": "4",
    "tasks": []
  },
  {
    "name": "Sam Altman",
    "email": "sam.altman@example.com",
    "password": "Altman#YCombinator4",
    "phone": "017852546",
    "id": "5",
    "tasks": []
  }
];

async function initSignUp() {
  await loadUsers();
}

async function loadUsers() {
  try {
    users = JSON.parse(await getItem('users'));
  } catch (e) {
    console.error('Loading error:', e);
  }
  console.log(users);
}

/** register new user */
async function register() {
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  let confirmedPassword = document.getElementById('confirmedPassword').value;
  if (password !== confirmedPassword) {
    alert('Passwörter stimmen nicht überein!');
    return;
  }
  if (name && email && password) {
    users.push({ name: name, email: email, password: password });
    await setItem('users', JSON.stringify(users));
  }
  resetForm();
  signup();
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

/** btn zum registrieren */
function signup() {
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

let checkBoxLogin = false;
function rememberMe() {
  const checkBoxImage = document.getElementById('remember-me');
  checkBoxImage.src = checkBoxImage.src.includes('unchecked') ? './assets/img/check_checked.png' : './assets/img/check_unchecked.png';
  checkBoxLogin = !checkBoxLogin;
}

function guestLogIn(users) {
  let guestUser = users.find(user => user.name === 'Guest');
  if (guestUser) {
    sessionStorage.setItem('isLoggedIn', 'guest');
    window.location.href = './summary.html';
  }
}

async function logIn(users) {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const foundUser = users.find(user => user.email == emailInput.value && user.password == passwordInput.value);
  if (foundUser) {
    sessionStorage.setItem('isLoggedIn', foundUser.name);
    window.location.href = './summary.html';
  }
}