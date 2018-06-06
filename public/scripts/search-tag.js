$(document).ready(function() {
  $("#tag.form-control").keypress(function (event) {
    if (event.which == 13) {
    var tag = $(this).val();
    $.ajax({
        method: "GET",
        url: "/api/tagQueries",
        data: { tag: tag },
        success: function (data) {
          console.log(data)
          window.location.href = `/api/tagQueries?tag=${tag}`
        }
    });
   }
  })
})