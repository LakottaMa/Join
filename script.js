let rememberLogin;
let guestActive = false;
let userLoggedIn = false;

/*** first load over all */
async function init() {
   await includeHTML();
   
}

function logout() {
   sessionStorage.clear();
}

