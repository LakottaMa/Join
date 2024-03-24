function floatContactHTML(name, email, i) {
    let bgColor = users[i]['bg'];
    let names = users[i]['name'].split(' '); //map iteriert durch jedes wort im array name
    let initials = names.map(word => word.charAt(0).toUpperCase()).join('');
    return `
        <div id="floatMobil">
            <h2>Contact Information</h2>
            <div id="arrowBack" class="cp" onclick="contactListMobil()">
                <img src="./assets/img/arrow-left-line.png" alt="arrowBack">
            </div
        </div>
        </div>
        <div class="floatingTop">            
            <div id="${i}" class="initialsFloating" style="background-color:${bgColor};">${initials}</div>
            <div class="floatingInteracts">
                <span>${name}</span>
                <div class="floatingBtn">
                     <p class="cp" onclick="editContact(${i})"><img src="./assets/img/edit.png" alt="edit">Edit</p>
                     <p class="cp" onclick="deleteUser(${i})"><img src="./assets/img/delete.png" alt="trashcan">Delete</p>
                </div>
            </div>
        </div>
        <div class="floatingBottom">
        <h2 id="contactInfo">Contact Information</h2>
        <div>
            <h3>Email</h3>
            <div id="emailFloating">${email}</div>
        </div>
        <div>
            <h3>Phone</h3>
            <div id="phoneFloating">${checkPhone(i)}</div>
        </div>

        </div>

        <button id="contactMobileFloat" class="blue-btn cp d-none" onclick="showDotMenu(); notClose(event)"><img
            src="./assets/img/menu-dots.png" alt="menu">
        </button>

    <div id="popupDotMenue" class="d-none" onclick="notClose(event)">
        <div class="popupMenue">
            <p class="cp" onclick="editContact(${i})"><img src="./assets/img/edit.png" alt="edit">Edit</p>
            <p class="cp" onclick="deleteUser(${i})"><img src="./assets/img/delete.png" alt="trashcan">Delete</p>
        </div>   
`;
}

function createContactPopupHTML() {
    document.getElementById('contactPopup').innerHTML = '';
    return `
    <div id="closePopup">
        <img onclick="closePopup()" src="./assets/img/close_white.png" alt="close">
    </div>
    <div id="topPopup">
        <img src="./assets/img/logo.png" alt="logo">
        <span>Add contact</span>
        <p>Tasks are better with a team!</p>
    </div>
    <div id="bottomPopup">
        <div class="avatarDiv">
            <div id="avatar">
                <img src="./assets/img/avatar_placeholder.png" alt="avatar">
            </div>
        </div>                  
        <form id="form" onsubmit="createNewContact(); return false">
            <div class="input-field">
                <input id="contactName" type="text" placeholder="Name" required>
                <img src="./assets/img/person.png" alt="avatar">
            </div>
            <div class="input-field">
                <input id="contactEmail" type="email" placeholder="Email" required>
                <img src="./assets/img/mail.png" alt="mail">
            </div>
            <div class="input-field">
                <input id="contactPhone" type="tel" placeholder="Phone" required>
                <img src="./assets/img/call.png" alt="call">
            </div>
            <div id="popupBtn">
                <button class="btnCancel cp" onclick="closePopup()">Cancel
                    <img src="./assets/img/close_black.svg" alt="check">
                 </button>
                <button class="btnCreate cp">Create contact
                    <img src="./assets/img/check._white.png" alt="check">
                </button>
            </div>                    
        </form>
    </div>
    
    `;
}

function editContactPopupHTML(i) {
    let bgColor = users[i]['bg'];
    let names = users[i]['name'].split(' '); //map iteriert durch jedes wort im array name
    let initials = names.map(word => word.charAt(0).toUpperCase()).join('');
    return `
    <div id="closePopup">
        <img onclick="closePopup()" src="./assets/img/close_white.png" alt="close">
    </div>
    <div id="topPopup">
        <img src="./assets/img/logo.png" alt="logo">
        <span>Edit contact</span>
        <p class="editPopupP">Tasks are better with a team!</p>
    </div>
    <div id="bottomPopup">
        <div class="avatarDiv">
            <div id="avatar">
                <div id="${i}" class="initialsFloating" style="background-color:${bgColor};"
                >${initials}</div>            
            </div>    
        </div>              
        <form id="form" onsubmit="saveUser(); return false;">
            <div class="input-field">
                <input id="contactName" type="text" placeholder="Name" required>
                <img src="./assets/img/person.png" alt="avatar">
            </div>
            <div class="input-field">
                <input id="contactEmail" type="email" placeholder="Email" required>
                <img src="./assets/img/mail.png" alt="mail">
            </div>
            <div class="input-field">
                <input id="contactPhone" type="tel" placeholder="Phone" required>
                <img src="./assets/img/call.png" alt="call">
            </div>
            <div id="popupBtn">
                <button class="btnDelete cp" onclick="deleteUser(${i})">Delete</button>                
                <button class="btnCreate cp" onclick="saveUser(${i})">Save<img
                    src="./assets/img/check._white.png" alt="check">
                </button>
            </div>                    
        </form>
    </div>
    `;
}