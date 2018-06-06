$(document).ready(function() {
  $("#server.form-control").keypress(function (event) {
  	if (event.which == 13) {
    var server = $(this).val();
    console.log(server)
    $.ajax({
        method: "GET",
        url: "/api/serverQueries",
        // url: `/api/serverQueries?server=${server}`,
        data: { server: server },
        success: function (data) {
          console.log(data)
          window.location.href = `/api/serverQueries?server=${server}`
        }
    });
   }
  })
})