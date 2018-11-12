// Byron's JS
$(document).ready(function(){

    //---------------------------------------FOX NEWS API:-----------------------------------//
    console.log('byron.js online');

    function foxNewsSearch(searchTerm) {
        var queryURL = 'https://newsapi.org/v2/everything?q=' + searchTerm + '&sources=fox-news&apiKey=4158f11fae04433cb9d70983ca8857bd';
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(response){
            // console.log(response);
            foxNewsSearchHTML(response);
        })
    }

    // function foxNewsSearch(searchTerm) {
    //     var checkResponse = null;
    //     var queryURL = 'https://newsapi.org/v2/top-headlines?q=' + searchTerm + '&sources=fox-news&apiKey=4158f11fae04433cb9d70983ca8857bd';
    //     checkResponse = runAJAX(queryURL);
    //     console.log(checkResponse);
    //     if(checkResponse.response.totalResults > 0) {
    //         foxNewsSearchHTML(checkResponse);
    //     } else {
    //         queryURL = 'https://newsapi.org/v2/everything?q=' + searchTerm + '&sources=fox-news&apiKey=4158f11fae04433cb9d70983ca8857bd';
    //         checkResponse = runAJAX(queryURL);
    //         foxNewsSearchHTML(checkResponse);
    //     }
    // }

    // function runAJAX(queryURL){
    //     console.log(queryURL);
    //     $.ajax({
    //         url: queryURL,
    //         method: 'GET'
    //     }).then(function(response){
    //         console.log(response);
    //         return response;
    //     })
    // }

    // foxNewsSearch('trump');

    function foxNewsSearchHTML(response) {
        $('.fox_news_cards').empty();
        if(response.totalResults > 0) {
            for(let i = 0; i < response.articles.length; i++) {

                var title = response.articles[i].title;
                var description = response.articles[i].description;
                var url = response.articles[i].url;
                var image = response.articles[i].urlToImage;

                var foxNewsCard = $('<tr id=' + url + '><td><h6>' + title + '</h6><p>' + description + '</p></td><td class="d-flex justify-content-end"><img src=' + image +' class="placeholder"></td></tr>');
                $('.fox_news_cards').append(foxNewsCard);
            }
        } else {
            var foxNewsCard = $('<tr><td><h6>No Results Found</h6><p>Please try searching for another news related term.</p></td><td class="d-flex justify-content-end"></td></tr>');
            $('.fox_news_cards').append(foxNewsCard);
        }
    }

    //---------------------------------------YOUTUBE API:-----------------------------------//

    function youtubeSearch(searchTerm) {
        $('.youtube_cards').empty();
        let queryURL = "https://www.googleapis.com/youtube/v3/search";
        queryURL += '?' + $.param({
            part: 'snippet',
            key: 'AIzaSyBqjeZvRL_Xlr2_Fclhpr57eu3svLsSfHs',
            q: searchTerm
        });

        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function(response){
            // console.log(response);

            let videos = [];

            var index = 5;
            if(response.items.length < index) {
                index = response.items.length;
            }

            for(let i = 0; i < index; i++) {
                console.log(response.items[i].id.kind);
                if(response.items[i].id.kind === "youtube#video") {
                    videos.push(response.items[i]);
                }
            }

            console.log(videos);
            console.log(videos.length);

            for(let i = 0; i < videos.length; i++) {
                youtubeSearchHTML(videos[i]);
            }

        });
    }

    function youtubeSearchHTML(video) {
        var videoID = video.id.videoId;
        var title = video.snippet.title;
        var description = video.snippet.description;
        var thumbnailURL = video.snippet.thumbnails.high.url;
        var videoLink = 'https://www.youtube.com/watch?v=' + video.id.videoId;

        // var youtubeCard = $('<tr id=' + videoLink + '><td><h6>' + title + '</h6>' + '<img src="assets/images/play.png" class="youtube_img_overlay img-fluid"></a>' + '<img src="' + thumbnailURL + '"class="youtube_img img-fluid">' + '<p>' + description + '</p></td><td class="d-flex justify-content-end"></td></tr>');
        var youtubeCard = $('<tr id=' + videoLink + '><td><h6>' + title + '</h6>' + '<div class="div_youtube_thumbnail d-flex justify-content-center align-items-center"><img src="assets/images/play.png" class="youtube_img_overlay img-fluid mx-auto"></a>' + '<img src="' + thumbnailURL + '"class="youtube_img img-fluid"></div><p>' + description + '</p></td><td class="d-flex justify-content-end"></td></tr>');
        // console.log(youtubeCard);
        $('.youtube_cards').append(youtubeCard);
    }

    // youtubeSearch("assassin's creed");

    document.getElementById('search-form').addEventListener('submit', function(e){
        e.preventDefault();
        var searchTerm = $('#search-query').val().trim();
        foxNewsSearch(searchTerm);
        youtubeSearch(searchTerm);
    });


    // $('#submit-btn').on('click', function(e){
    //     e.preventDefault();
    //     var searchTerm = $('#search-text').val().trim();
    //     foxNewsSearch(searchTerm);
    //     youtubeSearch(searchTerm);
    // });

    $(document).on('click', 'tr', function(){
        console.log($(this).attr('id'));
        window.open($(this).attr('id'));
    });
})
