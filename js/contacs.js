async function initContacts() {
    await includeHTML();
    await loadUsers();
    renderContactList();
}

function renderContactList() {
    document.getElementById('allContacts').innerHTML = '';
    try {
        users.sort((a, b) => a.name.localeCompare(b.name));
        let currentLetter = '';
        for (let i = 0; i < users.length; i++) {
            let contact = users[i];
            let firstLetter = contact['name'][0].toUpperCase();
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
                contactsHTML(i);
            addBgColor(i);

        }
    } catch (error) {
        console.error("Error fetching or parsing users data:", error);
    }
}

function contactsHTML(i) {
    let names = users[i]['name'].split(' '); //map iteriert durch jedes wort im array name
    let initials = names.map(word => word.charAt(0).toUpperCase()).join('');  //join wird verwendet um die elemente des arrays in eine zeichenkette zu verwandeln
    let id = users[i]['id'];
    return `
        <div class="contactSmall cp" onclick="showFloatContact(${i})">
            <div id="${id}"class="initials">${initials}</div>
            <div>
                <span>${users[i]['name']}</span>
                <p>${users[i]['email']}</p>
            </div>
        </div>
        <button id="loeschButton" onclick="deleteUser(${id})" class="login-btn">löschen</button>
    `;
}
/***************************** */
/** test function zum löschen */
function deleteUser(userId) {
    if (userId) {
        const userIdNumber = parseInt(userId); // Convert ID to number
        const userIndex = users.findIndex(user => user.id === userIdNumber);
        if (userIndex !== -1) {
            users.splice(userIndex, 1);
            alert("User deleted successfully!");
        } else {
            alert("User with ID " + userId + " not found.");
        }
    }
    setItem('users', JSON.stringify(users));
    renderContactList();
    console.log('user mit der', userId, 'wurde gelöscht');
    console.table(users);
}
/**************************** */


function showFloatContact(i) {
    let name = users[i]['name'];
    let email = users[i]['email'];
    let id = users[i]['id'];

    let names = users[i]['name'].split(' ');
    let initials = names.map(word => word.charAt(0).toUpperCase()).join('');
    document.getElementById('floatingContact').classList.remove('d-none');
    document.getElementById('floatingContact').innerHTML = '';
    document.getElementById('floatingContact').innerHTML = floatContactHTML(name, email, id, initials, i);
   }

function floatContactHTML(name, email, id, initials, i) {
    return `
        <div class="floatingTop">
            <div id="${id}" class="initialsFloating" style="background-color:addBgColor(${i});">${initials}</div>
            <div class="floatingInteracts">
                <span>${name}</span>
                <div class="floatingBtn">
                     <p class="cp" onclick="editContact(${i})"><img src="./assets/img/edit.png" alt="edit">Edit</p>
                     <p class="cp" onclick="deleteContact(${i})"><img src="./assets/img/delete.png" alt="trashcan">Delete</p>
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
            <div id="phoneFloating">${checkPhone(i)}</div>
        </div>
`;
}

function checkPhone(i) {
    let phone = users[i]['phone'];
    if (phone) {
        return phone

    } else
        phone = '';
    return phone
}

function addBgColor(i) {
    let bgColor = users[i];
    console.log('c', bgColor);
    return bgColor
        // let x = Math.floor(Math.random() * 256);
        // let y = Math.floor(Math.random() * 256);
        // let z = Math.floor(Math.random() * 256);
        // let bgColor = "rgb(" + x + "," + y + "," + z + ")";
        
    
}

async function createNewContact() {
    let name = document.getElementById('NewContactName').value;
    let email = document.getElementById('NewContactEmail').value;
    let phone = document.getElementById('NewContactPhone').value;

    if (name && email && phone) {
        users.push({
            id: users.length,
            name: name,
            email: email,
            phone: phone,
            tasks: []
        });
        await setItem('users', JSON.stringify(users));
        renderContactList()
        console.log('NewUser', users);

    } else {
        console.error('Please fill out all fields');
    }
}


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