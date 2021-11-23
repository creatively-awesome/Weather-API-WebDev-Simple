const express = require("express");
const app = express();

const https = require("https");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    console.log(req.body.cityName);

    const query = req.body.cityName;
    const apiKey = "3ad40ada4e4016624ff6cd99c0df93a5";
    const units = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + units + "&appid=" + apiKey;
    
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

            
            res.write("<h1>The temperature in " + query + " is "  + temp + " degree Celcius. ");
            res.write("<img src="+ iconURL +">");
            res.write("The weather is currently " + description + ".</h1>");
            
            
            res.send();
        });
    });
});

    




app.listen(3000, function() {
    console.log("Server is running on port 3000");
});