const characters = document.querySelector('#characters');
const locations = document.querySelector('#locations');
const episodes = document.querySelector('#episodes');
const contnentBox = document.querySelector('#contnent');
const next = document.querySelector('#next');
const previous = document.querySelector('#previous');
const input = document.querySelector('#find-data');
const burger = document.querySelector('.burger');
const random = document.querySelector('#random');

//asdasdasdsa
burger.addEventListener('click', () => {
    const nav = document.querySelector('header nav');
    nav.classList.toggle("open");
    //asdasdasd
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
    const content = document.querySelectorAll('#contnent div, #contnent section, #contnent table');
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
    card.getElementById('info').innerHTML = 'more info: ';
    card.getElementById('info').href = "https://rickandmortyapi.com/api/character/" + data.id;
    contnentBox.append(card);
}

function addToDomLO(data) {
    const box = document.querySelector('table tbody');
    const RowElement = document.createElement('tr');
    if (window.innerWidth > 960) {
        RowElement.innerHTML =
            `<td>${data.name}</td>
        <td>${data.type}</td>
        <td>${data.dimension}</td>
        <td>${data.created}</td>`
    } else {

        RowElement.innerHTML =
            `<td> Name: <p>${data.name}</p></td>
        <td>Type: <p>${data.type}</p></td>
        <td>Dimension: <p>${data.dimension}</p></td>
        <td>Created: <p>${data.created}</p></td>`
    }
    box.append(RowElement);
}

function addToDomEP(data) {
    const box = document.querySelector('table tbody');
    const RowElement = document.createElement('tr');
    if (window.innerWidth > 960) {
        RowElement.innerHTML =
            `<td>${data.name}</td>
            <td>${data.air_date}</td>
            <td>${data.episode}</td>`
    } else {
        RowElement.innerHTML =
            `<td>Name: <p>${data.name}</p></td>
        <td>Air_date: <p>${data.air_date}</p></td>
        <td>Episode: <p>${data.episode}</p></td>`
    }
    box.append(RowElement);
}

async function charactersData() {
    state = 'character';
    delteNode();
    const charactersTable = await find('https://rickandmortyapi.com/api/character/?page=' + page);
    //const charactersTable = await find('https://rickandmortyapi.com/api/character/?name=rick');
    charactersTable.results.forEach(element => {
        const data = {
            id: element.id,
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
    const tableElement = document.createElement('table');
    if (window.innerWidth > 960) {
        tableElement.innerHTML =
            `<tr>
            <th>name</th>
            <th>type</th>
            <th>dimension</th>
            <th>created</th>
        </tr>`
    }
    else {
        tableElement.innerHTML =
            `<tbody></tbody>`
    }
    const locationsTable = await find('https://rickandmortyapi.com/api/location/?page=' + page);
    locationsTable.results.forEach(element => {
        const data = {
            name: element.name,
            type: element.type,
            dimension: element.dimension,
            created: element.created,
        };
        contnentBox.append(tableElement);
        addToDomLO(data);
    });
}
async function episodesData() {
    state = 'episode';
    delteNode();
    const tableElement = document.createElement('table');
    if (window.innerWidth > 960) {
        tableElement.innerHTML =
            `<tr>
            <th>name</th>
            <th>air_date</th>
            <th>episode</th>
        </tr>`
    }
    else {
        tableElement.innerHTML =
            `<tbody></tbody>`
    }
    const episodesTable = await find('https://rickandmortyapi.com/api/episode/?page=' + page);
    episodesTable.results.forEach(element => {
        const data = {
            name: element.name,
            air_date: element.air_date,
            episode: element.episode,
            characters: element.characters,
        };
        contnentBox.append(tableElement);
        addToDomEP(data);
    });
}
async function FaindChara(url) {
    delteNode();

    const charactersTable = await find(`https://rickandmortyapi.com/api/${state}/?name=` + url);
    charactersTable.results.forEach(element => {
        if (state === 'episode') {
            const data = {
                Id: element.id,
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
async function randomCha() {

    const howMath = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    state = 'character';
    delteNode();
    for (let i = 0; i <= howMath; i++) {
        const number = Math.floor(Math.random() * (826 - 1 + 1)) + 1;
        const charactersTable = await find('https://rickandmortyapi.com/api/character/' + number);
        const data = {
            id: charactersTable.id,
            name: charactersTable.name,
            gender: charactersTable.gender,
            species: charactersTable.species,
            status: charactersTable.status,
            image: charactersTable.image,
        };
        addToDomCH(data);
    }
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
random.addEventListener('click', randomCha);
randomCha();
