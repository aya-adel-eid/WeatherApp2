var weatherResult;
var inputSearch = document.getElementById("searchinput");
var rowData = document.getElementById("DateRow");
var btnFind = document.getElementById("findBtnn");
var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
async function getWeather(city = "cairo") {
  var weatherURL = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=b1b6a81d6a9b4385af4120937251209&q=${city}&days=4`
  );
  weatherResult = await weatherURL.json();
 
  display(weatherResult);
  console.log(weatherResult);
}
getWeather();

function display(data) {
  var dateObject = new Date(data.current.last_updated);
  var dayName = days[dateObject.getDay()];
  var dayNumber = dateObject.getDate();

  var monthNume = months[dateObject.getMonth()];
  var secondDateObj = new Date(data.forecast.forecastday[1].date);
  var secondDayNum = days[secondDateObj.getDay()];

  var thirdDateObj = new Date(data.forecast.forecastday[2].date);
  var thirdDayNum = days[thirdDateObj.getDay()];
  var fourDateObj = new Date(data.forecast.forecastday[3].date);
  var fourDayNum = days[fourDateObj.getDay()];
  var content = `
 <div class="col-lg-8  ">
   <div class="inneer text-center">
       <h5 class="name-city">${data.location.name},${data.location.country}</h5>
       <p class="myprg">${dayName},${monthNume}<span>${dayNumber}</span></p>
       
       <p class="degree text-white">${data.current.temp_c}  <sup>o</sup> </p>
       <div class="icon-deg ps-3">
              <img src="https:${data.current.condition.icon}" >
              </div>
              <div class="status ps-3 pb-1">${data.current.condition.text}</div>
       <div class="icons d-flex pb-5 justify-content-center">
             <span class="px-3" ><img src="imges/icon-umberella.png" alt=""><span class="ps-2">${
               data.current.humidity
             }%</span></span>
             <span class="px-3"><img src="imges/icon-wind.png" alt=""><span class="ps-2">${
               data.current.wind_kph
             }Km/h</span></span>
             <span class="px-3"><img src="imges/icon-compass.png" alt=""><span class="ps-2">${returnDirctionWind(
               data.current.wind_dir
             )}</span></span>
              </div>
  
     </div>
 </div>
 <div class="row py-4 gy-2">
 <div class="col-lg-4 col-md-6">
    <div class="inner my-inner py-1">
      <p>${secondDayNum}</p>
      <div class="icon pt-1">
                <img src="https:${
                  data.forecast.forecastday[1].day.condition.icon
                }">
                </div>
                <div class="degre">${data.forecast.forecastday[1].day.maxtemp_c}
                  <sup>o</sup> \\ ${
                   data.forecast.forecastday[1].day.mintemp_c
                 }<sup>o</sup>
                </div>
                <div class="status">
                  ${data.forecast.forecastday[1].day.condition.text}
                </div>
    </div>
   </div>
    <div class="col-lg-4 col-md-6">
    <div class="inner my-inner py-2">
      <p>${thirdDayNum}</p>
      <div class="icon pt-1">
                <img src="https:${
                  data.forecast.forecastday[2].day.condition.icon
                }">
                </div>
                <div class="degre">${data.forecast.forecastday[2].day.maxtemp_c}
                  <sup>o</sup> \\ ${
                   data.forecast.forecastday[2].day.mintemp_c
                 }<sup>o</sup>
                </div>
                <div class="status">
                  ${data.forecast.forecastday[2].day.condition.text}
                </div>
    </div>
   </div>
   <div class="col-lg-4 col-md-6">
    <div class="inner my-inner py-2">
      <p>${fourDayNum}</p>
      <div class="icon pt-1">
                <img src="https:${
                  data.forecast.forecastday[3].day.condition.icon
                }">
                </div>
                <div class="degre">${data.forecast.forecastday[3].day.maxtemp_c}
                  <sup>o</sup> \\ ${
                   data.forecast.forecastday[3].day.mintemp_c
                 }<sup>o</sup>
                </div>
                <div class="status">
                  ${data.forecast.forecastday[3].day.condition.text}
                </div>
    </div>
   </div>
 </div>
  `;
  rowData.innerHTML = content;
}
function returnDirctionWind(dir) {
  var direction;
  switch (dir) {
    case "N":
      direction = "North";
      break;
    case "NE":
      direction = "North East";
      break;
    case "E":
      direction = "East";
      break;
    case "SE":
      direction = "South East";
      break;
    case "S":
      direction = "South";
      break;
    case "SW":
      direction = "South West";
      break;
    case "W":
      direction = "West";
      break;
    case "NW":
      direction = "North West";
      break;
    case "WSW":
      direction = "West-SouthWest";
      break;
    default:
      direction = dir;
      break;
  }
  return direction;
}
function search() {
  getWeather(inputSearch.value);
}
inputSearch.addEventListener("input", function () {
  search();
});
btnFind.addEventListener("click", function () {
  search();
});
