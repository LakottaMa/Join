async function init() {
  users.push();
  await setItem('users', JSON.stringify(users));
  await loadUsers();
}

async function initLegalTopics(){
   await includeHTML();
}


 
 