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
  showInitials();
}

function showLogoutMenu(event) {
  let logoutMenu = document.getElementById('logout-menu');
  logoutMenu.classList.toggle('d-none');  
}


function goBack() {
  window.history.back();
}

/** aktive html mit ensprechender bg-color des links */
function setActiveSiteClass(selector, activeClass) {
  let activePage = window.location.pathname;
  document.querySelectorAll(selector).forEach(link => {
    if (link.href.includes(`${activePage}`)) {
      link.classList.add(activeClass);
    }
  });
}

/** Anfangsbuchstaben der Namen werden gefiltert */
function showInitials() {
  let initialcontainer = document.getElementById('userInitial');
  let isLoggedIn = sessionStorage.getItem('isLoggedIn');
  let names = isLoggedIn.split(' ');
  let initials = names.map(word => word.charAt(0).toUpperCase()).join('');
  initialcontainer.innerHTML = `${initials}`;
}
