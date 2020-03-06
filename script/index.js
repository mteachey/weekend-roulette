'use strict';

let latitude = 0;
let longitude = 0;

const hikeKey = '200684713-dde33619c13cd28faa7456223edcf195';
const bikeKey = '200684713-dde33619c13cd28faa7456223edcf195';
const restaurantKey = 'e5800b1de7b26545fe07ad6a49160396';
const latLongKey = '6c790e07e8a9409b98ba70f8cbde2eab';
const hikeEndPoint = 'https://www.hikingproject.com/data/get-trails';
const bikeEndPoint = 'https://www.mtbproject.com/data/get-trails';
const restaurantEndPoint = 'https://developers.zomato.com/api/v2.1/search';
const latLongEndPoint = 'https://api.opencagedata.com/geocode/v1/json';

let dayActivity = [];

function resultsHikingOrBiking(responseJson,pick, nightCheck){
//this function creates an array of all the results from hiking and/or biking before calling the pickDayActivities
    let numberOfResults = responseJson.trails.length;
    for (let i=0; i<numberOfResults; i++ ){
       dayActivity.push(responseJson.trails[i]);
    }
    //only runs pickDayActivities when appropriate depending on if both hiking/biking checked
    if (pick)
    {
         pickDayActivities(dayActivity, nightCheck);
    }    
}

function pickDayActivities(dayActivity,nightCheck){
//this function randonmly chooses two different hikes or bikes from the array of hikes and/or bikes
    let dayActivityOneNumber = Math.floor(Math.random() * (dayActivity.length));
    let dayActivityTwoNumber = Math.floor(Math.random() * (dayActivity.length));
    while(dayActivityTwoNumber === dayActivityOneNumber){
        dayActivityTwoNumber = Math.floor(Math.random() * (dayActivity.length));
    }
    
    let dayWinners =[];
    dayWinners = [dayActivity[dayActivityOneNumber],dayActivity[dayActivityTwoNumber]];
    displayDayResults(dayWinners, nightCheck);
}

function resultsRestaurant(results){
//this function randomly chooses two different restaurants out of the random 20 that were selected
    let restaurantPickOne = Math.floor(Math.random() * (20));
    let restaurantPickTwo = Math.floor(Math.random() * (20));
    while(restaurantPickOne === restaurantPickTwo){
        restaurantPickTwo = Math.floor(Math.random() * (20));
    }   
    let nightWinners = [];
    nightWinners = [results.restaurants[restaurantPickOne],results.restaurants[restaurantPickTwo]];
    displayNightResults(nightWinners);
 
}

function displayDayResults(dayWinners, nightCheck){
  //resetting the display after a successful API call
  resetDisplay();
  $('body').addClass('bike-background');
  $('.rotating-text').addClass('js-hidden');
  $('#activities-input').addClass('js-hidden');
  $('.mask1').removeClass('newbackground');
  $('.mask2').addClass('newbackground');
  $('.main').addClass('main-background-wider');
  $('.main').addClass('main-background-results');
  $('.results').removeClass('js-hidden');   
  $('.results-header').removeClass('js-hidden'); 
  $('.results-day').removeClass('js-hidden'); 
  $('.results-day').empty();
  $('.results-day').addClass('border');
  $('.results-day').append(`<h3>Day Activities</h3>`);
  $('.results-day').append(`<div class="day-list-container"></div>`);
  
 for(let i=0; i < dayWinners.length; i++){
    $('.day-list-container').append(`<ul class="day-list day-list${i+1}"></ul>`);
    $(`.day-list${i+1}`).append(`<li class="day-list-item first-item">Option ${i+1} is a ${dayWinners[i].category} trail</li>`);
    $(`.day-list${i+1}`).append(`<li class="day-list-item">Trail Name: ${dayWinners[i].name}</li>`);  
    $(`.day-list${i+1}`).append(`<li class="day-list-item">Summary: ${dayWinners[i].summary}</li>`);
    $(`.day-list${i+1}`).append(`<li class="day-list-item">Difficulty: ${dayWinners[i].difficulty}</li>`);
    $(`.day-list${i+1}`).append(`<li class="day-list-item">Length: ${dayWinners[i]['length']}mi.</li>`);
    if(nightCheck === 'no'){
        //hiding spinner
        spinner.setAttribute('hidden', ''); 
    }   
 }//end of for loop
    
}

function displayNightResults(nightWinners){
    //resetting the display after a successful API call
    resetDisplay();
    $('body').addClass('bike-background');
    $('.mask1').removeClass('newbackground');
    $('.mask2').addClass('newbackground');
     $('.rotating-text').addClass('js-hidden');
      $('.results').removeClass('js-hidden');   
      $('.results-header').removeClass('js-hidden'); 
      $('.results-night').removeClass('js-hidden'); 
      $('.main').addClass('main-background-results');
      $('.main').addClass('main-background-wider');
      $('.results-night').empty()
      $('.results-night').addClass('border');
      $('.results-night').append(`<h3>Night Activities</h3>`);
      $('.results-night').append(`<div class="night-list-container"></div>`);
      
     spinner.setAttribute('hidden', '');  
      
     for(let i=0; i < nightWinners.length; i++){
      console.log(`leaving this console.log in - id ${nightWinners[i].restaurant.id}`);
        $('.night-list-container').append(`<ul class="night-list night-list${i+1}"></ul>`);

      if(nightWinners[i].restaurant.thumb){
        $(`.night-list${i+1}`).append(`<li class="night-list-item first-item"><img alt="Image for ${nightWinners[i].restaurant.name}"src="${nightWinners[i].restaurant.thumb}"\></li>`)
       };
       
      $(`.night-list${i+1}`).append(`<li class="night-list-item">Restaurant ${i+1}: ${nightWinners[i].restaurant.name}</li>`);
      
      $(`.night-list${i+1}`).append(`<li class="night-list-item">Address: ${nightWinners[i].restaurant.location.address}</li>`);
      
      $(`.night-list${i+1}`).append(`<li class="night-list-item">Cuisine: ${nightWinners[i].restaurant.cuisines}</li>`);
      $(`.night-list${i+1}`).append(`<li class="night-list-item">Average Cost for Two People: $${nightWinners[i].restaurant.average_cost_for_two}</li>`);
      $(`.night-list${i+1}`).append(`<li class="night-list-item"><a class="link" href="${nightWinners[i].restaurant.url}" target="_blank">More Info</a></li>`); 
     }//end of for loop
     $('.night-list-container').append(`<p class="note">If these activities aren't what you were looking for, double check the city and state and spin again!`)       
    }


function formatLatLong(locationResult, city, state){
//this function formats the latitude and longitude values from the OpenCage API to use in the other API calls
    latitude = locationResult.geometry.lat;
    longitude = locationResult.geometry.lng;
    globe.setAttribute('hidden', '');  
    displayActivityForm(latitude,longitude,city, state);
       
}

function displayActivityForm(latitude,longitude,city, state){
    scrollToTop();
    $('body').css('background-image','none');
    $('.mask1').addClass('newbackground');
    $('.mask-start').addClass('mask-transparent');
    $('#activities-input').addClass('js-fade-in');
    $('#location-input').addClass('js-hidden');
    $('#intro').addClass('js-hidden');
    $('#activities-input').removeClass('js-hidden');
    $('.location-result').append(`<p>You are searching for activities closest to <span class="bold">${city}, ${state}</span> (${latitude}<sup>o</sup> and ${longitude}<sup>o</sup>) </p>.`);
}

//API functions
 
function getLatLong(cityInput, stateInput){
    const city = encodeURIComponent(cityInput); 
    const state = encodeURIComponent(stateInput);
    const url = `${latLongEndPoint}?key=${latLongKey}&q=${city}+${state}&no_annotations&pretty=1`;
    globe.removeAttribute('hidden');
    fetch(url)
    .then(response=>{
        if(response.ok){
            return response.json();
        }
        throw new Error(response.statusText);  

    })
    .then(responseJson=>{        
        formatLatLong(responseJson.results[0], cityInput, stateInput);
    })
    .catch(err => {
        globe.setAttribute('hidden', ''); 
        scrollToTop();
        $('.error-location').removeClass('js-hidden');
     });    
}

function getBikes(radiusDay=20,length=0, hikingAlso,nightCheck){
 
    const url = `${bikeEndPoint}?lat=${latitude}&lon=${longitude}&maxDistance=${radiusDay}&minLength=${length}&maxResults=100&key=${bikeKey}`;
    
   fetch(url)
     .then(response=>{
        if(response.ok){
            return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson=>{
          spinner.removeAttribute('hidden');
         let numberOfResults = responseJson.trails.length;
         if(numberOfResults < 2 && !hikingAlso){
            spinner.setAttribute('hidden', ''); 
            $('#activities-input').removeClass('js-hidden');
            $('.alert-activities').removeClass('js-hidden');
         }
         else if(numberOfResults < 2 && hikingAlso){
                getHikes(radiusDay,length, false, nightCheck);
         }
         else{
                for (let i=0; i<numberOfResults; i++ ){
                    responseJson.trails[i].category = 'bike';
                }
                if(hikingAlso){
                    resultsHikingOrBiking(responseJson, false,nightCheck); 
                    getHikes(radiusDay,length, true, nightCheck);
                }
                else{
                    resultsHikingOrBiking(responseJson, true, nightCheck);
                                   
                    if(nightCheck === 'yes') {
                        getAllRestaurants();}    
                }//end of ifelse for hikingAlso check
         } //end if/else check numberOfResults
      })
      .catch(err => {
        console.log('did this run-bikes');
        spinner.setAttribute('hidden', '');  
        scrollToTop();
        $('.error-activities-day').removeClass('js-hidden');
     });
     
}

function getHikes(radiusDay=20,length=0, bikeAlso,nightCheck){
    
    const url = `${hikeEndPoint}?lat=${latitude}&lon=${longitude}&maxDistance=${radiusDay}&minLength=${length}&maxResults=100&key=${hikeKey}`;
  
   fetch(url)
     .then(response=>{
         
        if(response.ok){
            return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson=>{
        spinner.removeAttribute('hidden');
        let numberOfResults = responseJson.trails.length;
        if(numberOfResults < 2 && !bikeAlso){
            spinner.setAttribute('hidden', ''); 
            $('#activities-input').removeClass('js-hidden');
            $('.alert-activities').removeClass('js-hidden');
         }
         else if(numberOfResults <2 && bikeAlso)
         {
            resultsHikingOrBiking(responseJson, true, nightCheck);
         }
         else {
            for (let i=0; i<numberOfResults; i++ ){
                responseJson.trails[i].category = 'hiking';
            }
            
            resultsHikingOrBiking(responseJson, true, nightCheck);
            
            if(nightCheck==='yes')
            {getAllRestaurants();}
        }//end of ifelse for numberOfResults
      })
      .catch(err => {
        console.log('did this run-hikes');
        spinner.setAttribute('hidden', '');  
        scrollToTop();
        $('.error-activities-day').removeClass('js-hidden');
     });
        
}

//the next three functions are used to get the most random restaurants from the API call. The API will only give give 20 results at a time. The functions are created to allow the app to select from more than just the top 20 restaurants returned.

//the first function, checks to see how many results the API returns for a particular area 
function getAllRestaurants(){
    
    const url = `${restaurantEndPoint}?lat=${latitude}&lon=${longitude}`;
   
    const options = {
        headers: new Headers(
        {"user-key":"e5800b1de7b26545fe07ad6a49160396",})
      };
      spinner.removeAttribute('hidden');
      fetch(url, options)
      .then(response =>{   
        if(response.ok){
            return response.json();
        }
        throw new Error(response.statusText);                 
       })
      .then(responseJson=>{
        
        let numberOfResults = responseJson.results_found;
        if(numberOfResults < 2){
            $('#js-error-message').text(`Sorry, it looks like we didn't find restaurants in your city. Double check your spelling and city name - for example, we can find 'Alameda Island, CA' but not 'Alameda, CA' - we aren't as fancy as Google maps yet!`)
         }
         else {
          getRandomStart(responseJson);
         
         }//end numberOfResults if
      })      
      .catch(err => { 
        console.log('did this run-restaurant');
        spinner.setAttribute('hidden', '');  
        scrollToTop();
        $('.error-activities-night').removeClass('js-hidden');
     });
    
}

//this function then finds a random start point (must be less than 80) 
function getRandomStart(responseJson){
    let numberOfResults = responseJson.results_found;
    //the API will not let the start be greater than 80 bc the api call won't work
    if(numberOfResults > 80){
        numberOfResults = 80;
    }
    let randomStartOfResultsShown = Math.floor(Math.random() * (numberOfResults+1));
    
    getTwentyRandomRestaurant(randomStartOfResultsShown);
}

//this function calls the API again with the random start point
function getTwentyRandomRestaurant(startNumber){
    
    const url = `${restaurantEndPoint}?lat=${latitude}&lon=${longitude}&start=${startNumber}`;
  
    const options = {
        headers: new Headers(
        {"user-key":"e5800b1de7b26545fe07ad6a49160396",})
      };
      fetch(url, options)
      .then(response =>{                      
              return response.json(); 
          }
         )
      .then(responseJson=>{          
          resultsRestaurant(responseJson);    
      })      
}
//end of API call functions

function callAPIs(radiusDay,length,hiking,mtnbiking,dayCheck,nightCheck){
 //calls all of the individual API functions
    
  if (dayCheck === 'yes' && (mtnbiking==='yes' || hiking==='yes')){
        //call getHikes and getBikes if checked and only call PickActivities for one of them)
        if(mtnbiking==='yes' && hiking==='yes'){
            getBikes(radiusDay,length, true,nightCheck);
            }
        else if(mtnbiking==='yes' && hiking==='no'){
            getBikes(radiusDay,length, false,nightCheck)
            }
        else if(mtnbiking==='no' && hiking==='yes' ){
            getHikes(radiusDay,length, false,nightCheck);
        }
    }//end if for day
     if(dayCheck === 'no' && nightCheck === 'yes'){
        getAllRestaurants(dayCheck);
    }
}//end of API functions


function watchActivityFormSubmit(){
$('#event-form').submit(function(event){
    event.preventDefault();
    $('#js-error-message').empty();
    let radiusDay = $('#radius-day').val();
    let length = $('#min-length').val();
    let hiking = $('#hiking').is(':checked')?'yes':'no';
    let mtnbiking = $('#mountain-biking').is(':checked')?'yes':'no';
    let dayCheck = $('#day').is(':checked')?'yes':'no';
    let nightCheck = $('#night').is(':checked')?'yes':'no';
   
    //reseting display on every submit
    //resetDisplay();
    
    //clears day results on a new submit
    dayActivity = [];

    //scroll to top after submit 
    scrollToTop();

    callAPIs(radiusDay, length, hiking,mtnbiking,dayCheck,nightCheck);
});    
}

function scrollToTop(){
     //scroll to top after submit 
     $("html, body").animate({ scrollTop:  $('#main').offset().top }, 'slow');
}

function watchLatLongFormSubmit(){
    $('#latLong-form').submit(function(event){
     event.preventDefault();
     $('.location-result').empty();
     let letters = /^[A-Za-z ]+$/;
     let city = $('#city').val();
    let state = $('#state').val();
     if(city.match(letters)){
        getLatLong(city, state);
     }
     else
      {
      $('.alert-location').removeClass('js-hidden')
      }    
    });  
}

function resetLocation(){
    $('#reset-location-button').on('click', function() { 
        $('#location-input').removeClass('js-hidden');
        $('#intro').removeClass('js-hidden');
        $('#activities-input').addClass('js-hidden');
        $('.mask-start').removeClass('mask-transparent');
        $('.mask1').removeClass('newbackground');
        $('.options').removeClass('js-hidden');
        $("#event-form")[0].reset();
        $('.location-result').empty();
        resetDisplay();
    })    
}

function rollAgain(){
    $('#roll-again').on('click',function(){
        //clear out the old result elements from the DOM
        $('.results-day').empty();
        $('.results-night').empty();
        //change what section is displayed to the user
        $('.results').addClass('js-hidden');
        $('.results-night').addClass('js-hidden');
        $('.results-day').addClass('js-hidden');
        $('#activities-input').removeClass('js-hidden');
        //change the background
        $('.main').removeClass('main-background-results');
        $('.mask1').addClass('newbackground');
        $('.mask2').removeClass('newbackground');
        $('.results-header').addClass('js-hidden');
        $('.results-night').removeClass('border');
        $('.results-day').removeClass('border');
    })
}

//this is the function for the click event of the "Let's Do This" button from intro or location page
function start(){
    //$('.start-button').on('click',function(){
     //   event.preventDefault();
        $('#start-screen').addClass('js-hidden');
        $('.rotating-text').removeClass('js-hidden');
        $('#intro').addClass('js-hidden');
        $('#location-input').removeClass('js-hidden');
        displayNewBackground();
  //  });
}

function letsDoThis(){
    $('#start').on('click',function(){
        start();
    });

    $('#intro').on('click', '.js-learnmore-intro-location', function(event) {
        $('#start-intro').removeClass('js-learnmore-intro-location');
        start();
    });

    $('#intro').on('click', '.js-learnmore-activities', function(event) {
        $('#start-intro').removeClass('js-learnmore-intro-activities');
        $('#intro').addClass('js-hidden');
        $('#activities-input').removeClass('js-hidden');
        displayNewBackground();      
    });
}


function resumeActivities(){
    $('.js-learnmore-intro-activities').on('click',function(){
        event.preventDefault();
        $('#intro').addClass('js-hidden');
        $('#activities-input').removeClass('js-hidden');
        displayNewBackground();
    });
}

function handleLearnMoreSubmit(){
    $('#learnmore-intro').on('click',function(){
        event.preventDefault();
        $('#start-intro').addClass('js-learnmore-intro-location');
        displayIntro();
        displayNewBackground();        
    })   
    $('#learnmore-activities').on('click',function(){
        event.preventDefault();
        $('#start-intro').addClass('js-learnmore-activities');
        displayIntro();       
    })
    $('#learnmore-location').on('click',function(){
        event.preventDefault();
        $('#start-intro').addClass('js-learnmore-intro-location');
        displayIntro();       
    })    
}

function handleLearnMoreResults(){
    $('#learnmore-results').on('click',function(){
        event.preventDefault();
        displayIntrowithResults();       
    })
}

function displayIntro(){  
//this function displays the Learn More/Intro section 
        scrollToTop();
        $('#intro').removeClass('js-hidden');
        $('#start-screen').addClass('js-hidden');
        $('.rotating-text').addClass('js-hidden');
        $('#location-input').addClass('js-hidden');
        $('.results').addClass('js-hidden');
        $('#activities-input').addClass('js-hidden');
        $('#start-intro').removeClass('js-hidden');
        $('#remove-intro').addClass('js-hidden');        
}

function displayIntrowithResults(){
//this function disaplys the Learn More/intro section with their Results
    $('#intro').removeClass('js-hidden');
    $('#intro').addClass('intro-with-results');
    $('#start-screen').addClass('js-hidden');
    $('.rotating-text').addClass('js-hidden');
    $('#location-input').addClass('js-hidden');
    $('#activities-input').addClass('js-hidden');
    $('#start-intro').addClass('js-hidden');
    $('#remove-intro').removeClass('js-hidden');
    $('html, body').animate({
        scrollTop: $("#intro").offset().top
         }, 2000);
};

function resetDisplay(){
//this function handles reseting some common elements 
    $('.rotating-text').removeClass('js-hidden');
    $('.results').addClass('js-hidden');
    $('#activities-input').addClass('js-hidden');
    $('.results-header').addClass('js-hidden');;
    $('.results-night').removeClass('border');
    $('.results-day').removeClass('border');
    $('#intro').addClass('js-hidden');
}


function handleNoDayChecked() {
//this function hides the Options for Day Activities if a user unchecks "I want day.."
    $('#day').on('click', event => {
      $('.options').toggleClass('js-hidden');
    });
  }

 function handleCloseButton(){
//this function hides the alert box
    $('.closebtn').on('click', event => {
     $('.alert').addClass('js-hidden');
    });
 } 

 function handleRemoveIntro(){
//this function removes the Learn More/Intro elements on results screen
    $('#remove-intro').on('click', event => {
     $('#intro').addClass('js-hidden');
     $('#intro').removeClass('intro-with-results');
     scrollToTop();
    });
 } 

function displayNewBackground(){
//this function changes the backgrounds from the start screen to the other screens
    scrollToTop();
   $('.mask-solid').addClass('js-hidden');
   $('.mask-start').removeClass('animation-mask-start');
   $('.mask1').removeClass('animation-mask-1');
   $('.mask2').removeClass('animation-mask-2');
   $('.mask3').removeClass('animation-mask-3');
   $('.mask').addClass('zindex');
    $('main').addClass('main-background');
   $('#location-input').removeClass('js-slide-in');
   $('#location-input').addClass('js-fade-in');
   $('#start-screen').addClass('js-hidden');
   $('section').css('position','static'); 
   $('.header').removeClass('header-start');
   $('.rotating-text').css('position','static');
   $('.rotating-text__container__text').addClass('js-change-rotating-text');
   $('.rotating-text__container__list__item').addClass('js-change-rotating-text');
   $('.rotating-text__container__list').addClass('js-change-rotating-text-padding');
   $('.rotating-text').css('width','unset');
   $('.tagline').addClass('js-hidden');     
 }

function handleWeekendRoulette(){
    letsDoThis();
    scrollToTop();
    handleLearnMoreResults();
    handleLearnMoreSubmit();
    rollAgain();
    watchActivityFormSubmit();
    resetLocation();
    handleNoDayChecked();
    handleRemoveIntro();
    handleCloseButton();
    watchLatLongFormSubmit();
}

// when the page loads, call `handleWeekendRoulette`
$(handleWeekendRoulette);

