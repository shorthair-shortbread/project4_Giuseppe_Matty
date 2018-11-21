const marvelApp = {};

marvelApp.apiKey = '550e2aab776d0f40d7f9815108200820';


marvelApp.getData = function (){
    $.ajax({
        url: 'https://gateway.marvel.com:443/v1/public/characters',
        method: 'GET',
         dataType: 'json',
        data: {
            apikey: marvelApp.apiKey,
            comic: 'Spider-Man',
        }
    }).then(res => {
        // marvelApp.displayResults(res);
        console.log(res);
    })
}

marvelApp.getData();

//have a search bar in a sticky nav/fixed nav so it scrolls with user.

//create function that allows for any Marvel character to be called into a search bar

//create function to call in image and bio of searched character and link to DOM

//make two custom buttons that link to 'series' and 'events' paramater in marvel API

//have the buttons call specific series and events paramater associated with selected characrer

//populate the covers of these series/events into the DOM by linking to the thumbnail paramater in API.

//limit the amount of thumpnails called in to 40, as there are 1000's of issues that would have to be called in otherwise.

//Let thumbnails have a boarder and box shadow on click to indicate user owns this issue

//Have button at end of page that scrolls back to top of page on click.