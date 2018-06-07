var d = new Date();
var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";

var thisMonth = month[d.getMonth()];
var lastMonth = month[d.getMonth() - 1];
var monthBeforeLastMonth = month[d.getMonth() - 2];

// Get member from the URL query string
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
var member = getUrlVars()["member"];

// Get tickets
function getTickets() {
  var ticketsAPI = "https://getbeyondwords.com/api/tickets/partner?member=" + member;
  $.getJSON(ticketsAPI)
  .done(function( data ) {
    var timeTotal = 0;
    var thisMonthsTime = 0;
    var lastMonthsTime = 0;
    var monthBeforeLastMonthsTime = 0;
    var todayTime = 0;
    var todayDate = new Date();
    for (i = 0; i < data.length; i++) {
      var date = Number(data[i].day);
      var month = Number(data[i].month);
      var hours = Number(data[i].hours);
      if (date == todayDate.getDate() && month == todayDate.getMonth()) {
        todayTime = todayTime + hours;
      }
    }
    for (i = 0; i < data.length; i++) {
      var monthCreated = Number(data[i].month);
      var monthCreatedInt = monthCreated - 1;
      if (monthCreatedInt == d.getMonth()) {
        var hours = Number(data[i].hours);
        timeTotal = timeTotal + hours;
        thisMonthsTime = thisMonthsTime + hours;
      }
      else if (monthCreatedInt == d.getMonth() - 1) {
        var hours = Number(data[i].hours);
        timeTotal = timeTotal + hours;
        lastMonthsTime = lastMonthsTime + hours;
      }
      else if (monthCreatedInt == d.getMonth() - 2) {
        var hours = Number(data[i].hours);
        timeTotal = timeTotal + hours;
        monthBeforeLastMonthsTime = monthBeforeLastMonthsTime + hours;
      }
    }

    var movingAverage = ((thisMonthsTime + lastMonthsTime + monthBeforeLastMonthsTime)/3).toFixed(2);

    $( "#total-hours" ).append("<h1>Today's Total: <strong>$" + (todayTime * 20) + " dollars</strong>");
    $( "#total-hours" ).append("<p class='lead'>You've made <strong>$" + (timeTotal * 20) + " dollars</strong> supporting <strong>" + data.length + "</strong> tickets in the last three months.");
    $( "#total-hours" ).append("<h1>" + monthBeforeLastMonth + ": $" + (monthBeforeLastMonthsTime * 20) + " dollars<br>" + lastMonth + ": $" + (lastMonthsTime * 20) + " Dollars<br>" + thisMonth + ": $" + (thisMonthsTime * 20) + " Dollars</h1>");
  });
};

getTickets();
