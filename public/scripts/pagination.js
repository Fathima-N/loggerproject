$(document).ready(function() {
    $.ajax({
      method: "GET",
      url: `/api/all`,
      success: function (data) {
        pageNumbers(data)

        $(".page-link").click(function (event) {
          var offset = $(this).attr('data-offset')
          var limit = $(this).attr('data-limit')
          $.ajax({
              method: "GET",
              url: `/api/logs`,
              data: { 
                offset: offset,
                limit: limit },
              success: function (data) {
                results(data)
              }
          });
        });
      }
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
};


function pageNumbers(data) {
  let limit = 10;
  let totalRows = Math.ceil(data.length / limit)
  for (i = 0; i < totalRows; i++) {
    var $pageButton = 
    `<li class="page-item"><a class="page-link" tabindex="-1" data-offset="${i * limit}" data-limit="10">${i + 1}</a></li>`
  $(".pagination-lg").append($pageButton)
  };
};
