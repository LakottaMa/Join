async function initBoard() {
   await includeHTML();
   await loadUsers();
   await loadTasks();
   initializeAndListen();
   renderTasksInBoard();
}

function showAddTaskBox(status) {
   let box = document.getElementById('addTaskBox');
   box.style.right = 0;
   defaultValues.status = `${status}`;
   defaultValues.category = 'User Story';
   defaultValues.priority = 'Medium';
}

function hideAddTaskBox() {
   let box = document.getElementById('addTaskBox');
   box.style.right = '-450px';
}


function clearContainer() {
   let ids = ['toDoContainer', 'inProgressContainer', 'awaitFeedbackContainer', 'doneContainer'];
   ids.forEach(id => {
      let container = document.getElementById(id);
      if (container) {
         container.innerHTML = '';
      }
   });
}

function renderTasksInBoard() {
   clearContainer();
   for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      let status = task['status'];
      let contacts = task['assignedTo'];
      let subTasksDoneLength = task['subtasksDone'].length;
      let container = checkContainer(status);
      container.innerHTML += printTasksInBoard(task, i, subTasksDoneLength);
      renderAssignedTo(contacts, i);
      getColorForCategory(i);
      changeProgressValue(i);
      checkIfSubtasksEmtpty(i);
   }
   checkContainerEmpty();
}

function checkIfSubtasksEmtpty(index) {
   let subtaskContainer = document.getElementById(`todoSubtasks${index}`);
   if(tasks[index]['subtasks'].length == 0 && tasks[index]['subtasksDone'].length == 0 ) {
      subtaskContainer.classList.add('d-none');
   }
}

function calculateAllSubTasks(index) {
   let subtasksOpen = tasks[index]['subtasks'].length;
   let subtasksDone = tasks[index]['subtasksDone'].length;
   let allSubtasks = subtasksDone + subtasksOpen;
   return allSubtasks
}

function changeProgressValue(index) {
   let progressInPercent;
   let progressBar = document.getElementById(`progressBar${index}`);
   let subtasksDone = tasks[index]['subtasksDone'].length;
   let allSubtasks = calculateAllSubTasks(index);
   let calcPercent = (subtasksDone / allSubtasks) * 100;
   if(isNaN(calcPercent) == true) {
      progressInPercent = 0;
   } else {
      progressInPercent = calcPercent;
   }
   
   progressBar.value = progressInPercent;   
}

function getColorForCategory(index) {
   let category = tasks[index]['category'];
   let container = document.getElementById(`todoCategory${index}`);
   category == 'User Story' ? container.style.backgroundColor = 'var(--clr-orange)' : container.style.backgroundColor = 'var(--clr-blue)';
}


function renderAssignedTo(contacts, i) {
   let assignedToContainer = document.getElementById(`todoAssignedTo${i}`);
   assignedToContainer.innerHTML = '';
   for (let j = 0; j < contacts.length; j++) {
      const contact = contacts[j];
      let contactId = i.toString() + j.toString();
      assignedToContainer.innerHTML += printAssignedTo(contact, contactId)
      let contactContainer = document.getElementById(`${contactId}`)
      contactContainer.style.backgroundColor = getBgColorForContact(contact);
   }
}

function getBgColorForContact(contact) {
   let userIndex = users.findIndex(u => u.name.toLowerCase() == contact.toLowerCase());
   if (userIndex !== -1) {
      let bgColor = users[userIndex]['bg'];
      return bgColor;
   } else {
      return 'rgb(175, 170, 170)';
   }
   
}

function printTasksInBoard(task, index, subTasksLength) {
   return /*html*/ `
      <div class="todoBox">
         <div class="todoCategory" id="todoCategory${index}">${task.category}</div>                         
         <div id="todoTitle"><h2>${task.title}</h2></div>
         <div id="todoDescription">${task.description}</div>
         <div class="todoSubtasks" id="todoSubtasks${index}">
            <div><label><progress id="progressBar${index}" max="100" value="50">10%</progress></label></div>
            <span>${subTasksLength}/${calculateAllSubTasks(index)} Subtasks</span>
         </div>
         <div class="assignedAndPrio">
            <div id="todoAssignedTo${index}"></div>
            <div id="todoPriority"><img class="prioIconBoard" src="${getPrioIcon(task.priority)}" alt=""></div>
         </div>
      </div>
   `;
}

function getPrioIcon(prio) {
   let path = `./assets/img/prio-${prio.toLowerCase()}.png`;
   return path;
}

function printAssignedTo(contact, contactId) {
   return /*html*/ `<span id="${contactId}">${getInitials(contact)}</span>`;
}

function checkContainer(status) {
   switch (status) {
      case 'To do':
         return document.getElementById('toDoContainer');
      case 'In progress':
         return document.getElementById('inProgressContainer');
      case 'Await feedback':
         return document.getElementById('awaitFeedbackContainer');
      case 'Done':
         return document.getElementById('doneContainer');
      default:
         return document.getElementById('toDoContainer');
   }
}

function checkRenderTasks() {
   if(searchedTasks == null || searchedTasks == "" || searchedTasks < 1) {
      renderTasksInBoard();
   } else {
      renderSearchedTasks();
   }
}

function checkContainerEmpty() {
   let ids = ['toDoContainer', 'inProgressContainer', 'awaitFeedbackContainer', 'doneContainer'];
   ids.forEach(id => {
      let emptyContainerText = getContainerName(id);
      let container = document.getElementById(id);
      if(container.hasChildNodes() === false) {
         container.innerHTML = /*html*/ `<div><span>${emptyContainerText}</span></div>`;
      }
   });
}

function getContainerName(id) {
   if(id == 'doneContainer') {
      return 'No tasks Done';
   } else if(id == 'toDoContainer') {
      return 'No tasks To Do'
   } else if(id == 'inProgressContainer') {
      return 'No tasks in Progress'
   } else if(id == 'awaitFeedbackContainer') {
      return 'No tasks for Feedback'
   }
}

let searchedTasks;

function searchTasks() {
   let input = document.getElementById('findTask');
   let filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(input.value.toLowerCase()));
   searchedTasks = filteredTasks;
   checkRenderTasks();
}

function renderSearchedTasks() {
   clearContainer();
   for (let i = 0; i < searchedTasks.length; i++) {
      const taskTitle = searchedTasks[i]['title'];
      let index = tasks.findIndex(t => t.title === taskTitle);
      let subTasksDoneLength = tasks[index]['subtasksDone'].length;
      let task = tasks[index];
      let status = tasks[index]['status'];
      let contacts = tasks[index]['assignedTo'];
      let container = checkContainer(status);
      container.innerHTML += printTasksInBoard(task, index, subTasksDoneLength);
      renderAssignedTo(contacts, index);
      getColorForCategory(index);
      changeProgressValue(index); 
   }
   checkContainerEmpty();
}
