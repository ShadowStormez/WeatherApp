document.getElementById('searchButton').addEventListener('click', function() {
    const city = document.getElementById('city').value;
    const weatherApiKey = '53aa36d40a99579415b1b0b91a3af598'; //API az openweathermap gereftam
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`;
    const unsplashApiKey = 'sZMirKM-eeuRTU9lpyQevYUcDeQrwQ3FTH1gJXBuLso'; //API unsplash
    const unsplashApiUrl = `https://api.unsplash.com/search/photos?query=${city}&client_id=${unsplashApiKey}`;
    
    fetch(weatherApiUrl)
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

            fetch(unsplashApiUrl)
                .then(response => response.json())
                .then(imageData => {
                    if (imageData.results && imageData.results.length > 0) {
                        const imageUrl = imageData.results[0].urls.regular;
                        document.body.style.backgroundImage = `url(${imageUrl})`;
                    }
                })
                .catch(error => {
                    console.error('Error fetching image:', error);
                });

                //user search kard yekhurde shafaf mishe forme
            document.querySelector('.search').style.opacity = '0.5';
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data');
        });
});
