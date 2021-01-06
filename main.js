const hamburger = document.querySelector(".hamburger"); 
const navLinks =  document.querySelector(".navbar");
const links = document.querySelectorAll(".navbar li");
const showcase = document.querySelector(".top-bar");
const mediaQuery = window.matchMedia('(max-width: 768px)');
const searchInput = document.querySelector(".search");


hamburger.addEventListener("click", () => {
    if("mediaQuery.matches", navLinks.classList.toggle("open"))
        {  
        showcase.style.height = "70vh";
        showcase.style.transition = "1000ms ease-in";
        searchInput.style.transform = "translateY(0%)";
        searchInput.style.top = "17px";
        hamburger.style.transform = "translateY(0%)";
        hamburger.style.top = "10px";
        links.forEach(link =>  {
            link.classList.toggle("fade"); 
    
            hamburger.classList.toggle('toggle' );
        });
  
    } else{
        links.forEach(link =>  {
            link.classList.toggle("fade"); 
    
            hamburger.classList.toggle('toggle');
        });
        showcase.style.height = "8vh";
        showcase.style.transition = "1000ms ease-in";
        searchInput.style.transform = "translateY(-50%)";
        searchInput.style.top = "50%";
        hamburger.style.transform = "translateY(-50%)";
        hamburger.style.top = "50%";
    }
    
   
});

const API_URL_AnticipatingMovie = 'https://api.themoviedb.org/3/movie/upcoming?api_key=def445bf6e7b03a17a250c80ff2931bc&language=en-US&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=def445bf6e7b03a17a250c80ff2931bc&query="'
// const SEARCH_APITV = 'https://api.themoviedb.org/3/search/tv?api_key=def445bf6e7b03a17a250c80ff2931bc&language=en-US&page=1&query="'


const mainAnticipate = document.getElementById('anticipating-movie')
// const main2 = document.getElementById('anticipating-tv')
const form = document.getElementById('form')
const search = document.getElementById('search')

// Get initial movies
getAnticipatingMovies(API_URL_AnticipatingMovie)

async function getAnticipatingMovies(url) {
    const res = await fetch(url)
    const data = await res.json()
    showAnticipatingMovies(data.results)
}

function showAnticipatingMovies(anticipating) {
    mainAnticipate.innerHTML = ''

    anticipating.forEach((movie) => {
        const { title, poster_path, vote_average, overview,   } = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <div class="ratingMovie">
                    <p>RATED </p>
                    <span class="${getClassByRate(vote_average)}"> ${vote_average}</span>
                </div>
            </div>
            <div class="overview">
          <h3>Overview</h3>
          <p>${overview}</p>
        </div>
        `
        mainAnticipate.appendChild(movieEl)
    })
}

function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    } else if(vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}



form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value
    const searchTermTv = search.value
    if(searchTerm && searchTerm !== '', searchTermTv && searchTermTv !== '') {
        getMovies(SEARCH_API  + searchTerm)
        getTvshow(SEARCH_APITV + searchTermTv)

        search.value = ''
    }
    else {
        window.location.reload()
    }
}) 