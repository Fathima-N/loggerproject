$(document).ready(function(){
	// $("window").load(function(event) {
    
    let page1=$(this)
    console.log(page1)

	    $.ajax({
	    	method: "GET",
	    	url: "/",
	    	success: function(data) {
	        window.location.href = data
	    	}
	    })
	// })
});


