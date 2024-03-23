async function initBoard() {
   await includeHTML();
   await loadUsers();
   await loadTasks();
   initializeAndListen();
   renderTasksInBoard();
}

/**
 * show Add Task Box and set default values for task
 * @param {string} status status string to set correct status for task
 */
function showAddTaskBox(status) {
   let box = document.getElementById('addTaskBox');
   let mainContent = document.getElementById('mainContent');
   let headline = document.getElementById('addTaskHeadline');
   if (window.matchMedia('(max-width: 500px)').matches) {
      box.classList.remove('d-none');
      mainContent.classList.add('dNone');
      headline.classList.add('d-none');
      setDefaultValues(status);
   } else {
      box.classList.remove('d-none');
      setTimeout(() => {
         box.style.right = 0;
      }, 100);
      setDefaultValues(status);
   }
}
/**
 * set default values
 * @param {string} status 
 */
function setDefaultValues(status) {
   defaultValues.status = `${status}`;
   defaultValues.category = 'User Story';
   defaultValues.priority = 'Medium';
}

/**
 * hide add task box
 */
function hideAddTaskBox() {
   if (window.location.pathname.endsWith('/board.html')) {
      let box = document.getElementById('addTaskBox');
      box.style.right = '-1000px';
      setTimeout(() => {
         box.classList.add('d-none');
      }, 100);
   }
}

/**
 * clear all container for tasks
 */
function clearContainer() {
   let ids = ['toDoContainer', 'inProgressContainer', 'awaitFeedbackContainer', 'doneContainer'];
   ids.forEach(id => {
      let container = document.getElementById(id);
      if (container) {
         container.innerHTML = '';
      }
   });
}

/**
 * render tasks in board
 */
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

/**
 * hide subtask container if no subtasks exist for task
 * @param {int} index 
 */
function checkIfSubtasksEmtpty(index) {
   let subtaskContainer = document.getElementById(`todoSubtasks${index}`);
   if (tasks[index]['subtasks'].length == 0 && tasks[index]['subtasksDone'].length == 0) {
      subtaskContainer.classList.add('d-none');
   }
}

/**
 * calculate all subtasks for task with index
 * @param {int} index 
 * @returns 
 */
function calculateAllSubTasks(index) {
   let subtasksOpen = tasks[index]['subtasks'].length;
   let subtasksDone = tasks[index]['subtasksDone'].length;
   let allSubtasks = subtasksDone + subtasksOpen;
   return allSubtasks
}

/**
 * set the progress of the progress bar
 * @param {int} index for task
 */
function changeProgressValue(index) {
   let progressInPercent;
   let progressBar = document.getElementById(`progressBar${index}`);
   let subtasksDone = tasks[index]['subtasksDone'].length;
   let allSubtasks = calculateAllSubTasks(index);
   let calcPercent = (subtasksDone / allSubtasks) * 100;
   if (isNaN(calcPercent) == true) {
      progressInPercent = 0;
   } else {
      progressInPercent = calcPercent;
   }

   progressBar.value = progressInPercent;
}

/**
 * set the color for the task category
 * @param {int} index 
 */
function getColorForCategory(index) {
   let category = tasks[index]['category'];
   let container = document.getElementById(`todoCategory${index}`);
   category == 'User Story' ? container.style.backgroundColor = 'var(--clr-orange)' : container.style.backgroundColor = 'var(--clr-blue)';
}

/**
 * render the contacts, that are assigned to the task
 * @param {string} contacts 
 * @param {int} i 
 */
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

/**
 * get the background color which is stored in users array
 * @param {string} contact 
 * @returns 
 */
function getBgColorForContact(contact) {
   let userIndex = users.findIndex(u => u.name.toLowerCase() == contact.toLowerCase());
   if (userIndex !== -1) {
      let bgColor = users[userIndex]['bg'];
      return bgColor;
   } else {
      return 'rgb(175, 170, 170)';
   }

}

/**
 * generate html for tasks
 * @param {string} task 
 * @param {int} index 
 * @param {int} subTasksLength 
 * @returns 
 */
function printTasksInBoard(task, index, subTasksLength) {
   return /*html*/ `
      <div class="todoBox cp">
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

/**
 * get the right image for the priority
 * @param {string} prio 
 * @returns 
 */
function getPrioIcon(prio) {
   let path = `./assets/img/prio-${prio.toLowerCase()}.png`;
   return path;
}

/**
 * generate html
 * @param {string} contact 
 * @param {int} contactId 
 * @returns 
 */
function printAssignedTo(contact, contactId) {
   return /*html*/ `<span id="${contactId}">${getInitials(contact)}</span>`;
}

/**
 * 
 * @param {string} status 
 * @returns the container for the task
 */
function checkContainer(status) {
   const containerIds = {
       'To do': 'toDoContainer',
       'In progress': 'inProgressContainer',
       'Await feedback': 'awaitFeedbackContainer',
       'Done': 'doneContainer'
   };
   return document.getElementById(containerIds[status] || 'toDoContainer');
}

/**
 * check is search is active
 */
function checkRenderTasks() {
   if (searchedTasks == null || searchedTasks == "" || searchedTasks < 1) {
      renderTasksInBoard();
   } else {
      renderSearchedTasks();
   }
}

/**
 * check if a status has no tasks, then render empty text
 */
function checkContainerEmpty() {
   let ids = ['toDoContainer', 'inProgressContainer', 'awaitFeedbackContainer', 'doneContainer'];
   ids.forEach(id => {
      let emptyContainerText = getContainerName(id);
      let container = document.getElementById(id);
      if (container.hasChildNodes() === false) {
         container.innerHTML = /*html*/ `<div class="emptyBox"><span>${emptyContainerText}</span></div>`;
      }
   });
}

/**
 * 
 * @param {int} id of task container
 * @returns the name of the container
 */
function getContainerName(id) {
   const containerNames = {
       'doneContainer': 'No tasks Done',
       'toDoContainer': 'No tasks To Do',
       'inProgressContainer': 'No tasks in Progress',
       'awaitFeedbackContainer': 'No tasks for Feedback'
   };
   return containerNames[id] || 'Unknown Container';
}

let searchedTasks;

/**
 * push the search output in array and remove duplicates with set
 */
function searchTasks() {
   let input = document.getElementById('findTask');
   let filteredTasksTitle = tasks.filter(task => task.title.toLowerCase().includes(input.value.toLowerCase()));
   let filteredTasksDescription = tasks.filter(task => task.description.toLowerCase().includes(input.value.toLowerCase()));
   searchedTasks = filteredTasksTitle.concat(filteredTasksDescription);
   searchedTasks = [...new Set(searchedTasks)];
   checkRenderTasks();
}

/**
 * render searched tasks
 */
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

function showDetailBox() {
   document.getElementById('detailViewBg').classList.remove('d-none');
   document.getElementById('detailViewBox').classList.remove('d-none');
}

function renderDetails(index) {
   // continue here
}