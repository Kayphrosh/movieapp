const body = document.querySelector('.showcase');
const slides = document.querySelectorAll('.slide');
const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');

let activeSlide = 0

rightBtn.addEventListener('click', () => {
    activeSlide++
    if(activeSlide >  slides.length - 1) {
        activeSlide = 0
    }
    setBgToBody()
    setActiveSlide()
})
leftBtn.addEventListener('click', () => {
    activeSlide--
    if(activeSlide < 0) {
        activeSlide = slides.length - 1
    }
    setBgToBody()
    setActiveSlide()
})

setBgToBody()

function setBgToBody(){
    body.style.backgroundColor = slides[activeSlide].style.backgroundImage
}

function setActiveSlide(){
    slides.forEach((slide) => slide.classList.remove('active')
    )
    slides[activeSlide].classList.add('active')
}

const hamburger = document.querySelector(".hamburger"); 
const navLinks =  document.querySelector(".navbar");
const links = document.querySelectorAll(".navbar li");
const showcase = document.querySelector(".top-bar");
const mediaQuery = window.matchMedia('(max-width: 768px)')


hamburger.addEventListener("click", () => {
    if("mediaQuery.matches", navLinks.classList.toggle("open"))
        {  
        showcase.style.height = "60vh";
        showcase.style.transition = "1000ms ease-in";
        links.forEach(link =>  {
            link.classList.toggle("fade"); 
    
            hamburger.classList.toggle('toggle');
        });
  
    } else{
        links.forEach(link =>  {
            link.classList.toggle("fade"); 
    
            hamburger.classList.toggle('toggle');
        });
        showcase.style.height = "8vh"
        showcase.style.transition = "1000ms ease-in"
    }
    
   
});



const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=def445bf6e7b03a17a250c80ff2931bc&page=2'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=def445bf6e7b03a17a250c80ff2931bc&query="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

// Get initial movies
getMovies(API_URL)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
        `
        main.appendChild(movieEl)
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

    if(searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    } else {
        window.location.reload()
    }
}) 