const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
    'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']



let allContacts = {
    "A": [{
        "name": "Anton Mayer",
        "email": "anton@gmail.com",
        "phone": "427"
    },
    {
        "name": "Anja Schulz",
        "email": "schulz@hotmail.com",
        "phone": "4165"
    }], "B": [{
        "name": "Benedikt Ziegler",
        "email": "benedikt@gmail.com",
        "phone": "837375"
    }],
    "C": [{
        "name": "Christoph See",
        "email": "ChSee@web.de",
        "phone": "837375"
    }], "D": [], "E": [], "F": [], "G": [], "H": [],
    "I": [], "J": [], "K": [], "L": [], "M": [], "N": [], "O": [], "P": [],
    "Q": [], "R": [], "S": [], "T": [], "U": [], "V": [], "W": [], "X": [],
    "Y": [], "Z": []
};


function initContacts() {
    renderContactList();
    console.log('all Contacts Array', allContacts); //wieder löschen!!
}


function renderContactList() {
    for (let i = 0; i < alphabet.length; i++) {
        let letter = alphabet[i];
        if (allContacts[letter].length > 0) {
            document.getElementById('allContacts').innerHTML += `
             <div class="letterBox">
                <div class="letter">${letter}</div>
                <div id="${letter}-content"></div>
            </div>
            `;
        }
        renderExistingContacts(letter);
    }
}

function renderExistingContacts(letter) {
    for (let x = 0; x < allContacts[letter].length; x++) {
        document.getElementById(`${letter}-content`).innerHTML +=
            contactsHTML(letter, x);
        addBgColor(x);
    }
}

function addBgColor(div) {
    let x = Math.floor(Math.random() * 256);
    let y = Math.floor(Math.random() * 256);
    let z = Math.floor(Math.random() * 256);
    let bgColor = "rgb(" + x + "," + y + "," + z + ")";
    document.getElementById(`${div}`).style.backgroundColor = bgColor;
}

function contactsHTML(letter, x) {
    let names = allContacts[letter][x]['name'].split(' '); //map iteriert durch jedes wort im array names
    let initials = names.map(word => word.charAt(0).toUpperCase()).join('');  //join wird verwendet um die elemente des arrays in ein ezeichenkette zu verwandeln

    return `
        <div class="contactSmall cp" onclick="showFloatContact()">
            <div id="${x}"class="initials">${initials}</div>
            <div>
                <span>${allContacts[letter][x]['name']}</span>
                <p>${allContacts[letter][x]['email']}</p>
            </div>
        </div>
    `;
}

function showFloatContact (){
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
    document.getElementById('addContactPopup').style.transform ='translateX (584px)';
    document.getElementById('background').classList.add('back');
}

function closePopup() {
    document.getElementById('addContactPopup').classList.add('d-none');
    document.getElementById('background').classList.remove('back');
    document.getElementById('addContactPopup').style.transform ='translateX (0px)';
}