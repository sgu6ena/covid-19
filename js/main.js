const url = 'https://api.covid19api.com/summary';
let $map = document.querySelector('#worldmap');

const Countries = [];

const map = new WorldMap({
    element: 'worldmap',
    width: 800,
    height: 600,
});

fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log('data: ', data);

        for (key in data.Countries) {
            if (document.getElementById('g' + data.Countries[key].CountryCode)) {
                if (data.Countries[key].NewConfirmed >= 10000) document.getElementById('g' + data.Countries[key].CountryCode).setAttribute("style", "fill: #b71c1c;");
                if (data.Countries[key].NewConfirmed >= 5000 && data.Countries[key].NewConfirmed < 10000) document.getElementById('g' + data.Countries[key].CountryCode).setAttribute("style", "fill: #e53935;");
                if (data.Countries[key].NewConfirmed >= 1000 && data.Countries[key].NewConfirmed < 5000) document.getElementById('g' + data.Countries[key].CountryCode).setAttribute("style", "fill: #e57373;");
                if (data.Countries[key].NewConfirmed >= 500 && data.Countries[key].NewConfirmed < 1000) document.getElementById('g' + data.Countries[key].CountryCode).setAttribute("style", "fill: #ffebee;");
                if (data.Countries[key].NewConfirmed > 0 && data.Countries[key].NewConfirmed < 500) document.getElementById('g' + data.Countries[key].CountryCode).setAttribute("style", "fill: #ffebee;");
                if (data.Countries[key].NewConfirmed == 0) document.getElementById('g' + data.Countries[key].CountryCode).setAttribute("style", "fill:#128e5a;");
            } else {
                console.log('data.Countries[key].CountryCode: ', data.Countries[key].CountryCode, data.Countries[key].Country);

                console.log('NewConfirmed: ', data.Countries[key].NewConfirmed);
                console.log('NewDeaths: ', data.Countries[key].NewDeaths);
            }
        }

    });

//$map = map;
console.dir(map);
console.log(' $map : ', $map);
//$map.['gRU'];
const $gru = document.querySelector('#gRU');
console.log('gru: ', $gru);
// $gru.setAttribute("style", "fill: red;");
// document.getElementById('gUS').setAttribute("style", "fill: blue;");