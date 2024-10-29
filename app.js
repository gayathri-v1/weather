const searchBtn=document.querySelector('button');
const locationName= document.querySelector('input');
searchBtn.addEventListener('click',()=>{


    clearDiv();
    const value=locationName.value.trim();
    if(value){
        urlGenerator(value);

    }
    else{
        console.log("Enter valid location")
    }
    locationName.value='';
})

function urlGenerator(locationName){
const prefix='https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'
const loc=locationName;
const key='?key=2DHN79REGFQTMJ5WTGTPXKYAL'
const url=`${prefix}${loc}${key}`;
api(url);
}

function api(url){
fetch( url,{mode: 'cors'})
.then(function(response) {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
    }
    return response.json();
  })
  .then(function(response) {
    const resolvedAddress=response.resolvedAddress;
    const timeZone= response.timezone;
    const latitude= response.latitude;
    const longitude= response. longitude;
    const condition= response.currentConditions.conditions;
    const humidity=response.currentConditions.humidity;
    const temp=response.currentConditions.temp;
    const windspeed=response.currentConditions.windspeed;
    renderLocationInfo(resolvedAddress,timeZone,latitude,longitude);
    renderWeatherInfo(condition,humidity,temp,windspeed);

  })
  .catch(error => console.error('There was a problem with the fetch operation:', error));

}

const result= document.querySelector('.result');
function renderLocationInfo(resolvedAddress,timeZone,latitude,longitude){
    const locDiv= document.createElement('div');
    locDiv.className='locDiv';
    locDiv.innerHTML=`
        <h3>Location: ${resolvedAddress}</h3>
        <p>Time zone: ${timeZone}</p>
        <p>Latitude: ${latitude}</p>
        <p>Longitude: ${longitude}</p>

    `;



    result.append(locDiv);

}
function renderWeatherInfo(condition,humidity,temp,windspeed){
    const weatherDiv= document.createElement('div');
    weatherDiv.className='weatherDiv';
    weatherDiv.innerHTML=`
        <h3>${condition}</h3>
        <p>Humidity: ${humidity} %</p>
        <p>Temperature: ${temp}F</p>
        <p>windspeed: ${windspeed} km/h</p>

    `;
    result.append(weatherDiv);



}

function clearDiv(){
    const result=document.querySelector('.result');
    result.innerHTML='';
    
}

