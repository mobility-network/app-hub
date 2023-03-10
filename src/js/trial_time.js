inputTime.onchange = function() {
    if (this.value==="" || this.value<="0") {
        this.value = 10;
    }
    timeLimitPlay = Math.round(this.value);
}