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
        <div id="avatar">
            <img class="avatar" src="./assets/img/avatar_placeholder.png" alt="avatar">
        </div>                  
        <form id="form" onsubmit="createNewContact(); return false">
            <div class="input-field">
                <input id="contactName" type="text" placeholder="Name" required>
                <img src="./assets/img/person.png" alt="avatar">
            </div>
            <div class="input-field">
                <input id="contactEmail" type="email" placeholder="Email" required>
                <img src="./assets/img/mail.png" alt="avatar">
            </div>
            <div class="input-field">
                <input id="contactPhone" type="tel" placeholder="Phone" required>
                <img src="./assets/img/call.png" alt="avatar">
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
    </div>
    <div id="bottomPopup">
        <div id="avatar">
            <div id="${i}" class="initialsFloating" style="background-color:${bgColor};"
            >${initials}
            </div>
        </div>                  
        <form id="form" onsubmit="saveUser(); return false;">
            <div class="input-field">
                <input id="contactName" type="text" placeholder="Name" required>
                <img src="./assets/img/person.png" alt="avatar">
            </div>
            <div class="input-field">
                <input id="contactEmail" type="email" placeholder="Email" required>
                <img src="./assets/img/mail.png" alt="avatar">
            </div>
            <div class="input-field">
                <input id="contactPhone" type="tel" placeholder="Phone" required>
                <img src="./assets/img/call.png" alt="avatar">
            </div>
            <div id="popupBtn">
                <button class="btnCancel cp" onclick="deleteUser(${i})">Delete</button>                
                <button class="btnCreate cp" onclick="saveUser(${i})">Save<img
                    src="./assets/img/check._white.png" alt="check">
                </button>
            </div>                    
        </form>
    </div>
    `;
}