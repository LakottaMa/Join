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