// Display the current day at the top of the calendar when a user opens the planner.
//target current day p element
var dayDisplay = $("#currentDay");
//store todays date into variable
var today = moment().format("dddd, MMM Do");
//display date in current day element
dayDisplay.text(today);

// Present timeblocks for standard business hours when the user scrolls down.
//create table dynamically
//create table and append to div
var container = $(".container");
var table = $("<table>").attr("class", "table");
var tableBody = $("<tbody>").attr("class", "time-block");

//create 3 data cells and append to table row
var cell = $("<tr>");

//create array of office hours
var timeArray = [9, 10, 11, 12, 13, 14, 15, 16]

for (let i = 0; i < timeArray.length; i++) {
//create rows using office hours 9AM - 5PM, append to table
var row = $("<tr>").attr("class", "row");


var inputField = $("<input>").attr("type", "text");
inputField.attr("class", "input");
var saveButton = $("<button>").attr("class", "saveBtn fa fa-save");
//create cell for time
var timeCell = $("<td>").attr("class", "hour");
//set text of time cell to array[i]
timeCell.text(moment(timeArray[i],'H').format('hA'));
//create cell for input
var inputCell = $("<td>").attr("contentEditable","true");
//add input field into input cell
// inputField.appendTo(inputCell);
//create cell for save button
var saveCell = $("<td>");
//add button into save button cell
saveButton.appendTo(saveCell);
timeCell.appendTo(row);
inputCell.appendTo(row);
saveCell.appendTo(row);

row.appendTo(tableBody);

if(moment(timeArray[i],'H').isBetween(moment().subtract(1, 'h'), moment())){
    inputCell.attr("class", "input present");
} else if(moment(timeArray[i],'H').isBefore(moment())) {
    inputCell.attr("class", "input past");
} else if(moment(timeArray[i],'H').isAfter(moment())) {
    inputCell.attr("class", "input future");
}

console.log(moment(timeArray[i],'H').isAfter(currentTime));

}
tableBody.appendTo(table);
table.appendTo(container);
// Color-code each timeblock based on past, present, and future when the timeblock is viewed.
var currentTime = moment('9:00','H:mm');
console.log(currentTime);
// Allow a user to enter an event when they click a timeblock.

// Save the event in local storage when the save button is clicked in that timeblock.

// Persist events between refreshes of a page.

console.log(moment('9','H').format('h:mm A'));