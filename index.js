'use strict';
//Pseudocode for Input Screen
//load watchFormSubmit function onload
//listen for submit event (click button or enter), prevent default
//retrieve input values and store in an array
//call the function to format the parameters and header of the api calls
//pass these parameters and header to the api call function (one function will then call all API functions)
    //each individual function will combine the parameters with the api url and then call the api using fetch; throwing an error for no reponse and catching errors with error message
//then call the disaplyResults function
    //this function will call the pickResult function which will select 2 random options out of the results returned by the api(s)
    //then render/display these results plus a start over button, home button, learn more button
//

//Going to start with a const latLong then add the user input and api call 
let latitude = 40.0274;
let longitude = -105.2519;
//remove once set up getlatLong

//input vars//
//radius-day, min-length,hiking(yes), mountain-biking(yes),radius-night

const hikeKey = '200684713-dde33619c13cd28faa7456223edcf195';
const bikeKey = '200684713-dde33619c13cd28faa7456223edcf195';
const restaurantKey = 'e5800b1de7b26545fe07ad6a49160396';
const latLongKey = '6c790e07e8a9409b98ba70f8cbde2eab';

const hikeEndPoint = 'https://www.hikingproject.com/data/get-trails';
const bikeEndPoint = 'https://www.mtbproject.com/data/get-trails';
const restaurantEndPoint = 'https://developers.zomato.com/api/v2.1/search';
const latLongEndPoint = 'https://api.opencagedata.com/geocode/v1/json';

let dayActivity = [];

function resultsHikingOrBiking(responseJson,pick){
    let numberOfResults = responseJson.trails.length;
    for (let i=0; i<numberOfResults; i++ ){
       dayActivity.push(responseJson.trails[i]);
    }
    //only runs pickDayActivities when appropriate depending on if both hiking/biking checked
    if (pick)
    {
         pickDayActivities(dayActivity);
    }
   //console.log(`resultsHiking ran`);
    
}

function pickDayActivities(dayActivity){
    let dayActivityOneNumber = Math.floor(Math.random() * (dayActivity.length));
    let dayActivityTwoNumber = Math.floor(Math.random() * (dayActivity.length));
    while(dayActivityTwoNumber === dayActivityOneNumber){
        dayActivityTwoNumber = Math.floor(Math.random() * (dayActivity.length));
    }
    
    let dayWinners =[];
    dayWinners = [dayActivity[dayActivityOneNumber],dayActivity[dayActivityTwoNumber]];
   
    displayDayResults(dayWinners);
}

function resultsRestaurant(results){
    let restaurantPickOne = Math.floor(Math.random() * (20));
    let restaurantPickTwo = Math.floor(Math.random() * (20));
    while(restaurantPickOne === restaurantPickTwo){
        restaurantPickTwo = Math.floor(Math.random() * (20));
    }
    
   // console.log(`pick number ${restaurantPickOne}`);
  //  console.log(`pick number ${restaurantPickTwo}`);
  //  console.log(`this is a restaurant ${results.restaurants[restaurantPickOne].restaurant.name}`);
  //  console.log(`this is a restaurant ${results.restaurants[restaurantPickTwo].restaurant.name}`);
    let nightWinners = [];
    nightWinners = [results.restaurants[restaurantPickOne],results.restaurants[restaurantPickTwo]];
    displayNightResults(nightWinners);
   // console.log(`resultsRestaurant ran`);
}

function displayDayResults(dayWinners){
//this function will call the pickResults functions which will select 2 random options out of the results returned by the api(s)
//this function will render/display these results plus a start over button, home button, learn more button 
  $('.results').removeClass('js-hidden');   
  $('.results-header').removeClass('js-hidden'); 
  $('.results-day').removeClass('js-hidden'); 
  $('.results-day').empty()
  $('.results-day').append(`<h3>Your Day Activities</h3>`);
  $('.results-day').append(`<ul class="day-list"></ul>`);
  
  //console.log(dayWinners[0].name);
 for(let i=0; i < dayWinners.length; i++){
    $('.day-list').append(`<li class="day-list-item first-item">Option ${i+1} is a ${dayWinners[i].category} trail</li>`);
    $('.day-list').append(`<li class="day-list-item">Trail Name: ${dayWinners[i].name}</li>`);
    //$('.day-list').append(`<li class="day-list-item">${dayWinners[i].category}</li>`);
    $('.day-list').append(`<li class="day-list-item">Summary: ${dayWinners[i].summary}</li>`);
    $('.day-list').append(`<li class="day-list-item">Difficulty: ${dayWinners[i].difficulty}</li>`);
    $('.day-list').append(`<li class="day-list-item">Length: ${dayWinners[i]['length']}</li>`);
    
 }//end of for loop
    //console.log(`displayDayResultsRan`);
}

function displayNightResults(nightWinners){
    //this function will call the pickResults functions which will select 2 random options out of the results returned by the api(s)
    //this function will render/display these results plus a start over button, home button, learn more button 
      $('.results').removeClass('js-hidden');   
      $('.results-header').removeClass('js-hidden'); 
      $('.results-night').removeClass('js-hidden'); 
      $('.results-night').empty()
      $('.results-night').append(`<h3>Your Night Activities</h3>`);
      $('.results-night').append(`<ul class="night-list"></ul>`);
     
      //console.log(dayWinners[0].name);
     for(let i=0; i < nightWinners.length; i++){

       $('.night-list').append(`<li class="night-list-item first-item">Restaurant ${i+1}</li>`);
      $('.night-list').append(`<li class="night-list-item">Name: ${nightWinners[i].restaurant.name}</li>`);
      $('.night-list').append(`<li class="night-list-item link"><a href="${nightWinners[i].restaurant.url}">Link: ${nightWinners[i].restaurant.url}</a></li>`);
      $('.night-list').append(`<li class="night-list-item">Address: ${nightWinners[i].restaurant.location.address}</li>`);
      //$('.night-list').append(`<li class="night-list-item">${nightWinners[i].restaurant.location.city}</li>`);
      //$('.night-list').append(`<li class="night-list-item">${nightWinners[i].restaurant.location.zipcode}</li>`);
      $('.night-list').append(`<li class="night-list-item">Cuisine: ${nightWinners[i].restaurant.cuisines}</li>`);
      $('.night-list').append(`<li class="night-list-item">Average Cost for Two People: $${nightWinners[i].restaurant.average_cost_for_two}</li>`);
      $('.night-list').append(`<li class="night-list-item"><img alt="Image for ${nightWinners[i].restaurant.name}"src="${nightWinners[i].restaurant.featured_image}"\></li>`);
       
     }//end of for loop
       // console.log(`displayNightResultsRan`);
    }

function formatParameters(params){
//take in input from forms; lat/long and format parameters and headers (if necessary) for each API
//pass these parameters (and headers) to the api call function (one function will then call all API functions)
console.log(`formatParamaters ran`);
const queryitems = Object.keys(params).map(key=>`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
return queryitems.join('&');    
}

function formatLatLong(locationResult){
    latitude = locationResult.geometry.lat;
    longitude = locationResult.geometry.lng;
    
    console.log(`is this the lat : ${locationResult.geometry.lat}`);
    console.log(`is this the lat : ${locationResult.geometry.lng}`);
    
    displayNewForm();
    //console.log(latitude);   
}

function displayNewForm(){
    $('#location-input').addClass('js-section-hidden');
    $('#activities-input').removeClass('js-section-hidden');
    console.log(`newForm ran`);
}


//API functions
 //each individual function will combine the parameters with the correct api url and then call the api using fetch; throwing an error for no reponse and catching errors with error message
function getLatLong(cityInput, stateInput){
    const city = encodeURIComponent(cityInput); 
    const state = encodeURIComponent(stateInput);
    console.log(`the inputs ${cityInput} ${stateInput}`);
    
    const url = `${latLongEndPoint}?key=${latLongKey}&q=${city}+${state}&no_annotations&pretty=1`;
    
    console.log(url);

    fetch(url)
    .then(response=>{
        if(response.ok){
            return response.json();
        }
        throw new Error(response.statusText);  

    })
    .then(responseJson=>{
        console.log(`latlong api ran`);
        console.log(responseJson.results[0]);
        formatLatLong(responseJson.results[0]);
    })
    .catch(err => {
        $('#js-error-message').text(`Sorry, something was went wrong finding your location. Check your spelling and try again.`)
     });
    console.log(`getLatLong ran`);
}

function getBikes(radiusDay=20,length=0, hikingAlso,nightCheck){
    const params= {
        lat: latitude,
        lon: longitude,
        maxDistance:radiusDay,
        minLength: length,
        maxResults:'100',
        key: bikeKey,   
        };
    const url = `${bikeEndPoint}?lat=${latitude}&lon=${longitude}&maxDistance=${radiusDay}&minLength=${length}&maxResults=100&key=${bikeKey}`;
    //console.log(`bike url ${url}`);

   fetch(url)
     .then(response=>{
        if(response.ok){
            return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson=>{
         console.log(`bike called worked`);
         
         let numberOfResults = responseJson.trails.length;
         if(numberOfResults < 2){
            $('#js-error-message').text(`Sorry, it looks like we didn't find any bikes or hiking trails. Try increasing your radius or changing your Minimum Length. Otherwise, you may have to uncheck bikes. `)
         }
         else{
                for (let i=0; i<numberOfResults; i++ ){
                    responseJson.trails[i].category = 'bike';
                }
                if(hikingAlso){
                    resultsHikingOrBiking(responseJson, false); 
                    console.log('running getHikes from get Bikes');
                    getHikes(radiusDay,length, true, nightCheck);
                }
                else{
                    resultsHikingOrBiking(responseJson, true);
                
                    if(nightCheck === 'yes') {
                        getAllRestaurants();}    
                }
         } //end if check numberOfResults
      })
      .catch(err => {
        $('#js-error-message').text(`Sorry, we may be out biking. Try again`)
     });
     
   console.log(`getBikes ran`);
}

function getHikes(radiusDay=20,length=0, bikeAlso,nightCheck){
    const params= {
        lat: latitude,
        lon: longitude,
        maxDistance:radiusDay,
        minLength: length,
        maxResults:'100',
        key: hikeKey,   
        };
    /*if (radiusDay < 10){
        radiusDay = 10;
    }    */
    const url = `${hikeEndPoint}?lat=${latitude}&lon=${longitude}&maxDistance=${radiusDay}&minLength=${length}&maxResults=100&key=${hikeKey}`;
   // console.log(`hike url ${url}`);
   console.log(`this is nightCheck in Hikes but not fetch ${nightCheck}`);
   fetch(url)
     .then(response=>{
         
        if(response.ok){
            return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson=>{
        let numberOfResults = responseJson.trails.length;
        if(numberOfResults < 2){
            $('#js-error-message').text(`Sorry, it looks like we didn't find any hiking trails. Try increasing your radius or changing your Minimum Length. Otherwise, you may have to uncheck hikes. `)
         }
         else {
            for (let i=0; i<numberOfResults; i++ ){
                responseJson.trails[i].category = 'hiking';
            }
            console.log(`hike called worked`);
            console.log(`number of hikes : ${numberOfResults}`);
            resultsHikingOrBiking(responseJson, true);
            console.log(`this is nightCheck in Hikes ${nightCheck}`);
            if(nightCheck==='yes')
            {getAllRestaurants();}
        }//end of if for numberOfResults
      })
      .catch(err => {
        $('#js-error-message').text(`Sorry, we may be out hiking. Try again in a bit`)
     });
     
    console.log(`getHikes ran`);
}



function getAllRestaurants(){
    
    const url = `${restaurantEndPoint}?lat=${latitude}&lon=${longitude}`;
   // const url = "https://developers.zomato.com/api/v2.1/categories";
    console.log(url);
    const options = {
        headers: new Headers(
        {"user-key":"e5800b1de7b26545fe07ad6a49160396",})
      };
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
            $('#js-error-message').text(`Sorry, it looks like we didn't find restaurants in your city.`)
         }
         else {

          console.log('restaurant call worked');
          console.log(`this is the number of restaurant results ${numberOfResults}`);
          getRandomStart(responseJson);
          //console.log(responseJson); 
         }//end numberOfResults if
      })      
      .catch(err => {
        $('#js-error-message').text(`Sorry, we may napping after a delicious meal. Try again in a bit`)
     });
    console.log(`getRestaurants ran`);
}

function getRandomStart(responseJson){
    let numberOfResults = responseJson.results_found;
    //the API will not let the start be greater than 80
    if(numberOfResults > 80){
        numberOfResults = 80;
    }
    let randomStartOfResultsShown = Math.floor(Math.random() * (numberOfResults+1));
    console.log(`this is the start ${randomStartOfResultsShown}`);
    getTwentyRandomRestaurant(randomStartOfResultsShown);
}

function getTwentyRandomRestaurant(startNumber){
    
    const url = `${restaurantEndPoint}?lat=${latitude}&lon=${longitude}&start=${startNumber}`;
   // const url = "https://developers.zomato.com/api/v2.1/categories";
    console.log(url);
    const options = {
        headers: new Headers(
        {"user-key":"e5800b1de7b26545fe07ad6a49160396",})
      };
      fetch(url, options)
      .then(response =>{    
              //console.log(response);     
              return response.json(); 
          }
         )
      .then(responseJson=>{
          console.log('2nd restaurant call worked');
          console.log(`this is the number of results ${responseJson.results_found}`)
         // let randomStartOfResultsShown = Math.floor(Math.random() * (responseJson.results_found));
         // getTwentyRandomRestaurant(randomStartOfResultsShown);
          //console.log(responseJson);   
          resultsRestaurant(responseJson);    
      })      
    console.log(`getRestaurants ran`);
}


function callAPIs(radiusDay,length,hiking,mtnbiking,dayCheck,nightCheck){
 //call all of the individual API functions
 //console.log(`the form inputs from callAPI -rd${radiusDay} lenght${length} hiking${hiking} biking${mtnbiking} dayCheck ${dayCheck} nightCheck ${nightCheck} `);
    
  if (dayCheck === 'yes' && (mtnbiking==='yes' || hiking==='yes')){
        //call getHikes and getBikes if checked and only call PickActivities for one of them)(timing??)
        if(mtnbiking==='yes' && hiking==='yes'){
            getBikes(radiusDay,length, true,nightCheck);
            }
        else if(mtnbiking==='yes' && hiking==='no'){
            getBikes(radiusDay,length, false,nightCheck)
            }
        else if(mtnbiking==='no' && hiking==='yes' ){
            getHikes(radiusDay,length, false,nightCheck);
            console.log(`just hikes no bikes ran`)
        }
    }//end if for day
    else {console.log(`no day activities checked`)}
    //then call the displayResults function   
        console.log(`callAPIs ran`);

   //console.log(`this is ${dayCheck}`);
     if(dayCheck === 'no' && nightCheck === 'yes'){
        getAllRestaurants();
    }
}//end of API functions



function watchActivityFormSubmit(){
//listen for submit event (click button or enter), prevent default
//retrieve input values (and store in an object?)
//call the function to format the parameters and header of the api calls
$('#event-form').submit(function(event){
    event.preventDefault();
    $('#js-error-message').empty();
    let radiusDay = $('#radius-day').val();
    let length = $('#min-length').val();
    let hiking = $('#hiking').is(':checked')?'yes':'no';
    let mtnbiking = $('#mountain-biking').is(':checked')?'yes':'no';
    let dayCheck = $('#day').is(':checked')?'yes':'no';
    let nightCheck = $('#night').is(':checked')?'yes':'no';
    //console.log(`the form inputs -rd${radiusDay} lenght${length} hiking${hiking} biking${mtnbiking} dayCheck ${dayCheck} nightCheck ${nightCheck} `);
    //clears day results on a new submit
    dayActivity = [];

    callAPIs(radiusDay, length, hiking,mtnbiking,dayCheck,nightCheck);
});
    console.log(`watchFormSubmit ran`);
}

function watchLatLongFormSubmit(){
    $('#latLong-form').submit(function(event){
     event.preventDefault();
     let city = $('#city').val();
     let state = $('#state').val();
     console.log(`the inputs ${city} ${state}`);
     getLatLong(city, state);
    });
    console.log(`watchLatLong ran`);
}
$(watchActivityFormSubmit);
$(watchLatLongFormSubmit);
//$(getLatLong);  //right now this runs onload - eventually will be from a submit on a previous screen