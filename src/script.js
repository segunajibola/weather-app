document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "f7cfadf4fcec504badf3285e0227fee9"; // Replace with your OpenWeatherMap API key
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
    const city = "Lagos";

    const weatherInfoElement = document.getElementById("weatherInfo");
    const weatherInfoElement2 = document.getElementById("weatherInfo2");
    const weatherInfoElement3 = document.getElementById("weatherInfo3");

    // Fetch weather data
    // fetch(`${apiUrl}?q=${city}&appid=${apiKey}`)
    // fetch("https://api.openweathermap.org/data/2.5/weather"?q="Lagos"?&appid="f7cfadf4fcec504badf3285e0227fee9")
    // Error fetching weather data:"

    fetch(`${apiUrl}?q=${city}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            displayWeatherInfo(data)
            console.log(data)
        })
        .catch(error => {
            console.log("Error: " + error)
            weatherInfoElement.innerHTML = error
        })


    // Display weather information
    function displayWeatherInfo(data) {
        const weatherDescription = data.weather[0].description;
        const temperature = data.main.temp;
        const humidity = data.main.humidity;

        const weatherInfoHTML = `
            <p><strong>Description:</strong> ${weatherDescription}</p>
            <p><strong>Temperature:</strong> ${temperature}°C</p>
            <p><strong>Humidity:</strong> ${humidity}%</p>
            <p><strong>Humidity:</strong> ${city}</p>
        `;

        weatherInfoElement.innerHTML = weatherInfoHTML;
        weatherInfoElement2.innerHTML = weatherInfoHTML;
    }

    async function fetchData() {
        try {
            const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}`)
            const data = await response.json()
            console.log(data)
            return data
        } catch (error) {
            console.log(error)
        }
    }

    async function displayWeatherInfo2() {
        const data = await fetchData()
        const weatherDescription = data.weather[0].description;
        const temperature = data.main.temp;
        const humidity = data.main.humidity;

        const weatherInfoHTML = `
            <p><strong>Description:</strong> ${weatherDescription}</p>
            <p><strong>Temperature:</strong> ${temperature}°C</p>
            <p><strong>Humidity:</strong> ${humidity}%</p>
            <p><strong>Humidity:</strong> ${city}</p>
        `;

        weatherInfoElement3.innerHTML = weatherInfoHTML;
    }
    displayWeatherInfo2()
});
