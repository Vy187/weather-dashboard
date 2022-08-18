const express = require(`express`);
const path = require(`path`);
const api = require(`./routes/api`);
const app = express();
const rateLimit = require(`express-rate-limit`);
const limiter = rateLimit({ windowMs: 1000, max: 1 })
const PORT = process.env.PORT || 3001;

app.use(limiter);
app.use(express.static(`public`));
app.use(`/api`, api);

app.get(`/`, (req, res) => res.sendFile(path.join(__dirname, `/public/index.html`)));

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));