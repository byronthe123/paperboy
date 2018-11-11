// Byron's JS
//---------------------------------------FOX NEWS API:-----------------------------------//
console.log('byron.js online');

function foxNewsSearch(searchTerm) {
    var queryURL = 'https://newsapi.org/v2/top-headlines?q=' + searchTerm + '&sources=fox-news&apiKey=4158f11fae04433cb9d70983ca8857bd';
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response){
        console.log(response);
        foxNewsSearchHTML(response);
    })
}

// foxNewsSearch('trump');

function foxNewsSearchHTML(response) {
    var title = response.articles[0].title;
    var description = response.articles[0].description;
    var url = response.articles[0].url;
    var image = response.articles[0].urlToImage;

    console.log(title);

    let foxNewsCard = '<div class="card fox_news_card"><div class="card-header"><h3>Fox News</h3>' + title + '</div><div class="card-body">' + description + '<br><a href="' + url + '">Full Story</a>' + '</div></div>';
    $('.fox_news_cards').append(foxNewsCard);
}

//---------------------------------------YOUTUBE API:-----------------------------------//

function youtubeSearch(searchTerm) {
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

        let video = {};

        for(let i = 0; i < response.items.length; i++) {
            if(response.items[i].id.kind === "youtube#video") {
                video = response.items[i];
                break;
            }
        }
        youtubeSearchHTML(video);
    });
}

function youtubeSearchHTML(video) {
    var videoID = video.id.videoId;
    var title = video.snippet.title;
    var description = video.snippet.title;
    var thumbnailURL = video.snippet.thumbnails.default.url;
    var videoLink = 'https://www.youtube.com/watch?v=b2AcxL88DoI' + video.id.videoId;
    // console.log(video);

    let youtubeCard = '<div class="card youtube_card"><div class="card-header"><h3>YouTube</h3>' + title +  '</div><div class="card-body"><a href="' + videoLink + '" target="blank">' + '<img src="assets/images/play.svg" class="youtube_img_overlay"></a>' + '<img src="' + thumbnailURL + '" class="youtube_img">' + '</div></div>';    
    $('.youtube_cards').append(youtubeCard);
}

// youtubeSearch("assassin's creed");

$('#submit-btn').on('click', function(e){
    e.preventDefault();
    $('.fox_news_cards').empty();
    $('.youtube_cards').empty();
    var searchTerm = $('#search-text').val().trim();
    foxNewsSearch(searchTerm);
    youtubeSearch(searchTerm);
});
