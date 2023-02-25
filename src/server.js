require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOSTNAME;
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));  
// const fileUpload = require('express-fileupload');

// default options
// app.use(fileUpload());

const webRouter = require("./routes/web");
const apiRouter = require("./routes/api");
const { connection } = require("./configs/database");
const { configViewEngine } = require("./configs/viewEngine");

configViewEngine(app);

app.use("/", webRouter);
app.use("/v1/api", apiRouter);

(async () => {
  try {
    await connection();
    app.listen(port, hostname, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
