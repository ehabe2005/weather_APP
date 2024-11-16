// Collect Elements from the DOM and save them in a variable 
const weatherForm = document.getElementById("weatherForm");
const weatherResults = document.getElementById("weatherResults");

// addEventListener for submit and save the name of the city in a variable
weatherForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const city_name = document.getElementById("cityInput").value;
    console.log(city_name);

    // Use Fetch for HTTP request
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=1bac9712b191f21cff6c3938198a121c`);
        if (!response.ok) {
            throw new Error('City not found or API error');
        }
        const data = await response.json();
        console.log(data);

        const temperatureCelsius = (data.main.temp - 273.15).toFixed(2);
        
        const correctTemperature = Math.floor(temperatureCelsius)

        // Display the weather data in the weatherResults div
        weatherResults.innerHTML = `
            <h2>Weather in ${data.name}</h2>
            <p>Temperature: ${correctTemperature}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
        `;
    } catch (error) {
        console.error(error);
        weatherResults.innerHTML = `<p>City not found or API error</p>`;
    }
});
