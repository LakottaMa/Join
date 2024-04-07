let elementToDrag;

function startDragging(id) {
    elementToDrag = id;
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
/**
 * start touch events for all tasks with class todoBox
 */
function startTouchEvents() {
    all = document.querySelectorAll('.todoBox');
    all.forEach(addStart);
}

const todo = document.getElementById('toDoContainer');
const progress = document.getElementById('inProgressContainer');
const feedback = document.getElementById('awaitFeedbackContainer');
const done = document.getElementById('doneContainer');

/**
 * hightlight the area for touchend
 * @param {string} area 
 */
function highlightArea(area) {
    removeAllHighlight();
    area.classList.add('dragAreaHighlight');
}

/**
 * remove highligt from all areas
 */
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

/**
 * update the position from the target areas
 */
function updatePositions() {
    todoPos = todo.getBoundingClientRect();
    progressPos = progress.getBoundingClientRect();
    feedbackPos = feedback.getBoundingClientRect();
    donePos = done.getBoundingClientRect();
}

let startX; // Start Position in X
let startY; // Start Position in Y
let offsetX;    // offset X wird für position absolute benötigt
let offsetY;    // offset Y wird für position absolute benötigt
let touchMoveEnabled = false;   // boolean wird true, wenn 500ms vom timeout vergangen sind
let touchMoved = false; // boolean wird true, wenn der Task bewegt wurde
let timeoutID;  // timeoutID wird bei touchend zurück gesetzt

/**
 * activate event listener for touch events
 * @param {*} elem 
 */
function addStart(elem) {
    let id = elem.id.slice(-1); // id for the task
    let taskToMove = tasks[id]; // movable task
    elem.addEventListener('touchstart', e => {
        handleTouchStart(elem, e);
        elem.addEventListener('touchmove', eve => {
            handleTouchMove(eve, elem);
        });
        elem.addEventListener('touchend', eve => {
            handleTouchEnd(elem, id, taskToMove);
        });
    });
}

/**
 * set startpoints and offset coordinates, set timeout and rotate task after timeout
 * @param {*} elem 
 * @param {*} e 
 */
function handleTouchStart(elem, e) {
    startX = e.changedTouches[0].clientX;   // X-Position vom ersten Touch
    startY = e.changedTouches[0].clientY;   // Y-Position vom ersten Touch
    updatePositions();
    offsetX = elem.offsetLeft;              // Entfernung zum nächsten linken Rand des parent Elements
    offsetY = elem.offsetTop;               // Entfernung zum nächsten oberen Rand des parent Elements

    e.preventDefault();
    timeoutID = setTimeout(() => {
        touchMoveEnabled = true;
        elem.style.transform = 'rotate(5deg)';
    }, '500');
}

/**
 * set the coordinates for the moving task
 * @param {*} eve 
 * @param {*} elem 
 */
function handleTouchMove(eve, elem) {
    eve.preventDefault();
    if (touchMoveEnabled) {
        touchMoved = true;
        let nextX = eve.changedTouches[0].clientX;  // X-Position vom ersten Touch
        let nextY = eve.changedTouches[0].clientY;  // Y-Position vom ersten Touch
        elem.style.position = 'absolute';           // position: absolut, damit der Task über allen anderen ist
        elem.style.left = (nextX - startX + offsetX) + 'px';    // Berechnung der neuen Position als style left
        elem.style.top = (nextY - startY + offsetY) + 'px';     // Berechnung der neuen Position als style top
        elem.style.zIndex = 15;
        if (isElementInside(progressPos, elem)) {               // Überprüfung ob der Task über einem Target ist
            highlightArea(progress);                            // highlight area 
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
}

/**
 * open detailBox or move task to new area
 * @param {*} elem 
 * @param {*} id 
 * @param {*} taskToMove 
 */
function handleTouchEnd(elem, id, taskToMove) {
    clearTimeout(timeoutID);                        // timeout zurück setzen
    elem.style.zIndex = 0;
    if (!touchMoveEnabled && !touchMoved) {         // Wenn touchmove false und touchMoved false, dann
        showDetailBox(id);                          // DetailView öffnen
    } else {                                        // Wenn nicht, Task verschieben
        if (isElementInside(progressPos, elem)) {
            dropElementInDiv(elem, 'In progress', taskToMove);
        } else if (isElementInside(feedbackPos, elem)) {
            dropElementInDiv(elem, 'Await feedback', taskToMove);
        } else if (isElementInside(donePos, elem)) {
            dropElementInDiv(elem, 'Done', taskToMove)
        } else if (isElementInside(todoPos, elem)) {
            dropElementInDiv(elem, 'To Do', taskToMove);
        } else {
            resetElement(elem);
            hideDetailBox();
        }
    }
    touchMoveEnabled = false;
    touchMoved = false;
}

/**
 * checking whether the element is in an area
 * @param {*} container 
 * @param {*} element 
 * @returns 
 */
function isElementInside(container, element) {
    if (getCenterX(element) > container.left && getCenterX(element) < container.right && getCenterY(element) > container.top && getCenterY(element) < container.bottom) {
        return true;
    } else {
        return false;
    }
}

/**
 * reset Element and start touchEvents again
 * @param {*} elem 
 */
function resetElement(elem) {
    resetElementPos(elem);
    elem.style.transform = 'rotate(0deg)';
    removeAllHighlight();
    startTouchEvents();
}

/**
 * move task to new area
 * @param {*} elem 
 * @param {*} status 
 * @param {*} taskToMove 
 */
function dropElementInDiv(elem, status, taskToMove) {
    taskToMove['status'] = status;
    resetElementPos(elem);
    checkRenderTasks();
    removeAllHighlight();
    startTouchEvents();
}

/**
 * 
 * @param {*} element 
 * @returns Center Position in X
 */
function getCenterX(element) {
    let rect = element.getBoundingClientRect();
    let centerX = rect.left + (rect.width / 2);
    return centerX;
}

/**
 * 
 * @param {*} element 
 * @returns Center Position in Y
 */
function getCenterY(element) {
    let rect = element.getBoundingClientRect();
    let centerY = rect.top + (rect.height / 2);
    return centerY;
}

/**
 * reset Task back to Position: static and left and top 0
 * @param {*} elem 
 */
function resetElementPos(elem) {
    elem.style.position = 'static';
    elem.style.left = 0 + "px";
    elem.style.top = 0 + "px";
}

