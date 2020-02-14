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
const lat = 40.0274;
const lon = -105.2519;
//remove once set up getlatLong

const hikeKey = '200684713-dde33619c13cd28faa7456223edcf195';
const bikeKey = '200684713-dde33619c13cd28faa7456223edcf195';
const restaurantHeader = 'user-key:e5800b1de7b26545fe07ad6a49160396';
const latLongKey = '6c790e07e8a9409b98ba70f8cbde2eab';

const hikeUrl = 'https://www.hikingproject.com/data/get-trails';
const bikeUrl = 'https://www.mtbproject.com/data/get-trails';
const restaurantUrl = 'https://developers.zomato.com/api/v2.1/search';
const latLongUrl = 'https://api.opencagedata.com/geocode/v1/json';

function pickResultsDay(){
 //this function will take in the results from the day apis and then select 2 random options out of those results to returned   
    console.log(`pickResults ran`);
}

function pickResultsEvening(){
//this function will take in the results from the evening apis and then select 2 random options out of those results to returned   
       console.log(`pickResults ran`);
   }

function displayResults(){
//this function will call the pickResults functions which will select 2 random options out of the results returned by the api(s)
//this function will render/display these results plus a start over button, home button, learn more button    
    console.log(`displayResultsRan`);
}


function formatParamaters(){
//take in input from forms; lat/long and format parameters and headers (if necessary) for each API
//pass these parameters (and headers) to the api call function (one function will then call all API functions)
    console.log(`formatParamaters ran`);
}

//API functions
 //each individual function will combine the parameters with the correct api url and then call the api using fetch; throwing an error for no reponse and catching errors with error message
function getLatLong(){
    console.log(`getLatLong ran`);
}

function getRestaurants(){
    console.log(`getRestaurants ran`);
}

function getBikes(){
    console.log(`getBikes ran`);
}

function getHikes(){
    console.log(`getHikes ran`);
}

function callAPIs(){
 //call all of the individual API functions
 //then call the displayResults function   
    console.log(`callAPIs ran`);
}
//end of API functions



function watchFormSubmit(){
//listen for submit event (click button or enter), prevent default
//retrieve input values and store in an array
//call the function to format the parameters and header of the api calls
    console.log(`watchFormSubmit ran`);
}

$(watchFormSubmit);