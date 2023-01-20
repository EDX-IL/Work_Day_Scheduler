//let timeblocksEl = $("#timeblock");
//let tempblockEl = $('#temp-block');
let currentDayEl = $("#currentDay");
let timeblocksContainerEl = $(".container");

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
}

//Function to Display Current Day
function fncDisplayCurrentDay() {
  console.log(getFuncName());

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
  // console.log("currentDay:" + currentDay);
  //I did this before learning about moment library - please don't mark me down!
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
    //console.log("NewRow:"+newRow);

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
    newEvent.text("place holder");

    newRow.append(newEvent);

    //Save Column
    let newSave = $("<button>");
    newSave.addClass("col-1 saveButton");
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
//past, present and future have css classes
function fncColourTimeBlocks() {
  console.log(getFuncName());

  //loop through standard business hours
  //use data-hour id to set the color
  for (let index = sbStartHour; index <= sbEndHour; index++) {
    // console.log($("#data-hour", index));
    //hourIndex number of current hour
    let hourIndex = parseInt(moment().format("kk"));
    hourIndex = 11;
    //new local variable to store TimeBlock Element
    let colourTimeBlockEl = $(".time-block");

   // console.log(colourTimeBlockEl.attr("data-row", index));
    //console.log(timeblocksEl.dataset.hour);
    //console.log( "timeblock attr: "+timeblocksEl.attributes);
    // console.log ("temp:" + tempblockEl.attributes);

    //TODO Figure out how to read data-row element
    console.log("index:"+index);
    console.log("hourIndex:"+hourIndex);
    //Past
    if (index < hourIndex) {
        $(`.row[data-row=${index}]`).addClass("past");
    }
    // //Present
    else if (index == hourIndex){
      $(`.row[data-row=${index}]`).addClass("present");
    }
     else  {
      $(`.row[data-row=${index}]`).addClass("future");
      }
  }
}

//function to enter event and save to local storage
function fncAddEvent() {
  console.log(getFuncName());
}

//function to save event to local storage
function fncSaveEvent() {
  console.log(getFuncName());
  localStorage.setItem("9a", "something");
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

function fncLoadSavedEvents() {
  console.log(getFuncName());
  //$("event-item").text(localStorage.getItem('WhereTheEventItemWasStored'));
}
