const Express = require("express");

const app = Express();

app.get("/", (request, response) => {
  response.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
