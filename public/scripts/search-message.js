$(document).ready(function() {
  $("#message.form-control").keypress(function (event) {
    if (event.which == 13) {
    var message = $(this).val();
    console.log(message)
    $.ajax({
        method: "GET",
        url: "/api/messageQueries",
        data: { message: message },
        success: function (data) {
          console.log(data)
          
        }
    });
   }
  })
})