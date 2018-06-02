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

// var data = {input_severity: "warning", server_name: "heroku", message: "testing from postman"}

$(() => {
 $.ajax({
        method: "POST",
        url: "/api/data",
        data: data,
        success: function () {
          // logEvent(event);
       }
  });
});


// $(document).ready(function() {
//     var data = {input_severity: "warning", server_name: "heroku", message: "testing from postman"}

//     //if input matches any levels, replace input_severity key and value 

//     if (data.input_severity == "warning") {
//       console.log('matches!')
//     }

//     $.ajax({
//         method: "POST",
//         url: "/api/data",
//         data: "data=" + data,
//         // "companydata=" + companydata,
//         // "message=" is different from message: message -> latter is a JSON object; in this case, I'm requiring bodyparser and converting the URL encoded message. That's why it looks like this. 
//         success: function () {
//           // logEvent(event);
//        }
//     });
//   })
