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
   }
}

function renderSubTasks(subTasksLength, i) {
   let subTaskContainer = document.getElementById(`todoSubtasks${i}`);
   subTaskContainer.innerHTML = '';
   console.log(subTasksLength);
   subTaskContainer.innerHTML += printSubTasks(subTasksLength);
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
         <div id="todoCategory">${task.category}</div>                         
         <div id="todoTitle"><h2>${task.title}</h2></div>
         <div id="todoDescription">${task.description}</div>
         <div id="todoSubtasks">0 / ${subTasksLength} subtasks</div>
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