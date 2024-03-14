async function initContacts() {
    await includeHTML();
    await loadUsers();
    renderContactList();
}

function renderContactList() {
    try {
        users.sort((a, b) => a.name.localeCompare(b.name));
        let currentLetter = '';
        for (let i = 0; i < users.length; i++) {
            let contact = users[i];
            let firstLetter = contact['email'][0].toUpperCase();
            if (firstLetter !== currentLetter) {
                document.getElementById('allContacts').innerHTML += `
             <div class="letterBox">
                <div class="letter">${firstLetter}</div>
                <div id="${firstLetter}-content"></div>
            </div>
            `;
            }
            currentLetter = firstLetter;
            document.getElementById(`${firstLetter}-content`).innerHTML +=
                contactsHTML(contact);
            addBgColor(contact);
        }
    } catch (error) {
        console.error("Error fetching or parsing users data:", error);
    }
}

function contactsHTML(contact) {
    let names = contact['name'].split(' '); //map iteriert durch jedes wort im array name
    let initials = names.map(word => word.charAt(0).toUpperCase()).join('');  //join wird verwendet um die elemente des arrays in eine zeichenkette zu verwandeln
    let id = contact['id'];
    return `
        <div class="contactSmall cp" onclick="showFloatContact('${JSON.stringify(contact)}')">
            <div id="${id}"class="initials">${initials}</div>
            <div>
                <span>${contact['name']}</span>
                <p>${contact['email']}</p>
            </div>
        </div>
    `;
}

function showFloatContact(contact) {
    let name = contact['name'];
    let email = contact['email'];
    let phone = contact['phone'];
    let id = contact['id'];
    let names = contact['name'].split(' ');
    let initials = names.map(word => word.charAt(0).toUpperCase()).join('');
    document.getElementById('floatingContact').classList.remove('d-none');
    document.getElementById('floatingContact').innerHTML = '';
    document.getElementById('floatingContact').innerHTML = floatContactHTML(name, email, phone, id, initials);
}

function floatContactHTML(name, email, phone, id, initials) {
    return `
        <div class="floatingTop">
            <div id="${id}" class="initialsFloating">${initials}</div>
            <div class="floatingInteracts">
                <span>${name}</span>
                <div class="floatingBtn">
                     <p class="cp" onclick="editContact(${contact})"><img src="./assets/img/edit.png" alt="edit">Edit</p>
                     <p class="cp" onclick="deleteContact(${contact})"><img src="./assets/img/delete.png" alt="trashcan">Delete</p>
                </div>
            </div>
        </div>
        <div class="floatingBottom">
            <h2>Contact Information</h2>
        <div>
            <h3>Email</h3>
            <div id="emailFloating">${email}</div>
        </div>
        <div>
            <h3>Phone</h3>
            <div id="phoneFloating">${phone}</div>
        </div>
`;
}

function addBgColor(contact) {
    let id = contact['id'];
    let x = Math.floor(Math.random() * 256);
    let y = Math.floor(Math.random() * 256);
    let z = Math.floor(Math.random() * 256);
    let bgColor = "rgb(" + x + "," + y + "," + z + ")";
    document.getElementById(`${id}`).style.backgroundColor = bgColor;
}

// function createNewContact() {
//     let name = document.getElementById('contactName').value;
//     let email = document.getElementById('contactEmail').value;
//     let phone = document.getElementById('contactPhone').value;

//     let letter = name.charAt(0).toUpperCase();

//     for (let x = 0; x < alphabet.length; x++) {
//         if (alphabet[x] === letter) {
//             allContacts[letter].push({
//                 "name": name,
//                 "email": email,
//                 "phone": phone
//             })
//             break;
//         }

//     }

//     console.log('r', allContacts); //wieder löschen!!
// }


function addNewContact() {
    document.getElementById('addContactPopup').classList.remove('d-none');
    document.getElementById('addContactPopup').style.transform = 'translateX (584px)';
    document.getElementById('background').classList.add('back');
}

function closePopup() {
    document.getElementById('addContactPopup').classList.add('d-none');
    document.getElementById('background').classList.remove('back');
    document.getElementById('addContactPopup').style.transform = 'translateX (0px)';
}