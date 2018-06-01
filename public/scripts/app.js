// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });

$(document).ready(function() {
  $("form").submit(function(event) {
    event.preventDefault();
    console.log($("#hello").val())
    //need to specify the ID to log the data, otherwise I'd be logging anything
  	var message = $("#hello").val();
  	$.ajax({
      	method: "POST",
      	url: "/api/data",
      	data: "message=" + message,
        // "message=" is different from message: message -> latter is a JSON object; in this case, I'm requiring bodyparser and converting the URL encoded message. That's why it looks like this. 
      	success: function () {
      		console.log('test?')
     	 }
  	});
	})
})

// function loadMessage() {
// 	$.ajax({
// 		type: "GET",
// 		url: "/api/data",
// 		success: function (data) {
// 			console.log(data)
// 		}
// 	})
// }

