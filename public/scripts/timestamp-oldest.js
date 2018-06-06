$(document).ready(function(){
   $("#oldest").click(function(event) {
    $.ajax({
    	method: "GET",
    	url: "/api/oldest",
    	success: function(data) {
    		window.location.href = data;
    	}
    })
  });
});