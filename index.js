// http://gateway.marvel.com/v1/public/characters?ts=1&apikey=86ea7892c3d97bf8782fc4b82229b635&hash=c45140e0c4245dd4f917317475b8aed9
let offset = 0;
let limit = 12;
localStorage.setItem("limit", limit);
localStorage.setItem("offset", offset);

async function getCharacters(offset, query) {
    document.querySelector('.loader').style.display = 'block';
    try {
        const request = await fetch(`http://gateway.marvel.com/v1/public/characters?ts=1&apikey=86ea7892c3d97bf8782fc4b82229b635&hash=c45140e0c4245dd4f917317475b8aed9&limit=${limit}&offset=${offset}`).then((response) => {
            return response.json();
        }).then((newResponse) => {
            // document.querySelector('.loader').style.display = 'none';
            // if (offset * newResponse.data.limit < newResponse.data.total) {
            //     getCharacters(offset + 1);
            // } else {
            //     console.log("All records are fetched!!")
            // }
            return newResponse.data;
        }).then((response) => {
            document.querySelector('.loader').style.display = 'none';
            container.innerText = '';
            response.results.forEach(element => {
                let searchName = String(element.name).toLowerCase();
                if (query === '') {
                    displayCharacters(element);
                } else if (searchName.includes(String(query))) {
                    displaySearchCharacters(element);
                }
            });

        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Search a particular card
const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const searchInput = document.getElementById('search-input');
    container.textContent = '';
    const response = getCharacters(0, searchInput.value.toLowerCase());
});


const container = document.getElementById('card-container');

export function displayCharacters(data) {

    const dataToAppend =
        `
    <img src="./Images/altImage.png" class="card-img-top" alt="...">
    <div class="card-body">
      <p class="card-text">${data.id}</p>
      <h5 class="card-title">${data.name}</h5>
      <p class="card-text">${data.description}</p>
    </div>
  `;

    const character = document.createElement('div');
    character.classList.add('card');
    character.innerHTML = dataToAppend;

    // To handle the image if not available

    /*const imageOutput = fetch(data.thumbnail.path).then((response) => {
        if (response.ok === false) {
    const src = './Images/altImage.png';
    } else {
        thumbnail.src = data.thumbnail.path;

    }
    });*/

    container.appendChild(character);
}

function displaySearchCharacters(data) {
    const superHero = document.createElement('a');
    superHero.href = './super-hero.html';
    superHero.style.textDecoration = 'none';
    superHero.style.color = 'black';
    superHero.setAttribute('elemId', data.id);
    superHero.classList.add('anchor-card');

    const dataToAppend = `
    <img src="./Images/altImage.png" class="card-img-top" alt="...">
    <div class="card-body">
      <p class="card-text">${data.id}</p>
      <h5 class="card-title">${data.name}</h5>
      <p class="card-text">${data.description}</p>
    </div>
  `;
    const favBtn = `<button type="button" class="btn btn-primary" id = 'add-to-favourite'>Favourite</button>`;


    const favButtonToAdd = document.createElement('div');
    favButtonToAdd.classList.add('fav-btn');
    favButtonToAdd.style.textAlign = 'center';

    favButtonToAdd.innerHTML = favBtn;
    favButtonToAdd.setAttribute('favId', data.id);

    const character = document.createElement('div');
    character.classList.add('card');
    superHero.innerHTML = dataToAppend;
    character.appendChild(superHero);
    character.appendChild(favButtonToAdd);
    container.appendChild(character);
    superHero.addEventListener('click', (event) => {
        localStorage.setItem('id', superHero.getAttribute('elemId'));
    });
    favButtonToAdd.addEventListener('click', (event) => {
        const favItems = localStorage.getItem('favouriteItem');
        if (favItems === null) {
            localStorage.setItem('favouriteItem', [favButtonToAdd.getAttribute('favId')]);
            alert("Added to the favourite list !!");
        } else {
            const favArr = favItems.split(',');
            if (!favArr.includes(superHero.getAttribute('elemId'))) {
                favArr.push(favButtonToAdd.getAttribute('favId'));
                const favArrString = favArr.toString();
                localStorage.setItem('favouriteItem', favArrString);
                alert("Added to the favourite list !!");
            } else {
                alert('already in favourite list');
            }

        }
    });
}

//Add to favourite 

getCharacters(0, '');