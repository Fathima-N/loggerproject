$(document).ready(function(){
   $("#newest").click(function(event) {
    $.ajax({
    	method: "GET",
    	url: "/api/newest",
    	success: function(data) {
    		window.location.href = data;
    	}
    })
  });
});