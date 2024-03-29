let elementToDrag;

function startDragging(id) {
    elementToDrag = id;
    // document.getElementById(`todobox${id}`).style.transform = 'rotate(5deg)'
}

function allowDrop(event) {
    event.preventDefault();
}

async function moveTo(category) {
    tasks[elementToDrag]['status'] = category;
    renderTasksInBoard();
    await saveTasks(tasks);
}

function highlight(id) {
    document.getElementById(id).classList.add('dragAreaHighlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('dragAreaHighlight');
}

// cursor above

// touch below

let all;

function startTouchEvents() {
    all = document.querySelectorAll('.todoBox');
    all.forEach(addStart);
}

const todo = document.getElementById('toDoContainer');
const progress = document.getElementById('inProgressContainer');
const feedback = document.getElementById('awaitFeedbackContainer');
const done = document.getElementById('doneContainer');

function highlightTodo() {
    todo.classList.add('dragAreaHighlight');
    progress.classList.remove('dragAreaHighlight');
    feedback.classList.remove('dragAreaHighlight');
    done.classList.remove('dragAreaHighlight');
}

function highlightProgress() {
    todo.classList.remove('dragAreaHighlight');
    progress.classList.add('dragAreaHighlight');
    feedback.classList.remove('dragAreaHighlight');
    done.classList.remove('dragAreaHighlight');
}

function highlightDone() {
    todo.classList.remove('dragAreaHighlight');
    progress.classList.remove('dragAreaHighlight');
    feedback.classList.remove('dragAreaHighlight');
    done.classList.add('dragAreaHighlight');
}

function highlightFeedback() {
    todo.classList.remove('dragAreaHighlight');
    progress.classList.remove('dragAreaHighlight');
    feedback.classList.add('dragAreaHighlight');
    done.classList.remove('dragAreaHighlight');
}

function removeAllHighlight() {
    todo.classList.remove('dragAreaHighlight');
    progress.classList.remove('dragAreaHighlight');
    feedback.classList.remove('dragAreaHighlight');
    done.classList.remove('dragAreaHighlight');
}


let todoPos = todo.getBoundingClientRect();
let progressPos = progress.getBoundingClientRect();
let feedbackPos = feedback.getBoundingClientRect();
let donePos = done.getBoundingClientRect();



function updatePositions() {
    todoPos = todo.getBoundingClientRect();
    progressPos = progress.getBoundingClientRect();
    feedbackPos = feedback.getBoundingClientRect();
    donePos = done.getBoundingClientRect();
}

function addStart(elem) {
    elem.addEventListener('touchstart', e => {

        let startX = e.changedTouches[0].clientX;
        let startY = e.changedTouches[0].clientY;

        elem.addEventListener('touchmove', eve => {
            eve.preventDefault();

            let nextX = eve.changedTouches[0].clientX;
            let nextY = eve.changedTouches[0].clientY;

            elem.style.left = nextX - startX + 'px';
            elem.style.top = nextY - startY + 'px';
            elem.style.zIndex = 500;

            if (getCenterX(elem) > progressPos.left && getCenterX(elem) < progressPos.right && getCenterY(elem) > progressPos.top && getCenterY(elem) < progressPos.bottom) {
                console.log('Element befindet sich im in Progress Bereich!');
                highlightProgress();
            } else if (getCenterX(elem) > feedbackPos.left && getCenterX(elem) < feedbackPos.right && getCenterY(elem) > feedbackPos.top && getCenterY(elem) < feedbackPos.bottom) {
                console.log('Element befindet sich im Feedback Bereich!');
                highlightFeedback();
            } else if (getCenterX(elem) > donePos.left && getCenterX(elem) < donePos.right && getCenterY(elem) > donePos.top && getCenterY(elem) < donePos.bottom) {
                console.log('Element befindet sich im Done Bereich!');
                highlightDone();
            } else if (getCenterX(elem) > todoPos.left && getCenterX(elem) < todoPos.right && getCenterY(elem) > todoPos.top && getCenterY(elem) < todoPos.bottom) {
                console.log('Element befindet sich im Todo Bereich!');
                highlightTodo();
            }
        });

        elem.addEventListener('touchend', eve => {
            let id = elem.id.slice(-1);
            let taskToMove = tasks[id];
            elem.style.zIndex = 0;

            if (getCenterX(elem) > progressPos.left && getCenterX(elem) < progressPos.right && getCenterY(elem) > progressPos.top && getCenterY(elem) < progressPos.bottom) {
                console.log('Element in progress abgelegt!');
                taskToMove['status'] = 'In progress';
                resetElementPos(elem);
                checkRenderTasks();
                removeAllHighlight();
                startTouchEvents();
            } else if (getCenterX(elem) > feedbackPos.left && getCenterX(elem) < feedbackPos.right && getCenterY(elem) > feedbackPos.top && getCenterY(elem) < feedbackPos.bottom) {
                taskToMove['status'] = 'Await feedback';
                resetElementPos(elem);
                checkRenderTasks();
                removeAllHighlight();
                startTouchEvents();
                console.log('Element in feedback abgelegt!');
            } else if (getCenterX(elem) > donePos.left && getCenterX(elem) < donePos.right && getCenterY(elem) > donePos.top && getCenterY(elem) < donePos.bottom) {
                taskToMove['status'] = 'Done';
                resetElementPos(elem);
                checkRenderTasks();
                removeAllHighlight();
                startTouchEvents();
                console.log('Element in done abgelegt!');
            } else if (getCenterX(elem) > todoPos.left && getCenterX(elem) < todoPos.right && getCenterY(elem) > todoPos.top && getCenterY(elem) < todoPos.bottom) {
                taskToMove['status'] = 'ToDo';
                resetElementPos(elem);
                checkRenderTasks();
                removeAllHighlight();
                startTouchEvents();
                console.log('Element in todo abgelegt!');
            }
        });
    });
}

function getCenterX(element) {
    let rect = element.getBoundingClientRect();
    let centerX = rect.left + (rect.width / 2);
    return centerX;
}

function getCenterY(element) {
    let rect = element.getBoundingClientRect();
    let centerY = rect.top + (rect.height / 2);
    return centerY;
}

function resetElementPos(elem) {
    elem.style.left = 0 + "px";                                
    elem.style.top = 0 + "px";
}