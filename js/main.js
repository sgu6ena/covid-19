const url = 'https://api.covid19api.com/summary';
let $map = document.querySelector('#worldmap');
const $ratingTable = document.querySelector('.rating-table');

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

        for (key in data.Countries) {
            if (document.getElementById('g' + data.Countries[key].CountryCode)) {
                if (data.Countries[key].NewConfirmed >= 10000) document.getElementById('g' + data.Countries[key].CountryCode).setAttribute("style", "fill: #b71c1c;");
                if (data.Countries[key].NewConfirmed >= 5000 && data.Countries[key].NewConfirmed < 10000) document.getElementById('g' + data.Countries[key].CountryCode).setAttribute("style", "fill: #e53935;");
                if (data.Countries[key].NewConfirmed >= 1000 && data.Countries[key].NewConfirmed < 5000) document.getElementById('g' + data.Countries[key].CountryCode).setAttribute("style", "fill: #e57373;");
                if (data.Countries[key].NewConfirmed >= 500 && data.Countries[key].NewConfirmed < 1000) document.getElementById('g' + data.Countries[key].CountryCode).setAttribute("style", "fill: #ffebee;");
                if (data.Countries[key].NewConfirmed > 0 && data.Countries[key].NewConfirmed < 500) document.getElementById('g' + data.Countries[key].CountryCode).setAttribute("style", "fill: #ffebee;");
                if (data.Countries[key].NewConfirmed == 0) document.getElementById('g' + data.Countries[key].CountryCode).setAttribute("style", "fill:#128e5a;");
            }
        }
        rating(data.Countries);
    });

const rating = (countries) => {
        countries.sort((a, b) => {
            if (a.NewConfirmed > b.NewConfirmed)
                return -1
            else return 1
        })
        $ratingTable.innerHTML = '';
        console.log('countries: ', countries);
        for (let i = 0; i < 6; i++) {

            $ratingTable.insertAdjacentHTML('beforeend', ` <div class="country ">
            <div class="country-flag"><img src="https://www.countryflags.io/${countries[i].CountryCode}/flat/64.png" alt="flag"></div>
            <div class="country-name">${countries[i].Country}</div>
            <div class="country-count">${countries[i].NewConfirmed}</div>
            <div class="country-arrow"><img src="img/arrow-down.svg" alt="" class="img-arrow"></div>
        </div>`)

        }
    }
    //scroll smooth - плавная прокрутка
    {
        const scrollLinks = document.querySelectorAll('a.scroll-link');

        for (const scrollLink of scrollLinks) {
            scrollLink.addEventListener('click', event => {
                event.preventDefault();
                const id = scrollLink.getAttribute('href');
                document.querySelector(id).scrollIntoView({
                    behavior: 'smooth', //плавная
                    block: 'start', //до какого момента крутить
                })
            });
        }
    }

//$map = map;
console.dir(map);
console.log(' $map : ', $map);
//$map.['gRU'];
const $gru = document.querySelector('#gRU');
console.log('gru: ', $gru);
// $gru.setAttribute("style", "fill: red;");
// document.getElementById('gUS').setAttribute("style", "fill: blue;");