const Express = require("express");
const database = require("./config/database");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = Express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

database.sync().then(() => {
  app.listen(PORT, () => {
    console.log("Servidor esta rodando na porta " + PORT);
  });
});
