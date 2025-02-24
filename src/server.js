const Express = require("express");
const database = require("./config/database");
const routerAuth = require("./routes/auth");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = Express();

app.use(Express.json());
app.use("/api/auth", routerAuth);

database.sync().then(() => {
  app.listen(PORT, () => {
    console.log("Servidor esta rodando na porta " + PORT);
  });
});
