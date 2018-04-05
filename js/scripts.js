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
    for (i = 0; i < data.length; i++) {
      var hours = Number(data[i].field_billable_hours);
      timeTotal = timeTotal + hours;
    }
    $( "#total-hours" ).append("<p class='lead'>We've spent <strong>" + timeTotal + "</strong> hours supporting <strong>" + data.length + "</strong> tickets for <strong>" + member + "</strong> this month!</p>");
  });
};

getTickets();
