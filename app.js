const characters = document.getElementById('characters');
const locations = document.getElementById('locations');
const episodes = document.getElementById('episodes');
const contnentBox = document.getElementById('contnent');
const next = document.getElementById('next');
const previous = document.getElementById('previous');

let page = 1;
let state = '';



function find(url) {

    return fetch(url).then(respon => {
        return respon.json();
    });
}

function delteNode() {
    const content = document.querySelectorAll('#contnent div');
    for (const div of content) {
        div.remove();
    }
}
function addToDomCH(data) {

    const box = document.getElementById('temp-box');
    const card = document.importNode(box.content, true);
    card.getElementById('img').src = data.image;
    card.getElementById('name').innerHTML = 'name:' + data.name;
    card.getElementById('gender').innerHTML = 'gender:' + data.gender;
    card.getElementById('species').innerHTML = 'species:' + data.species;
    card.getElementById('status').innerHTML = 'status:' + data.status;
    contnentBox.append(card);
}

function addToDomLO(data) {
    const box = document.getElementById('temp-box');
    const card = document.importNode(box.content, true);
    card.getElementById('name').innerHTML = data.name;
    card.getElementById('gender').innerHTML = data.type;
    card.getElementById('species').innerHTML = data.dimension;
    card.getElementById('status').innerHTML = data.created;
    contnentBox.append(card);
}

function addToDomEP(data) {
    const box = document.getElementById('temp-box');
    const card = document.importNode(box.content, true);
    card.getElementById('name').innerHTML = data.name;
    card.getElementById('gender').innerHTML = data.air_date;
    card.getElementById('species').innerHTML = data.episode;
    card.getElementById('status').innerHTML = data.characters;
    contnentBox.append(card);
}

async function charactersData() {
    state = 'charactersData';
    delteNode();
    const charactersTable = await find('https://rickandmortyapi.com/api/character/?page=' + page);
    charactersTable.results.forEach(element => {
        const data = {
            name: element.name,
            gender: element.gender,
            species: element.species,
            status: element.status,
            image: element.image,
        };
        addToDomCH(data);
    });
}
async function locationsData() {
    state = 'locationsData';
    delteNode();
    const locationsTable = await find('https://rickandmortyapi.com/api/location/?page=' + page);
    locationsTable.results.forEach(element => {
        const data = {
            name: element.name,
            type: element.type,
            dimension: element.dimension,
            residents: element.residents,
            created: element.created,
        };
        addToDomLO(data);
    });
}
async function episodesData() {
    state = 'episodesData';
    delteNode();
    const episodesTable = await find('https://rickandmortyapi.com/api/episode/?page=' + page);
    episodesTable.results.forEach(element => {
        const data = {
            name: element.name,
            air_date: element.air_date,
            episode: element.episode,
            characters: element.characters,
        };
        addToDomEP(data);
    });
}
function NextPageCh() {

    page++;
    if (state === 'episodesData')
        episodesData();
    else if (state === 'locationsData')
        locationsData();
    else
        charactersData();
}
function previousPageCh() {

    page--;
    if (state === 'episodesData')
        episodesData();
    else if (state === 'locationsData')
        locationsData();
    else
        charactersData();
}

characters.addEventListener('click', charactersData);
locations.addEventListener('click', locationsData);
episodes.addEventListener('click', episodesData);
next.addEventListener('click', NextPageCh);
previous.addEventListener('click', previousPageCh);