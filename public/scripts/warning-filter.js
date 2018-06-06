$(document).ready(function(){
   $("#warning").click(function(event) {
    $.ajax({
    	method: "GET",
    	url: "/api/warning",
    	success: function(data) {
    		window.location.href = data;
    	}
    })
  });

});