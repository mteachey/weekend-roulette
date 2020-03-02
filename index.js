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
//this function display the day results
  $('body').addClass('bike-background');
  $('.rotating-text').addClass('js-hidden');
  $('#activities-input').addClass('js-hidden');
  $('.mask2').removeClass('newbackground');
  $('.mask3').addClass('newbackground');
  $('.main').addClass('main-background-wider');
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
        spinner.setAttribute('hidden', ''); 
    }
    
 }//end of for loop
    
}

function displayNightResults(nightWinners){
    //this function display the night results
    $('body').addClass('bike-background');
    $('.mask2').removeClass('newbackground');
    $('.mask3').addClass('newbackground');
     $('.rotating-text').addClass('js-hidden');
      $('.results').removeClass('js-hidden');   
      $('.results-header').removeClass('js-hidden'); 
      $('.results-night').removeClass('js-hidden'); 
      $('.main').addClass('main-background-wider');
      $('.results-night').empty()
      $('.results-night').addClass('border');
      $('.results-night').append(`<h3>Night Activities</h3>`);
      $('.results-night').append(`<div class="night-list-container"></div>`);
      
     spinner.setAttribute('hidden', '');  
      
     for(let i=0; i < nightWinners.length; i++){
        $('.night-list-container').append(`<ul class="night-list night-list${i+1}"></ul>`);
       $(`.night-list${i+1}`).append(`<li class="night-list-item first-item">Restaurant ${i+1}</li>`);
      $(`.night-list${i+1}`).append(`<li class="night-list-item">Name: ${nightWinners[i].restaurant.name}</li>`);
      
      $(`.night-list${i+1}`).append(`<li class="night-list-item">Address: ${nightWinners[i].restaurant.location.address}</li>`);
      
      $(`.night-list${i+1}`).append(`<li class="night-list-item">Cuisine: ${nightWinners[i].restaurant.cuisines}</li>`);
      $(`.night-list${i+1}`).append(`<li class="night-list-item">Average Cost for Two People: $${nightWinners[i].restaurant.average_cost_for_two}</li>`);
      $(`.night-list${i+1}`).append(`<li class="night-list-item"><a class="link" href="${nightWinners[i].restaurant.url}" target="_blank">More Info</a></li>`);
      if(nightWinners[i].restaurant.featured_image != undefined){
      $(`.night-list${i+1}`).append(`<li class="night-list-item"><img alt="Image for ${nightWinners[i].restaurant.name}"src="${nightWinners[i].restaurant.featured_image}"\></li>`);};
       
     }//end of for loop
       
    }


function formatLatLong(locationResult, city, state){
    latitude = locationResult.geometry.lat;
    longitude = locationResult.geometry.lng;
    globe.setAttribute('hidden', '');  
    displayActivityForm(latitude,longitude,city, state);
       
}

function displayActivityForm(latitude,longitude,city, state){
    scrollToTop();
    $('.mask1').removeClass('newbackground');
    $('.mask2').addClass('newbackground');
    $('#activities-input').addClass('js-fade-in');
    
    $('#location-input').addClass('js-hidden');
    $('#intro').addClass('js-hidden');
    $('#activities-input').removeClass('js-hidden');
    $('.location-result').append(`<p>You are searching for activities around <span class="bold">${city}, ${state}</span>. <span class="italic">Please, double check the spelling of your city.</span></p><p>This city's latitude and longtitude is ${latitude}<sup>o</sup> and ${longitude}<sup>o</sup> - just in case you were wondering</p>`);
    console.log(`displayActivityForm ran`)
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
        $('#js-error-message').text(`Sorry, something was went wrong finding your location. Check your spelling and try again.`)
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
         if(numberOfResults < 2){
            //$('#js-error-message').text(`Sorry, it looks like we didn't find any bikes or hiking trails. Try increasing your radius or changing your Minimum Length. Otherwise, you may have to uncheck bikes and/or hikes. `)
            $('.alert-activities').removeClass('js-hidden');
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
                }
         } //end if check numberOfResults
      })
      .catch(err => {
        $('#js-error-message').text(`Sorry, we may be out biking. Try again`)
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
        if(numberOfResults < 2){
            //$('#js-error-message').text(`Sorry, it looks like we didn't find any hiking trails. Try increasing your radius or changing your Minimum Length. Otherwise, you may have to uncheck hikes. `)
            $('.alert-activities').removeClass('js-hidden');
         }
         else {
            for (let i=0; i<numberOfResults; i++ ){
                responseJson.trails[i].category = 'hiking';
            }
            
            resultsHikingOrBiking(responseJson, true, nightCheck);
            
            if(nightCheck==='yes')
            {getAllRestaurants();}
        }//end of if for numberOfResults
      })
      .catch(err => {
        $('#js-error-message').text(`Sorry, we may be out hiking. Try again in a bit`)
     });
        
}


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
        $('#js-error-message').text(`Sorry, we may napping after a delicious meal. Try again in a bit`)
     });
    
}
//end of API call functions

function getRandomStart(responseJson){
    let numberOfResults = responseJson.results_found;
    //the API will not let the start be greater than 80 bc the api cal won't work
    if(numberOfResults > 80){
        numberOfResults = 80;
    }
    let randomStartOfResultsShown = Math.floor(Math.random() * (numberOfResults+1));
    
    getTwentyRandomRestaurant(randomStartOfResultsShown);
}

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


function callAPIs(radiusDay,length,hiking,mtnbiking,dayCheck,nightCheck){
 //call all of the individual API functions
    
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
    else {console.log(`no day activities checked`)}//eventually this will render instead of logging to console

     if(dayCheck === 'no' && nightCheck === 'yes'){
        getAllRestaurants();
    }
}//end of API functions


function watchActivityFormSubmit(){
//listen for submit event (click button or enter), prevent default
//retrieve input values 

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
    resetDisplay();
    
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
        //$('#city').val("");
        //$('#state').val("");
        $("#event-form")[0].reset();
        $('.location-result').empty();
        resetDisplay();
    })    
}

function rollAgain(){
    $('#roll-again').on('click',function(){
        $('#activities-input').removeClass('js-hidden');
        $('.results-day').empty();
        $('.results-night').empty();
        $('.results').addClass('js-hidden');
        $('.results-header').addClass('js-hidden');;
        $('.results-night').removeClass('border');
        $('.results-day').removeClass('border');
    })
}

function start(){
    $('.start-button').on('click',function(){
        event.preventDefault();
        $('#start-screen').addClass('js-hidden');
        $('.rotating-text').removeClass('js-hidden');
        $('#intro').addClass('js-hidden');
        $('#location-input').removeClass('js-hidden');
        displayNewBackground();
    });
}

function handleLearnMoreSubmit(){
    $('#learnmore-intro').on('click',function(){
        event.preventDefault();
        displayIntro();
        displayNewBackground();
        
    })
    
    $('#learnmore-activities').on('click',function(){
        event.preventDefault();
        displayIntro();
       
    })
    $('#learnmore-location').on('click',function(){
        event.preventDefault();
        displayIntro();
        
    })
    console.log(`handleLearnMoreSubmit ran`);
}

function handleLearnMoreResults(){
    $('#learnmore-results').on('click',function(){
        
        event.preventDefault();
        displayIntrowithResults();
        
    })
}

function displayIntro(){   
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
    $('#intro').removeClass('js-hidden');
    $('#intro').addClass('intro-with-results');
    $('#start-screen').addClass('js-hidden');
    $('.rotating-text').addClass('js-hidden');
    $('#location-input').addClass('js-hidden');
    $('#activities-input').addClass('js-hidden');
    $('#start-intro').addClass('js-hidden');
    $('#remove-intro').removeClass('js-hidden');
    

};

function resetDisplay(){
    $('.rotating-text').removeClass('js-hidden');
    $('.results').addClass('js-hidden');
    $('#activities-input').addClass('js-hidden');
    $('.results-header').addClass('js-hidden');;
    $('.results-night').removeClass('border');
    $('.results-day').removeClass('border');
    $('#intro').addClass('js-hidden');
}


function handleNoDayChecked() {
    $('#day').on('click', event => {
      $('.options').toggleClass('js-hidden');
    });
  }

 function handleCloseButton(){
    $('.closebtn').on('click', event => {
     $('.alert').addClass('js-hidden');
    });
 } 

 function handleRemoveIntro(){
    $('#remove-intro').on('click', event => {
     $('#intro').addClass('js-hidden');
     $('#intro').removeClass('intro-with-results');
    });
 } 

function displayNewBackground(){
    scrollToTop();
   $('.mask-solid').addClass('js-hidden');
   $('.mask1').removeClass('animation-mask-1');
   $('.mask2').removeClass('animation-mask-2');
   $('.mask3').removeClass('animation-mask-3');
   $('.mask1').addClass('newbackground');
   $('.mask').addClass('zindex');
   $('body').css('background-image','none');
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
    start();
    scrollToTop();
    handleLearnMoreResults();
    handleLearnMoreSubmit();
    rollAgain();
    watchActivityFormSubmit();
    resetLocation();
    start();
    handleNoDayChecked();
    handleRemoveIntro();
    handleCloseButton();
    watchLatLongFormSubmit();
}

// when the page loads, call `handleWeekendRoulette`
$(handleWeekendRoulette);

