async function initBoard() {
   await includeHTML();
   await loadUsers();
   await loadTasks();
   initializeAndListen();
   renderTasksInBoard();
}

function showAddTaskBox() {
   let box = document.getElementById('addTaskBox');
   box.style.right = 0;
}

function hideAddTaskBox() {
   let box = document.getElementById('addTaskBox');
   box.style.right = '-450px';
}



function showExamples() {
   pushExamplesToTasks();
   renderTasksInBoard();
}

function printTasks(task) {
   return /*html*/ `
      <div class="todoBox">
         <div id="todoCategory">${task.category}</div>                         
         <div id="todoTitle">${task.title}</div>
         <div id="todoDescription">${task.description}</div>
         <div id="todoSubtasks"></div>
         <div class="assignedAndPrio">
            <div id="todoAssignedTo"></div>
            <div id="todoPriority">${task.priority}</div>
         </div>
      </div>
   `;
}

function clearContainer() {
   let ids = ['toDoContainer', 'inProgressContainer', 'awaitFeedbackContainer', 'doneContainer'];
      ids.forEach(id => {
         let container = document.getElementById(id);
         if(container) {
            container.innerHTML = '';
         }
      });
}

function renderTasksInBoard() {
   clearContainer();
   for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      let status = task['status'];
      let container = checkContainer(status);
      container.innerHTML += printTasks(task);
   }
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