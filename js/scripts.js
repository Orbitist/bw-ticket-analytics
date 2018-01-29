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
      var minutes = parseInt(data[i].field_minutes);
      timeTotal = timeTotal + minutes;
    }
    var timeHours = Number((timeTotal / 60).toFixed(2));
    $( "#total-hours" ).append("<p class='lead'><strong>" + timeHours + "</strong> Hours supporting " + member + " this month.</p>");
  });
};

getTickets();