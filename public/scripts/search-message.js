$(document).ready(function() {
  $("#message.form-control").keypress(function (event) {
    $("tbody").empty();
    if (event.which == 13) {
    var message = $(this).val();
    console.log(message)
    $.ajax({
        method: "GET",
        url: "/api/messageQueries",
        data: { message: message },
        success: function (data) {
          messageResults(data)          
        }
    });
   }
  })
})

function messageResults(data) {
    let $message = data.map(message => {
      console.log(message)
      let $result = 
        `<tr class="table-light">
        <td>${message.severity}</td>
        <td>${message.created_at}</td>
        <td>${message.server_name}</td>
        <td>${message.message}</td>
        <td>${message.tag}</td>            
      </tr>`
      return $result;
    })
    $("tbody").append($message)
}