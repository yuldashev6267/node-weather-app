const express = require("express");
const path = require("path");
const directoryPathName = path.join(__dirname, "../public");

const axios = require("axios");
const app = express();
const port = process.env.PORT || 3000;
//Static assets
app.use(express.static(directoryPathName));

//declaring template engine
app.set("view engine", "ejs");
app.set("views", "templates");

//Weather route
app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Sarvarbek yuldashev",
  });
});

//Help router
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "This is some helpful text",
  });
});

//About router
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Sarvarbek Yuldashev",
  });
});

//Weather
app.get("/weather", async (req, res) => {
  try {
    const address = req.query.address;
    if (!address) {
      return res.send({
        error: "You must provide address",
      });
    }
    const gecodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic2FydmFyYmVrIiwiYSI6ImNrNXJtcHJycDA0dHczbXFzZTk2M3Q0aHoifQ.mf233hhci12nQWjnJ_al6g&limit=1`;
    const getLocation = await axios({ url: gecodeUrl });
    const latitude = getLocation.data.features[0].center[1];
    const longitude = getLocation.data.features[0].center[0];
    const nameOfCountry = getLocation.data.features[0].place_name;
    const url = `https://api.darksky.net/forecast/f1de843599290646cdc2f2725b3ce607/${latitude},${longitude}?units=si`;
    const weatherApi = await axios({ url });
    const forecastData = `it is currently ${weatherApi.data.currently.temperature} celcious out.There is a ${weatherApi.data.currently.precipProbability}% chance of rain`;
    res.send({
      forecast: forecastData,
      location: nameOfCountry,
      address: req.query.address,
    });
  } catch (error) {
    res.send({
      error: "Something went wrong",
    });
  }
});

//404 Page
app.get("*", (req, res) => {
  res.render("404", {
    title: "Page Not Found",
    name: "Sarvarbek",
  });
});

//Declaring Server
app.listen(port, () => {
  console.log("Server up on running port" + port);
});
