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
timeCell.addClass(moment(timeArray[i],'H').format('hA'));
//set text of time cell to array[i]
timeCell.text(moment(timeArray[i],'H').format('hA'));
//create cell for input
// Allow a user to enter an event when they click a timeblock.
var inputCell = $("<td>").attr("contentEditable","true");
//create cell for save button
var saveCell = $("<td>");
//add button into save button cell
saveButton.appendTo(saveCell);
timeCell.appendTo(row);
inputCell.appendTo(row);
saveCell.appendTo(row);

row.appendTo(tableBody);

// Color-code each timeblock based on past, present, and future when the timeblock is viewed.
if(moment(timeArray[i],'H').isBetween(moment().subtract(59, 'm'), moment())){
    inputCell.attr("class", "input present");
} else if(moment(timeArray[i],'H').isBefore(moment())) {
    inputCell.attr("class", "input past");
} else if(moment(timeArray[i],'H').isAfter(moment())) {
    inputCell.attr("class", "input future");
}

}
tableBody.appendTo(table);
table.appendTo(container);

// Save the event in local storage when the save button is clicked in that timeblock.
$(".saveBtn").on("click", function(event) {
    event.stopPropagation();
    //target the input cell and obtain the value
    var input = $(this).parent().prev().text();
    //target the time for a key in local storage
    var time = $(this).parent().prev().prev().text();
    if(input !== "") {
        if(container.children().length === 2) {
            container.children().eq(0).remove();
            localStorage.setItem(time, input);
            //add a div to confirm information has been saved to local storage
            var confirm = $("<div>").css("text-align","center").attr("class", "confirmation");
            confirm.text(`Appointment added to local storage ✔️`);
            container.prepend(confirm);
        } else {
        localStorage.setItem(time, input);
        //add a div to confirm information has been saved to local storage
        var confirm = $("<div>").css("text-align","center").attr("class", "confirmation");
        confirm.text(`Appointment added to local storage ✔️`);
        container.prepend(confirm);
        }
    }
})
// Persist events between refreshes of a page.

//store times in array
var times = [];

timeArray.forEach(function(currentTime) {
    if(currentTime < 12) {
        times.push(currentTime+"AM");
    } else {
        if(currentTime > 12) {
            currentTime = currentTime - 12;
        }
            times.push(currentTime+"PM");

    }
})

//function that adds the values stored in local storage into table dynamically
for (let i = 0; i < times.length; i++) {
    if(localStorage.getItem(times[i]) !== null) {
        var className = "."+times[i];
        var target = $(className);
        // var target = $(.);
        target.next().text(localStorage.getItem(times[i]));
    }
}