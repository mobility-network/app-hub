target1.onmouseenter = function() {
    console.log('hit')
    if (activeTar===1 && record) {
        target1.classList.remove('active')
        target2.classList.add('active')
        activeTar = 2
        score++
        scoreValid++;
        updateUILabels()
        toggleScore(true)
    }
}

target2.onmouseenter = function() {
    if (activeTar===2 && record) {
        target1.classList.add('active')
        target2.classList.remove('active')
        activeTar = 1
        score++
        scoreValid++;
        updateUILabels()
        toggleScore(true)
    }
}

regionInvalid.onmouseenter = function() {
    if (record) {
        score = score - 5;
        scoreInvalid++;
        toggleScore(false)
    }
    updateUILabels()
}

function toggleScore(valid) {
    if (valid) {
        txtScore.innerHTML = "+1";
        txtScore.classList.remove('invalid')
        txtScore.classList.add('valid')
    } else {
        txtScore.innerHTML = "-5";
        txtScore.classList.remove('valid')
        txtScore.classList.add('invalid')
    }
    if (record) {
        jQuery(txtScore).stop(true, true).fadeTo(100, 1)
        jQuery(txtScore).stop(true, true).fadeTo(1000, 0)
    }
}