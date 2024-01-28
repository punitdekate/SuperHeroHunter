console.log(localStorage);
const arr = localStorage.getItem('favouriteItem');
let favouriteArr = arr ? arr.split(',') : [];

console.log(favouriteArr);
const superHeroContainer = document.getElementById('card-container').style.display = 'none'
async function getCharacters(id, offset, limit) {
    document.querySelector('.loader').style.display = 'block';
    try {
        const request = await fetch(`https://gateway.marvel.com/v1/public/characters?ts=1&apikey=86ea7892c3d97bf8782fc4b82229b635&hash=c45140e0c4245dd4f917317475b8aed9&limit=${limit}&offset=${offset}`).then((response) => {
            return response.json();
        }).then((newResponse) => {
            return newResponse.data;
        }).then((response) => {
            document.querySelector('.loader').style.display = 'none';
            response.results.forEach(element => {
                if (favouriteArr.includes(String(element.id))) {
                    document.querySelector('.loader').style.display = 'none';
                    document.getElementById('card-container').style.display = 'block';
                    displayCharacters(element);
                }
            });

        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}




function displayCharacters(data) {
    // console.log(data);
    const card = `
    <h4 id="hero-id">Id : ${data.id}</h4>
    <p id="hero-name"><b>Name :</b> ${data.name}</p>
    <p id='hero-desc'><b>Description :</b> ${data.description}</p>
    <p id='hero-modified-date'><b>Modified :</b> ${data.modified}</p>
    <a href="./favourite.html" class="btn btn-primary remove" elemid = '${data.id}'>Remove</a>`;


    const container = document.getElementById('card-container');
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card');
    cardContainer.setAttribute('elemId', data.id);
    cardContainer.innerHTML = card;
    container.appendChild(cardContainer);
    const removeFromCart = document.querySelectorAll('.remove');


    removeFromCart.forEach(element => {
        element.addEventListener('click', (event) => {
            event.stopPropagation();
            console.log(element);
            let index = favouriteArr.indexOf(String(element.getAttribute('elemid')));

            if (index !== -1) {
                favouriteArr.splice(index, 1);

                const favArrString = favouriteArr.toString();
                console.log(favArrString);
                localStorage.setItem('favouriteItem', favArrString);
                console.log(localStorage);
            }

            favouriteArr.splice(index, 1);
        })
    });
}
getCharacters(localStorage.getItem('id'), localStorage.getItem('offset'), localStorage.getItem('limit'));