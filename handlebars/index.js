const express = require("express");

const app = express();

const engines = require('consolidate');

app.engine('hbs', engines.handlebars)

app.set('views', './views')
app.set('view engine', 'hbs')

app.get("/", function(req, res) {
    res.render("index", { hello: "hola", world: "mundo" });
  });

const server = app.listen(3001, () => {
    console.log(`Listening http://localhost:${server.address().port}`);
})