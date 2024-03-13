
let subTasks = [];
let searchedUsers = [];
let selectedUsers = [];
let tasks = [];
let category = "";
let priority = "";

async function initAddTask() {
    await includeHTML();
    await loadUsers();
    renderUsers()
}

/**
 * create template for task
 * @param {string} title 
 * @param {string} description 
 * @param {date} date 
 * @param {string} taskPriority 
 * @param {Array} assignedTo 
 * @param {string} taskCategory 
 * @param {Array} subtasks 
 * @returns 
 */
function createTaskObject(title, description, date, taskPriority, assignedTo, taskCategory, subtasks) {
    return {
        "title": title.value,
        "description": description.value,
        "date": new Date(date.value),
        "priority": taskPriority,
        "assignedTo": assignedTo,
        "category": taskCategory,
        "subtasks": subtasks
    }
}

/**
 * push new Task to tasks array
 */
function addTask() {
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let date = document.getElementById('date');
    let taskPriority = priority;
    let assignedTo = selectedUsers;
    let subtasks = subTasks;
    let taskCategory = category;
    let newTask = createTaskObject(title, description, date, taskPriority, assignedTo, taskCategory, subtasks);
    tasks.push(newTask);
    resetInputsAndSelections();

}

/**
 * clear input and reset global variables
 */
function resetInputsAndSelections() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('date').value = '';
    selectedUsers = [];
    renderSelectedUsers();
    subTasks = [];
    renderSubTasks();
    priority = "";
    category = "";
}


/**
 * toggle display: 'none'; to show or hide element
 * @param {string} id 
 */
function toggleCustomSelect(id) {
    document.getElementById(id).classList.toggle('d-none');
}


/**
 * toogle input field for search user
 */
function toggleSearchUserInput() {
    document.getElementById('searchUserInput').classList.toggle('d-none');
    document.getElementById('searchUserText').classList.toggle('d-none');
    document.getElementById('userCategory').classList.toggle('d-none');
}

/**
 * select option
 * @param {string} getId get the text form id
 * @param {string} setId set the text to the id
 */
function selectElement_OLD(getId, setId) {
    let choice = document.getElementById(getId).innerText;
    document.getElementById(setId).innerHTML = `${choice}`;
    let cat = setId == 'selectedCategory' ? 'taskCategory' : 'userCategory';
    toggleCustomSelect(cat);
}

/**
 * selcect category for task and push to global variable
 * @param {string} cat selected category
 */
function selectCategory(cat) {
    category = cat;
    document.getElementById('selectedCategory').innerHTML = cat;
    toggleCustomSelect('taskCategory');
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

/**
 * render User
 */
function renderUsers() {
    let userContainer = document.getElementById('userCategory');
    userContainer.innerHTML = '';
    for (let i = 0; i < users.length; i++) {
        const user = users[i]['name'];
        userContainer.innerHTML += printUsers(user, i);
        isUserSelected(i);
    }
}

/**
 * render only the users that exist in the searchedUser Array
 */
function renderSearchedUsers() {
    let userContainer = document.getElementById('userCategory');
    userContainer.innerHTML = '';
    for (let i = 0; i < searchedUsers.length; i++) {
        const userName = searchedUsers[i]['name'];
        let index = users.findIndex(u => u.name === userName);
        let user = users[index]['name'];
        userContainer.innerHTML += printUsers(user, index);
        isUserSelected(index);
    }
}

/**
 * check whether users were searched
 */
function checkRenderArr() {
    if (searchedUsers == null || searchedUsers == "" || searchedUsers < 1) {
        renderUsers();
    } else {
        renderSearchedUsers();
    }
}

/**
 * filter user that are searched
 */
function searchUsers() {
    let input = document.getElementById('searchUserInput');
    let filteredUsers = users.filter(user => user.name.toLowerCase().includes(input.value.toLowerCase()));
    searchedUsers = filteredUsers;
    checkRenderArr();
}


/**
 * check if user exist in selected array
 * @param {Int} index of selected or unselected user
 */
function isUserSelected(index) {
    let user = users[index]['name'];
    let selectedUsersIndex = selectedUsers.findIndex(u => u === user);
    if (selectedUsersIndex === -1) {
        document.getElementById(`imgUncheck${index}`).classList.remove('d-none');
        document.getElementById(`imgCheck${index}`).classList.add('d-none');
    } else {
        document.getElementById(`imgUncheck${index}`).classList.add('d-none');
        document.getElementById(`imgCheck${index}`).classList.remove('d-none');
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

/**
 * select user -> push in selectedUser array
 * @param {Int} index of user
 */
function selectUser(index) {
    let user = users[index]['name'];
    selectedUsers.push(user);
    checkRenderArr();
    renderSelectedUsers();
}

/**
 * unselect user, remove from selectedUser array
 * @param {Int} index of user
 */
function unselectUser(index) {
    let user = users[index]['name'];
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

// event listener for priority buttons
let prioUrgent = document.getElementById('prioUrgent');
let prioMedium = document.getElementById('prioMedium');
let prioLow = document.getElementById('prioLow');

prioUrgent.addEventListener('click', () => {
    prioUrgent.classList.add('prioUrgentClicked');
    prioLow.classList.remove('prioLowClicked');
    prioMedium.classList.remove('prioMediumClicked');
    priority = 'Urgent';
});

prioMedium.addEventListener('click', () => {
    prioMedium.classList.add('prioMediumClicked');
    prioUrgent.classList.remove('prioUrgentClicked');
    prioLow.classList.remove('prioLowClicked');
    priority = 'Medium';
})

prioLow.addEventListener('click', () => {
    prioLow.classList.add('prioLowClicked');
    prioUrgent.classList.remove('prioUrgentClicked');
    prioMedium.classList.remove('prioMediumClicked');
    priority = 'Low';
})

// event listener for input fields

let inputToFocus = document.getElementById('subtaskInput');
let btnToWatch = document.getElementById('addSubTaskBtn');
btnToWatch.addEventListener('click', () => {
    if (inputToFocus) {
        inputToFocus.focus();
    }
})

let searchInputToFocus = document.getElementById('searchUserInput');
let searchBtnToWatch = document.getElementById('searchUserBtn');
searchBtnToWatch.addEventListener('click', () => {
    if (searchInputToFocus) {
        searchInputToFocus.focus();
    }
})


