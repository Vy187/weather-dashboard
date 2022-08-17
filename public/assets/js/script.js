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
        currentUvIndex: data.current.uvi
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
    $(`#today`).attr(`style`, `border: 2px solid black`)
    $(`#cityName`).text(`${name} ${currentDate}`);
    $(`#currentIcon`).attr(`src`, `${currentIcon}`);
    $(`#tempature`).text(`${currentTemp}`);
    $(`#wind`).text(`${currentWind}`);
    $(`#humidity`).text(`${currentHumidity}`);
    $(`#uvIndexText`).text(`UV Index: `);

    if (currentUvIndex < 3) {
        $(`#uvIndexValue`).text(`${currentUvIndex}`).attr(`style`, `background-color: #00FF00`);
    } else if (currentUvIndex < 6) {
        $(`#uvIndexValue`).text(`${currentUvIndex}`).attr(`style`, `background-color: #FFFF00`);
    } else {
        $(`#uvIndexValue`).text(`${currentUvIndex}`).attr(`style`, `background-color: #FF0000`);
    }

    cards = document.querySelectorAll(`figure`);

    for(i = 0; i < forcast.length; i++) {
        cards[i].setAttribute(`style`, `background-color: blue`);
        cards[i].children[0].textContent = `${forcast[i].date}`
        cards[i].children[1].setAttribute(`src`, forcast[i].icon)
        cards[i].children[2].textContent = `${forcast[i].temp}`
        cards[i].children[3].textContent = `${forcast[i].wind}`
        cards[i].children[4].textContent = `${forcast[i].humidity}`
    }

    hidden = document.querySelectorAll(`.hidden`);

    if(hidden.length !== 0) {
        for(i = 0; i < hidden.length; i++){
            hidden[i].setAttribute(`class`, `visible`)
        }  
    }
}

const getAndRenderData = () => getData().then(parseDataNeeded).then(renderData)

// let dataRetrieved = JSON.parse(localStorage.getItem(`tempData`));

// parseDataNeeded(dataRetrieved).then(renderData);
$("#search").on("click", getAndRenderData);