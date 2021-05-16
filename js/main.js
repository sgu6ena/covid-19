// const COLOR1 = '622942';
// const COLOR2 = '82374f';
// const COLOR3 = 'b65164';
// const COLOR4 = 'fe7780';
// const COLOR5 = 'ffada0';

const COLOR1 = 'ff441a';
const COLOR2 = 'ff8903';
const COLOR3 = 'ffd341';
const COLOR4 = 'ffff87';
const COLOR5 = 'ffffc0';


const urlApiCovid = 'https://api.covid19api.com/summary';
const $map = document.querySelector('#worldmap');
const $ratingTable = document.querySelector('.rating-table');
const $ratingControl = document.querySelector('.rating-control');
let page = 0;
let maxPage = 0;
const $mapInfo = document.querySelector('.map-info');

//создание карты
const map = new WorldMap({
    element: 'worldmap',
    width: 800,
    height: 600,
});

//получение статистики
const getStatistic = () => {
    return fetch(urlApiCovid)
        .then(response => response.json())
        .then(data => data.Countries.sort((a, b) => a.NewConfirmed > b.NewConfirmed ? -1 : 1))
}

//раскрашивание карты в зависимости от заболевших
const colorMap = () => {
    getStatistic().then(data => {
        maxPage = Math.floor(data.length / 6);
        for (key in data) {
            let color = '';
            if (document.getElementById('g' + data[key].CountryCode)) {
                switch (true) {
                    case data[key].NewConfirmed >= 10000:
                        color = COLOR1;
                        break;
                    case data[key].NewConfirmed >= 5000 && data[key].NewConfirmed < 10000:
                        color = COLOR2;
                        break;
                    case data[key].NewConfirmed >= 1000 && data[key].NewConfirmed < 5000:
                        color = COLOR3;
                        break;
                    case data[key].NewConfirmed >= 500 && data[key].NewConfirmed < 1000:
                        color = COLOR4;
                        break;
                    case data[key].NewConfirmed > 0 && data[key].NewConfirmed < 500:
                        color = COLOR5;
                        break;
                    case data[key].NewConfirmed == 0:
                        color = "128e5a";
                        break;
                }
                document.getElementById('g' + data[key].CountryCode).setAttribute("style", `fill: #${color};`);
            }
        }
    });
}

//построение рейтинга стран
const rating = (page) => {
    getStatistic().then(data => {
        maxPage = Math.floor(data.length / 6);
        $ratingTable.innerHTML = '';
        for (let i = page * 6; i < (page + 1) * 6 && i < data.length; i++) {

            $ratingTable.insertAdjacentHTML('beforeend', ` <div class="country ">
            <div class="country-flag"><img src="https://www.countryflags.io/${data[i].CountryCode}/flat/64.png" alt="flag"></div>
            <div class="country-name">${data[i].Country}</div>
            <div class="country-count">${data[i].NewConfirmed}</div>
            <div class="country-arrow"><img src="img/arrow-down.svg" alt="" class="img-arrow"></div>
        </div>`);
        }

    });
}

//события при нажатия на кнопки листания статистики
$ratingControl.addEventListener('click', (event) => {

    event.target == document.querySelector('.arrow-left') && page > 0 ? rating(--page) : ''; //стрелка "<" страница назад 
    event.target == document.querySelector('.arrow-right') && page < maxPage ? rating(++page) : ''; //стрелка ">" страница вперед 
    //перекрашивание стрелок при конце/начале
    page == maxPage ? document.querySelector('.arrow-right').setAttribute('style', 'color:grey;') : document.querySelector('.arrow-left').setAttribute('style', 'color:lightgrey;');
    page > 0 ? document.querySelector('.arrow-left').setAttribute('style', 'color:#F44A45;') : document.querySelector('.arrow-left').setAttribute('style', 'color:lightgrey;');
})



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

rating(page);
colorMap();

$map.addEventListener('click', (event) => {
    const target = event.target;
    const parent = target.closest('g');
    if(parent?.id)
    {
        $mapInfo.setAttribute('style', 'visibility:visible;')
       getStatistic().then(data=>{ 
           data.filter((key)=>{
           if('g'+key['CountryCode'] == parent.id){
            $mapInfo.innerHTML=`
            <div class="country-statistic ">${key.Country}</div>
            <div class="statistic "> 
                <div class="confirmed ">
                    <div class="text col">New Confirmed: ${key.NewConfirmed}</div>
                    <div class="text col">Total Confirmed: ${key.TotalConfirmed} </div>
                </div>
                <div class="death ">
                    <div class="text col">New Deaths: ${key.NewDeaths}</div>
                    <div class="text col">Total Deaths: ${key.TotalDeaths}</div>
                </div>
                <div class="recovered  ">
                    <div class="text col">New Recovered: ${key.NewRecovered}</div>
                    <div class="text col">Total Recovered: ${key.TotalRecovered}</div>
                </div>
                
            `
                }
            })
        });
        
    } else
        $mapInfo.setAttribute('style', 'visibility:hidden;')
 
})

