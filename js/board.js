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
   statusObj.status = `${status}`;
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
      let subTasksLength = task['subtasks'].length;
      let container = checkContainer(status);
      container.innerHTML += printTasksInBoard(task, i, subTasksLength);
      renderAssignedTo(contacts, i);
      getColorForCategory(i);
      changeProgressValue(i);
   }
}

function changeProgressValue(index) {
   let progressInPercent;
   let progressBar = document.getElementById(`progressBar${index}`); // progress id
   let subtasksDone = tasks[index]['subtasksDone'].length;  // erledigte tasks anzahl
   let subtasksOpen = tasks[index]['subtasks'].length;   // offe tasks anzahl
   let allSubtasks = subtasksDone + subtasksOpen;  // all tasks anzahl
   let calcPercent = (subtasksDone / allSubtasks) * 100; // prozent der erledigten
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
      assignedToContainer.innerHTML += printAssignedTo(contact)
   }
}

function printTasksInBoard(task, index, subTasksLength) {
   return /*html*/ `
      <div class="todoBox">
         <div class="todoCategory" id="todoCategory${index}">${task.category}</div>                         
         <div id="todoTitle"><h2>${task.title}</h2></div>
         <div id="todoDescription">${task.description}</div>
         <div id="todoSubtasks">
            <div><label><progress id="progressBar${index}" max="100" value="50">10%</progress></label></div>
            <span>0/${subTasksLength} Subtasks</span>
         </div>
         <div class="assignedAndPrio">
            <div id="todoAssignedTo${index}"></div>
            <div id="todoPriority">${task.priority}</div>
         </div>
      </div>
   `;
}

function printAssignedTo(contact) {
   return /*html*/ `<span>${getInitials(contact)}</span>`;
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
      let subTasksLength = tasks[index]['subtasks'].length;
      let task = tasks[index];
      let status = tasks[index]['status'];
      let contacts = tasks[index]['assignedTo'];
      let container = checkContainer(status);
      container.innerHTML += printTasksInBoard(task, index, subTasksLength);
      renderAssignedTo(contacts, index);
      getColorForCategory(index);
      changeProgressValue(index);
   }
}