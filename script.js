
async function fetchData1() {
    let response = await fetch(`https://restcountries.com/v3.1/all`);
    let responseData = await response.json();

    responseData.forEach(data => {
        let card = document.createElement('div');
        card.className = 'col-sm-12 col-lg-4';
        card.innerHTML = `
            <div class='card  mt-2 text-center'>
                <div class='card-header'>
                    <h4>${data.name.common}</h4>
                </div>
                <div class="card-body">
                    <img src=${data.flags.png}>
                    <h4>Capital:${data.capital}</h4>
                    <h4>Region:${data.region}</h4>
                    <h4>Country Code:${data.cca3}</h4>
                    <div>
                        <button class="btn btn-primary click-button">Click for Weather</button>
                    </div>
                    <div class="temperatureDiv"></div>
                </div>
            </div>`;

        row.appendChild(card);

        
        let button = card.querySelector('.click-button');
        button.addEventListener('click', () => {
            myFunction(data.latlng[0], data.latlng[1], card);
        });
    });
}

function myFunction(lat, lon, card) {
    console.log("Button clicked");

    
    fetchWeatherData(lat, lon, card);
}

async function fetchWeatherData(lat, lon, card) {
    try {
        let weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=05fb5304a0c9a6590a286b7f2ca6d923`);
        let weatherData = await weatherResponse.json();
        console.log("Weather data:", weatherData);

      
        let temperatureDiv = card.querySelector('.temperatureDiv');
        temperatureDiv.innerHTML = `<h4>Temperature: ${weatherData.main.temp} °C</h4>`;
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

let container = document.createElement('div');
container.setAttribute('class', 'container');
let row = document.createElement('div');
row.setAttribute('class', 'row');
document.body.appendChild(container);
container.append(row);


fetchData1();