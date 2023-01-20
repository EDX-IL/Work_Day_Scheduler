//let timeblocksEl = $("#timeblock");
//let tempblockEl = $('#temp-block');
let currentDayEl = $("#currentDay");
let timeblocksContainerEl = $(".container");

//TODO-remove console.logs

let sbStartHour = 9; //0900
let sbEndHour = 17; //1700

//on page load DoPlanner function to set up page
$(window).on("load", fncDoPlanner());
let timeblocksEl = $(".time-block");

//On User Click on TimeBlock, run Enter Event and Save to Local Storage
timeblocksEl.on("click", fncAddEvent());

//this function runs on page load
function fncDoPlanner() {
  console.log(getFuncName());

  //display the current day at the top of the calendar
  fncDisplayCurrentDay();

  //display timeblocks for standard business hours
  fncDisplayTimeBlocksForDay();

  //colour code each timeblock based on past, present, future
  fncColourTimeBlocks();

  fncLoadSavedEvents();

  //Once page loaded add listener for Save Button.
  // Pass event through to function SaveEvent to know which save was clicked
  let saveBtnEl = $(".saveBtn");
  saveBtnEl.on("click", function (event) {
    fncSaveEvent(event);
  });
}

//Function to Display Current Day
function fncDisplayCurrentDay() {
  console.log(getFuncName());

  //This function checks that the start and end hours at from 0 to 24 and corrects them if not
  fncCheckStartAndEndHours();

  if (sbStartHour > sbEndHour) {
    sbStartHour = sbEndHour;
  }

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

//Function to display timeblocks for standard business hours
function fncDisplayTimeBlocksForDay() {
  console.log(getFuncName());

  //add timeblocks to timeblockContainerEL
  for (let index = sbStartHour; index <= sbEndHour; index++) {
    //add timeblocks for each hour here

    //variable for storing am/pm Time
    let amPmTime = 0;
    let newRow = $("<div>");
    newRow.addClass("time-block row hour");
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
    newHour.addClass("col-1");
    newHour.attr("data-hour", index);
    newHour.text(amPmTime);

    newRow.append(newHour);

    //Event Column
    let newEvent = $("<text>");
    newEvent.addClass("col-10");
    newEvent.attr("data-event", index);
   // newEvent.text("place holder");

    newRow.append(newEvent);

    //Save Column
    let newSave = $("<button>");
    newSave.addClass("col-1 saveBtn");
    newSave.attr("data-save", index);
    newSave.text("SAVE");

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

//function to colour timeblocks based on current time and whether time block is past, present, future
//past, present and future are css classes
function fncColourTimeBlocks() {
  console.log(getFuncName());

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

//TODO
//function to enter event and save to local storage
function fncAddEvent() {
  console.log(getFuncName());
}

//function to save event to local storage
function fncSaveEvent(event) {
  console.log(getFuncName());
  //use which save button was pressed as key for localstorage
  let localStorageKey = $(event.target).data("save");
  //use the button that was pressed (localStorageKey) to get data/text from same row data-event
  let eventData = $(`[data-event=${localStorageKey}]`).text();
  //save above 2 to localstorage
  localStorage.setItem(localStorageKey, eventData);
}

//TODO
function fncLoadSavedEvents() {
  console.log(getFuncName());
  for (let index = sbStartHour; index <= sbEndHour; index++)  {
 // console.log(index+" "+ localStorage.getItem(index));
 let tempStr =  localStorage.getItem(index)
 console.log("tempStr:"+tempStr+index);
 //console.log( $(`[data-event=${index}]`).text());
  $(`[data-event=${index}]`).text("test"+index);
    
  }
  //$("event-item").text(localStorage.getItem('WhereTheEventItemWasStored'));
}

    //function to check start and end hours
    function fncCheckStartAndEndHours() {
      console.log(getFuncName());
      //check start and end hours
      if (sbStartHour > sbEndHour) {
        sbStartHour = sbEndHour;
      }
      if (sbStartHour < 0) {
        sbStartHour = 0;
      }
      if (sbStartHour > 24) {
        sbStartHour = 24;
      }
      if (sbEndHour < 0) {
        sbEndHour = 0;
      }
      if (sbEndHour > 24) {
        sbEndHour = 24;
      }
    }