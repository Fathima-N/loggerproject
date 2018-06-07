$(document).ready(function(){
   $("#all").click(function(event) {
    $("tbody").empty();
    $.ajax({
    	method: "GET",
    	url: "/api/all",
    	success: function(data) {
        allResults(data)
    	}
    })
  });
});


function allResults(data) {
    let $all = data.map(message => {
      console.log('hello this is', message)
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
    $("tbody").append($all)
}
