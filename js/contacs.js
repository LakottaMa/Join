const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
    'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']



let allContacts = {
    "A": [{
        "name": "Albert",
        "email": "email",
        "phone": "427"
    },
    {
        "name": "Achim",
        "email": "email",
        "phone": "4165"
    }], "B": [], "C": [ {
        "name": "Christoph",
        "email": "email",
        "phone": "837375"
    }], "D": [], "E": [], "F": [], "G": [], "H": [],
    "I": [], "J": [], "K": [], "L": [], "M": [], "N": [], "O": [], "P": [],
    "Q": [], "R": [], "S": [], "T": [], "U": [], "V": [], "W": [], "X": [],
    "Y": [], "Z": []
};


function initContacts() {
    renderContactList();
    fillallContactsWithLetters();
}

function fillallContactsWithLetters() {
    console.log('all Contacts Array', allContacts); //wieder löschen!!
}

function renderContactList() {
    for (let i = 0; i < alphabet.length; i++) {
        let letter = alphabet[i];
        document.getElementById('allContacts').innerHTML += `
             <div class="letterBox">
                <div class="letter">${letter}</div>
                <div id="${letter}-content"></div>
            </div>
        `;
        renderExistingContacts(letter);
    }
}

function renderExistingContacts(letter) {
    for (let x = 0; x < allContacts[letter].length; x++) {
            document.getElementById(`${letter}-content`).innerHTML += 
            contactsHTML(letter,x);
         }
}

function contactsHTML(letter, x) {
    return `
        <div class="contactSmall">
            <img class="avatar" src="./assets/img/avatar_placeholder.png" alt="avatar">
            <div>
                <span>${allContacts[letter][x]['name']}</span>
                <p>${allContacts[letter][x]['email']}</p>
            </div>
        </div>
    `;
}

function createNewContact() {
    let name = document.getElementById('contactName').value;
    let email = document.getElementById('contactEmail').value;
    let phone = document.getElementById('contactPhone').value;

    let letter = name.charAt(0).toUpperCase();

    for (let x = 0; x < alphabet.length; x++) {
        if (alphabet[x] === letter) {
            allContacts[letter].push({
                "name": name,
                "email": email,
                "phone": phone
            })
            break;
        }

    }

    console.log('r', allContacts); //wieder löschen!!
}

// let ability_1 = allPokemon[i]['abilities']['0']['ability']['name'];

function addNewContact() {
    document.getElementById('addContactPopup').classList.remove('d-none');
}

function closePopup() {
    document.getElementById('addContactPopup').classList.add('d-none');
}