
$(function () {
  Stripe.setPublishableKey('pk_test_Y9vXsgLIz9ykVfhSgsW9PrSj');
  var opts = {
    lines: 17 // The number of lines to draw
    , length: 28 // The length of each line
    , width: 14 // The line thickness
    , radius: 42 // The radius of the inner circle
    , scale: 1 // Scales overall size of the spinner
    , corners: 1 // Corner roundness (0..1)
    , color: '#000' // #rgb or #rrggbb or array of colors
    , opacity: 0.35 // Opacity of the lines
    , rotate: 0 // The rotation offset
    , direction: 1 // 1: clockwise, -1: counterclockwise
    , speed: 1.1 // Rounds per second
    , trail: 100 // Afterglow percentage
    , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
    , zIndex: 2e9 // The z-index (defaults to 2000000000)
    , className: 'spinner' // The CSS class to assign to the spinner
    , top: '46%' // Top position relative to parent
    , left: '50%' // Left position relative to parent
    , shadow: false // Whether to render a shadow
    , hwaccel: false // Whether to use hardware acceleration
    , position: 'absolute' // Element positioning
  }



  $("#search").keyup(function () {
    var search_term = $(this).val();
    //noinspection JSAnnotator
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
            '<div class="col-md-4">\n' +
            '<a href="/product/' + data[i]._id + '">\n' +
            '<div class="thumbnail">\n' +
            '<img src="' + data[i]._source.image + '">\n' +
            '<div class="caption">\n' +
            '<h3>' + data[i]._source.name + '</h3>\n' +
            '<p>' + data[i]._source.category.name + '</p>\n' +
            '<p>' + data[i]._source.price + '</p>\n' +
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


  $(document).on('click', '#plus', function (e) {
    e.preventDefault();
    var priceValue = parseFloat($('#priceValue').val());
    var quantity = parseInt($('#quantity').val());

    priceValue += parseFloat($('#priceHidden').val());
    quantity += 1;
    $('#quantity').val(quantity);
    $('#priceValue').val(priceValue.toFixed(2));
    $('#total').html(quantity);
  }).on('click', '#minus', function (e) {
    e.preventDefault();
    var priceValue = parseFloat($('#priceValue').val());
    var quantity = parseInt($('#quantity').val());
    if (quantity == 1) {
      priceValue = $('#priceHidden').val();
      quantity = 1;
    } else {
      priceValue -= parseFloat($('#priceHidden').val());
      quantity -= 1;
    }
    $('#quantity').val(quantity);
    $('#priceValue').val(priceValue.toFixed(2));
    $('#total').html(quantity);
  });

  function stripeResponseHandler(status, response) {
    // Grab the form:
    var $form = $('#payment-form');

    if (response.error) { // Problem!

      // Show the errors on the form:
      $form.find('.payment-errors').text(response.error.message);
      $form.find('button').prop('disabled', false); // Re-enable submission

    } else { // Token was created!

      // Get the token ID:
      var token = response.id;

      // Insert the token ID into the form so it gets submitted to the server:
      $form.append($('<input type="hidden" name="stripeToken">').val(token));

      //var target = document.getElementById('foo')
      var spinner = new Spinner(opts).spin();
      $('#loading').append(spinner.el);

      // Submit the form:
      $form.get(0).submit();
    }
  };

  var $form = $('#payment-form');
  $form.submit(function (event) {
    // Disable the submit button to prevent repeated clicks:
    $form.find('button').prop('disabled', true);

    // Request a token from Stripe:
    Stripe.card.createToken($form, stripeResponseHandler);

    // Prevent the form from being submitted:
    return false;
  });


});
