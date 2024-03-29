let elementToDrag;

function startDragging(id) {
    elementToDrag = id;
    console.log(elementToDrag);
}

function allowDrop(event) {
    event.preventDefault();
}

function moveTo(category) {
    tasks[elementToDrag]['status'] = category;
    renderTasksInBoard();
}

function highlight(id) {
    document.getElementById(id).classList.add('dragAreaHighlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('dragAreaHighlight');
}