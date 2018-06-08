
$(document).ready(function() {


  // $("form").submit(function(event) {
  //   event.preventDefault();
  //   var email = $("#email").val();
  //   var password = $("#password").val();
  //   $.ajax({
  //       method: "POST",
  //       url: "/login/:id",
  //       data: { email: email, password: password },
  //       success: function (data) {
  //         /* 'registrationSuccess' comes from the 'register' route. */
  //         window.location.href = data
  //       }
  //   });
  // })



  $(".form-signin").submit(function(event) {
    event.preventDefault();
    var token = $("#token").val();
    console.log(token)
    $.ajax({
        method: "POST",
        url: "/login",
        data: { token: token },
        success: function (data) {
          /* 'registrationSuccess' comes from the 'register' route. */
          window.location.href = data
        }
    });
  })


})

// function showLogin() {
// 	let $login = 
// 	`<p>Login below</p>
//     <form action="submit" method="post">
//       <div>
//         <input type="email" id="email" placeholder="email" value="bob@bob.com">
//         <input type="password" id="password" placeholder="password" value="123456">
//         <input type="submit">
//       </div>
//     </form>`
//     $("body").append($login)
// }



