let timeblocksEl = $("#timeblock");
let currentDayEl = $("#currentDay");
let timeblocksContainerEl = $(".container");
let sbStartHour = 9; //0900
let sbEndHour = 17; //1700

//on page load DoPlanner function to set up page
$(window).on("load", fncDoPlanner());

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
}

//Function to Display Current Day
function fncDisplayCurrentDay() {
  console.log(getFuncName());
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  let currentDay = new Date();
  // console.log("currentDay:" + currentDay);
  currentDayEl.text(currentDay.toLocaleDateString("en-UK", options));
}

//Function to display timeblocks for standard business hours
function fncDisplayTimeBlocksForDay() {
  console.log(getFuncName());
 

  //add timeblocks to timeblockContainerEL
  for (let index = sbStartHour; index <= sbEndHour; index++) {
    //console.log("hour:"+index)
    //add timeblocks for each hour here
    //variable for storing am/pm Time
    let ampmTime = 0;
    //variable to hold timeblockHTML
    let timeBlockHTML = "";
    //TODO structure/html for timeblocks
    let newTB = $("<div>");
    newTB.addClass("time-block");
    newTB.addClass("row");
    newTB.addClass("hour");
    newTB.attr('data-hour',index);

    //convert index to am/pm time
    if (index < 13) {
      ampmTime = index + "am";
    } else {
      ampmTime = index - 12 + "pm";
    }

    timeBlockHTML = ampmTime;

    console.log(timeBlockHTML);
    newTB.text(timeBlockHTML);
    timeblocksContainerEl.append(newTB);

   // console.log("timeblocksContainerEl:" + timeblocksContainerEl);
  }
}

//function to colour timeblocks based on current time and whether time block is past, present, future
//past, present and future have css classes
function fncColourTimeBlocks() {
  console.log(getFuncName());

  //loop through standard business hours
  //use data-hour id to set the color
  for (let index = sbStartHour; index <= sbEndHour; index++) {
   // let $datatmp = "#data-hour="+index+""";

  //  $("#data-hour=9").background('red');
    
  }

  
}

//function to enter event and save to local storage
function fncAddEvent() {
  console.log(getFuncName());
}

//function to save event to local storage
function fncSaveEvent() {
  console.log(getFuncName());
}
