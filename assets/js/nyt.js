$(document).ready(function() {

//Initialize variables
var searchTerm;

$("#submit-btn").on("click", function(event) {
    event.preventDefault();
    searchTerm = $("#search-text").val().trim();
    console.log(searchTerm)

    url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=548cf1cc9a384242a531beac63abd9f4&sort=newest&q=" + searchTerm;
    
    $.ajax({
    url: url,
    method: 'GET',
    }).then(function(response) {
        console.log(response)
        console.log(response.response.docs[0])
    }
        
    )
})


});