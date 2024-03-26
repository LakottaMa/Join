async function initContacts() {
    await includeHTML();
    await loadUsers();
    await loadTasks();
    renderContactList();
}

function renderContactList() {
    document.getElementById('allContacts').innerHTML = '';
    try {
        let currentLetter = '';
        users.sort((a, b) => a.name.localeCompare(b.name));
        for (let i = 0; i < users.length; i++) {
            let firstLetter = users[i]['name'][0].toUpperCase();
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
        }
    } catch (error) {
        console.error("Error fetching or parsing users data:", error);
    }

}

function contactsHTML(i) {
    let names = users[i]['name'].split(' '); //map iteriert durch jedes wort im array name
    let initials = names.map(word => word.charAt(0).toUpperCase()).join('');  //join wird verwendet um die elemente des arrays in eine zeichenkette zu verwandeln
    let bgColor = users[i]['bg'];
    return `
        <div class="contactSmall cp" id="smallContact${i}" onclick="showFloatContact(${i})">
            <div class="initials" style="background-color:${bgColor};">${initials}</div>
            <div>
                <span>${users[i]['name']}</span>
                <p>${users[i]['email']}</p>
            </div>
        </div>
    `;
}

function deleteUser(userIndex) {
    let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        alert("User deleted successfully!");
    } else {
        alert("User not found.");
    }

    setItem('users', JSON.stringify(users));
    document.getElementById('floatingContact').innerHTML = '';
    renderContactList();
    console.log('user wurde gelöscht');
    console.table(users);

    if (screenWidth <= 1024) {
        showContactListMobil();
    }
    closePopup();
}

function addBgContact(index) {
    let contacts = document.querySelectorAll('.contactSmall');
    for (let x = 0; x < contacts.length; x++) {
        let contact = contacts[x];

        if (index === x) {
            contact.classList.add('contactBgClicked');
        } else {
            contact.classList.remove('contactBgClicked');
        }
    };
}


function showFloatContact(i) {
    addBgContact(i);
    let name = users[i]['name'];
    let email = users[i]['email'];
    let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    document.getElementById('floatingContact').classList.remove('d-none');
    document.getElementById('floatingContact').innerHTML = '';
    document.getElementById('floatingContact').innerHTML = floatContactHTML(name, email, i);
    //document.getElementById('floatingContact').onclick = null;

    // document.getElementById('contactMobile').classList.add('d-none');
    // document.getElementById('contactMobileFloat').classList.remove('d-none');
    //null funktioniert aber hizufügen nicht
    //bei htm auf onclick = closePopup() gestellt
    //checkScreenSize();
     if (screenWidth <= 1024) {
        //console.log('resize', screenWidth) //wieder löschen!!
         document.getElementById('contactList').classList.add('d-none');
         document.getElementById('contactMobile').classList.add('d-none');
         document.getElementById('contactMobileFloat').classList.remove('d-none');
         //document.getElementById('floatingContact').onclick = closePopup();
     } else {
         document.getElementById('contactList').classList.remove('d-none');
         document.getElementById('contactMobile').classList.remove('d-none');
         document.getElementById('contactMobileFloat').classList.add('d-none');
         //document.getElementById('floatingContact').onclick = closePopup();
     }
}

window.addEventListener("resize", function () {
    checkScreenSize();
    
});

function checkScreenSize() {
    let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    //console.log('resize', screenWidth) //wieder löschen!!
    let floatContact = document.getElementById('floatingContact');
    let widthfloatingContact = document.getElementById('floatingContact').style.width;
    let contactList = document.getElementById('contactList');
    let widthcontactList = document.getElementById('contactList').style.width;
    if (screenWidth <= 1024) {
        if (widthfloatingContact === '40%') {
            contactList.classList.add('d-none');
            document.getElementById('contactMobile').classList.add('d-none');
            floatContact.classList.remove('d-none');
            widthfloatingContact = '100%';
        } else if (widthcontactList === '100vw') {
            floatContact.classList.add('d-none');
            contactList.classList.remove('d-none');
            document.getElementById('contactMobile').classList.remove('d-none');
        }
    }
}




function checkPhone(i) {
    let phone = users[i]['phone'];
    if (phone) {
        return phone

    } else
        phone = '';
    return phone
}

function newBgColor() {
    let x = Math.floor(Math.random() * 256);
    let y = Math.floor(Math.random() * 256);
    let z = Math.floor(Math.random() * 256);
    let bgColor = `rgb(${x},${y},${z})`;
    return bgColor
}

async function createNewContact() {
    let bgColor = newBgColor();
    let name = document.getElementById('contactName').value;
    let email = document.getElementById('contactEmail').value;
    let phone = document.getElementById('contactPhone').value;

    if (name && email && phone) {
        users.push({
            name: name,
            email: email,
            phone: phone,
            bg: bgColor,
        });
        await setItem('users', JSON.stringify(users));
        successfullyPopupAddContact();
        closePopup();

    } else {
        console.error('Please fill out all fields');
    }
}

/** Popup nach erfolgreicher Task Erstellung */
function successfullyPopupAddContact() {
    const animation = document.getElementById('popupCreateContact');
    animation.classList.remove('d-none');
    setTimeout(() => {
        renderContactList();
    }, 2000);
}

function editContact(i) {
    showEditPopup(i);
    let name = users[i]['name'];
    let email = users[i]['email'];

    document.getElementById('contactName').value = `${name}`;
    document.getElementById('contactEmail').value = `${email}`;
    document.getElementById('contactPhone').value = `${checkPhone(i)}`;

    //console.log('name',name) //wieder löschen!!
}

async function saveUser(i) {
    let name = document.getElementById('contactName').value;
    let email = document.getElementById('contactEmail').value;
    let phone = document.getElementById('contactPhone').value;

    users[i]['name'] = name;
    users[i]['email'] = email;
    users[i]['phone'] = phone;
    await setItem('users', JSON.stringify(users));

    renderContactList();
    closePopup();
}




function showAddPopup() {
    document.getElementById('contactPopup').classList.remove('d-none');
    document.getElementById('contactPopup').style.right = 0;


    document.getElementById('contactPopup').innerHTML = '';
    document.getElementById('contactPopup').innerHTML = createContactPopupHTML();

    document.getElementById('contactPopup').style.animation = 'slidingRight 0.2s ease-in-out';
    document.getElementById('contactPopup').style.left = '';
    document.getElementById('closePopup').style.borderTopLeftRadius = '30px';
    document.getElementById('closePopup').style.borderTopRightRadius = '0px';
    document.getElementById('background').classList.add('back');
    document.getElementById('contactName').value = '';
    document.getElementById('contactEmail').value = '';
    document.getElementById('contactPhone').value = '';
}

function showEditPopup(i) {
    document.getElementById('contactPopup').classList.remove('d-none');
    document.getElementById('contactPopup').innerHTML = '';
    document.getElementById('contactPopup').innerHTML = editContactPopupHTML(i);

    document.getElementById('contactPopup').style.animation = 'slidingLeft 0.2s ease-in-out';
    document.getElementById('contactPopup').style.left = 0;
    document.getElementById('closePopup').style.borderTopLeftRadius = '0px';
    document.getElementById('closePopup').style.borderTopRightRadius = '30px';
    document.getElementById('background').classList.add('back');
}

function closePopup() {
    document.getElementById('contactPopup').classList.add('d-none');
    document.getElementById('background').classList.remove('back');
    document.getElementById('popupDotMenue').classList.add('d-none');
}

function showDotMenu() {
    document.getElementById('popupDotMenue').classList.remove('d-none');
}

function showContactListMobil() {
    document.getElementById('contactMobile').classList.remove('d-none');
    document.getElementById('contactList').classList.remove('d-none');
    document.getElementById('floatingContact').classList.add('d-none');
}

function notClose(event) {
    event.stopPropagation();
}


