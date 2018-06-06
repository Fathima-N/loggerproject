$(document).ready(function(){
   $("#info").click(function(event) {
    $.ajax({
    	method: "GET",
    	url: "/api/info",
    	success: function(data) {
    		window.location.href = data;
    	}
    })
  });
});