const api = require(`express`).Router();
const fetch = require(`node-fetch`);
require(`dotenv`).config();

const fetchCurrentWeather = async (searchText) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${searchText}&limit=1&units=imperial&appid=${process.env.API_KEY}`;
    try {
        const weatherStream = await fetch(url);
        const weatherJson = await weatherStream.json();
        return weatherJson;
    } catch (err) {
        return { Error: err.stack}
    }
}

const fetchForcastWeather = async (searchText) => {
    const url = `http://api.openweathermap.org/data/2.5/forecast/?q=${searchText}&appid=${process.env.API_KEY}&units=imperial`;
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
    const forcast = await fetchForcastWeather(searchText)
    const data = { current, forcast }
    res.json(data);
})

module.exports = api;