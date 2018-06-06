// $(() => {
//  $.ajax({
//         method: "POST",
//         url: "/api/data",
//         data: data,
//         success: function () {
//        }
//   });
// });

/*THIS IS FOR REGISTRATION */
// $(document).ready(function() {
//   $("form").submit(function(event) {
//     event.preventDefault();
//     console.log($("#company").val());
//   	// var message = $("#hello").val();
//   	var company = $("#company").val();
//   	var email = $("#email").val();
//   	var password = $("#password").val();
//   	$.ajax({
//       	method: "POST",
//       	url: "/register/:user",
//       	// data: {company: company, email: email, password: password, tag: tag, token: token},
//       	success: function (data) {
//           /* 'registrationSuccess' comes from the 'register' route. */
//       		window.location.href = data
//      	  }
//   	});
// 	})
// })


/*THIS IS FOR LOGIN */

$(document).ready(function() {
  $("form").submit(function(event) {
    event.preventDefault();
    var email = $("#email").val();
    var password = $("#password").val();
    $.ajax({
        method: "POST",
        url: "/login/:id",
        data: { email: email, password: password },
        success: function (data) {
          /* 'registrationSuccess' comes from the 'register' route. */
          window.location.href = data
        }
    });
  })
})




