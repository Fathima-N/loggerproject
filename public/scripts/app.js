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

// $(document).ready(function() {
//   $("form").submit(function(event) {
//     event.preventDefault();
//     console.log($("#hello").val())
//     //need to specify the ID to log the data, otherwise I'd be logging anything
//   	var message = $("#hello").val();
//   	$.ajax({
//       	method: "POST",
//       	url: "/api/data",
//       	data: "message=" + message,
//         // "message=" is different from message: message -> latter is a JSON object; in this case, I'm requiring bodyparser and converting the URL encoded message. That's why it looks like this. 
//       	success: function () {
//      	 }
//   	});
// 	})
// })

$(document).ready(function() {
  // $("form").submit(function(event) {
  //   event.preventDefault();
  //   console.log($("#hello").val())
  //   //need to specify the ID to log the data, otherwise I'd be logging anything
  //   var message = $("#hello").val();
    var data = {input_severity: "warning", server_name: "heroku", message: "testing from postman"}

    //if input matches any levels, replace input_severity key and value 

    if (data.input_severity == "warning") {
      console.log('matches!')
    }

    $.ajax({
        method: "POST",
        url: "/api/data",
        data: "data=" + data,
        // "companydata=" + companydata,
        // "message=" is different from message: message -> latter is a JSON object; in this case, I'm requiring bodyparser and converting the URL encoded message. That's why it looks like this. 
        success: function () {
          // logEvent(event);
       }
    });
  })
// })

// function logEvent(event) {
//   console.log(event)
//   $.ajax({
//     method: "POST",
//     url: "/api/data",
//     data: "message=" + message,
//     success: function() {
//       console.log('this event has been logged');
//     }
//   })
// }


//  (function($){

//   $( "button" ).click(function() {
//   $( "p" ).remove();
// });

//   var remove_orig = $.fn.remove;

//   $.fn.remove = function(){
//     alert('Removing ' + this.selector);
//     remove_orig.apply(this, arguments);
//   };
// })(jQuery);
