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
  var ticketsAPI = "https://getbeyondwords.com/api/tickets?member=" + member;
  $.getJSON(ticketsAPI)
  .done(function( data ) {
    var timeTotal = 0;
    var thisMonthsTime = 0;
    var lastMonthsTime = 0;
    var monthBeforeLastMonthsTime = 0;
    for (i = 0; i < data.length; i++) {
      var monthCreated = Number(data[i].created);
      var monthCreatedInt = monthCreated - 1;
      if (monthCreatedInt == d.getMonth()) {
        var hours = Number(data[i].field_billable_hours);
        timeTotal = timeTotal + hours;
        thisMonthsTime = thisMonthsTime + hours;
      }
      else if (monthCreatedInt == d.getMonth() - 1) {
        var hours = Number(data[i].field_billable_hours);
        timeTotal = timeTotal + hours;
        lastMonthsTime = lastMonthsTime + hours;
      }
      else if (monthCreatedInt == d.getMonth() - 2) {
        var hours = Number(data[i].field_billable_hours);
        timeTotal = timeTotal + hours;
        monthBeforeLastMonthsTime = monthBeforeLastMonthsTime + hours;
      }
    }
    $( "#total-hours" ).append("<p class='lead'>We've spent <strong>" + timeTotal + "</strong> billable hours supporting <strong>" + data.length + "</strong> tickets for <strong>" + member + "</strong> this month!</p>");
    $( "#total-hours" ).append("<h1>" + thisMonth + thisMonthsTime + lastMonth + lastMonthsTime + monthBeforeLastMonth + monthBeforeLastMonthsTime + "</h1>");
  });
};

getTickets();
