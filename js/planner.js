let timeblocksEl = $("#timeblock");
let currentDayEl = $("#currentDay");
let timeblocksContainerEl = $(".container");
let sbStartHour = 9; //0900
let sbEndHour =17; //1700

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

  fncCheckStartAndEndHours();


  if (sbStartHour > sbEndHour){
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
    //console.log("hour:"+index)
    //add timeblocks for each hour here
    //variable for storing am/pm Time
    let amPmTime = 0;
    //variable to hold timeblockHTML
    let timeBlockHTML = "";
    //TODO structure/html for timeblocks
    let newTB = $("<row>");
    newTB.addClass("time-block");
    newTB.addClass("row");
    newTB.addClass("hour");
    newTB.attr("data-hour", index);

    //convert index to am/pm time
    if (index == 0) {
      amPmTime = index +12 + "am";
    } else if (index < 13) {
      amPmTime = index + "am";
    } else {
      amPmTime = index - 12 + "pm";
    }



   amPmTime;

   


 



    console.log(amPmTime);
    newTB.text(amPmTime);
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
    console.log($("#data-hour",index));


   //$("#data-hour",index).css('background-color','red');
  //ToDo - rather than row...select using ID data-hour
  $(".row").addClass("past");
  $(".row").addClass("present");
  $(".row").addClass("future");
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

//function to check start and end hours
function fncCheckStartAndEndHours(){
  console.log(getFuncName());
//check start and end hours 
if (sbStartHour > sbEndHour){
  sbStartHour = sbEndHour;
}
if (sbStartHour < 0) {
  sbStartHour = 0;
}
if (sbStartHour > 24 ) {
  sbStartHour = 24;
}
if (sbEndHour < 0) {
  sbEndHour = 0;
}
if (sbEndHour > 24 ) {
  sbEndHour = 24;
}



}