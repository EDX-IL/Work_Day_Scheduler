let timeblocksEl = $("#timeblock");
let currentDayEl = $("#currentDay");
let timeblocksContainerEl = $(".container");

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
  let sbStartHour = 9;
  let sbEndHour = 17;

  //add timeblocks to timeblockContainerEL
  for (let index = sbStartHour; index <= sbEndHour; index++) {
    //console.log("hour:"+index)
    //add timeblocks for each hour here
    //variable for storing am/pm Time
    let ampmTime = 0;
    //TODO structure for timeblocks
    let newTB = $("<p>");
    newTB.addClass('time-block');
    newTB.addClass('row');
    newTB.addClass('hour');

    //convert index to am/pm time
    if (index <13){
       ampmTime = (index+"am");
    }
    else {
      ampmTime = ((index -12)+"pm");  
    }

    newTB.text(ampmTime);
    timeblocksContainerEl.append(newTB);
    console.log("timeblocksContainerEl:" + timeblocksContainerEl);
  }
}

//function to colour timeblocks based on current time and whether time block is past, present, future
//past, present and future have css classes
function fncColourTimeBlocks() {
  console.log(getFuncName());
}

//function to enter event and save to local storage
function fncAddEvent() {
  console.log(getFuncName());


}

//function to save event to local storage
function fncSaveEvent() {
  console.log(getFuncName());
}
