$(function () {

  $("#search").keyup(function () {
    var search_term = $(this).val();
    $.ajax({
      method: "post",
      url: "/api/search",
      data: {
        search_term
      },
      dataType: 'json',
      success: function (json) {
        var data = json.hits.hits.map(function (hit) {
          return hit;
        });
        console.log(data);
        $('#searchResults').empty();
        var html = "";
        for (var i = 0; i < data.length; i++) {
          html =
            '<div class="col-md-4">\n  ' +
            '<a href="/product/' + data[i]._id + '">\n    ' +
            '<div class="thumbnail">\n      ' +
            '<img src="' + data[i]._source.image + '">\n      ' +
            '<div class="caption">\n        ' +
            '<h3>' + data[i]._source.name + '</h3>\n        ' +
            '<p>' + data[i]._source.category.name + '</p>\n        ' +
            '<p>' + data[i]._source.price + '</p>\n      ' +
            '</div>\n' +
            '</div>\n' +
            '</a>\n' +
            '</div>';

          $('#searchResults').append(html);
        }

      },
      error: function (err) {
        console.log(err)
      }
    })
  })
});