//
// $("#search-query")
//
// $.getJSON('https://en.wikipedia.org/api/rest_v1/page/summary/' + topic, function(data) {       // wikipedia api to get a summary based on button already created or new buttons added
//          info = data.extract;
//          console.log(info);
//          $("#summ").html(info); //where the summary is shown on the page
// });


window.onload = function() {
    $( "#search-form" ).submit(function( event ) {
        event.preventDefault();
        console.log("You searched for " + $("#search-query").val().trim())
        $.getJSON('https://en.wikipedia.org/api/rest_v1/page/summary/' + $("#search-query").val().trim(), function(data) {       // wikipedia api to get a summary based on button already created or new buttons added
                 info = data.extract;
                 console.log(info);
                 $("#wikiInfo").html(info); //where the summary is shown on the page
        });






      // =====================Reddit API==========================================

      var queryURL = "https://api.reddit.com/search?q=" + $("#search-query").val().trim(); // set limit to 10

      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
          $('.reddit_cards').empty();
            var results = response.data;
            console.log(results);                    //put response in a variable
            if(($("#search-query").val().trim()) != ""){
              $('.reddit_cards').empty();
            for(var i =0; i < 25; i++){
              var title=results.children[i].data.title;
              var url=results.children[i].data.url;

              var image=results.children[i].data.thumbnail;
              if(image === "default" || image === "self"){
              image = "assets/images/reddit-logo.svg"
            }

              var redditCard = $('<tr id=' + url + '><td><h6><a href="' + url + '"target="_blank">' + title + '</a></h6><p>' + " " + '</p></td><td class="d-flex justify-content-end"><img src=' + image +' style="height:90px; width:90px;"></td></tr>');
              $('.reddit_cards').append(redditCard);


            }

          } // if statement

          else{
            console.log("yes");
          }

              console.log(results.children[14].data.url);
        });


        // =====================Reddit API==========================================
        });

        var queryURL = "https://api.reddit.com/r/worldnews"; // set limit to 10

        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function(response) {
            $('.reddit_cards').empty();
              var results = response.data;
              console.log(results);                    //put response in a variable
              // if(($("#search-query").val().trim()) != ""){
                $('.reddit_cards').empty();
              for(var i =0; i < 25; i++){
                var title=results.children[i].data.title;
                var url=results.children[i].data.url;

                var image=results.children[i].data.thumbnail;
                if(image === "" || image === "self"){
                image = "assets/images/reddit-logo.svg"
              }

                var redditCard = $('<tr id=' + url + '><td><h6><a href="' + url + '"target="_blank">' + title + '</a></h6><p>' + " " + '</p></td><td class="d-flex justify-content-end"><img src=' + image +' style="height:90px; width:90px;"></td></tr>');
                $('.reddit_cards').append(redditCard);


              }

            // } // if statement

            // else{
            //   console.log("yes");
            // }

                console.log(results.children[14].data.url);
          });

}
