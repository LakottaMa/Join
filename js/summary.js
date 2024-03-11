function init(){
    greetingMessage();
}

function greetingMessage() {
    let currentHour = checkHour();
    let greeting = document.getElementById('greeting');
    if (currentHour >= 0 && currentHour <= 11) {
        greeting.innerHTML = 'Good Morning,';
    } else if (currentHour > 11 && currentHour < 14) {
        greeting.innerHTML = 'Good Day,'
    } else if (currentHour >= 14 && currentHour < 18) {
        greeting.innerHTML = 'Good afternoon,'
    } else {
        greeting.innerHTML = 'Good Evening,';
    }
}

function checkHour() {
    let currentDate = new Date();
    let currentHour = currentDate.getHours();
    return currentHour;
}