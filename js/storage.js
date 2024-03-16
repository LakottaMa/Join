const STORAGE_TOKEN = 'FOQ59STJFAGBFPPP9W1RP2EHAKEF90DYTULV2A3Q';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
    .then(res => res.json());
}

async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url).then(res => res.json()).then(res => {
    if (res.data) {
      return res.data.value;
    } throw `Could not find data with key "${key}".`;
  });
}

function logout() {
  sessionStorage.clear();
  unrememberMe();
}

let localUsers = [
  {
    "name": "Guest",
    "email": "guest@guest.de",
    "password": "12345",
  },
  {
    "name": "Tim Cook",
    "email": "tim.cook@example.com",
    "password": "Cook#Apple5",
    "phone": "017852546",
  },
  {
    "name": "Steve Jobs",
    "email": "steve.jobs@example.com",
    "password": "Jobs#Apple1",
    "phone": "017852546",
  },
  {
    "name": "Bill Gates",
    "email": "bill.gates@example.com",
    "password": "Gates@Microsoft2",
    "phone": "017852546",
  },
  {
    "name": "Linus Torvalds",
    "email": "linus.torvalds@example.com",
    "password": "Torvalds#Linux3",
    "phone": "017852546",
  },
  {
    "name": "Sam Altman",
    "email": "sam.altman@example.com",
    "password": "Altman#YCombinator4",
    "phone": "017852546",
  }
];

let localTasks = [
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

/**  Function to reset the remote Storage: with shift + click on Logo in Landing Page */
function resetStorage(event) {
  resetButton = document.getElementById('resetStorage');
  if (event.shiftKey) {
    const confirmation = confirm("Are you sure you want to reset remote storage? This action cannot be undone.");
    if (confirmation) {
      setItem('users', JSON.stringify(localUsers));
      setItem('tasks', JSON.stringify(localTasks));
      alert('remote Storage is resetet!');
      location.reload();
    }
  }
}

async function loadUsers() {
  try {
    users = JSON.parse(await getItem('users'));
  } catch (e) {
    console.error('Loading error:', e);
  }
  console.table(users);
}

async function loadTasks() {
  try {
    tasks = JSON.parse(await getItem('tasks'));
  } catch (e) {
    console.error('Loading error:', e);
  }
  console.table(tasks);
}