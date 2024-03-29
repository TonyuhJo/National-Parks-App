'use strict';

const apiKey = 'qIkzElyHMtSpcAYe0tfTuzpwDA01ki1h7TBWxGab';
const searchUrl = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params){
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson){
  console.log(responseJson);
  $('#results-list').empty();

  for(let i = 0; i < responseJson.data.length; i++){
    $('#results-list').append(`<li><h3>${responseJson.data[i].fullName}</h3>
    <p>${responseJson.data[i].description}</p>
    <p><a href='${responseJson.data[i].url}' target='_blank'><p>Visit the website</a>`
  )};

  $('#results').removeClass('hidden');
};

function getParkResults(state, maxResults){
  const params = {
    api_key: apiKey,
    stateCode: state,
    limit: maxResults
  };

  const queryString = formatQueryParams(params);
  const url = searchUrl + '?' + queryString;

  console.log(url);

  fetch(url)
    .then (response => {
      if(response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const state = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getParkResults(state, maxResults)
  });
}

$(watchForm);