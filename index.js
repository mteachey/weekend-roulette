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


function resultsHikingBiking(responseJson){
    let numberOfResults = responseJson.trails.length;
    let firstTrailNumber = Math.floor(Math.random() * (numberOfResults+1));     
    let secondTrailNumber = Math.floor(Math.random() * (numberOfResults+1));
    
    dayActivity.push(responseJson.trails[firstTrailNumber]);
    dayActivity.push(responseJson.trails[secondTrailNumber]);
    
    //console.log(firstTrailNumber);
    //console.log(`numberOfResults is ${numberOfResults}`);
    //console.log(`this is the dayActivity array ${dayActivity[0].name}, ${dayActivity[1].name}, ${dayActivity[2].name}, ${dayActivity[3].name}`);
    console.log(`resultsHiking ran`);
    let dayActivityOneNumber = Math.floor(Math.random() * 5);
    let dayActivityTwoNumber = Math.floor(Math.random() * 5);
    console.log(dayActivity[dayActivityOneNumber], dayActivity[dayActivityTwoNumber] )
    displayDayResults(dayActivity[dayActivityOneNumber], dayActivity[dayActivityTwoNumber] );
}


function displayDayResults(activity1,activity2){
//this function will call the pickResults functions which will select 2 random options out of the results returned by the api(s)
//this function will render/display these results plus a start over button, home button, learn more button    
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

function getBikes(radiusDay=20,length=0){
    const params= {
        lat: latitude,
        lon: longitude,
        maxDistance:radiusDay,
        minLength: length,
        maxResults:'100',
        key: bikeKey,   
        };
    const url = `${bikeEndPoint}?lat=${latitude}&lon=${longitude}&maxDistance=${radiusDay}&minLength=${length}&maxResults=100&key=${bikeKey}`;
    console.log(`hike url ${url}`);

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
         resultsHikingBiking(responseJson);
      })
      .catch(err => {
        $('#js-error-message').text(`Something went wrong. Try again in a bit`)
     });
     
   console.log(`getBikes ran`);
}

function getHikes(radiusDay=20,length=0){
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
         resultsHikingBiking(responseJson);
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
 //call getHikes only if hiking is checked
 if(mtnbiking==='yes'){getBikes(radiusDay,length)};
 //call getHikes only if hiking is checked
 if(hiking==='yes'){getHikes(radiusDay,length);}

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