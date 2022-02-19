const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const { wrapAsync } = require("../utils/");

require("dotenv").config();

const mongoose = require("../db/index.js");

const { error } = require("../middleware");

const { user } = require("../routes/index.js");
const { default: axios } = require("axios");

const PORT = process.env.PORT || 8080;
const basePath = process.env.BASE_PATH;
const secret = process.env.SECRET_KEY;
const app = express();

app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

app.get(
  `${basePath}/countries`,
  wrapAsync(async (req, res) => {
    const result = await axios.get(
      "http://restcountries.com/v2/all?fields=name,currencies,flags,cca2"
    );
    const countries = result.data;

    res.send({
      success: true,
      data: {
        data: countries,
      },
    });
  })
);

app.use(`${basePath}/user`, user);

app.use(error);

app.listen(PORT, () => {
  console.log(`Now listening on port: ${PORT}`);
});
