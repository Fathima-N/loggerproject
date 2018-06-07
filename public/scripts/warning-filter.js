$(document).ready(function(){
   $("#warning").click(function(event) {
    $("tbody").empty();
    $.ajax({
    	method: "GET",
    	url: "/api/warning",
    	success: function(data) {
    		warningResults(data)
    	}
    })
  }); 

});

function warningResults(data) {
   let $warning = data.map(message => {
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

  $("tbody").append($warning)
}
