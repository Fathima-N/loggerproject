$(document).ready(function() {
  $("#server.form-control").keypress(function (event) {
    if (event.which == 13) {
    $("tbody").empty();
    var server = $(this).val();
    console.log(server)
    $.ajax({
        method: "GET",
        url: "/api/serverQueries",
        // url: `/api/serverQueries?server=${server}`,
        data: { server: server },
        success: function (data) {
          searchResults(data)
        }
    });
   }
  })
})


function searchResults(data) {
    let $search = data.map(message => {
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
    $("tbody").append($search)
}