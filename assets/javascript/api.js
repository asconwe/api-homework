// When the document is ready
$.ready(function(){
    
    // API endpoint URL
    var apiBase = '';
    // API Parameters
    var apiSettings = '';
    // The user's query
    var userQuery = '';
    // API key
    var apiKey = '';
    
    // combine all variable into one Query URL
    function queryURL() {
        return apiBase + apiSettings + userQuery + apiKey;
    };

    // On the click of a button
    $('button').click(function(){
        // Button that was clicked, saved as a variable
        var button = $('this');
        
        userQuery = button.data('value')
        
        $.ajax({
            url: queryURL(),
            method: 'GET'
        }).done(function(response){
            
        });
    });
});