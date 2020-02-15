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
const latitude = 40.0274;
const longitude = -105.2519;
//remove once set up getlatLong

//input vars//
//radius-day, min-length,hiking(yes), mountain-biking(yes),radius-night

const hikeKey = '200684713-dde33619c13cd28faa7456223edcf195';
const bikeKey = '200684713-dde33619c13cd28faa7456223edcf195';
const restaurantHeader = 'user-key:e5800b1de7b26545fe07ad6a49160396';
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
    console.log(`this is after Results Ran ${dayActivity.length}`);
    //only runs pickDayActivities when appropriate depending on if both hiking/biking checked
    if (pick)
    {
         console.log(`this is if pick worked ${dayActivity.length}`);
         pickDayActivities(dayActivity);
    }
    console.log(`resultsHiking ran`);
    
}

function pickDayActivities(dayActivity){
    let dayActivityOneNumber = Math.floor(Math.random() * (dayActivity.length+1));
    let dayActivityTwoNumber = Math.floor(Math.random() * (dayActivity.length+1));
    //console.log(`this is the act ${dayActivity[dayActivityOneNumber]}, ${dayActivity[dayActivityTwoNumber]}`);
    let dayWinners =[];
    dayWinners = [dayActivity[dayActivityOneNumber],dayActivity[dayActivityTwoNumber]];
   // console.log(`the length ${dayWinners.length}`);
    //console.log(`this is the first activity ${dayWinners[0].name} 2nd ${dayWinners[1].name}`);
    displayDayResults(dayWinners);
}

function displayDayResults(dayWinners){
//this function will call the pickResults functions which will select 2 random options out of the results returned by the api(s)
//this function will render/display these results plus a start over button, home button, learn more button 
  $('.results').removeClass('js-hidden');   
  $('.results-header').removeClass('js-hidden'); 
  $('.results-day').removeClass('js-hidden'); 
  $('.results-day').empty()
  $('.results-day').append(`<ul class="day-list"></ul>`);
  //console.log(dayWinners[0].name);
 for(let i=0; i < dayWinners.length; i++){
    $('.day-list').append(`<li class="day-list-item">${dayWinners[i].name}</li>`);
    $('.day-list').append(`<li class="day-list-item">${dayWinners[i].type}</li>`);
    
 }//end of for loop
    console.log(`displayDayResultsRan`);
}

function formatParameters(params){
//take in input from forms; lat/long and format parameters and headers (if necessary) for each API
//pass these parameters (and headers) to the api call function (one function will then call all API functions)
console.log(`formatParamaters ran`);
const queryitems = Object.keys(params).map(key=>`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
return queryitems.join('&');    
}

//API functions
 //each individual function will combine the parameters with the correct api url and then call the api using fetch; throwing an error for no reponse and catching errors with error message
function getLatLong(){
    console.log(`getLatLong ran`);
}

function getRestaurants(){
   
    console.log(`getRestaurants ran`);
}

function getBikes(radiusDay=20,length=0, hikingAlso){
    const params= {
        lat: latitude,
        lon: longitude,
        maxDistance:radiusDay,
        minLength: length,
        maxResults:'100',
        key: bikeKey,   
        };
    const url = `${bikeEndPoint}?lat=${latitude}&lon=${longitude}&maxDistance=${radiusDay}&minLength=${length}&maxResults=100&key=${bikeKey}`;
    console.log(`bike url ${url}`);

   fetch(url)
     .then(response=>{
        if(response.ok){
            return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson=>{
         console.log(`bike called worked`);
         //console.log(responseJsonHiking);
         if(hikingAlso){
            resultsHikingOrBiking(responseJson, false); 
            getHikes(radiusDay,length, true);
         }
         else{resultsHikingOrBiking(responseJson, true);}
         
      })
      .catch(err => {
        $('#js-error-message').text(`Sorry, I may be out hiking. Try again`)
     });
     
   console.log(`getBikes ran`);
}

function getHikes(radiusDay=20,length=0, bikeAlso){
    const params= {
        lat: latitude,
        lon: longitude,
        maxDistance:radiusDay,
        minLength: length,
        maxResults:'100',
        key: hikeKey,   
        };
    const url = `${hikeEndPoint}?lat=${latitude}&lon=${longitude}&maxDistance=${radiusDay}&minLength=${length}&maxResults=100&key=${hikeKey}`;
    console.log(`hike url ${url}`);

   fetch(url)
     .then(response=>{
        if(response.ok){
            return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson=>{
         console.log(`hike called worked`);
         resultsHikingOrBiking(responseJson, true)
      })
      .catch(err => {
        $('#js-error-message').text(`Something went wrong. Try again in a bit`)
     });
     
    console.log(`getHikes ran`);
}


function callAPIs(radiusDay,length, hiking,mtnbiking,radiusNight){
 //call all of the individual API functions
 //getLatLong();
 //getRestaurants();
 //call getHikes and getBikes if checked and only call PickActivities for one of them)(timing??)
 if(mtnbiking==='yes' && hiking==='yes'){
     getBikes(radiusDay,length, true);
    }
 else if(mtnbiking==='yes' && hiking==='no'){
     getBikes(radiusDay,length, false)
    }
 else if(mtnbiking==='no' && hiking==='yes' ){
    getHikes(radiusDay,length, false)
 }

//then call the displayResults function   
    console.log(`callAPIs ran`);
}
//end of API functions



function watchFormSubmit(){
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
    let radiusNight = $('#radius-night').val();
    console.log(`rd${radiusDay} lenght${length} hiking${hiking} biking${mtnbiking} rn${radiusNight} `);
    callAPIs(radiusDay, length, hiking,mtnbiking,radiusNight);
});
    console.log(`watchFormSubmit ran`);
}

$(watchFormSubmit);