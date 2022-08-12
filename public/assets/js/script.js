function searchCity() {
    fetch("http://api.openweathermap.org/data/2.5/weather?q=" + $("#city").val() + "&limit=1&units=imperial&appid=" + apiKey)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function(data){
            console.log(data);
        })

}

// $("#search").on("click", searchCity);