// When the document is ready
$( document ).ready(function(){
    // Array of topics for initial buttons
    var topics = ['Star Wars','Indiana Jones','Air Force One','Blade Runner'];

    // Default user query
    var userQuery = 'star wars';

    // Display the buttons
    function displayButtons() {   
        // Clear the button display div
        $('#displayButtons').empty(); 
        // For each topic in the topics array
        topics.forEach(function(value){
            // Get rid of any spaces and replace them with '+' so the URL in the AJAX call is space-free
            arrValue = value.split(' ');
            urlValue = arrValue.join('+');
            // Display the topic as a button in the button display div
            $('#displayButtons').append('<button class="categoryButton" data-value="' + urlValue + '">' + value + '</button>');
        });
        // Set the clickHandler for each button
        setClickHandler();
    };
 
    // Combine all variable into one Query URL
    function getQueryURL() {
        return 'http://api.giphy.com/v1/gifs/search?q=' + userQuery  + '&limit=10&api_key=dc6zaTOxFJmzC';
    };
    
    // Add new button depending on user input
    $('#form').submit(function(event){
        // Save the new topic
        var newTopic = $('#newTopic').val();
        // Add it to the topics array
        topics.push(newTopic);
        // Create buttons from all topics in the topics array
        displayButtons();
        // Stop page from reloading w/ new URL on submit (default behavior)
        event.preventDefault();
    });

    // On the click of a category button
    function setClickHandler() {
        $('.categoryButton').click(function(){
            // Button that was clicked, saved as a variable
            var button = $(this);
            // Save the user's input fromt he button that was clicked
            userQuery = button.data('value');
            // Set the URL with the user's input
            queryURL = getQueryURL();
            // Get gifs from Giphy API
            $.ajax({
                url: queryURL,
                method: 'GET'
            }).done(function(response){
                // Clear the gif diplay div
                $('#displayGifs').empty();
                // For each gif JSON object returned...
                response.data.forEach(function(gif){
                    // Save the still and animated URLs
                    var still = gif.images.fixed_height_still.url;
                    var animate = gif.images.fixed_height.url;
                    // Create an image jQuery object set to the still image
                    var image = $('<img class="gif" data-state="still" src="' + still + '"/>')
                    // Assign the animated URL to the data-animate attribute of image
                    image.data('animate', animate);
                    // Assign the still URL to the data-still attribute of image
                    image.data('still', still);
                    // Add the image and its rating to the gif display div
                    $('#displayGifs').append(image);
                    $('#displayGifs').append('<h3>Rated ' + gif.rating + '</h3>');
                });
                // After all the gifs have been added to the display div, create a click event handler
                $('.gif').click(function(){
                    // If the clicked gif is still...
                    if ($(this).data('state') === 'still') {
                        // Swith the src to the animated URL
                        $(this).data('state', 'animate');
                        $(this).attr('src', $(this).data('animate'));
                    } else {
                        // Else switch the src to the still URL
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