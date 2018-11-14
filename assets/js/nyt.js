$(document).ready(function() {

    

//Initialize variables
var searchTerm;

function nytSearch(searchTerm) {
    queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=548cf1cc9a384242a531beac63abd9f4&sort=newest&q=" + searchTerm;
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response){
        // console.log(response);
        nytSearchHTML(response);
    })
}


function nytSearchHTML(response) {
    $('.nyt_cards').empty();
    if(response.response.docs.length > 0) {
        for(let i = 0; i < response.response.docs.length; i++) {

            var title = response.response.docs[i].headline.main;
            var description = response.response.docs[i].snippet;
            var url = response.response.docs[i].web_url;
            try {
                var image = response.response.docs[i].multimedia[2].url;
            }
            catch(e) {
                console.log("no thumbnail")
            }


            var nytCard = $('<tr id=' + url + '><td><h6>' + title + '</h6><p>' + description + '</p></td><td class="d-flex justify-content-end"><img src=https://static01.nyt.com/' + image +' class="placeholder"></td></tr>');
            $('.nyt-cards').append(nytCard);
        }
    } else {
        var nytCard = $('<tr><td><h6>No Results Found</h6><p>Please try searching for another news related term.</p></td><td class="d-flex justify-content-end"></td></tr>');
        $('.nyt-cards').append(nytCard);
    }
}




// $("#submit-btn").on("click", function(event) {
//     event.preventDefault();
//     searchTerm = $("#search-text").val().trim();
//     console.log(searchTerm)

//     queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=548cf1cc9a384242a531beac63abd9f4&sort=newest&q=" + searchTerm;
    
//     $.ajax({
//     url: queryURL,
//     method: 'GET',
//     }).then(function(response) {
//         console.log(response)
//         console.log(response.response.docs[0])
//     }
        
//     )
// })

document.getElementById('search-form').addEventListener('submit', function(e){
    e.preventDefault();
    var searchTerm = $('#search-query').val().trim();
    nytSearch(searchTerm)
});

});