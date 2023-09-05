const express = require("express");
const cors = require("cors");
const {connect} = require("mongoose");
const routes = require("./routes" );
const config = require("../config");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())
app.use("/api", routes);

const bootstrap = async () => {
  await connect(config.db_url);

  app.listen(config.port, () => {
    console.log(config.port);
  });
};

bootstrap();