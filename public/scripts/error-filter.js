$(document).ready(function(){
   $("#error").click(function(event) {
    $.ajax({
        method: "GET",
        url: "/api/error",
        success: function(data) {
            errorResults(data)
        }
    })
  }); 

});

function errorResults(data) {
    $("tbody").empty();
    let $error = data.map(message => {
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

    $("tbody").append($error)
}
