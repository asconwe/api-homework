// When the document is ready
$( document ).ready(function(){
    // Array of topics for buttons
    var topics = ['Star Wars','Indiana Jones','Air Force One','Blade Runner'];

    // Display the buttons
    function displayButtons() {   
        $('#displayButtons').empty(); 
        topics.forEach(function(value){
            arrValue = value.split(' ');
            urlValue = arrValue.join('+');
            $('#displayButtons').append('<button class="categoryButton" data-value="' + urlValue + '">' + value + '</button>');
        });
        setClickHandler();
    };

    // API endpoint URL
    var apiBase = 'http://api.giphy.com/v1/gifs/search?q=';
    // The user's query
    var userQuery = 'star wars';
    // API Parameters
    var apiParams = '&limit=10';
    // API key
    var apiKey = '&api_key=dc6zaTOxFJmzC';
    
    // combine all variable into one Query URL
    function getQueryURL() {
        return apiBase + userQuery  + apiParams + apiKey;
    };
    

    $('#submit').click(function(){
        var newTopic = $('#newTopic').val();
        topics.push(newTopic);
        displayButtons();
    });

    // On the click of a button
    function setClickHandler() {
        $('.categoryButton').click(function(){
            // Button that was clicked, saved as a variable
            var button = $(this);
            userQuery = button.data('value');
            queryURL = getQueryURL();
            $.ajax({
                url: queryURL,
                method: 'GET'
            }).done(function(response){
                $('#displayGifs').empty();
                console.log(response);
                var still;
                var animate;
                response.data.forEach(function(gif){
                    $('#displayGifs').append('<img class="gif" data-state="still" src="' + gif.images.fixed_height_still.url + '"/>')
                })
                $('.gif').click(function(){
                    
                });
            });
        });
    };
    // Display the buttons on page-load
    displayButtons();
});