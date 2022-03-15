const characters = document.querySelector('#characters');
const locations = document.querySelector('#locations');
const episodes = document.querySelector('#episodes');
const contnentBox = document.querySelector('#contnent');
const next = document.querySelector('#next');
const previous = document.querySelector('#previous');
const input = document.querySelector('#find-data');
const burger = document.querySelector('.burger');


burger.addEventListener('click', () => {
    const nav = document.querySelector('header nav');
    nav.classList.toggle("open");
})

let page = 1;
let state = '';


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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
    card.getElementById('name').innerHTML = data.name;
    card.getElementById('gender').innerHTML = 'gender: ' + data.gender;
    card.getElementById('species').innerHTML = 'species: ' + data.species;
    card.getElementById('status').innerHTML = 'status: ' + data.status;
    contnentBox.append(card);
}

function addToDomLO(data) {
    const box = document.getElementById('temp-box');
    const card = document.importNode(box.content, true);
    card.getElementById('name').innerHTML = 'name: ' + data.name;
    card.getElementById('gender').innerHTML = 'type: ' + data.type;
    card.getElementById('species').innerHTML = 'dimension: ' + data.dimension;
    card.getElementById('status').innerHTML = 'created: ' + data.created;
    contnentBox.append(card);
}

function addToDomEP(data) {
    const box = document.getElementById('temp-box');
    const card = document.importNode(box.content, true);
    card.getElementById('name').innerHTML = 'name: ' + data.name;
    card.getElementById('gender').innerHTML = 'air_date: ' + data.air_date;
    card.getElementById('species').innerHTML = 'episode: ' + data.episode;
    card.getElementById('status').innerHTML = 'characters: ' + data.characters;
    contnentBox.append(card);
}

async function charactersData() {
    state = 'character';
    delteNode();
    const charactersTable = await find('https://rickandmortyapi.com/api/character/?page=' + page);
    //const charactersTable = await find('https://rickandmortyapi.com/api/character/?name=rick');
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
    state = 'location';
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
    state = 'episode';
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
async function FaindChara(url) {
    delteNode();
    const charactersTable = await find(`https://rickandmortyapi.com/api/${state}/?name=` + url);
    charactersTable.results.forEach(element => {
        if (state === 'episode') {
            const data = {
                name: element.name,
                air_date: element.air_date,
                episode: element.episode,
                characters: element.characters,
            };
            addToDomEP(data);
        }
        else if (state === 'location') {
            const data = {
                name: element.name,
                type: element.type,
                dimension: element.dimension,
                residents: element.residents,
                created: element.created,
            };
            addToDomLO(data);
        }
        else {
            const data = {
                name: element.name,
                gender: element.gender,
                species: element.species,
                status: element.status,
                image: element.image,
            };
            addToDomCH(data);
        }

    });
}

function NextPageCh() {

    page++;
    if (state === 'episode')
        episodesData();
    else if (state === 'location')
        locationsData();
    else
        charactersData();
}
function previousPageCh() {

    page--;
    if (state === 'episode')
        episodesData();
    else if (state === 'location')
        locationsData();
    else
        charactersData();
}


characters.addEventListener('click', charactersData);
locations.addEventListener('click', locationsData);
episodes.addEventListener('click', episodesData);
next.addEventListener('click', NextPageCh);
previous.addEventListener('click', previousPageCh);
input.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        FaindChara(input.value);
    }
});