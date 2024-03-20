async function initSummary() {
    await includeHTML();
    greetingMessage();
    await loadUsers();
    await loadTasks();
    counterSummery();
}

  function checkLoginStatus() {
    let isLoggedIn = sessionStorage.getItem('isLoggedIn');
    return isLoggedIn;
  }
  
  function greetingMessage() {
    let isLoggedIn = checkLoginStatus();
    let currentHour = checkHour();
    let greeting = document.getElementById('greeting');
    let greetingName = document.getElementById('greetingName');  
    if (currentHour >= 0 && currentHour <= 11) {
      greeting.innerHTML = `Good Morning,`;
      greetingName.innerHTML = `${isLoggedIn}`;
    } else if (currentHour > 11 && currentHour < 14) {
      greeting.innerHTML = 'Good Day,';
      greetingName.innerHTML = `${isLoggedIn}`;
    } else if (currentHour >= 14 && currentHour < 18) {
      greeting.innerHTML = 'Good afternoon,';
      greetingName.innerHTML = `${isLoggedIn}`;
    } else {
      greeting.innerHTML = 'Good Evening,';
      greetingName.innerHTML = `${isLoggedIn}`;
    }
  }

function checkHour() {
    let currentDate = new Date();
    let currentHour = currentDate.getHours();
    return currentHour;
}

function counterSummery(){
  const tasksInBoard = document.getElementById('tib');
  const tasksToDo = document.getElementById('todo');
  const TasksinProgress = document.getElementById('progress');
  const TasksawFeedback = document.getElementById('awFeedback');
  const TaskstasksDone = document.getElementById('tasksDone');
  const Tasksurgent = document.getElementById('urgent');
  const allTasks = tasks.length;
  const allToDo = tasks.filter((entry) => entry.status === "To Do").length;
  const inProgress = tasks.filter((entry) => entry.status === "In progress").length;
  const awFeedback = tasks.filter((entry) => entry.status === "Await feedback").length;
  const tasksDone = tasks.filter((entry) => entry.status === "Tasks Done").length;
  const urgent = tasks.filter((entry) => entry.priority === "Urgent").length;
  showAllSummaryCounter(tasksInBoard, tasksToDo, TasksinProgress, TasksawFeedback, TaskstasksDone, allTasks, allToDo, inProgress, awFeedback, tasksDone, Tasksurgent, urgent);
}

function showAllSummaryCounter(tasksInBoard, tasksToDo, TasksinProgress, TasksawFeedback, TaskstasksDone, allTasks, allToDo, inProgress, awFeedback, tasksDone, Tasksurgent, urgent) {
  tasksInBoard.textContent = allTasks;
  tasksToDo.textContent = allToDo;
  TasksinProgress.textContent = inProgress;
  TasksawFeedback.textContent = awFeedback;
  TaskstasksDone.textContent = tasksDone;
  Tasksurgent.textContent = urgent;
  nextUrgent();
}

function compareDates(a, b) {
  a = new Date(a.date);
  b = new Date(b.date);
  return a.getTime() - b.getTime();
  }

function nextUrgent() {
  const tasksWithDateObjects = tasks.map(task => ({
    ...task,
    date: new Date(task.date)
  }));
  const urgentTasks = tasksWithDateObjects.filter(task => task.priority === "Urgent");
  urgentTasks.sort(compareDates);
  const nextUrgentDate = urgentTasks[0].date;
  const formattedDate = nextUrgentDate.toLocaleDateString("de-DE", {day: "numeric" , month: "long", year: "numeric" });
  const urgentDate = document.getElementById("urgentDate");
  urgentDate.textContent = `${formattedDate}`;
}
