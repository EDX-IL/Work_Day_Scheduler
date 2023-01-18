let timeblocksEl = $('#timeblocks');

//on page load DoPlanner function to set up page
$(window).on("load", fncDoPlanner());

//On User Click on TimeBlock, run Enter Event and Save to Local Storage
timeblocksEl.on('click', fncAddEvent());


//this function runs on page load
function fncDoPlanner() {
  console.log(getFuncName());

  //display the current day at the top of the calendar
  fncDisplayCurrentDay();

  //display timeblock for standard business hours
  fncDisplayTimeBlocksForDay();

  //colour code each timeblock based on past, present, future
  fncColourTimeBlocks();
}

//Function to Display Current Day
function fncDisplayCurrentDay() {
  console.log(getFuncName());
}

//Function to display timeblocks for standard business hours
function fncDisplayTimeBlocksForDay() {
  console.log(getFuncName());
}

//function to colour timeblocks based on current time and whether time block is past, present, future
//past = red
//present = yellow
// future = green
function fncColourTimeBlocks() {
  console.log(getFuncName());
}


//function to enter event and save to local storage
function fncAddEvent(){
    console.log(getFuncName());

    fncSaveEvent();



}

//function to save event to local storage
function fncSaveEvent(){
    console.log(getFuncName());


}