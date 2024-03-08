/**
 * toggle display: 'none'; to show or hide element
 * @param {string} id 
 */
function toggleCustomSelect(id) {
    document.getElementById(id).classList.toggle('d-none');
}

/**
 * select option
 * @param {string} getId get the text form id
 * @param {string} setId set the text to the id
 */
function selectElement(getId, setId) {
   let choice = document.getElementById(getId).innerText;
   document.getElementById(setId).innerHTML = `${choice}`;
   let cat = setId == 'selectedCategory' ? 'taskCategory' : 'userCategory';
   toggleCustomSelect(cat);
}

function addTask() {
    console.log('addTask Button pressed');
}

function showSubtaskInput() {
    document.getElementById('subtaskInput').classList.remove('d-none');
    document.getElementById('subtaskText').classList.add('d-none');
}