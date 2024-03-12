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
      "id": "2",
      "tasks": []
  },
  {
      "name": "Bill Gates",
      "email": "bill.gates@example.com",
      "password": "Gates@Microsoft2",
      "id": "3",
      "tasks": []
  },
  {
      "name": "Linus Torvalds",
      "email": "linus.torvalds@example.com",
      "password": "Torvalds#Linux3",
      "id": "4",
      "tasks": []
  },
  {
      "name": "Sam Altman",
      "email": "sam.altman@example.com",
      "password": "Altman#YCombinator4",
      "id": "5",
      "tasks": []
  }
];

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