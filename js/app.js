$(function(){
  // user types book search term
  // user clicks submit
  $('#search').click(function(event){
    event.preventDefault();

    // take user data and format it into api request url
    var term = $('#term').val();
    var apiURL = 'https://www.googleapis.com/books/v1/volumes?q='+term;

    // make an ajax request
    $.ajax({
      url: apiURL, 
      type: 'GET',
      dataType: 'json',
      // if success then construct books from json and append them into results section element.
      success: function(response) {
        //console.log(response.items);

        $.each(response.items, function(i, book){
          var bookEle = '<div class="book"><a href="'+book.volumeInfo.previewLink+'"><img src="'+book.volumeInfo.imageLinks.thumbnail+'" alt="'+book.volumeInfo.title+'"><h2>'+book.volumeInfo.title+'</h2><h3>'+book.volumeInfo.authors+'</h3></a></div>';
          $('#results').append(bookEle);
        });

      },
      // if error log the error
      error: function(jqXHR, textStatus, error) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(error);
      }
    });
      
  });
});