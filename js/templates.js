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
  setActiveSiteClass('nav a', 'active-site');
  setActiveSiteClass('li a', 'active-site-legal-topics');
}

function showLogoutMenu() {
  let logoutMenu = document.getElementById('logout-menu');
  logoutMenu.classList.toggle('d-none');
}

function goBack() {
  window.history.back();
}

function sitesActive() {
  let activePage = window.location.pathname;
  let navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    if (link.href.includes(`${activePage}`)) {
      link.classList.add('active-site');
    }
  })
}

function setActiveSiteClass(selector, activeClass) {
  let activePage = window.location.pathname;
  document.querySelectorAll(selector).forEach(link => {
    if (link.href.includes(`${activePage}`)) {
      link.classList.add(activeClass);
    }
  });
}
