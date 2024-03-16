async function initBoard() {
   await includeHTML();
   await loadUsers();
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

let exampleTasks = [
   {
      "title": "Kochwelt Page & Recipe Recommender",
      "description": "Build start page with recipe recommandation.",
      "date": "Sat Mar 16 2024 01:00:00 GMT+0100 (Mitteleuropäische Normalzeit)",
      "priority": "Medium",
      "assignedTo": ["Linus Torvalds", "Sam Altman"],
      "category": "User Story",
      "subtasks": ["Implement Recipe Recommendation"],
      "status": "In progress"
   },
   {
      "title": "HTML Base Template Creation",
      "description": "Create reusable HTML base templates.",
      "date": "Sat Mar 17 2024 01:00:00 GMT+0100 (Mitteleuropäische Normalzeit)",
      "priority": "Urgent",
      "assignedTo": ["Tim Cook", "Bill Gates"],
      "category": "Technical Task",
      "subtasks": [],
      "status": "In progress"
   },

   {
      "title": "Design Database Schema",
      "description": "Create database structure for the application.",
      "date": "Mon Mar 19 2024 01:00:00 GMT+0100 (Mitteleuropäische Normalzeit)",
      "priority": "Medium",
      "assignedTo": ["Jeff Bezos", "Larry Page"],
      "category": "Technical Task",
      "subtasks": [],
      "status": "In progress"
   },
   {
      "title": "UI/UX Enhancement",
      "description": "Improve user interface and experience.",
      "date": "Tue Mar 20 2024 01:00:00 GMT+0100 (Mitteleuropäische Normalzeit)",
      "priority": "Low",
      "assignedTo": ["Satya Nadella", "Sundar Pichai"],
      "category": "User Story",
      "subtasks": ["Update color scheme", "Optimize navigation menu"],
      "status": "Await feedback"
   },
   {
      "title": "Implement User Authentication",
      "description": "Develop login and registration functionality.",
      "date": "Sun Mar 18 2024 01:00:00 GMT+0100 (Mitteleuropäische Normalzeit)",
      "priority": "High",
      "assignedTo": ["Elon Musk", "Mark Zuckerberg"],
      "category": "Technical Task",
      "subtasks": ["Create login form", "Implement user registration"],
      "status": "To Do"
   }
];

function pushExamplesToTasks() {
   exampleTasks.forEach(t => {
      tasks.push(t);
   });
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