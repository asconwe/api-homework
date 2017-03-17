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

    // The user's query
    var userQuery = 'star wars';
    
    // combine all variable into one Query URL
    function getQueryURL() {
        return 'http://api.giphy.com/v1/gifs/search?q=' + userQuery  + '&limit=10&api_key=dc6zaTOxFJmzC';
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
                response.data.forEach(function(gif){
                    var still = gif.images.fixed_height_still.url;
                    var animate = gif.images.fixed_height.url;
                    var image = $('<img class="gif" data-state="still" src="' + still + '"/>')
                    image.data('animate', animate);
                    image.data('still', still);
                    $('#displayGifs').append(image);
                    $('#displayGifs').append('<h3>Rated ' + gif.rating + '</h3>');
                });
                $('.gif').click(function(){
                    if ($(this).data('state') === 'still') {
                        $(this).data('state', 'animate');
                        $(this).attr('src', $(this).data('animate'));
                    } else {
                        $(this).data('state', 'still');
                        $(this).attr('src', $(this).data('still'));
                    };
                });
            });

        });
    };
    // Display the buttons on page-load
    displayButtons();
});