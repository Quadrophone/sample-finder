SC.initialize({
  client_id: "332a913c73b844e273a70a64d6c1e39d",
  redirect_uri: "http://127.0.0.1/callback.html",
});
$.scPlayer.defaults.onDomReady = null;

$(document).ready(function() {

    //HANDLE SEARCH FORM SUBMISSION
    $('form#search').submit(function(e) {
    //$('#search_button').click(function(e) {
      e.preventDefault();

      showTrackSearchPage();
      var search_string = "";
      search_string = $('input#search_string').val();
      
      // MAKE JSON SEARCH REQUEST
      $.getJSON("http://api.soundcloud.com/tracks.json?",
        {
          client_id: "332a913c73b844e273a70a64d6c1e39d",
          q: search_string,
          original_format: "wav",
          types:"sample, loop",
          license: "cc-by",
          downloadable : true,
          sharing: "public",
          streamable: true,
          duration: { to : 10000} 
        },
        function(data) {
          var items_array = [];
          var items = "";
          
          // LOOP THROUGH RESULTS AND PREPARE THEM FOR DISPLAY    
          $.each(data, function(key,val) {
            //items_array.push('<a href="' + val.uri + '" class="sc-player">' + val.title + '</a>');
            items_array.push('<div class="player"><br /><a href="' + val.uri + '" class="sc-player">' + val.title + '</a></div>');
          });
          items = items_array.join('');
          
          $('ul#soundcloud').append(items);
          $('a.sc-player').scPlayer();
          
          //DELETE THE RESULTS ON THE SCREEN IF THERE
          if ($('ul#soundcloud').length != 0) {
            $('ul#soundcloud').empty();


          }
          
          items = items_array.join('');
          
          $('ul#soundcloud').append(items);
          $('a.sc-player').scPlayer();
           
          
            });
          });
        });
  
      

  function showTrackSearchPage() {
    $("div#home").hide();
    $("div#search").show();

  }



