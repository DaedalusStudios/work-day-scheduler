// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  $('.saveBtn').on('click', function () {   //Controls how clicking the save button works
    var hour = $(this).parent().attr('id');
    var text = $(this).siblings('.description').val();
    localStorage.setItem(hour, JSON.stringify(text));
  });

  function timeTracker() {  //This tracks the current time
  var time = dayjs();
    var timeNow = parseInt(time.format('H'));

    // loop over time blocks
    $('.time-block').each(function () {
      var blockTime = parseInt($(this).attr('id').split('-')[1]);

      // check if we've moved past this time and applies the appropriate class which controls color
      if (blockTime < timeNow) {
        $(this).addClass('past');
      } else if (blockTime === timeNow) {
        $(this).removeClass('past');
        $(this).addClass('present');
      } else {
        $(this).removeClass('past');
        $(this).removeClass('present');
        $(this).addClass('future');
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


//This initiates all the above code
  getLocalStorage();
  timeTracker();


});
