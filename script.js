/**
 * Initializes the application by loading users and tasks.
 */
async function init() {
  await loadUsers();
  await loadTasks();
}

/**
 * Initializes legal topics by including HTML.
 */
async function initLegalTopics() {
  await includeHTML();
}

/**
 * Removes saved email and password from local storage if they exist.
 * @param {type} paramName - description of parameter
 * @return {type} description of return value
 */
function unrememberMe() {
  let emailSaved = localStorage.getItem('email');
  let passwordSaved = localStorage.getItem('password');
  if (emailSaved && passwordSaved) {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
  }
}

/** log in data will be remembered in localStorage */
let checkBoxLogin = false;
/**
 * Function to remember user login information if the 'Remember Me' checkbox is checked.
 * @param {type} paramName - description of parameter
 * @return {type} description of return value
 */
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