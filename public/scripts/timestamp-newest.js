$(document).ready(function(){
   $("#newest").click(function(event) {
    $.ajax({
    	method: "GET",
    	url: "/api/newest",
    	success: function(data) {
    		newestResults(data)
    	}
    })
  });
});


function newestResults(data) {
   	$("tbody").empty();
    let $newest = data.map(message => {
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
    $("tbody").append($newest)
}
