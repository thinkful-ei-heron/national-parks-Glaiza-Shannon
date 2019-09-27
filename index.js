'use strict';

const apiKey = '2qEaXcjPKAUsTdcYWterucJ5hVFwBIQzmfD91qXx';
const searchUrl = 'https://developer.nps.gov/api/v1/parks/';

function formatQueryParams(params){
    const queryItems = Object.keys(params)
    .map(key => `${key}=${params[key]}`);
    console.log(queryItems.join('&'));
    return queryItems.join('&');
}

function displayResults(jsonData,maxResults=10) {
    $('.searchResults').html('');
    for(let i = 0; i < jsonData.data.length & i < maxResults ; i++ ) {
        $('.searchResults').append(
            `<li> <h2>${jsonData.data[i].fullName}</h2>
                <p>${jsonData.data[i].description}</p>
                <p><a href="${jsonData.data[i].url}"> Click here to visit website </Click></a></p>
                <p>${jsonData.data[i].directionsInfo}</p>
            </li>`
            //<h2>${jsonData.data[i].states}</h2>
        )
    }

    $('section').removeClass('hidden');
   
}

function getParksData(stateCode, maxResults){
    const params = {
        api_key: apiKey,
        stateCode,
        maxResults
    }
    const queryString = formatQueryParams(params);
    const url = searchUrl + '?' + queryString;

    console.log(url);

    fetch(url) 
        .then(res => {
            if(res.ok){
                return res.json();
            }
            throw new Error(res.statusText);
        })
        .then(jsonData=> displayResults(jsonData, maxResults))
        .catch(error => console.log(error));
    
}

function submitParkSearch() {
    $('.searchParks').submit(event => {
        event.preventDefault();
        let stateInput = $('.userInputState').val();
        stateInput = stateInput.replace(/\s+/g, '');
        console.log(stateInput);
        const resultInput = $('.userInputNumResults').val();
        
        getParksData(stateInput,resultInput);
        //Emptying Input Fields
        $('.userInputState').val('');
        $('.userInputNumResults').val('');
    });
}
$(submitParkSearch);