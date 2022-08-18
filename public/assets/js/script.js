let savedCites = JSON.parse(localStorage.getItem(`savedCities`));

const getData = (searchedText) =>
    fetch(`/api/` + searchedText, {
        method: `GET`,
        headers: { 'Content-Type': 'application/json' }
    })

const parseDataNeeded = async (dataRetrieved) => {
    let data = await dataRetrieved.json();

    if (data.cod != 404) {
        parsedData = {
            cod: 200,
            name: data.name,
            currentDate: `${moment.unix(data.current.dt).format(`M/D/YYYY`)}`,
            currentIcon: `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`,
            currentTemp: `Temp: ${data.current.temp} °F`,
            currentWind: `Wind: ${data.current.wind_speed} MPH`,
            currentHumidity: `Humidity: ${data.current.humidity} %`,
            currentUvIndex: data.current.uvi
        }

        let forcast = [];

        for (i = 0; i < 5; i++) {
            currentForcast = {
                date: `${moment.unix(data.daily[i].dt).format(`M/D/YYYY`)}`,
                icon: `http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`,
                temp: `Temp: ${data.daily[i].temp.max} °F`,
                wind: `Wind: ${data.daily[i].wind_speed} MPH`,
                humidity: `Humidity: ${data.daily[i].humidity} %`
            }

            forcast.push(currentForcast);
        }

        parsedData.forcast = forcast;
        return parsedData;
    } else {
        return data;
    }

}

const renderData = ({ cod, name, currentDate, currentIcon, currentTemp, currentWind, currentHumidity, currentUvIndex, forcast }) => {
    if (cod == 200) {
        $(`#today`).attr(`style`, `border: 2px solid black`);
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

        for (i = 0; i < forcast.length; i++) {
            cards[i].setAttribute(`style`, `background-color: blue`);
            cards[i].children[0].textContent = `${forcast[i].date}`;
            cards[i].children[1].setAttribute(`src`, forcast[i].icon);
            cards[i].children[2].textContent = `${forcast[i].temp}`;
            cards[i].children[3].textContent = `${forcast[i].wind}`;
            cards[i].children[4].textContent = `${forcast[i].humidity}`;
        }

        hidden = document.querySelectorAll(`.hidden`);

        if (hidden.length !== 0) {
            for (i = 0; i < hidden.length; i++) {
                hidden[i].setAttribute(`class`, `visible`);
            }
        }

        $(`#city`).val(``);
        $(`#city`).attr(`placeholder`, `Enter a city name`);

        savedCites = JSON.parse(localStorage.getItem(`savedCities`));
        let cityName = name;

        if (savedCites == null) {
            cityName = [cityName];
            localStorage.setItem(`savedCities`, JSON.stringify(cityName));
            $(`#saveContainer`).append(`<button>${cityName}</button>`);
        } else if (!(savedCites.includes(name))) {
            savedCites.push(cityName);
            savedCites.sort();
            localStorage.setItem(`savedCities`, JSON.stringify(savedCites));
            $(`#saveContainer`).append(`<button>${cityName}</button>`);
        }
    } else {
        $(`#city`).val(``);
        $(`#city`).attr(`placeholder`, `Enter a valid city name`);
    }
}

const loadSavedCities = (savedCities) => {
    for (i = 0; i < savedCities.length; i++) {
        $(`#saveContainer`).append(`<button>${savedCities[i]}</button>`);
    }

    $(`#clear`).attr(`class`, `visible`);
}

const clearHistory = () => {
    const buttons = document.querySelectorAll(`button`);

    for (i = 1; i < buttons.length - 1; i++) {
        buttons[i].remove();
    }

    $(`#clear`).attr(`class`, `hidden`);
    localStorage.removeItem(`savedCities`);
}

const getAndRenderData = (searchedText) => getData(searchedText).then(parseDataNeeded).then(renderData);

if (savedCites != null) {
    loadSavedCities(savedCites);
}

$(`aside`).on(`click`, (event) => {
    if (event.target.tagName == `BUTTON`) {
        switch(event.target.textContent) {
            case `Search`:
                if($(`#city`).val() !== ''){
                    getAndRenderData($(`#city`).val());
                } else {
                    $(`#city`).attr(`placeholder`, `Enter a valid city name`);
                }
                break;
            case `Clear History`:
                clearHistory();
                break;
            default:
                getAndRenderData(event.target.textContent);
        }
    }
})