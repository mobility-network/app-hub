inputCal.onchange = function() {
    if (this.value==="" || this.value==="0") {
        this.value = lengthPX;
    }
    lengthCM = this.value;
    updateParamCM()
    updateUILabels()
}