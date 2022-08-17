const getData = () =>
    fetch(`/api/` + $(`#city`).val(), {
        method: `GET`,
        headers: { 'Content-Type': 'application/json' }
    })

const parseDataNeeded = async (dataRetrieved) => {
    let data = await dataRetrieved.json();

    parsedData = {
        name: data.name,
        currentDate: `${moment.unix(data.current.dt).format(`M/D/YYYY`)}`,
        currentIcon: `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`,
        currentTemp: `Temp: ${data.current.temp} °F`,
        currentWind: `Wind: ${data.current.wind_speed} MPH`,
        currentHumidity: `Humidity: ${data.current.humidity}`,
        currentUvIndex: `UV Index: ${data.current.uvi}`,
    }

    let forcast = [];

    for (i = 0; i < 5; i++) {
        currentForcast = {
            date: `${moment.unix(data.daily[i].dt).format(`M/D/YYYY`)}`,
            icon: `http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`,
            temp: `Temp: ${data.daily[i].temp.max} °F`,
            wind: `Wind: ${data.daily[i].wind_speed} MPH`,
            humidity: `Humidity: ${data.daily[i].humidity}`
        }

        forcast.push(currentForcast);
    }

    parsedData.forcast = forcast;
    return parsedData;
}

const renderData = ({name, currentDate, currentIcon, currentTemp, currentWind, currentHumidity, currentUvIndex, forcast}) => {
    $(`#cityName`).text(`${name} ${currentDate}`);
    $(`#currentIcon`).attr(`src`, `${currentIcon}`);
    $(`#tempature`).text(`${currentTemp}`);
    $(`#wind`).text(`${currentWind}`);
    $(`#humidity`).text(`${currentHumidity}`);
    $(`#uvIndex`).text(`${currentUvIndex}`);

    cards = document.querySelectorAll(`figure`);

    for(i = 0; i < forcast.length; i++) {
        cards[i].children[0].textContent = `${forcast[i].date}`
        cards[i].children[1].setAttribute(`src`, forcast[i].icon)
        cards[i].children[2].textContent = `${forcast[i].temp}`
        cards[i].children[3].textContent = `${forcast[i].wind}`
        cards[i].children[4].textContent = `${forcast[i].humidity}`
    }
}

const getAndRenderData = () => getData().then(parseDataNeeded).then(renderData)

$("#search").on("click", getAndRenderData);