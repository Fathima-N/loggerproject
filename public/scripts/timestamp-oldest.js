$(document).ready(function(){
   $("#oldest").click(function(event) {
   	$("tbody").empty();
    $.ajax({
    	method: "GET",
    	url: "/api/oldest",
    	success: function(data) {
    		oldestResults(data)
    	}
    })
  });
});


function oldestResults(data) {
    let $oldest = data.map(message => {
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
    $("tbody").append($oldest)
}
