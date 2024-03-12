
let users = [
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
