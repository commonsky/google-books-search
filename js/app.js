$(function(){

  //user clicks submit
  $('#search').click(function(event){
    event.preventDefault();


    //take user data and format it into api request url
    var book = $('#book').val();
    var searchUrl = 'https://www.googleapis.com/books/v1/volumes?q='+book;

    //make an ajax request
    $.ajax({
      url: searchUrl,
      type: 'GET',
      dataType: 'json',
      //if success then construct books from json and append them into results section element.
      success: function(response) {
        //console.log(response.items);

        $.each(response.items, function(i, book){
          
          //get each books info
          $.ajax({
              url: book.selfLink,
              type: 'GET',
              dataType: 'json',
              success: function(response){
                //response.volumeInfo.imageLinks.thumbnail
                //console.log(response.volumeInfo.imageLinks.thumbnail);
                var bookEle = '<div class="book"><img src="'+response.volumeInfo.imageLinks.thumbnail+'" alt="'+response.volumeInfo.title+'"></div>';

                $('#results').append(bookEle);

              },
              error: function(jqXHR, textStatus, error) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(error);
              }
          });

        });

      },
      //if error log the error
      error: function(jqXHR, textStatus, error) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(error);
      }
    });
    //$.get();
    //$.post();
    //$.getJSON();
      
  });

});