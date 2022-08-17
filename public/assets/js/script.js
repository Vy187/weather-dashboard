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
        currentIcon: `<i src="http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png"></i>`,
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

const renderData = async ({name, currentDate, currentIcon, currentTemp, currentWind, currentHumidity, currentUvIndex, forcast}) => {
    console.log(name);
    console.log(currentDate);
    console.log(currentIcon);
    console.log(currentTemp);
    console.log(currentWind);
    console.log(currentHumidity);
    console.log(currentUvIndex);
    console.log(forcast);
}

const getAndRenderData = () => getData().then(parseDataNeeded).then(renderData)

$("#search").on("click", getAndRenderData);