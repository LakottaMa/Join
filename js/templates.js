async function includeHTML() {
  let includeElements = document.querySelectorAll("[template]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    const file = element.getAttribute("template");
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
/** hide Elements on extern legal topics, befor logged in */
function hideEelements() {
  document.getElementById('headerInfo').style.display = 'none';
  document.getElementById('navLinks').style.display = 'none';
  document.getElementById('mobileNavLinks').style.display = 'none';
}

function showLogoutMenu() {
  let logoutMenu = document.getElementById('logout-menu');
  logoutMenu.classList.toggle('d-none');
}

function fadeIn() {
  $('#animatedDiv').fadeIn(3000);
}

function goBack() {
  if (!window.history.back()) {
    window.close();
  } else {
    window.history.back();
  }
}

/** aktive html mit ensprechender bg-color des links */
function setActiveSiteClass(selector, activeClass) {
  let activePage = window.location.pathname;
  document.querySelectorAll(selector).forEach(link => {
    if (link.href && link.href.includes(activePage)) {
      link.classList.add(activeClass);
      let footer = document.getElementById("mobileNavLinks");
      let footerLinks = footer.getElementsByTagName("a");
      for (let i = 0; i < footerLinks.length; i++) {
        if (footerLinks[i].href && footerLinks[i].href.includes(activePage)) {
          let imageName = footerLinks[i].id.split("-")[0];
          let imagePath = `./assets/img/mobile_${imageName}_blue.png`;
          footerLinks[i].getElementsByTagName("img")[0].src = imagePath;
        }
      }
    }
  });
}

/** show initials in header who is logged in */
function showInitials() {
  let initialcontainer = document.getElementById('userInitial');
  let isLoggedIn = sessionStorage.getItem('isLoggedIn');
  if (!isLoggedIn || isLoggedIn.trim() === '') {
    initialcontainer.innerHTML = '';
    hideEelements();
    return;
  }
  let names = isLoggedIn.split(' ');
  let initials = names.map(word => word.charAt(0).toUpperCase()).join('');
  initialcontainer.innerHTML = initials;
}




