$('document').ready(function(){

var offset = 0;
var tags = '';

  $('form').submit(function(event){
    event.preventDefault();
    $('.container').empty();
    tags = '';
    var random = true

    if ($('input[name="random"]:checked', '#search').attr('id') == 'no'){
      random = false;
    }
    if (random){
      var active = $('input[name="gifOrSticker"]:checked', '#search').attr('id');
      if (active == 'gif'){
        var gify = $.ajax({
          url: 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=' + $('#tags').val()
        })
        gify.then(function(search){
          $('.container').append('<img src=' + search.data.fixed_height_downsampled_url + '>');
        })
        $('#tags').val('');
      } else if (active == 'sticker'){
        var gify = $.ajax({
          url: 'http://api.giphy.com/v1/stickers/random?api_key=dc6zaTOxFJmzC&tag=' + $('#tags').val()
        })
        gify.then(function(search){
          $('.container').append('<img src=' + search.data.fixed_height_downsampled_url + '>');
        })
        $('#tags').val('');
      }
    } else {
      //search with 5 per page
      tags = $('#tags').val();
      var active = $('input[name="gifOrSticker"]:checked', '#search').attr('id');
      if (active == 'gif'){
        offset = 0;
        var gify = $.ajax({
          url: 'http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=5&offset=' + offset + '&q=' + tags
        })
        gify.then(function(search){
          console.log(search);
          for (var i = 0; i < search.data.length; i++){
          $('.container').append('<img src=' + search.data[i].images.fixed_height_downsampled.url + '>');
          }
          if (offset + 5 < search.pagination.total_count){
            $('.container').append('<button class="gifs" id="next">Next</button>');
          }
        })
        $('#tags').val('');
      } else if (active == 'sticker'){
        //sticker search
        var gify = $.ajax({
          url: 'http://api.giphy.com/v1/stickers/search?api_key=dc6zaTOxFJmzC&limit=5&offset=' + offset + '&q=' + tags
        })
        gify.then(function(search){
          for (var i = 0; i < search.data.length; i++){
          $('.container').append('<img src=' + search.data[i].images.fixed_height_downsampled.url + '>');
          }
          if (offset + 5 < search.pagination.total_count){
            $('.container').append('<button class="stickers" id="next">Next</button>');
          }
        })
        $('#tags').val('');
      }
    }
  });
  //when next button is clicked
  $('.container').on('click', '#next', function(){
    var buttonClass = $(this).attr('class')
    $('.container').empty();
    offset += 5;
    var gify = $.ajax({
      url: 'http://api.giphy.com/v1/' + buttonClass + '/search?api_key=dc6zaTOxFJmzC&limit=5&offset=' + offset + '&q=' + tags
    })
    gify.then(function(search){
      console.log(search);
      for (var i = 0; i < search.data.length; i++){
      $('.container').append('<img src=' + search.data[i].images.fixed_height_downsampled.url + '>');
      }
      $('.container').append('<button class="' + buttonClass + '" id="prev">Prev</button>');
      if (offset + 5 < search.pagination.total_count){
        $('.container').append('<button class="' + buttonClass + '" id="next">Next</button>');
      }
    })

  })
  $('.container').on('click', '#prev', function(){
    var buttonClass = $(this).attr('class')
    $('.container').empty();
    offset -= 5;
    var gify = $.ajax({
      url: 'http://api.giphy.com/v1/' + buttonClass + '/search?api_key=dc6zaTOxFJmzC&limit=5&offset=' + offset + '&q=' + tags
    })
    gify.then(function(search){
      console.log(search);
      for (var i = 0; i < search.data.length; i++){
      $('.container').append('<img src=' + search.data[i].images.fixed_height_downsampled.url + '>');
      }
      if (offset > 0){
        $('.container').append('<button class="' + buttonClass + '" id="prev">Prev</button>');
      }
      if (offset + 5 < search.pagination.total_count){
        $('.container').append('<button class="' + buttonClass + '" id="next">Next</button>');
      }
    })

  })
  $('.trending').click(function(){
    $('.container').empty();
    var trend = $.ajax({
      url: 'http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC&limit=10'
    })
    trend.then(function(results){
      for (var i = 0; i < results.data.length; i++){
      $('.container').append('<img src=' + results.data[i].images.fixed_height_downsampled.url + '>');
      }
    })
  })

});
