const apiKey = "f7cfadf4fcec504badf3285e0227fee9";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
const cities = ["London", "Paris", "Abuja", "Lisbon", "Moscow", "Toronto", "Madrid", "New York", "Tokyo", "Sydney"];
const weatherExample = document.getElementById("weatherInfo");
const quickCityButtons = document.querySelectorAll(".quick-city-button");
const cityName = document.getElementById("cityName")
const cityTemp = document.getElementById("cityTemp")
const cityHumidity = document.getElementById("cityHumidity")
const cityDescription = document.getElementById("cityDescription")
const searchButton = document.querySelector("#searchButton");
const searchInput = document.querySelector("#searchInput");
const cityCard = document.getElementById("cityCard")

const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
    const body = document.body
    body.classList.toggle('dark');
    const isDarkMode = body.classList.contains('dark');
    darkModeToggle.innerHTML = isDarkMode ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
});

document.addEventListener("DOMContentLoaded", function () {
    async function fetchCityWeather(city) {
        try {
            const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}`)
            const data = await response.json()
            return data
        } catch (error) {
            console.log(error)
        }
    }

    function fetchWeatherArray() {
        weatherExample.innerHTML = ""
        Promise.all(cities.map(city => fetchCityWeather(city)))
            .then(weatherDataArray => {
                console.log("weatherDataArray", weatherDataArray)
                weatherDataArray.forEach(data => {
                    console.log(data)
                    const weatherDescription = data.weather[0].description;
                    const cityName = data.name
                    const temperature = data.main.temp;
                    const humidity = data.main.humidity;

                    const weatherInfoHTML = `<p>${cityName} : ${temperature}°C</p>`;

                    weatherExample.innerHTML += weatherInfoHTML;
                })
            }) 
    }

    fetchWeatherArray()

    quickCityButtons.forEach((button) => {
        button.addEventListener("click", async () => {
          const cityName = button.innerText;
          const weatherData = await fetchCityWeather(cityName);
          displayWeather(weatherData);
        });
    });

    const displayWeather = async (data) => {
        cityCard.className = "bg-white p-4 rounded-md shadow-md dark:bg-gray-800 mt-4";
        cityName.textContent = data.name
        cityTemp.textContent = `Temperature: ${data.main.temp}°C`
        cityHumidity.textContent = `Humidity: ${data.main.humidity}%`
        cityDescription.textContent = `Description: ${data.weather[0].description}`
      };

    searchButton.addEventListener("click", async () => {
        const cityName = searchInput.value;
        if (cityName.trim() !== "") {
            const weatherData = await fetchCityWeather(cityName);
            displayWeather(weatherData);
        } else {
            alert("Please enter a city name.");
        }
    });
});