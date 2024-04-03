async function initSummary() {
  if (!sessionStorage.getItem('greetingShown')) {
    greetingScreen();
    sessionStorage.setItem('greetingShown', true);
  }
  await includeHTML();
  loginStatus();
  await loadTasks();
  counterSummery(tasks);
}

/** */
function loginStatus() {
  let isLoggedIn = sessionStorage.getItem('isLoggedIn');
  document.getElementById('greetingName').innerHTML = `${isLoggedIn}`;
  document.getElementById('greetingNameMobile').innerHTML = `${isLoggedIn}`;
  greetingMessage();
}

/** shows greeting depending on time of day */
function greetingMessage() {
  let currentDate = new Date();
  let currentHour = currentDate.getHours();
  let greetingMessage;
  const greetings = { morning: "Good Morning,", afternoon: "Good Day,", evening: "Good afternoon,", night: "Good night" }
  if (currentHour < 12) {
    greetingMessage = greetings.morning;
  } else if (currentHour < 18) {
    greetingMessage = greetings.afternoon;
  } else if (currentHour < 22) {
    greetingMessage = greetings.evening;
  } else {
    greetingMessage = greetings.night;
  }
  document.getElementById('greeting').innerHTML = greetingMessage;
  document.getElementById('greetMobile').innerHTML = greetingMessage;
}

/** loop over the tasks-array to get the counts for each category */
function counterSummery(tasks) {
  const tasksInBoard = document.getElementById('tib');
  const tasksToDo = document.getElementById('todo');
  const tasksinProgress = document.getElementById('progress');
  const tasksawFeedback = document.getElementById('awFeedback');
  const taskstasksDone = document.getElementById('tasksDone');
  const tasksUrgent = document.getElementById('urgent');
  let allTasks = 0;
  let allToDo = 0;
  let inProgress = 0;
  let awFeedback = 0;
  let tasksDone = 0;
  let urgent = 0;
  for (const task of tasks) {
    allTasks++;
    switch (task.status) {
      case "To Do":
        allToDo++;
        break;
      case "In progress":
        inProgress++;
        break;
      case "Await feedback":
        awFeedback++;
        break;
      case "Done":
        tasksDone++;
        break;
    }
    if (task.priority === "Urgent") {
      urgent++;
    }
  }
  tasksInBoard.textContent = allTasks;
  tasksToDo.textContent = allToDo;
  tasksinProgress.textContent = inProgress;
  tasksawFeedback.textContent = awFeedback;
  taskstasksDone.textContent = tasksDone;
  tasksUrgent.textContent = urgent;
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
  const formattedDate = nextUrgentDate.toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" });
  const urgentDate = document.getElementById("urgentDate");
  urgentDate.textContent = `${formattedDate}`;
}