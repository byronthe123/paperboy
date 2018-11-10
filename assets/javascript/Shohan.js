

  var queryURL = "";

$.ajax({
  url: queryURL,
  method: "GET"  // use POST to send stuff to the API
})

// THEN takes the response from that and puts it in a function
  .then(function(response) { //since its asynchronous, we grab

  console.log(response);

  });
