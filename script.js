
const marvelApp = {};

// const heroes = ['Spider-man', 'Wolverine', 'Peepee Man'];

marvelApp.init = function () {
    // marvelApp.getData();
    marvelApp.searchHero();
}

marvelApp.apiKey = '520507c36ce0546fbac236621e58b165';

//Have the hero variable from searchHero function as parameter
marvelApp.getData = function (hero){
    $.ajax({
        url: `https://gateway.marvel.com:443/v1/public/characters?name=${hero}`,
        method: 'GET',
        dataType: 'json',
        data: {
            apikey: marvelApp.apiKey,
            // limit: 100,
            // offset: 1000,
            // name: "Spider-Man"
        }
    }).then(res => {
        marvelApp.displayResults(res.data.results);
        console.log(res.data.results);
    })
}

marvelApp.searchHero = function() {
    $("form.search").on('submit', function(e){
        e.preventDefault();
        let hero = $(".hero").val();
        $(".hero").val('');
        console.log(hero);

        //Pass hero variable into getData function as an argument
        marvelApp.getData(hero);
    })
}

marvelApp.displayResults = function (characters) {
    console.log(characters);
    characters.forEach((character) => {
        if (character.name) {
            $('#character').html('');
            $('#character').append(`
            <div class = 'character-container'>
            <h2>${character.name}</h2>
            <p class = 'bio'>${character.description}</p>
            <img src='${character.thumbnail.path}.jpg' alt = 'blah'>
            </div>
            `)
        }
    });
}



//have a search bar in a sticky nav/fixed nav so it scrolls with user.
//create function that allows for any Marvel character to be called into a search bar
//create function to call in image and bio of searched character and link to DOM
//make two custom buttons that link to 'series' and 'events' paramater in marvel API
//have the buttons call specific series and events paramater associated with selected characrer
//populate the covers of these series/events into the DOM by linking to the thumbnail paramater in API.
//limit the amount of thumpnails called in to 40, as there are 1000's of issues that would have to be called in otherwise.
//Let thumbnails have a boarder and box shadow on click to indicate user owns this issue
//Have button at end of page that scrolls back to top of page on click.


//Document Ready\\
$(function () {

    marvelApp.init();



});