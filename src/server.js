const Express = require("express");

const app = Express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
