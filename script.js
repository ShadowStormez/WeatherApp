document.addEventListener('DOMContentLoaded', function() {
    const cityInput = document.getElementById('city');
    const suggestions = document.getElementById('suggestions');
    const searchButton = document.getElementById('searchButton');
    const weatherApiKey = '53aa36d40a99579415b1b0b91a3af598'; //API az openweathermap gereftam
    const unsplashApiKey = 'sZMirKM-eeuRTU9lpyQevYUcDeQrwQ3FTH1gJXBuLso'; //API unsplash vase axa

    const geodbApiKey = '5b387565a0mshf161f8c6be536d1p14fa1bjsnaf9b6fc51774'; // API geoDB vase searchbar live;Yekhurde hamkhooni nadare ba api openweathermap;yeseri shahr suggest mikone ke openweather nadarateshon.Be bozorgi khodeton bebakhshid

    // geoDB API fetch ke ba search input sync hast va tebghe chizi ke user type mikone suggestion mide
    cityInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        suggestions.innerHTML = '';
        //baade dota character taze miad migarde match peyda kone
        if (query.length > 2) {
            fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${query}`, {
                method: 'GET',
                headers: {
                    'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
                    'x-rapidapi-key': geodbApiKey
                }
            })
            .then(response => response.json())
            .then(data => {
                const cities = data.data;
                if (cities.length > 0) {
                    cities.forEach(city => {
                        //inja miad be ezaye har match ye list item misaze
                        const li = document.createElement('li');
                        li.textContent = `${city.name}, ${city.country}`;
                        //injam age shoma ru yeki az on suggestionash click koni miad un meghdaro tu input gharar mide va ul napadid mishavad :)
                        li.addEventListener('click', () => {
                            cityInput.value = city.name;
                            suggestions.innerHTML = '';
                            suggestions.style.display = 'none';
                        });
                        suggestions.appendChild(li); //injam miad ul ro ba un list itemayi ke sakhte shode populate mikone
                    });
                    suggestions.style.display = 'block'; //masoule namayesh ul age match peyda karde bashe tu shahra(hadeaghal yeki)
                } else {
                    suggestions.style.display = 'none'; //ul namayesh dade nemishe age shahri peyda nakone
                }
            })
            .catch(error => {
                console.error('Error fetching cities:', error);
            });
        } else {
            suggestions.style.display = 'none'; //do character ya kamtar ul namayesh dade nemishe
        }
    });

    //click handlere search button;vaghti searcho click konim value inputo migire va be ezaye un meghdar mire query mizane(ham tu openweather ham unsplash);
    searchButton.addEventListener('click', function() {
        const city = cityInput.value;
        const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`;
        const unsplashApiUrl = `https://api.unsplash.com/search/photos?query=${city}&client_id=${unsplashApiKey}`;
    //tu in fetch age be ezaye un esme shahri ke vared kardim tu API openweather resulti bashe miad dastoorate baade if ro ejra mikone
        fetch(weatherApiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.cod === '404') {
                    alert('City not found');
                    return;
                }
                //inja age resulti peyda karde bashe miad in maghadiro az API migire mirize tu in moteghayera
                const cityName = data.name;
                const temperature = data.main.temp;
                const description = data.weather[0].description;
                const humidity = data.main.humidity;
                const windSpeed = data.wind.speed;
                const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
                //showtime:moteghayeraro midim be elementaye html(ba estefade az DOM)
                document.getElementById('cityName').textContent = cityName;
                document.getElementById('temperature').textContent = `${temperature} °C`;
                document.getElementById('description').textContent = description;
                document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
                document.getElementById('wind').textContent = `Wind Speed: ${windSpeed} m/s`;
                document.getElementById('icon').src = icon;
                document.getElementById('icon').style.display = 'block';
                document.getElementById('icon').alt = description;
                //tu in fetch ham miaym backgrounde safhamoono motenaseb ba esme shahr set mikonim;albate age result dashte bashe searchemon
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

                document.querySelector('.search').style.opacity = '0.5'; //search ke tamoom shod containeremun shafaf mishe
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                alert('Error fetching weather data');
            });
    });

    // Harja kharej ul click koni ul mipare
    document.addEventListener('click', function(e) {
        if (!cityInput.contains(e.target) && !suggestions.contains(e.target)) {
            suggestions.style.display = 'none';
        }
    });
});
