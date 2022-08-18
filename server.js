const express = require(`express`);
const path = require(`path`);
const api = require(`./routes/api`);
const app = express();
const PORT = process.env.PORT || 3001;
const rateLimit = require(`express-rate-limit`);
const limiter = rateLimit({ windowMs: 1000, max: 1 });
const cors = require(`cors`);
const whitelist = [`http://localhost:3001/`];
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error(`Note allowed by CORS`))
        }
    },
    optionsSuccessStatus: 200
}

app.use(express.static(`public`));

app.use(limiter);
app.use(cors(corsOptions))

app.use(`/api`, api);

app.get(`/`, (req, res) => res.sendFile(path.join(__dirname, `/public/index.html`)));

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));