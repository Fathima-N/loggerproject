$(document).ready(function(){
   $("#all").click(function(event) {
    $.ajax({
    	method: "GET",
    	url: "/",
    	success: function(data) {
    		window.location.href = data;
    	}
    })
  });
});