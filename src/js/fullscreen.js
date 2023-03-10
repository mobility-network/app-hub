let IntervalPlay;
let IntervalInit;

btnStart.onclick = function() {
  openFullscreen();
  btnStart.disabled = true;
  btnStart.innerHTML = "";
  btnStart.classList.remove("btn", "btn-success", "btn-lg");
  btnStart.classList.add("fixation")

  target1.classList.add("hide")
  target2.classList.add("hide")
  target1.classList.remove("dotted")
  target2.classList.remove("dotted")

  lblTimeInit.classList.remove('hide')
  lblTime.classList.add('hide')
  lblScore.classList.add('hide')

  trialTime = Date.now() // UTC
  timeInit = timeLimitInit;
  timePlay = 0;
  score = 0;
  scoreValid = 0;
  scoreInvalid = 0;
  activeTar = 1;
  trialNum++;
  updateUILabels()
  IntervalInit = setInterval(decrementTimeInit, 1000)
}

/* Open fullscreen */
function openFullscreen() {
  if (pnlApp.requestFullscreen) {
    pnlApp.requestFullscreen();
  } else if (pnlApp.webkitRequestFullscreen) { /* Safari */
    pnlApp.webkitRequestFullscreen();
  } else if (pnlApp.msRequestFullscreen) { /* IE11 */
    pnlApp.msRequestFullscreen();
  }
}

  /* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}

function decrementTimeInit() {
  timeInit--;
  updateUILabels();
  if (timeInit < 0) {
    lblTimeInit.classList.add('hide')
    btnStart.classList.add('hide')
    target1.classList.remove("hide")
    target2.classList.remove("hide")
    clearInterval(IntervalInit)
    record = true;
    target1.classList.add("active")
    IntervalPlay = setInterval(incrementTimePlay, 1000)
  }
}

function incrementTimePlay() {
  timePlay++;
  if (timePlay > timeLimitPlay) {
    timePlay = timeLimitPlay;
    clearInterval(IntervalPlay)
    record = false;
    closeFullscreen()
    // Reset Labels
    lblTime.classList.remove('hide')
    lblScore.classList.remove('hide')
    // Reset Start button
    btnStart.disabled = false;
    btnStart.classList.remove("fixation", "hide")
    btnStart.classList.add("btn", "btn-success", "btn-lg")
    btnStart.innerHTML = "Start"
    // Reset Targets
    target1.classList.remove("active")
    target2.classList.remove("active")
    target1.classList.add("dotted")
    target2.classList.add("dotted")
    // Save Scores
    updateScores();
  }
  updateUILabels();
}

function updateScores() {
  arrResults.push({
    'trial': trialNum,
    'timeUTC': trialTime,
    'initTime': timeLimitInit,
    'playTime': timeLimitPlay,
    'targetDistPX': distPX,
    'targetSizePX': sizePX,
    'targetDistCM': distCM,
    'targetSizeCM': sizeCM,
    'indexOfDifficulty': index,
    'scoreValid': scoreValid,
    'scoreInvalid': scoreInvalid,
    'scoreTotal': score
  })
  console.log(arrResults)
}