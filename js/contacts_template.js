/**
 * create html code for the detailview of the contact * 
 * @param {string} name of the clicked contact
 * @param {string} email of the clicked contact
 * @param {integer} i to select the correct contact
 * @returns html
 */

function floatContactHTML(name, email, i) {
    let bgColor = users[i]['bg'];
    let names = users[i]['name'].split(' '); //map iteriert durch jedes wort im array name
    let initials = names.map(word => word.charAt(0).toUpperCase()).join('');
    return /*html*/ `
        <div id="floatMobil">
            <h2>Contact Information</h2>
            <div id="arrowBack" class="cp" onclick="showContactListMobil()">
                <img src="./assets/img/arrow-left-line.png" alt="arrowBack">
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

        <button id="contactMobileFloat" class="blue-btn cp" onclick="showDotMenu(); notClose(event)"><img
            src="./assets/img/menu-dots.png" alt="menu">
        </button>

        <div id="popupDotMenue" class="d-none" onclick="notClose(event)">
        <div class="popupMenue">
            <p class="cp" onclick="editContact(${i})"><img src="./assets/img/edit.png" alt="edit">Edit</p>
            <p class="cp" onclick="deleteUser(${i})"><img src="./assets/img/delete.png" alt="trashcan">Delete</p>
        </div> 
    </div>      
`;
}

/**
 * create html code for the Addpopup to add a new contact * 
 * @returns html
 */
function createContactPopupHTML() {
    document.getElementById('contactPopup').innerHTML = '';
    return  /*html*/`
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
        <form class="input-box" onsubmit="createNewContact(); return false">
            <div class="input-field">
                <input id="contactName" type="text" placeholder="Name" autofocus required>
                <img src="./assets/img/person.png" alt="avatar">
            </div>
            <div class="input-field">
                <input id="contactEmail" type="email" placeholder="Email" autofocus required>
                <img src="./assets/img/mail.png" alt="mail">
            </div>
            <div class="input-field">
                <input id="contactPhone" type="tel" placeholder="Phone" autofocus required>
                <img src="./assets/img/call.png" alt="call">
            </div>
            <div id="popupBtn">
                <button class="btnCancel cp" onclick="closePopup()">Cancel<svg width="25" height="25" viewBox="0 0 25 25" fill="" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.501 12.983L17.744 18.226M7.258 18.226L12.501 12.983L7.258 18.226ZM17.744 7.73999L12.5 12.983L17.744 7.73999ZM12.5 12.983L7.258 7.73999L12.5 12.983Z" stroke="#647188" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                 </button>
                <button class="btnCreate active-btn-svg cp">Create contact<svg width="14" height="14" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.54996 9.65L14.025 1.175C14.225 0.975 14.4625 0.875 14.7375 0.875C15.0125 0.875 15.25 0.975 15.45 1.175C15.65 1.375 15.75 1.6125 15.75 1.8875C15.75 2.1625 15.65 2.4 15.45 2.6L6.24996 11.8C6.04996 12 5.81663 12.1 5.54996 12.1C5.2833 12.1 5.04996 12 4.84996 11.8L0.549963 7.5C0.349963 7.3 0.25413 7.0625 0.262463 6.7875C0.270796 6.5125 0.374963 6.275 0.574963 6.075C0.774963 5.875 1.01246 5.775 1.28746 5.775C1.56246 5.775 1.79996 5.875 1.99996 6.075L5.54996 9.65Z" fill="white"></path>
                    </svg>
                </button>
            </div>                    
        </form>
    </div>`;
}

/**
 * create html code for the Editpopup to edit a contact
 * 
 * @param {integer} i to select the correct contact
 * @returns html
 */
function editContactPopupHTML(i) {
    let bgColor = users[i]['bg'];
    let names = users[i]['name'].split(' '); //map iteriert durch jedes wort im array name
    let initials = names.map(word => word.charAt(0).toUpperCase()).join('');
    return  /*html*/`
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
        <form id="editForm" class="input-box" onsubmit="saveUser(); return false;">
            <div class="input-field">
                <input id="contactName" type="text" placeholder="Name" autofocus required>
                <img src="./assets/img/person.png" alt="avatar">
            </div>
            <div class="input-field">
                <input id="contactEmail" type="email" placeholder="Email" autofocus required>
                <img src="./assets/img/mail.png" alt="mail">
            </div>
            <div class="input-field">
                <input id="contactPhone" type="tel" placeholder="Phone" autofocus required>
                <img src="./assets/img/call.png" alt="call">
            </div>
            <div id="popupBtn">
                <button class="btnDelete cp" onclick="deleteUser(${i})">Delete</button>                
                <button id="saveEditUser" class="btnCreate active-btn-svg cp" onclick="saveUser(${i})">Save<svg width="14" height="14" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.54996 9.65L14.025 1.175C14.225 0.975 14.4625 0.875 14.7375 0.875C15.0125 0.875 15.25 0.975 15.45 1.175C15.65 1.375 15.75 1.6125 15.75 1.8875C15.75 2.1625 15.65 2.4 15.45 2.6L6.24996 11.8C6.04996 12 5.81663 12.1 5.54996 12.1C5.2833 12.1 5.04996 12 4.84996 11.8L0.549963 7.5C0.349963 7.3 0.25413 7.0625 0.262463 6.7875C0.270796 6.5125 0.374963 6.275 0.574963 6.075C0.774963 5.875 1.01246 5.775 1.28746 5.775C1.56246 5.775 1.79996 5.875 1.99996 6.075L5.54996 9.65Z" fill="white"></path>
                </svg>
                </button>
            </div>                    
        </form>
    </div>
    `;
}