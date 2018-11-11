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

      });



}
