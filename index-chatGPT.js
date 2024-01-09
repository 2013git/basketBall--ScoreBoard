/*-------------- index.js after chatGPT optimization -------------*/

let homeScore = 0;
let guestScore = 0;
const buttons = ["btn-home-1", "btn-home-2", "btn-home-3", "btn-guest-1", "btn-guest-2", "btn-guest-3"];
const getElement = (id) => document.getElementById(id);
const homeEl = getElement("home-scr");
const guestEl = getElement("guest-scr");
const timerEl = getElement('timer');
const startStopBtnEl = getElement("startStopBtn");
const homeId = getElement('home-id');
const guestId = getElement('guest-id');

buttons.forEach((buttonId) => {
    getElement(buttonId).addEventListener("click", () => {
        incrementCnt(buttonId);
        winner();
    });
});

function incrementCnt(btnType) {
    const isHome = btnType.startsWith("btn-home");
    const points = isHome ? parseInt(btnType.slice(-1)) : 1;

    isHome ? (homeScore += points) : (guestScore += points);
    scoreRender(isHome ? "home-scr" : "guest-scr", isHome ? homeScore : guestScore);
}

function resetCounter() {
    homeScore = 0;
    guestScore = 0;
    homeId.classList.remove("winner")
    guestId.classList.remove("winner")
    homeEl.innerHTML = guestEl.innerHTML = "0";
    [h, m, s] = ["00", "00", "00"];
    startStop = false;
    timerEl.innerHTML = `${h}:${m}:${s}`;
    startStopBtnEl.innerHTML = "START";
}

function scoreRender(btnID, score) {
    getElement(btnID).innerHTML = score;
}

document.getElementById("new-game").addEventListener("click", resetCounter);

/****************************** Timer function ********************************/
let [h, m, s] = ["00", "00", "00"];
let startStop = false;

function toggle() {
    startStop = !startStop;
    const status = startStop ? "STOP" : "START";
    startStopBtnEl.innerHTML = status;
    startStop && startTime();
}

function startTime() {
    s = s === 59 ? "00" : checkTime(++s);
    m = s === "00" ? checkTime(++m) : m;
    h = m === 59 ? checkTime(++h) : h;

    timerEl.innerHTML = `${h}:${m}:${s}`;
    setTimeout(startStop ? startTime : null, 1000);
}

function checkTime(i) {
    return i < 10 ? "0" + i : i;
}

/*-------------------Winner Selection--------------------*/
function winner() {
    const [homeClass, guestClass] = ["winner", "winner"];
    homeId.classList.toggle(homeClass, guestScore < homeScore);
    guestId.classList.toggle(guestClass, guestScore > homeScore);
}
