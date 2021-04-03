let input;
let btn;
let cityName;
let $warning;
let $photo;
let weather;
let temperature;
let humidity;
let apiLink;
let apiKey;
let unists;
let $city;
let url;
function main (){
    prepareDomElements();
    prepareDomEvents();
}
function prepareDomElements(){
    input = document.querySelector('input');
    btn = document.querySelector('button');

    cityName = document.querySelector('.city-name');
    $warning = document.querySelector('.warning');
    $photo = document.querySelector('.photo');

    weather = document.querySelector('.weather');
    temperature = document.querySelector('.temp');
    humidity = document.querySelector('.humidity');

    apiLink = "https://api.openweathermap.org/data/2.5/weather?q=";
    apiKey = "&appid=f2a6824639ae5a2d96c0fe0cb9397ea4";
    unists = "&units=metric";
}
function prepareDomEvents(){
    btn.addEventListener('click', inputPlace)

    input.addEventListener("keyup", (e)=> {
        if(e.keyCode === 13) {
            inputPlace();
        }
    })
}
const getWeather = () => {
    $city = input.value;
    url = apiLink + $city + apiKey + unists;
    
    axios.get(url)
    .then(res =>  {
        const temp = (res.data.main.temp).toFixed(1);
        const hum = res.data.main.humidity;
        const icon = res.data.weather[0].id;
        const weat = res.data.weather[0].description;
        getIcon(icon);
        cityName.textContent = res.data.name;
        temperature.innerHTML = `${temp}°C`;
        humidity.innerHTML = `${hum}%`;
        weather.textContent = weat;
        input.value = "";
        $warning.innerHTML = "";



    })
    .catch(function(){
        $warning.innerHTML = "Nie ma takiej miejscowości!!"
        
        input.value = " ";
        
    });

    
}
function inputPlace () {
        if(input.value !== " "){
            getWeather();
        }else{
            $warning.textContent = "musisz podać jaieś miasto";
        }
}
function getIcon (icon){
    if(icon >= 200 && icon <=232){
        $photo.setAttribute("src", "img/thunderstorm.png" )
    }else if (icon >= 300 && icon <=321){
        $photo.setAttribute("src", "img/drizzle.png" )
    }else if (icon >= 500 && icon <= 504){
        $photo.setAttribute("src", "img/rain.png" )
    }else if (icon >= 505 && icon <= 531){
        $photo.setAttribute("src", "img/drizzle.png" )
    }else if (icon >= 600 && icon <= 622){
        $photo.setAttribute("src", "img/ice.png" )
    }else if (icon >= 701 && icon <= 781){
        $photo.setAttribute("src", "img/fog.png" )
    }else if (icon >= 801 && icon <= 804){
        $photo.setAttribute("src", "img/cloud.png" )
    }else{
        $photo.setAttribute("src", "img/sun.png" )
    }
}
document.addEventListener('DOMContentLoaded', main)
