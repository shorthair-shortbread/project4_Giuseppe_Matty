const marvelApp = {};

marvelApp.apiKey = '550e2aab776d0f40d7f9815108200820';

$('form').on('submit', function(e){
    e.preventDefault();

    var character = $('input[type=text]').val().replace('','');
    character = character.split(',');
    console.log('character', character);

    var characterNames = character.map(function(name){
        return $.ajax({
            url: 'https://gateway.marvel.com:443/v1/public/characters',
            dataType: 'json',
            method: 'GET',
            data: {
                apiKey: marvelApp.apiKey,
                name: name
            }
        });
    });
    console.log('characterNames',characterNames);
    $.when.apply(null, characterNames)
        .then(function(res){
            console.log('res', res)
            console.log(arguments);
        })
});











// marvelApp.getData = function (heroname){
//     $.ajax({
//         url: 'https://gateway.marvel.com:443/v1/public/characters',
//         method: 'GET',
//         dataType: 'json',
//         data: {
//             apikey: marvelApp.apiKey,
//             name: heroname
//         }
//     }).then(res => {
//         marvelApp.displayResults(res.data.results);
//         // console.log(res);
//     })
// }    
// //     //matty - find out how to add multiple names to array so it shows up in console.log
// // }

// // //G - watch pokemon video and try to link character API to series and/or events API. Maybe have to use REGEX, will have to probably link either character ID from URI to series/events or vice versa

// marvelApp.displayResults = function(character){
//     console.log(character);
//     character.forEach((hero) => {
//         if (hero.name){
//     // Matty - make search bar in html and link search to character object from API. On click on "search" button append below info (name, bio) to DOM.
//             $('#character').append(`
//             <div class = 'hero'>
//             <h2>${hero.name}</h2>
//             <p class = 'bio'>${hero.description}</p>
//             <img src='${hero.thumbnail.path}' alt = 'blah'>
//             </div>
//             `)
//         }
//     });
// }

// marvelApp.getData();

//have a search bar in a sticky nav/fixed nav so it scrolls with user.

//create function that allows for any Marvel character to be called into a search bar

//create function to call in image and bio of searched character and link to DOM

//make two custom buttons that link to 'series' and 'events' paramater in marvel API

//have the buttons call specific series and events paramater associated with selected characrer

//populate the covers of these series/events into the DOM by linking to the thumbnail paramater in API.

//limit the amount of thumpnails called in to 40, as there are 1000's of issues that would have to be called in otherwise.

//Let thumbnails have a boarder and box shadow on click to indicate user owns this issue

//Have button at end of page that scrolls back to top of page on click.