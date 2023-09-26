//Basically an on load function
$(function () {
  $('.saveBtn').on('click', function () {   //Controls how clicking the save button works
    var hour = $(this).parent().attr('id');
    var text = $(this).siblings('.description').val();
    localStorage.setItem(hour, JSON.stringify(text));
  });



  function timeTracker() {  //This tracks the current time
  var time = dayjs();
    var timeNow = parseInt(time.format('H'));
    updateTimeBlocks(timeNow);
    console.log(timeNow);
    $('#time').val(timeNow).change();
  }

  //I have extracted this so that I can manually manipulate the time for testing purposes
  function updateTimeBlocks(timeNow)
  {
    // loop over time blocks
    $('.time-block').each(function () {
      var blockTime = parseInt($(this).attr('id').split('-')[1]);

      // check if we've moved past this time and applies the appropriate class which controls color
      //Note, for the dev time picker I had to add code to remove classes so the color would change
      if (blockTime < timeNow) {
        $(this).addClass('past');
        $(this).removeClass('present');
        $(this).removeClass('future');
      } else if (blockTime === timeNow) {
        $(this).removeClass('past');
        $(this).addClass('present');
        $(this).removeClass('future');
      } else if (blockTime > timeNow) {
        $(this).removeClass('past');
        $(this).removeClass('present');
        $(this).addClass('future');
      } else if (blockTime === NaN) {
        //do nothing.  Added this to cover NaN errors I received after adding dev time picker
      }
    });
  }

  function getLocalStorage() {
    // loop over time blocks
    $('.time-block').each(function () {
      var blockTime = $(this).attr('id');
      var text = localStorage.getItem(blockTime);

      if (text !== null) {
        $(this).children('.description').val(JSON.parse(text)); //Sets the test per ID from localstorage
      }
    });
  }

  $('#time').on('change', function () {   //added dev ability to override the actual time from the system clock
    console.log(parseInt($(this).val()));
    updateTimeBlocks(parseInt($(this).val()));
  });

  //This initiates all the above code
  getLocalStorage();
  timeTracker();

  //updates the time every minute and makes changes to the color of the time blocks
  oneMinuteUpdates = setInterval(timeTracker, 60000);


});
