// Update the current slider value (each time you drag the slider handle)
rangeDist.oninput = function() {
    distPX = getDistance(this.value)
    index = Math.log(2*distPX/sizePX)
    updateParamCM()
    updateUILabels()
    setTargetPositions()
    setValidRegion()
}
rangeSize.oninput = function() {
    sizePX = getSize(this.value)
    index = Math.log(2*distPX/sizePX)
    updateParamCM()
    updateUILabels()
    setTargetSize()
    setValidRegion()
}