const express = require("express");
const request = require("request");
let path = require("path");
let ejs = require('ejs');

const app = express();

//port
let port = process.env.PORT || 3000;

//path to render without ejs
const staticDirPath = path.join(__dirname, "../client");
app.use(express.static(staticDirPath));

//path for ejs
app.set("view engine", "ejs");
app.set("views", staticDirPath);


app.get("/", function (req, res) {
    res.render("index",{title: "Countries Info"})
})
app.get("/search", function (req, res) {
    let countryName = req.query.countryName;
    if (!countryName) {
        return res.send("vvedite nazvanie strany( /search?countryName={nazvanie strany} )...")
    }
    makeRequest(countryName, function callback(args) {
        res.send(args)
    })
})
app.get("/*",function(req,res){
    res.send("page not found...")
})

app.listen(port, function (req, res) {
    console.log(`server is running on port: ${port}`)
})
function makeRequest(countryName, callback) {
    //https://restcountries.com/v2/name/{countryName or capitalName}
    let baseUrl = "https://restcountries.com/v2/name/";


    request(`${baseUrl}${countryName}`, function (err, data) {
        let parsedData = JSON.parse(data.body)


        callback({
            countryName: parsedData[0].name,
            capital: parsedData[0].capital,
            region: parsedData[0].region,
            population: parsedData[0].population,
            area: parsedData[0].area,
            capitalTimezone: parsedData[0].timezones[0],
            borders: parsedData[0].borders,
            countryCode: parsedData[0].callingCodes,
            flag: parsedData[0].flags.svg,

            currencyCode: parsedData[0].currencies[0].code,
            currencyName: parsedData[0].currencies[0].name,
            currencySymbol: parsedData[0].currencies[0].symbol,
            language: parsedData[0].languages[0].name,
            shorCountryName: parsedData[0].alpha3Code
        })


    });

}