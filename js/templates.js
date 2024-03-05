async function includeHTML() {
    let includeElements = document.querySelectorAll("[template]");
    for (let i = 0; i < includeElements.length; i++) {
      const element = includeElements[i];
      file = element.getAttribute("template");
      let resp = await fetch(file);
      if (resp.ok) {
        element.innerHTML = await resp.text();
      } else {
        element.innerHTML = "Page not found";
      }
    }
  }

function showLogoutMenu() {
  let logoutMenu = document.getElementById('logout-menu');
  logoutMenu.classList.toggle('d-none');
}