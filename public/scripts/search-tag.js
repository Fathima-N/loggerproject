$(document).ready(function() {
  $("#tag.form-control").keypress(function (event) {
    if (event.which == 13) {
    $("tbody").empty();
    var tag = $(this).val();
    $.ajax({
        method: "GET",
        url: "/api/tagQueries",
        data: { tag: tag },
        success: function (data) {
          tagResults(data)
        }
    });
   }
  })
})


function tagResults(data) {
    let $tag = data.map(message => {
      console.log(message)
      let $result = 
        `<tr class="table-light">
        <td>${message.severity}</td>
        <td>${message.created_at}</td>
        <td>${message.server_name}</td>
        <td>${message.message}</td>
        <td>${message.tag}</td>            
      </tr>`
      return $result;
    })
    $("tbody").append($tag)
}