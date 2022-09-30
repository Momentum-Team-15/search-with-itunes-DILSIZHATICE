console.log('');
const search = document.createElement('div');

let input = document.createElement('input');
input.type = 'text';
search.appendChild(input);

let searchBaseUrl = 'https://itunes.apple.com/search?term=';

let searchForm = document.querySelector('#search-form')
searchForm.addEventListener('submit', (event) => {
    event.preventDefault()
    console.log('submitted!')
    let searchBox = document.querySelector('#search-box')
    let searchUrl = `${searchBaseUrl} ${searchBox.value}`
    console.log('search url', searchUrl)
    getSearchResults(searchUrl)
})

function getSearchResults(url) {
    fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'applicaton/json' }
    })
        .then(response => {
            if (!response.ok) {
                throw Error(response.status);
            } else {
                console.log(response);
                return response.json();
            }
        })
        .then(data => {
            let songs = data.results;
            showResults(songs);
        }).catch(error => {
            console.log(error);
            alert(`Do you want to try again? ${error}`);
        })
}

let resultDiv = document.querySelector('#results');
console.log('results div', resultDiv);

function showResults(songArray) {
    resultDiv.innerHTML = ('')
    console.log(songArray);
    if (songArray.length === 0) {
        resultDiv.innerText = `Do you want to try again? `;
    } else {
        for (let song of songArray) {
            let recordDiv = document.createElement('div');
            recordDiv.classList.add('record');

            let imageDiv = document.createElement('img');
            imageDiv.classList.add('image');
            imageDiv.src = song.artworkUrl100;

            let titleDiv = document.createElement('div');
            titleDiv.classList.add('div');
            titleDiv.innerText = `${song.trackName}`;

            let artistDiv = document.createElement('div');
            artistDiv.classList.add('div');
            artistDiv.innerText = `${song.artistName}`;

            resultDiv.appendChild(recordDiv);
            recordDiv.appendChild(imageDiv);
            recordDiv.appendChild(titleDiv);
            recordDiv.appendChild(artistDiv);

            let audio = document.querySelector('#audio-preview')
            let currentSong = document.querySelector('.current-song')

            function playAudio() {
                audio.src = song.previewUrl
                currentSong.innerText = `Currently Playing: ${song.trackName} by ${song.artistName}`
                audio.play();
            }
            recordDiv.addEventListener('click', e =>
                setTimeout(playAudio, 1800)
            )
        }
    }
}







/*const url = 'https://proxy-itunes-api.glitch.me/search?term=${mediaInput.value}&media=music';
const dataContainer = document.querySelector("#data-container");

let userInput = document.querySelector('#band')
let form = document.querySelector('#band-form');
console.log(form);
form.addEventListener("submit", (event) => {

    event.preventDefault();
    //console.log(event)

    let mediaInput = document.querySelector('#search-input');



    fetch(
        `https://proxy-itunes-api.glitch.me/search?term=${mediaInput.value}&media=music`,
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })

        .then(function (response) {
            return response.json()
        })

        .then(function (data) {
            console.log(data.results)

            return;
        })
})

const container = document.querySelector('#mainDiv');

let results = data.results.slice(1);
for (let result of results) {

}




function buildGrid(showResult) {
    for(let block of showResult) {
        let resultDiv = document.createElement('div');
        container.appendChild(resultDiv);

         let resultName = document.createElement('h4');
         resultName.innerText = `${block.artistName}`;
         resultDiv.appendChild(resultName);


         let resultImg = document.createElement('img');
         resultImg.src = `${block.artworkUrl100}`;
         resultDiv.appendChild(resultImg);


         let resultSong = document.createElement('p');
         resultSong.innerText = `${block.trackName}`;
         resultDiv.appendChild(resultDiv);
    }
}
*/
