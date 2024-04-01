let elementToDrag;

function startDragging(id) {
    elementToDrag = id;
    document.getElementById(`todobox${id}`).style.transform = 'rotate(5deg)';
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


function highlightArea(area) {
    removeAllHighlight();
    area.classList.add('dragAreaHighlight');
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
    let id = elem.id.slice(-1);
    let taskToMove = tasks[id];

    elem.addEventListener('touchstart', e => {
        
        let startX = e.changedTouches[0].clientX;
        let startY = e.changedTouches[0].clientY;
        updatePositions();

        let touchMoveEnabled = false;
        let touchMoved = false;
        
        e.preventDefault();

        let timeoutID = setTimeout(() => {
            touchMoveEnabled = true;
            elem.style.transform = 'rotate(5deg)';
        }, '500');

        elem.addEventListener('touchmove', eve => {
            
            eve.preventDefault();

            if (touchMoveEnabled) {
                touchMoved = true;
                let nextX = eve.changedTouches[0].clientX;
                let nextY = eve.changedTouches[0].clientY;

                elem.style.left = nextX - startX + 'px';
                elem.style.top = nextY - startY + 'px';
                elem.style.zIndex = 15;
                

                if (isElementInside(progressPos, elem)) {
                    highlightArea(progress);
                } else if (isElementInside(feedbackPos, elem)) {
                    highlightArea(feedback);
                } else if (isElementInside(donePos, elem)) {
                    highlightArea(done);
                } else if (isElementInside(todoPos, elem)) {
                    highlightArea(todo);
                } else {
                    removeAllHighlight();
                }
            }
        });


        elem.addEventListener('touchend', eve => {
            clearTimeout(timeoutID);
            elem.style.zIndex = 0;
            if (!touchMoveEnabled && !touchMoved) {
                showDetailBox(id);
            } else {
                if (isElementInside(progressPos, elem)) {
                    dropElementInDiv(elem, 'In progress', taskToMove);
                } else if (isElementInside(feedbackPos, elem)) {
                    dropElementInDiv(elem, 'Await feedback', taskToMove);
                } else if (isElementInside(donePos, elem)) {
                    dropElementInDiv(elem, 'Done', taskToMove)
                } else if (isElementInside(todoPos, elem)) {
                    dropElementInDiv(elem, 'ToDo', taskToMove);
                } else {
                    resetElement(elem);
                    hideDetailBox();
                }
            }
            touchMoveEnabled = false;
            touchMoved = false;
        });
    });
}


function isElementInside(container, element) {
    if (getCenterX(element) > container.left && getCenterX(element) < container.right && getCenterY(element) > container.top && getCenterY(element) < container.bottom) {
        return true;
    } else {
        return false;
    }
}

function resetElement(elem) {
    resetElementPos(elem);
    elem.style.transform = 'rotate(0deg)';
    removeAllHighlight();
    startTouchEvents();
}

function dropElementInDiv(elem, status, taskToMove) {
    taskToMove['status'] = status;
    resetElementPos(elem);
    checkRenderTasks();
    removeAllHighlight();
    startTouchEvents();
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

