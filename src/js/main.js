// UI
const pnlApp = document.getElementById('pnl-app');
const btnStart = document.getElementById('btn-start');
const btnSave = document.getElementById('btn-save');
const target1 = document.getElementById('tar-one');
const target2 = document.getElementById('tar-two');
const regionValid = document.getElementById('region-valid');
const regionInvalid = document.getElementById('region-invalid');
const inputCal = document.getElementById('input-cal');
const inputTime = document.getElementById('input-time');
const rangeDist = document.getElementById('range-distance')
const rangeSize = document.getElementById('range-size')
const lblRangeDist = document.getElementById('lbl-range-distance')
const lblRangeSize = document.getElementById('lbl-range-size')
const lblDistCM = document.getElementById('lbl-dist-cm')
const lblSizeCM = document.getElementById('lbl-size-cm')
const lblIndex = document.getElementById('lbl-index')
const lblTime = document.getElementById('lbl-time')
const lblTimeInit = document.getElementById('lbl-time-init')
const lblScore = document.getElementById('lbl-score')
const txtScore = document.getElementById('txt-score')

const strRangeDist = "Set distance (px):"
const strRangeSize = "Set size (px):"
const strDistCM = "Target Distance:";
const strSizeCM = "Target Size:";
const strIndex = "Index of Difficulty:";
const strTime = "Time:";
const strScore = "Score:";
const strStart = "START<br /><span id='txt-sub'>Trial #"

// Default Values
const lengthPX = 100; // calibration line length in pixels
var lengthCM = 100; // calibration line length in cm
var PX2CM = lengthCM/lengthPX;
var distPX = getDistance(0);
var sizePX = getSize(0);
var distCM = distPX * PX2CM;
var sizeCM = sizePX * PX2CM;
var index = Math.log(2*distPX/sizePX);

var record = false;
var timeLimitPlay = 15; // seconds
var timeLimitInit = 3; // seconds
var timePlay = 0; // seconds
var timeInit = timeLimitInit; // seconds

var score = 0;
var scoreValid = 0;
var scoreInvalid = 0;
var activeTar = 1;
var trialNum = 1;
var trialTime;

var arrResults = [];

window.onload = function () {
    // VALUES
    rangeDist.value = 0;
    rangeSize.value = 0;
    updateParamCM()
    // UI LABELS
    updateUILabels()
    // SET TARGETS
    setTargetPositions()
    setTargetSize()
    setValidRegion()
}

window.onresize = function() {
    setTargetPositions()
}

btnSave.onclick = function() {
    if (arrResults.length>0) {
        var blob = new Blob([convertToCSV(arrResults)], {type: "text/plain;charset=utf-8"});
        var fileName = "fitts_" + arrResults[0].timeUTC + ".csv";
        saveAs(blob, fileName);
    }
}

// HELPERS
function updateParamCM() {
    PX2CM = lengthCM/lengthPX;
    distPX = getDistance(document.getElementById('range-distance').value);
    sizePX = getSize(document.getElementById('range-size').value);
    distCM = distPX * PX2CM;
    sizeCM = sizePX * PX2CM;
}

function updateUILabels() {
    if (!btnStart.disabled) {
        btnStart.innerHTML = strStart + trialNum + "</span>";
    }
    lblRangeDist.innerHTML = strRangeDist + " " + distPX;
    lblRangeSize.innerHTML = strRangeSize + " " + sizePX;

    lblDistCM.innerHTML = strDistCM + " " + roundNumber(distCM, 3) + "cm"
    lblSizeCM.innerHTML = strSizeCM + " " + roundNumber(sizeCM, 3) + "cm"
    lblIndex.innerHTML = strIndex + " " + roundNumber(index, 2)

    lblTime.innerHTML = strTime + " " + timePlay + " s";
    lblScore.innerHTML = strScore + " " + score;

    inputTime.value = timeLimitPlay;
    if (timeInit==0) {
        lblTimeInit.innerHTML = "GO!";
    } else {
        lblTimeInit.innerHTML = timeInit;
    }
}

function setTargetPositions() {
    var offX = Math.round(distPX/2);
    target1.style.left = '50%';
    target2.style.left = '50%';
    t1X = target1.offsetLeft;
    target1.style.left = (t1X - offX) + 'px';
    t2X = target2.offsetLeft;
    target2.style.left = (t2X + offX) + 'px';
}

function setTargetSize() {
    target1.style.width = sizePX + 'px';
    target2.style.width = sizePX + 'px';
}

function setValidRegion() {
    regionValid.style.width = (distPX + sizePX + 25) + 'px';
}

function getDistance(input) {
    return input * 100 + 300;
}

function getSize(input) {
    return input * 50 + 10;
}

function roundNumber(num, dec) {
    return Math.round(num * (10**dec)) / (10**dec)
}

function convertToCSV(arr) {
    const array = [Object.keys(arr[0])].concat(arr)
  
    return array.map(it => {
      return Object.values(it).toString()
    }).join('\n')
}