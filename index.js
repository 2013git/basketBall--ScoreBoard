// Variables to track the scores

let homeScore = 0
let guestScore = 0


const buttons = [
    "btn-home-1",
    "btn-home-2",
    "btn-home-3",
    "btn-guest-1",
    "btn-guest-2",
    "btn-guest-3",
  ];

  const homeEl = document.getElementById("home-scr")
  const guestEl = document.getElementById("guest-scr")
  const timerEl = document.getElementById('timer')
  const startStopBtnEl = document.getElementById("startStopBtn")
  const homeId = document.getElementById('home-id')
  const guestId = document.getElementById('guest-id')

// Loops to to avoid repetitions. 
  buttons.forEach((buttonId) => {
    document.getElementById(buttonId).addEventListener("click", () => 
    {
      incrementCnt(buttonId)
      winner()  // To highlight the winner
    });
  })
// Handles the six buttons click.
  const incrementCnt= btnType => {
    switch(btnType) {
        case "btn-home-1":
            homeScore++
            scoreRender("home-scr", homeScore)
          break;
          case "btn-home-2":
            homeScore = homeScore + 2
            scoreRender("home-scr", homeScore)
          break;
          case "btn-home-3":
            homeScore = homeScore + 3
            scoreRender("home-scr", homeScore)
          break;
          case "btn-guest-1":
            guestScore++
            scoreRender("guest-scr", guestScore) 
              break;
          case "btn-guest-2":
            guestScore = guestScore + 2
            scoreRender("guest-scr", guestScore)
              break;
          case "btn-guest-3":
            guestScore = guestScore + 3
            scoreRender("guest-scr", guestScore)
              break;
        default:
      }

}


  // Reset scores and Timer for a new game
 const resetCounter = () => {
    homeScore = 0;
    guestScore = 0;
    homeEl.innerHTML = homeScore;
    guestEl.innerHTML = guestScore;
    homeId.classList.remove("winner")
    guestId.classList.remove("winner")

    h = "0" + 0
    m = "0" + 0
    s = "0" + 0
    startStop = false;
    timerEl.innerHTML =  h + ":" + m + ":" + s;
    startStopBtnEl.innerHTML = "START"
}

const scoreRender = (btnID, score) => {
    document.getElementById(btnID).innerHTML = score

}

// Handles the NEW GAME button click.
document.getElementById("new-game").addEventListener("click", () => resetCounter())



/**********  Timer function ************/
let h = "0" + 0
let m = "0" + 0
let s = "0" + 0

let startStop = false;

const toggle = () => {
  startStop = !startStop;
  let status = startStop ? "STOP" : "START"
  startStopBtnEl.innerHTML = status
  checkButton()
}

const checkButton = () => {
  startStop && startTime()
}

const startTime = () => {
  if(s === 59) {
    s = "0" + 0
    m++
    m = checkTime(m);
    if(m === 59){
      m = "0" + 0
      h++
      h=checkTime(h)
    }
  } else {
    s++
    s = checkTime(s);
  }
  timerEl.innerHTML =  h + ":" + m + ":" + s;
  setTimeout(checkButton, 1000);
}
// add zero in front of numbers < 10
const checkTime = (i) => {
  if (i < 10) {i = "0" + i};  
  return i;
}

/-------------------Winner Selection--------------------/

const winner = () => {
  if (guestScore > homeScore) {
    homeId.classList.remove("winner")
    guestId.classList.add("winner")
  } else if (guestScore < homeScore){
    homeId.classList.add("winner")
    guestId.classList.remove("winner")
  } else {
    homeId.classList.remove("winner")
    guestId.classList.remove("winner")
  }
}