$(document).ready(function() {
  $(".page-link").click(function (event) {
    var offset = $(this).attr('data-offset')
    var limit = $(this).attr('data-limit')

    $.ajax({
        method: "GET",
        url: `/api/logs`,
        // url: `/api/serverQueries?server=${server}`,
        data: { 
          // page: page,
          offset: offset,
          limit: limit },
        success: function (data) {
          results(data)
        }
    });
  });
});


function results(data) {
    $("tbody").empty();
    let $page = data.map(message => {
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
    $("tbody").append($page)
}
