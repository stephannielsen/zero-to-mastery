import { 
    REQUEST_PLANETS_PENDING,
    REQUEST_PLANETS_SUCCESS,
    REQUEST_PLANETS_FAILED
 } from './constants.js';
 
export const requestPlanets = () => (dispatch) => {
    dispatch({ type: REQUEST_PLANETS_PENDING });
    getStarWarsPlanets(progressCallback)
      .then(data => dispatch({ type: REQUEST_PLANETS_SUCCESS, payload: data }))
      .catch(error => dispatch({ type: REQUEST_PLANETS_FAILED, payload: error }));
}

function getStarWarsPlanets(progress, url = 'https://swapi.co/api/planets', planets = []) {
  return new Promise((resolve, reject) => fetch(url)
    .then(response => {
        if (response.status !== 200)  {
          throw `${response.status}: ${response.statusText}`;
        }
        response.json().then(data => { 
          planets = planets.concat(data.results);

          if(data.next) {
            progress && progress(planets);
            getStarWarsPlanets(progress, data.next, planets).then(resolve).catch(reject)
          } else {
            resolve(planets);
          }
        }).catch(reject);
    }).catch(reject));
}

function progressCallback(planets) {
  // render progress
  console.log(`${planets.length} loaded`);
}