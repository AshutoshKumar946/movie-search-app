const APIKEY = "1b131afd";

const APIURL = `https://www.omdbapi.com/?apikey=${APIKEY}&s=avengers`;

const SEARCHAPI = `https://www.omdbapi.com/?apikey=${APIKEY}&s=`;

const DETAILSAPI = `https://www.omdbapi.com/?apikey=${APIKEY}&i=`;

// HTML elements
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// popup
const popup = document.createElement("div");
popup.classList.add("popup");
document.body.appendChild(popup);


// load movies
getMovies(APIURL);


async function getMovies(url) {

const resp = await fetch(url);
const respData = await resp.json();

if(respData.Search){
showMovies(respData.Search);
}else{
main.innerHTML="<h2>No movies found</h2>";
}

}


function showMovies(movies){

main.innerHTML="";

movies.forEach(movie=>{

const {Poster,Title,Year,imdbID} = movie;

const movieEl=document.createElement("div");
movieEl.classList.add("movie");

movieEl.innerHTML=`

<img src="${Poster !== "N/A" ? Poster : "https://via.placeholder.com/300"}" alt="${Title}">

<div class="movie-info">
<h3>${Title}</h3>
<span>${Year}</span>
</div>

`;

movieEl.addEventListener("click",()=>{

getMovieDetails(imdbID);

});

main.appendChild(movieEl);

});

}


async function getMovieDetails(id){

const resp = await fetch(DETAILSAPI + id);
const data = await resp.json();


popup.innerHTML = `

<div class="popup-content">

<span class="close">X</span>

<h2>${data.Title}</h2>

<img src="${data.Poster}" width="200">

<p><b>IMDB Rating:</b> ${data.imdbRating}</p>

<div class="stars">
⭐ ⭐ ⭐ ⭐ ⭐
</div>

<p><b>Genre:</b> ${data.Genre}</p>

<p><b>Plot:</b> ${data.Plot}</p>

<p><b>Actors:</b> ${data.Actors}</p>

<p><b>Released:</b> ${data.Released}</p>

</div>

`;

popup.style.display="flex";

document.querySelector(".close").onclick=()=>{

popup.style.display="none";

}

}


form.addEventListener("submit",(e)=>{

e.preventDefault();

const searchTerm = search.value;

if(searchTerm){

getMovies(SEARCHAPI + searchTerm);

search.value="";

}

});