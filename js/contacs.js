
function initContacts() {
    renderContactList();
    
    console.log('all Contacts Array', allContacts); //wieder löschen!!
}


function renderContactList() {
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
        contactsHTML(contact);
        // addBgColor(x);        
    }
    
}
function contactsHTML(contact) {
    let names = contact['name'].split(' '); //map iteriert durch jedes wort im array names
    let initials = names.map(word => word.charAt(0).toUpperCase()).join('');  //join wird verwendet um die elemente des arrays in eine zeichenkette zu verwandeln
    let id = contact['id'];

    return `
        <div class="contactSmall cp" onclick="showFloatContact()">
            <div id="${id}"class="initials">${initials}</div>
            <div>
                <span>${contact['name']}</span>
                <p>${contact['email']}</p>
            </div>
        </div>
    `;
}

function addBgColor(div) {
    let x = Math.floor(Math.random() * 256);
    let y = Math.floor(Math.random() * 256);
    let z = Math.floor(Math.random() * 256);
    let bgColor = "rgb(" + x + "," + y + "," + z + ")";
    document.getElementById(`${div}`).style.backgroundColor = bgColor;
}

function showFloatContact() {
    document.getElementById('floatingContact').classList.remove('d-none');
}

//Überprüft ob die ID für die Div schon vergeben ist un erhöht sie dann
function checkId(id) {
    for (let y = 0; y < allContacts.length; y++) {
        const element = array[y];

    }
    //     for (let y = 0; y < alphabet.length; y++) {
    //         let currentLetter = alphabet[y];

    //         let letterArray = allContacts[currentLetter];
    //         if (letterArray.length === 0) {
    //             return id
    //         }
    //         else
    //             // for (let z = 1; z < letterArray.length; z++) {
    //             //     if (id === letterArray.length + 1) {
    //             //         id++;
    //             //     }
    //             // } return id
    //     }
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