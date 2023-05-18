//target current day p element
var dayDisplay = $("#currentDay");
var today = moment().format("dddd, MMM Do");
dayDisplay.text(today);