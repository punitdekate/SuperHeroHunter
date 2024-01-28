console.log(localStorage);
const superHeroContainer = document.getElementById('super-hero-conatiner').style.display = 'none';
async function getCharacters(id, offset, limit) {
    document.querySelector('.loader').style.display = 'block';
    try {
        const request = await fetch(`http://gateway.marvel.com/v1/public/characters?ts=1&apikey=86ea7892c3d97bf8782fc4b82229b635&hash=c45140e0c4245dd4f917317475b8aed9&limit=${12}&offset=${offset}`).then((response) => {
            return response.json();
        }).then((newResponse) => {
            return newResponse.data;
        }).then((response) => {
            document.querySelector('.loader').style.display = 'none';
            response.results.forEach(element => {
                if (element.id === Number(id)) {
                    document.querySelector('.loader').style.display = 'none';
                    document.getElementById('super-hero-conatiner').style.display = 'block'
                    displayCharacters(element);
                }
            });

        });
    } catch (error) {
        // document.querySelector('.loader').innerHTML = 'Error loading data';
        console.error('Error fetching data:', error);
    }
}



function displayCharacters(data) {
    console.log(data);
    document.getElementById('hero-id').innerHTML = `Id : ${data.id}`;
    document.getElementById('hero-name').innerHTML = `<b>Name :</b> ${data.name}`;
    document.getElementById('hero-desc').innerHTML = `<b>Description :</b> ${data.description}`;
    document.getElementById('hero-modified-date').innerHTML = `<b>Modified :</b> ${data.modified}`;
    document.getElementById('hero-image').src = './Images/altImage.png';

    //Comics Section
    document.getElementById('comics-available').innerHTML = `<b>Available :</b> ${data.comics.available}`;
    document.getElementById('comics-collectionURI').innerHTML = `<b>CollectionURI :</b> ${data.comics.collectionURI}`;
    const comicsItems = document.getElementById('comics-items');
    data.comics.items.forEach(item => {
        const newItem = document.createElement('li');
        newItem.innerHTML = `<b>Items :</b></br> <b>Name :</b> ${item.name}</br> <b>ResourceURI :</b> ${item.resourceURI}`;
        comicsItems.appendChild(newItem);
    });
    document.getElementById('comics-returned').innerHTML = `<b>Available :</b> ${data.comics.returned}`;


    //Events Section
    document.getElementById('events-available').innerHTML = `<b>Available :</b> ${data.events.available}`;
    document.getElementById('events-collectionURI').innerHTML = `<b>CollectionURI :</b> ${data.events.collectionURI}`;
    const eventItems = document.getElementById('events-items');
    data.events.items.forEach(item => {
        const newItem = document.createElement('li');
        newItem.innerHTML = `<b>Items :</b> </br><b>Name :</b> ${item.name} </br><b>ResourceURI :</b> ${item.resourceURI}`;
        eventItems.appendChild(newItem);
    });
    document.getElementById('events-returned').innerHTML = `<b>Available :</b> ${data.events.returned}`;

    //Series Section
    document.getElementById('series-available').innerHTML = `<b>Available :</b> ${data.series.available}`;
    document.getElementById('series-collectionURI').innerHTML = `<b>CollectionURI :</b> ${data.series.collectionURI}`;
    const seriesItems = document.getElementById('series-items');
    data.series.items.forEach(item => {
        const newItem = document.createElement('li');
        newItem.innerHTML = `<b>Items :</b></br><b>Name :</b> ${item.name}</br> <b>ResourceURI :</b> ${item.resourceURI}`;
        seriesItems.appendChild(newItem);
    });
    document.getElementById('series-returned').innerHTML = `<b>Available :</b> ${data.series.returned}`;

    //Stories Section
    document.getElementById('stories-available').innerHTML = `<b>Available :</b> ${data.stories.available}`;
    document.getElementById('stories-collectionURI').innerHTML = `<b>CollectionURI :</b> ${data.stories.collectionURI}`;
    const storiesItems = document.getElementById('stories-items');
    data.stories.items.forEach(item => {
        const newItem = document.createElement('li');
        newItem.innerHTML = `<b>Items :</b></br><b>Name :</b> ${item.name}</br> <b>ResourceURI :</b> ${item.resourceURI}`;
        storiesItems.appendChild(newItem);
    });
    document.getElementById('stories-returned').innerHTML = `<b>Available :</b> ${data.stories.returned}`;
    localStorage.removeItem('id');
}
getCharacters(localStorage.getItem('id'), localStorage.getItem('offset'), localStorage.getItem('limit'));