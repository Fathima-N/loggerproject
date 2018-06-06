$(document).ready(function(){
   $("#error").click(function(event) {
    $.ajax({
    	method: "GET",
    	url: "/api/error",
    	success: function(data) {
    		console.log(data)
    		window.location.href = data;
    	}
    })
  });
});