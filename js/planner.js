//planner.js

let currentDayEl = $("#currentDay");
let timeblocksContainerEl = $(".container");

// boolean function to store whether user is current inside/editing Event Text
let blnInsideEventBox = false;

// two variables to store the start and end hours. They are in HH from 24 hour format.
let sbStartHour = 9; //0900
let sbEndHour = 17; //1700

//on page load call DoPlanner function to set up page
$(window).on("load", fncDoPlanner());

//this function runs on page load
function fncDoPlanner() {
  //call function display the current day at the top of the calendar
  fncDisplayCurrentDay();

  //call function to display time blocks for standard business hours
  fncDisplayTimeBlocksForDay();

  //call function colour code each time block based on past, present, future
  fncColourTimeBlocks();

  //call function to load events from local storage
  fncLoadSavedEvents();

  //Once page loaded add click listener for Save Button and Event Data box

  //Event Data box on click listener
  let eventDataEl = $(".eventData");
  eventDataEl.on("click", function (event) {
    fncAddEvent(event);
  });

  //function to enter event info (no auto save)
  function fncAddEvent(event) {
    //if we are inside the textarea - don't log clicks as it adds extra html.
    // use global variable blnInsideEventBox = false;

    let currentText = $(event.target).text();

    if (!blnInsideEventBox) {
      $(event.target).html(
        '<textarea class="form-control" id="newcont" rows="2">' +
          currentText +
          "</textarea>"
      );
    }
    //we are now inside the box
    blnInsideEventBox = true;

    $("#newcont").focus();

    $("#newcont")
      .focus(function () {})
      .blur(function () {
        var newcont = $("#newcont").val();
        $(event.target).text(newcont);
        blnInsideEventBox = false;
      });
  }

  // add on click event listener on the save button
  // Pass event through to function SaveEvent to know which particular save button was clicked so the corresponding event data can be saved
  let saveBtnEl = $(".saveBtn");
  saveBtnEl.on("click", function (event) {
    fncSaveEvent(event);
  });
}

//Function to Display Current Day
function fncDisplayCurrentDay() {
  //call function to check that the start and end hours are between 0 to 24, and start hours is not more than end hours and corrects them if not
  fncCheckStartAndEndHours();

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  let currentDay = new Date();
  //I did this before learning about moment library. I've used moment in fncColourTimeBlocks  - please don't mark me down! :)
  currentDayEl.text(currentDay.toLocaleDateString("en-UK", options));
}

//Function to display time blocks for standard business hours
function fncDisplayTimeBlocksForDay() {
  //loop from start to end time and add time blocks for each hour
  for (let index = sbStartHour; index <= sbEndHour; index++) {
    //variable for storing am/pm Time
    let amPmTime = 0;
    let newRow = $("<div>");
    newRow.addClass("time-block row");
    newRow.attr("data-row", index);

    if (index == 0) {
      amPmTime = index + 12 + "am";
    } else if (index < 13) {
      amPmTime = index + "am";
    } else {
      amPmTime = index - 12 + "pm";
    }
    //Hour Column
    let newHour = $("<div>");
    newHour.addClass("col-1 hour");
    newHour.attr("data-hour", index);
    newHour.text(amPmTime);
    newRow.append(newHour);

    //Event Column
    let newEvent = $("<text>");
    newEvent.addClass("col-10 eventData");
    newEvent.attr("data-event", index);
    newRow.append(newEvent);

    //Save Column
    let newSave = $("<button>");
    newSave.addClass("col-1 saveBtn");
    newSave.attr("data-save", index);
    newRow.append(newSave);

    timeblocksContainerEl.append(newRow);

    //REDUNDANT HTML THAT I USED INITIALLY - LEAVING AS WORKING
    // let rowHTML = '<row class="time-block row hour" id=temp-block data-row="'+ index +'">';
    // let divHourHtml =
    //   '<div class="col-1" data-hour=' + index + "> " + amPmTime + " </div>";
    // let eventHTML = '<text class="col-10" data-event="'+index +'">' + "test" + "</text>";
    // let saveHTML =
    //   '<button type=button class="col-1 savebutton" data-save="'+ index +'"> Save </button>';
    // let endRowHTML = "</row";

    // let totalHTML = rowHTML + divHourHtml + eventHTML + saveHTML + endRowHTML;

    //timeblocksContainerEl.append(totalHTML);
  }
}

//function to colour time blocks based on current time and whether time block is past, present, future
//past, present and future are css classes
function fncColourTimeBlocks() {
  //loop through standard business hours (set at top)
  //use data-row id to set the color
  for (let index = sbStartHour; index <= sbEndHour; index++) {
    //hourIndex is the 24hr number of current hour
    let hourIndex = parseInt(moment().format("kk"));

    //Past
    if (index < hourIndex) {
      $(`.row[data-row=${index}]`).addClass("past");
    }
    //Present
    else if (index == hourIndex) {
      $(`.row[data-row=${index}]`).addClass("present");
    }
    //Future
    else {
      $(`.row[data-row=${index}]`).addClass("future");
    }
  }
}

//function to save event to local storage (could be done in one line but split out for readability)
function fncSaveEvent(event) {
  //use which save button was pressed (data-save) as the key for localstorage
  let localStorageKey = $(event.target).data("save");
  //use the button that was pressed (localStorageKey) to get data/text from same row data-event
  let eventData = $(`[data-event=${localStorageKey}]`).text();
  //save above 2 to localstorage
  localStorage.setItem(localStorageKey, eventData);
}

//function to load Events from local storage.
function fncLoadSavedEvents() {
  for (let index = sbStartHour; index <= sbEndHour; index++) {
    $(`[data-event=${index}]`).text(localStorage.getItem(index));
  }
}

//function to check start and end hours
function fncCheckStartAndEndHours() {
  //check for minus start hour and set to 0 if minus
  if (sbStartHour < 0) {
    sbStartHour = 0;
  }

  ///check for start hour greater than 24 and set to 24 if greater than 24
  if (sbStartHour > 24) {
    sbStartHour = 24;
  }

  //check for minus end hour and set to 0 if minus
  if (sbEndHour < 0) {
    sbEndHour = 0;
  }

  ///check for end hour greater than 24 and set to 24 if greater than 24
  if (sbEndHour > 24) {
    sbEndHour = 24;
  }

  //check start isn't after end hours otherwise set them equal
  if (sbStartHour > sbEndHour) {
    sbStartHour = sbEndHour;
  }
}
