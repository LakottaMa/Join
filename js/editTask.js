function showDetailBox(index) {
   document.getElementById('detailViewBox').classList.remove('slideToBottom');
   document.getElementById('detailViewBg').classList.remove('d-none');
   document.getElementById('detailViewBox').classList.remove('d-none');
   document.getElementById('detailView').classList.remove('d-none');
   document.getElementById('detailViewBox').classList.add('slideFromBottom')
   renderDetails(index);
}

function hideDetailBox() {
   document.getElementById('detailViewBox').classList.remove('slideFromBottom');
   document.getElementById('detailViewBox').classList.add('slideToBottom');
   setTimeout(function () {
      document.getElementById('detailViewBg').classList.add('d-none');
      document.getElementById('detailViewBox').classList.add('d-none');
      document.getElementById('editView').classList.add('d-none');
   }, 200);
   subTasks = [];
   selectedUsers = [];
   clearAddTask();
}

 /**
  * format date to german format
  * @param {string} dateString 
  * @returns formatted Date
  */
 function getFormatedDate(dateString) {
    let date = new Date(dateString);
    let formattedDate = date.toLocaleDateString("de-DE");
    return formattedDate;
 }

 /**
  * set the format that is need to set the value in date input
  * @param {string} dateString 
  * @returns formatted Date
  */
 function getFormatedDateUS(dateString) {
    let date = new Date(dateString);
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
 }
 /**
  * render Task Details Screen
  * @param {int} index 
  */
 function renderDetails(index) {
    let detailContainer = document.getElementById('detailView');
    detailContainer.innerHTML = '';
    let task = tasks[index];
    detailContainer.innerHTML += printDetails(task, index);
    let categoryContainer = document.getElementById(`detailCategory${index}`);
    getColorForCategory(index, categoryContainer);
    renderAssignedToDetails(index);
    renderSubTasksDetailView(index);
 }
 
 /**
  * render subtasks for the task
  * @param {int} index 
  */
 function renderSubTasksDetailView(index) {
    let container = document.getElementById(`subTasksDetailViewBox${index}`);
    container.innerHTML = '';
    let sub = tasks[index].subtasks;
    if (sub.length > 0) {
       for (let i = 0; i < sub.length; i++) {
          const subtask = sub[i];
          container.innerHTML += /*html*/ `<div onclick="toggleSubtasks(${index}, ${i})" id="subtask${i}" class="assignedToDetails cp"><img src=${getImageForSubtask(subtask)} alt=""><span class="subTaskDetail">${subtask.name}</span>`;
       }
    } else {
       document.getElementById('subtaskDetailBox').classList.add('d-none');
    }
 }

 /**
  * 
  * @param {object} subtask 
  * @returns checked image if true, uncheckt if false
  */
 function getImageForSubtask(subtask) {
    if (subtask.done === true) {
       return './assets/img/check_checked.png';
    } else {
       return './assets/img/check_unchecked.png';
    }
 }

 /**
  * render the assigned to User, or hide if none
  * @param {int} index 
  */
 function renderAssignedToDetails(index) {
    let container = document.getElementById(`assignedToDetailView${index}`);
    container.innerHTML = '';
    let contacts = tasks[index].assignedTo;
    if (contacts.length < 1) {
       document.getElementById('assignedToDetailBox').classList.add('d-none');
    } else {
       for (let j = 0; j < contacts.length; j++) {
          const contact = contacts[j];
          let contactId = index.toString() + j.toString() + 'C';
          container.innerHTML += printAssignedToDetails(contact, contactId);
          let contactContainer = document.getElementById(`${contactId}`)
          contactContainer.style.backgroundColor = getBgColorForContact(contact);
       }
    }
 }

 /**
  * delete task
  * @param {int} index 
  */
 async function deleteTask(index) {
    tasks.splice(index, 1);
    await saveTasks(tasks);
    checkRenderTasks();
    hideDetailBox();
 }

 /**
  * toggle boolean for subtask, true for done, false for in progress
  * @param {int} taskIndex 
  * @param {int} subtaskIndex 
  */
 async function toggleSubtasks(taskIndex, subtaskIndex) {
    let subtask = tasks[taskIndex]['subtasks'][subtaskIndex];
    subtask.done = !subtask.done;
    renderSubTasksDetailView(taskIndex);
    renderTasksInBoard();
    await saveTasks(tasks);
 }
 
 let editTaskIndex;
 
 function editTask(index) {
    showEditBox();
    editTaskIndex = index;
    let taskToEdit = tasks[index]; 
    document.getElementById('title').value = taskToEdit.title;
    document.getElementById('description').value = taskToEdit.description;
    document.getElementById('date').value = getFormatedDateUS(taskToEdit.date);
    document.getElementById('selectedCategory').value = taskToEdit.category; 
    setCategoryInputToDisable(); 
    let prio = taskToEdit['priority'];
    setPriority(prio);
    defaultValues.status = taskToEdit['status']; 
    taskToEdit['subtasks'].forEach(subtask => {
       subTasks.push(subtask.name);
    });
    renderSubTasks('subTaskContainer'); 
    taskToEdit['assignedTo'].forEach(user => {
       selectedUsers.push(user);
    }); 
    renderUsers();
    renderSelectedUsers();
 }

 /**
  * disable category input in edit mode
  */
 function setCategoryInputToDisable() {
    document.getElementById('selectedCategory').setAttribute('disabled', 'disabled');
    document.getElementById('taskCategoryField').removeAttribute('onclick');
    document.getElementById('dropDownImgCategory').classList.add('d-none');
 }

 /**
  * save the edited task and delete the old
  */
 async function saveEditedTask() {
    let index = editTaskIndex;
    let editedTask = createTask()
    tasks.splice(index, 1, editedTask);
    await saveTasks(tasks);
    resetInputsAndSelections();
    hideEditbox();
    renderDetails(index);
    renderTasksInBoard();
 }
 
 function hideEditbox() {
    document.getElementById('detailView').classList.remove('d-none');
    document.getElementById('editView').classList.add('d-none');
    subTasks = [];
    selectedUsers = [];
 
 }
 
 function showEditBox() {
    document.getElementById('detailView').classList.add('d-none');
    document.getElementById('editView').classList.remove('d-none');
    renderAddTask('editTaskContainer');
    initializeAndListen();
 }