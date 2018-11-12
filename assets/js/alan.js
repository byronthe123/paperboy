window.onload = function() {
    $( "#search-form" ).submit(function( event ) {
        event.preventDefault();
        console.log("You searched for " + $("#search-query").val().trim())
        var wikiurl = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&suggest=true&search="
            $.ajax({
            url: wikiurl + $("#search-query").val().trim(),
            method: "GET",
            dataType: 'jsonp',
            success: function(response) {
                getinfo = response[2]
                $("#wikiInfo2").text(getinfo[0])
            }

      });



})

}