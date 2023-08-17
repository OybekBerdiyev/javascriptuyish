const express = require("express");
const config = require("config");
const fileUpload = require("express-fileupload");

<<<<<<< HEAD


=======
>>>>>>> 0c95270a227b3eb6e4c1fd2cfe7675a6d1425075
const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload());
app.use(express.static(process.cwd() + "/uploads"));


app.use("/api", routes)

const port = config.get("port");

app.listen(port, () => {
  console.log(port);
});
