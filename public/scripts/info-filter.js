$(document).ready(function(){
   $("#info").click(function(event) {
    $.ajax({
    	method: "GET",
    	url: "/api/info",
    	success: function(data) {
    		infoResults(data);
    	}
    })
  });
});


function infoResults(data) {
   	$("tbody").empty();
    let $info = data.map(message => {
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
    $("tbody").append($info)
}
