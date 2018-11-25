
const marvelApp = {};

marvelApp.init = function () {
    // marvelApp.getData();
    marvelApp.searchHero();
    marvelApp.redBorder();
    marvelApp.backToTop();
}

marvelApp.apiKey = '520507c36ce0546fbac236621e58b165';

//------API call for Hero Character---------------------------
//Have the hero variable from searchHero function as parameter
marvelApp.getData = function (hero) {
    $.ajax({
        url: `https://gateway.marvel.com:443/v1/public/characters?name=${hero}`,
        method: 'GET',
        dataType: 'json',
        data: {
            apikey: marvelApp.apiKey,
        }
    }).then(res => {
        marvelApp.displayResults(res.data.results);
        const heroID = res.data.results[0].id;
        marvelApp.getEventsData(heroID);
        marvelApp.getSeriesData(heroID);
    });
}

//------API call for Hero Events linked to Hero ID ------------
marvelApp.getEventsData = function (heroID) {
    $.ajax({
        url: `https://gateway.marvel.com:443/v1/public/characters/${heroID}/events`,
        method: 'GET',
        dataType: 'json',
        data: {
            apikey: marvelApp.apiKey,
            limit: 20,

        }
    }).then(res => {
        marvelApp.eventResults(res.data.results);
        marvelApp.showMoreInfo();
    })
};

//------API call for Hero Series linked to Hero ID-------------
marvelApp.getSeriesData = function (heroID) {
    $.ajax({
        url: `https://gateway.marvel.com:443/v1/public/characters/${heroID}/series`,
        method: 'GET',
        dataType: 'json',
        data: {
            apikey: marvelApp.apiKey,
            limit: 30,
            // count:,
        }
    }).then(res => {
        marvelApp.seriesResults(res.data.results);
        // console.log(res.data.results);
        marvelApp.showMoreInfo();
    })
};

//Search bar function for Heroes
marvelApp.searchHero = function () {
    $('form.search').on('submit', function (e) {
        e.preventDefault();
        let hero = $('.hero').val();
        $(".hero").val('');

        //Pass hero variable into getData function as an argument
        $("#series").html('');
        $("#events").html('');
        marvelApp.getData(hero);
    })
}

//Append searched hero information to DOM
marvelApp.displayResults = function (characters) {
    characters.forEach((character) => {
        if (character.name) {
            $("main").show();
            $(".character-section").css('display', 'flex');
            $(".app-description").hide();
            $('#character').html('');
            $('#character').append(`
                <div class = 'wrapper'>
                    <div class = 'character-container'>
                        <div class = 'character-img'>
                        <img src='${character.thumbnail.path}.jpg' alt = 'image of character searched'>
                        </div>
                        <div class = 'character-info'>
                            <div class = 'character-text'>    
                                <h2>${character.name}</h2>
                                <p class = 'bio'>${character.description}</p>
                            </div>
                            <div class = 'buttons-series-events'>
                                <button class='button-series'>Series</button>
                                <button class='button-events'>Events</button>
                            </div> 
                        </div> 
                    </div>
                </div>       
            `)
        }
    });
}

//EVENTS FUNCTION to filter out results without image or description from Events API call
marvelApp.eventResults = function (comicsEvents) {
    console.log(comicsEvents);
    //If events have no cover image, do not display
    const events = comicsEvents.filter(function (comic) {
        return comic.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available';
    });
    events.forEach((comicevent) => {
        //if no description is available, append empty
        let description = comicevent.description;
        if (description === null) {
            let description = '';
            marvelApp.appendEvents(comicevent, description);
        } else {
            marvelApp.appendEvents(comicevent, description);
        }
    });
}

//SERIES FUNCTION to filter out results without image or description from Series API call
marvelApp.seriesResults = function (comicsSeries) {
    console.log(comicsSeries);
    //If series have no cover image, do not display
    const comix = comicsSeries.filter(function (comic) {
        return comic.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available';
    })
    comix.forEach((comicseries) => {
        let description = comicseries.description;
        //if no description is available, append empty
        if (description === null) {
            let description = '';
            marvelApp.appendSeries(comicseries, description);
        } else {
            marvelApp.appendSeries(comicseries, description);
        };
    });
}

//Append results from filtered Events API call to the DOM
marvelApp.appendEvents = function (comicevent, description) {
    $('#events').append(`
    <div class = 'single-event-container'>
        <h2>${comicevent.title}</h2>
        <img src='${comicevent.thumbnail.path}.jpg' alt = 'image of event'>
        <p class = 'title'>${description}</p>
    </div>   
    `);
}

//Append results from filtered Series API call to the DOM
marvelApp.appendSeries = function (comicseries, description) {
    $('#series').append(`
        <div class = 'single-series-container'>
            <h2>${comicseries.title}</h2>
            <img src='${comicseries.thumbnail.path}.jpg' alt='image of series cover'>
            <p class='title'>${description}</p>
        </div>
    `)
}

//Function to add border on click of cover image of Series or Events results.
marvelApp.redBorder = function () {
    $('#series').on('click', '.single-series-container', function () {
        $(this).toggleClass('red');
        console.log('it worked');
    });
    $('#events').on('click', '.single-event-container', function () {
        $(this).toggleClass('red');
        console.log('it worked');
    });
};

//Function to show series/events
marvelApp.showMoreInfo = function () {
    //Toggle Events Section
    $(".button-events").on('click', function(){
        // console.log("HEllo");
        $(".event-section").show();
        $('html, body').animate({
            scrollTop: $(".event-section").offset().top
        }, 1000);
    })
    //Toggle for Series
    $(".button-series").on('click', function () {
        // console.log("HEllo");
        $(".series-section").show();
        $('html, body').animate({
            scrollTop: $(".series-section").offset().top
        }, 1000);
    })
}

marvelApp.backToTop = function () {
    $(".to-top").on('click', function() {
        $('html, body').animate({
            scrollTop: $('body').offset().top
        }, 1000);
    })
}

//create array of 20 unique random numbers between 0 and comix.length. foreach grab the index for the comix array.


// marvelApp.shuffle = function(array) {
//     for (let i = array.length; i < 20; i--) {
//         const j = Math.floor(Math.random() * i + 1);
//         [array[i], array[j]] = [array[j], array[i]];
//         return j;
//     }
// }


// function getRandomComics(comicArray){
//     var index = Math.floor(Math.random() * comicArray.length);
//     return comicArray[index];
// }

// const comicArray = []
// marvelApp.arrayRandomizer = function(comicArray){
//     const index = Math.floor(Math.random() * comicArray.length)
//     return comicArray.length[index];
// }
// for (index = 0; index < 20; index++){
//     comicArray.push(marvelApp.arrayRandomizer);
//     }






//have a search bar in a sticky nav/fixed nav so it scrolls with user.
//create function that allows for any Marvel character to be called into a search bar
//create function to call in image and bio of searched character and link to DOM
//make two custom buttons that link to 'series' and 'events' paramater in marvel API
//have the buttons call specific series and events paramater associated with selected characrer
//populate the covers of these series/events into the DOM by linking to the thumbnail paramater in API.
//limit the amount of thumpnails called in to 40, as there are 1000's of issues that would have to be called in otherwise.
//Let thumbnails have a boarder and box shadow on click to indicate user owns this issue
//Have button at end of page that scrolls back to top of page on click.


//---------Document Ready---------\\
$(function () {

    marvelApp.init();



});
