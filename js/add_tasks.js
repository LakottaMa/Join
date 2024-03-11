let subTasks = [];
let searchedUsers = [];
let arrayToRender = true; // true = users | false = searchedUsers

/**
 * toggle display: 'none'; to show or hide element
 * @param {string} id 
 */
function toggleCustomSelect(id) {
    document.getElementById(id).classList.toggle('d-none');
}

/**
 * select option
 * @param {string} getId get the text form id
 * @param {string} setId set the text to the id
 */
function selectElement(getId, setId) {
    let choice = document.getElementById(getId).innerText;
    document.getElementById(setId).innerHTML = `${choice}`;
    let cat = setId == 'selectedCategory' ? 'taskCategory' : 'userCategory';
    toggleCustomSelect(cat);
}

function addTask() {
    console.log('addTask Button pressed');
}
/**
 * show the input field for adding subtasks
 */
function showSubtaskInput() {
    document.getElementById('subtaskInput').classList.remove('d-none');
    document.getElementById('subtaskText').classList.add('d-none');
    document.getElementById('plusIcon').classList.add('d-none');
    document.getElementById('checkAndCloseIcons').classList.remove('d-none');
}

/**
 * hide the input field and show text with plus button
 * @param {event} event prevent the function from the parent
 */
function hideSubtaskInput(event) {
    event.stopPropagation();
    document.getElementById('checkAndCloseIcons').classList.add('d-none');
    document.getElementById('subtaskInput').classList.add('d-none');
    document.getElementById('subtaskText').classList.remove('d-none');
    document.getElementById('plusIcon').classList.remove('d-none');
}

/**
 * get text from input and push to array
 * @param {event} event prevent the function from the parent
 */
function addSubTasks(event) {
    event.stopPropagation();
    let input = document.getElementById('subtaskInput');
    subTasks.push(input.value);
    input.value = '';
    renderSubTasks();
    hideSubtaskInput(event);

}

/**
 * render the added subTasks
 */
function renderSubTasks() {
    let task = document.getElementById('subTaskContainer');
    task.innerHTML = '';

    for (let i = 0; i < subTasks.length; i++) {
        const subTask = subTasks[i];
        task.innerHTML += printSubTasks(subTask, i);
    }
}

/**
 * create html code
 * @param {string} subTask from the subTasks array
 * @returns 
 */
function printSubTasks(subTask, index) {
    return /*html*/ `
        <div class="subTaskBox" id="subTaskBox${index}">
            <span id="subTask${index}">${subTask}</span>
            <div class="d-none subTaskInput" id="subTaskInput${index}">
                <div class="subTaskEditBox">
                    <input id="newSubTask${index}" type="text" placeholder="edit...">
                    <div class="deleteAndEditIcons" class="deleteAndEditIcons">
                        <img onclick="deleteSubTask(${index})" src="./assets/img/delete.png" alt="">
                        <img onclick="saveNewSubTask(${index})" src="./assets/img/check.png" alt="">
                    </div>
                </div>
                <hr id="dividerHorizontal${index}" class="dividerHorizontal d-none">
            </div>
           
            <div id="deleteAndEditIcons${index}" class="deleteAndEditIcons">
                <img onclick="showEditSubTaskInputField(${index})" src="./assets/img/edit.png" alt="">
                <hr class="dividerVertical">
                <img onclick="deleteSubTask(${index})" src="./assets/img/delete.png" alt="">
            </div>
        </div>
    `;
}

/**
 * delete subtask and render subtasks
 * @param {Int} index to delete
 */
function deleteSubTask(index) {
    subTasks.splice(index, 1);
    renderSubTasks();
}

/**
 * save edited subtask and render subtasks
 * @param {Int} index to edit
 */
function saveNewSubTask(index) {
    let newTask = document.getElementById(`newSubTask${index}`);
    subTasks.splice(index, 1, newTask.value);
    newTask.value = '';
    renderSubTasks();
}

/**
 * show input field to edit subtask
 * @param {Int} index for the subtask to edit
 */
function showEditSubTaskInputField(index) {
    document.getElementById(`subTaskInput${index}`).classList.remove('d-none');
    document.getElementById(`subTask${index}`).classList.add('d-none');
    document.getElementById(`deleteAndEditIcons${index}`).classList.add('d-none');
    document.getElementById(`dividerHorizontal${index}`).classList.remove('d-none');
    document.getElementById(`dividerHorizontal${index}`).style.borderBottomColor = "var(--clr-main2)";
}

//==============================

/**
 * render User
 */
function renderUsers() {
    let userContainer = document.getElementById('userCategory');
    userContainer.innerHTML = '';
    for (let i = 0; i < users.length; i++) {
        const user = users[i]['name'];
        const isSelected = users[i]['isSelected'];
        userContainer.innerHTML += printUsers(user, i);
        isUserSelected(isSelected, i);
    }
}


function renderSearchedUsers() {
    let userContainer = document.getElementById('userCategory');
    userContainer.innerHTML = '';
    for (let i = 0; i < searchedUsers.length; i++) {
        const userName = searchedUsers[i]['name'];
        let index = users.findIndex(u => u.name === userName);
        let user = users[index]['name'];
        let isSelected = users[index]['isSelected'];
        userContainer.innerHTML += printUsers(user, index);
        isUserSelected(isSelected, index);
    }
}

function checkRenderArr() {
    if (searchedUsers == null || searchedUsers == "" || searchedUsers < 1) {
        renderUsers();
        arrayToRender = true;
    } else {
        renderSearchedUsers();
        arrayToRender = false;
    }
}

function searchUsers() {
    let input = document.getElementById('searchUserInput');
    let filteredUsers = users.filter(user => user.name.toLowerCase().includes(input.value.toLowerCase()));
    searchedUsers = filteredUsers;
    checkRenderArr();
}

/**
 * show checked or unchecked image
 * @param {boolean} isSelected true = selected | false = unselected
 * @param {Int} index for the user
 */
function isUserSelected(isSelected, index) {
    if (isSelected == true) {
        document.getElementById(`imgUncheck${index}`).classList.add('d-none');
        document.getElementById(`imgCheck${index}`).classList.remove('d-none');
    } else {
        document.getElementById(`imgUncheck${index}`).classList.remove('d-none');
        document.getElementById(`imgCheck${index}`).classList.add('d-none');
    }
}

/**
 * generate html
 * @param {string} user from renderUser() function
 * @param {Int} index from renderUser() function
 * @returns 
 */
function printUsers(user, index) {
    return /*html*/ `
        <div class="user" id="user${index}" >
            <span>${user}</span>
            <img onclick="selectUser(${index})" id="imgUncheck${index}" src="./assets/img/check_unchecked.png" alt="">
            <img onclick="unselectUser(${index})" id="imgCheck${index}" class="d-none" src="./assets/img/check_checked.png" alt="">
        </div>
    `;
}


function selectUser(index) {
    let user = users[index]['name'];
    users[index]['isSelected'] = true;
    selectedUsers.push(user);
    checkRenderArr();
    renderSelectedUsers();
}

function unselectUser(index) {
    let user = users[index]['name'];
    users[index]['isSelected'] = false;
    let userIndexInSelectedUsers = selectedUsers.findIndex(u => u.toLowerCase() === user.toLocaleLowerCase());
    if (userIndexInSelectedUsers !== -1) { 
        selectedUsers.splice(userIndexInSelectedUsers, 1);  
    }
    checkRenderArr();
    renderSelectedUsers();
}



/**
 * split the string in two strings, get the first letter from each string
 * @param {string} string to create initials
 * @returns initials
 */
function getInitials(string) {
    let words = string.split(" ");
    let initials = "";
    words.forEach(word => {
        initials += word.charAt(0).toUpperCase();
    });
    return initials;
}

/**
 * render selected Users and get random background color
 */
function renderSelectedUsers() {
    let container = document.getElementById('selectedUser');
    container.innerHTML = '';
    for (let i = 0; i < selectedUsers.length; i++) {
        const user = selectedUsers[i];
        container.innerHTML += printSelectedUsers(user, i);
        document.getElementById(`selectedUser${i}`).style.backgroundColor = getRandomColor();
    }
}

/**
 * generate html from the initials
 * @param {string} user 
 * @param {Int} index 
 * @returns 
 */
function printSelectedUsers(user, index) {
    return /*html*/ `
        <div id="selectedUser${index}" class="selectedUser">
            ${getInitials(user)}
        </div>
    `;
}

/**
 * 
 * @returns random color from array colors
 */
function getRandomColor() {
    let rndIndex = Math.floor(Math.random() * colors.length);
    return colors[rndIndex];
}

let colors = ["#FFC0CB", "#ADD8E6", "#FFFF99", "#98FB98", "#E6E6FA"];

let selectedUsers = [];
/**
 * just examples
 */
let users = [
    {
        "name": "Tim Cook",
        "email": "tim.cook@example.com",
        "password": "Cook#Apple5",
        "isSelected": false,
        "tasks": []
    },
    {
        "name": "Steve Jobs",
        "email": "steve.jobs@example.com",
        "password": "Jobs#Apple1",
        "isSelected": false,
        "tasks": []
    },
    {
        "name": "Bill Gates",
        "email": "bill.gates@example.com",
        "password": "Gates@Microsoft2",
        "isSelected": false,
        "tasks": []
    },
    {
        "name": "Linus Torvalds",
        "email": "linus.torvalds@example.com",
        "password": "Torvalds#Linux3",
        "isSelected": false,
        "tasks": []
    },
    {
        "name": "Sam Altman",
        "email": "sam.altman@example.com",
        "password": "Altman#YCombinator4",
        "isSelected": false,
        "tasks": []
    }
];

