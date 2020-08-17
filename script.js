//get api
async function searchSong(song){

const res = await fetch(`https://api.lyrics.ovh/suggest/${song}`);
const data = await res.json();

    showData(data);

}
//show data 
function showData(data){

    document.getElementById('result').innerHTML = `
    
    <div id="result">

            ${data.data.map(song => `
            
            <div class="single-result row align-items-center my-3 p-3" id="result">

                <div class="col-md-9 ">
                <h3 class="lyrics-name">${song.title_short}</h3>
                <p class="author lead">Album by <span>${song.album.title}</span></p>
                </div>
                <div class="col-md-3 text-md-right text-center">
                <button class="btn btn-success" data-artist="${song.artist.name}" data-ablmTitle="${song.title}">Get Lyrics</button>
                </div>
        
            </div>
            
            `).join('')}
    
    </div>
    
    `;

}

//get song lyrics

async function getSongLyrics(title,ablmTitle){

    const res = await fetch(`https://api.lyrics.ovh/v1/${title}/${ablmTitle}`);
    const data = await res.json();
    

    const Lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g,'<br/>');

    document.getElementById('result').innerHTML = ` <h2 class="text-success mb-4"   id="showLyrics">${title} - ${ablmTitle}</h2>
    
    <span>${Lyrics}</span>`;

}




//add event listener

document.querySelector(".search-btn").addEventListener("click",() => {

    const getSong = document.getElementById('getSong').value;

    if(!getSong){

        alert('search a song lyrics...')

    }
    else{

      searchSong(getSong);

    }

    document.getElementById('getSong').value = '';

});

//get song lyrics 

document.getElementById('result').addEventListener('click',lyrics =>{


const getLyrics = lyrics.target;

if(getLyrics.tagName === "BUTTON"){

const title = getLyrics.getAttribute('data-artist');
const ablmTitle = getLyrics.getAttribute('data-ablmTitle');


getSongLyrics(title,ablmTitle);

}




});
