//http://geohelper.info/ru/documentation
//       or
//https://restcountries.com/v2/name/{countryName or capitalName}    //(https://restcountries.com/#api-endpoints-v2-all)


let id;
let enterBtnPressed;//esli enter nazhali,to ne vyvodit soobshenie(SDELAT
countryOrCity_inp.addEventListener('input', function (event) {
    enterBtnPressed = false;
    countryOrCityInp_warning.style = "display: none;"

    if (id) {
        clearInterval(id)
    }

    let exTime = new Date().getSeconds();
    let timer = 5;
    id = setInterval(function () {
        if (new Date().getSeconds() - exTime >= timer && !enterBtnPressed) {
            let { height, width } = document.querySelector(".countryOrCity_form").getBoundingClientRect();
            countryOrCityInp_warning.style = `display: block;margin-left: ${width}px;margin-top: -${(height / 2) + 5}px`;
        }
    }, timer * 1000);

})
document.querySelector(".countryOrCity_form").addEventListener("submit", function (event) {
    event.preventDefault();
    document.querySelector(".infoWrapper").style = "display: grid;";
    // console.log(getComputedStyle(document.querySelector(".infoWrapper")).display)
    countryOrCityInp_warning.style = `display: none;`;
    enterBtnPressed = true;

    fetch(`/search?countryName=${countryOrCity_inp.value}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            borders.innerHTML = "";
            console.log(data);

            flag.src = data.flag;
            region.innerHTML = data.region;
            data.borders.map(function (item) {
                borders.innerHTML += `| ${item} |`;
            })
            countryName.innerHTML = `${data.countryName}(${data.shorCountryName})`;
            area.innerHTML = data.area;
            population.innerHTML = data.population;
            capital.innerHTML = data.capital;
            capitalTimezone.innerHTML = `(${data.capitalTimezone})`//nujno convertirovat
            countryCode.innerHTML = `+${data.countryCode}`;
            language.innerHTML = data.language;
            currency.innerHTML = `${data.currencyName}(${data.currencyCode})/(${data.currencySymbol})`
        });
})