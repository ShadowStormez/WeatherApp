document.getElementById('searchButton').addEventListener('click', function() {
    const city = document.getElementById('city').value;
    const apiKey = '53aa36d40a99579415b1b0b91a3af598'; //API az openWeathermap gereftam
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                alert('City not found');
                return;
            }

            const cityName = data.name;
            const temperature = data.main.temp;
            const description = data.weather[0].description;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
            const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

            document.getElementById('cityName').textContent = cityName;
            document.getElementById('temperature').textContent = `${temperature} °C`;
            document.getElementById('description').textContent = description;
            document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
            document.getElementById('wind').textContent = `Wind Speed: ${windSpeed} m/s`;
            document.getElementById('icon').src = icon;
            document.getElementById('icon').style.display = 'block';
            document.getElementById('icon').alt = description;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data');
        });
});
