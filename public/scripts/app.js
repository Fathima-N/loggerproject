// $(() => {
//  $.ajax({
//         method: "POST",
//         url: "/api/data",
//         data: data,
//         success: function () {
//        }
//   });
// });


$(document).ready(function() {
  $("form").submit(function(event) {
    event.preventDefault();
    console.log($("#company").val());
  	// var message = $("#hello").val();
  	var company = $("#company").val();
  	var email = $("#email").val();
  	var password = $("#password").val();
  	console.log(company)
  	$.ajax({
      	method: "POST",
      	url: "/register/:user",
      	data: {company: company, email: email, password: password},
      	success: function () {
      		console.log('test?')
     	 }
  	});
	})
})

