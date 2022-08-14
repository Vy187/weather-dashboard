const express = require(`express`);
const path = require(`path`);
const api = require(`./routes/api`);
const app = express();
const PORT = process.env.PORT || 3001;

app.use(`/api`, api);

app.use(express.static(`public`))

app.get(`/`, (req, res) => res.sendFile(path.join(__dirname, `/public/index.html`)));

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));