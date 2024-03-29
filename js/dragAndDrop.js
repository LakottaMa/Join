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

let todoPos = todo.getBoundingClientRect();
let progressPos = progress.getBoundingClientRect();
let feedbackPos = feedback.getBoundingClientRect();
let donePos = done.getBoundingClientRect();



// add hightlight, wenn cursor über dem entsprechenden div ist

function addStart(elem) {
    elem.addEventListener('touchstart', e => {

        let startX = e.changedTouches[0].clientX;
        let startY = e.changedTouches[0].clientY;

        elem.addEventListener('touchmove', eve => {
            eve.preventDefault();

            let nextX = eve.changedTouches[0].clientX;
            let nextY = eve.changedTouches[0].clientY;

           

            getCenterX(elem);

            elem.style.left = nextX - startX + 'px';
            elem.style.top = nextY - startY + 'px';
            elem.style.zIndex = 500;

            if (getCenterX(elem) > progressPos.left && getCenterX(elem) < progressPos.right) {
                console.log('Element befindet sich im in Progress Bereich!');
            } else if (getCenterX(elem) > feedbackPos.left && getCenterX(elem) < feedbackPos.right) {
                console.log('Element befindet sich im Feedback Bereich!');
            } else if (getCenterX(elem) > donePos.left && getCenterX(elem) < donePos.right) {
                console.log('Element befindet sich im Done Bereich!');
            } else if (getCenterX(elem) > todoPos.left && getCenterX(elem) < todoPos.right) {
                console.log('Element befindet sich im Todo Bereich!');
            }
        });

        elem.addEventListener('touchend', eve => {
            let id = elem.id.slice(-1);
            let taskToMove = tasks[id];
            console.log('task to move id:', id);
            elem.style.zIndex = 0;

            if (getCenterX(elem) > progressPos.left && getCenterX(elem) < progressPos.right) {
                console.log('Element in progress abgelegt!');
                taskToMove['status'] = 'In progress';
                resetElementPos(elem);
                checkRenderTasks();
                startTouchEvents();
            } else if (getCenterX(elem) > feedbackPos.left && getCenterX(elem) < feedbackPos.right) {
                taskToMove['status'] = 'Await feedback';
                resetElementPos(elem);
                checkRenderTasks();
                startTouchEvents();
                console.log('Element in feedback abgelegt!');
            } else if (getCenterX(elem) > donePos.left && getCenterX(elem) < donePos.right) {
                taskToMove['status'] = 'Done';
                resetElementPos(elem);
                checkRenderTasks();
                startTouchEvents();
                console.log('Element in done abgelegt!');
            } else if (getCenterX(elem) > todoPos.left && getCenterX(elem) < todoPos.right) {
                taskToMove['status'] = 'ToDo';
                resetElementPos(elem);
                checkRenderTasks();
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

function resetElementPos(elem) {
    elem.style.left = 0 + "px";                                
    elem.style.top = 0 + "px";
}