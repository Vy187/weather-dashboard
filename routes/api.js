const api = require(`express`).Router();
const fetch = require(`node-fetch`);
require(`dotenv`).config();

const fetchCurrentWeather = async (searchText) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${searchText}&appid=${process.env.API_KEY}`;
    try {
        const weatherStream = await fetch(url);
        const weatherJson = await weatherStream.json();
        return weatherJson;
    } catch (err) {
        return { Error: err.stack}
    }
}

const fetchForcastWeather = async (lat, lon) => {
    const url = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly,alerts&appid=${process.env.API_KEY}`;
    try {
        const weatherStream = await fetch(url);
        const weatherJson = await weatherStream.json();
        return weatherJson;
    } catch (err) {
        return { Error: err.stack}
    }
}

api.get(`/:searchText`, async (req, res) =>{
    const searchText = req.params.searchText;
    const current = await fetchCurrentWeather(searchText);
    const forcast = await fetchForcastWeather(current.coord.lat, current.coord.lon);
    const name = current.name
    const forcastWithCityName = { name , forcast }
    res.json(forcastWithCityName);
})

module.exports = api;