document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "f7cfadf4fcec504badf3285e0227fee9"; // Replace with your OpenWeatherMap API key
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
    const cities = ["London", "Paris", "New York", "Tokyo", "Sydney"];

    const weatherInfoElement = document.getElementById("weatherInfo");

    // async function fetchCityWeather(city) {
    //     try {
    //         const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}`)
    //         const data = await response.json()
    //         return data
    //     } catch (error) {
    //         console.log(error)
    //         weatherInfoElement.innerHTML = error
    //     }
    // }

    function fetchCityWeather(city) {
          return fetch(`${apiUrl}?q=${city}&appid=${apiKey}`)
                    .then(res => res.json())
                    // .then(data => data)
                    .catch(err => console.log(err))            
    }

    function fetchWeather() {
        weatherInfoElement.innerHTML = ""
        Promise.all(cities.map(city => fetchCityWeather(city)))
            .then(weatherDataArray => {
                console.log("weatherDataArray", weatherDataArray)
                weatherDataArray.forEach(data => {
                    console.log(data)
                    const weatherDescription = data.weather[0].description;
                    const cityName = data.name
                    const temperature = data.main.temp;
                    const humidity = data.main.humidity;

                    const weatherInfoHTML = `<div class="my-4">
                        <p><strong>City name:</strong> ${cityName}</p>
                        <p><strong>Description:</strong> ${weatherDescription}</p>
                        <p><strong>Temperature:</strong> ${temperature}°C</p>
                        <p><strong>Humidity:</strong> ${humidity}%</p>
                        </div>
                    `;

                    weatherInfoElement.innerHTML += weatherInfoHTML;
                })
            }) 
    }

    fetchWeather()
});
