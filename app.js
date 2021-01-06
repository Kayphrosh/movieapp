const body = document.querySelector('.showcase');
const slides = document.querySelectorAll('.slide');
const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');
const progress = document.getElementById('progress');
const circles = document.querySelectorAll('.circle');


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
    // currentActive--
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
    slides.forEach((slide) => slide.classList.remove('active'))
    slides[activeSlide].classList.add('active')
}
let currentActive = 1 

rightBtn.addEventListener('click', () => {
    currentActive++
    if(currentActive > circles.length) {
        currentActive = 1
    }
    update()
})
leftBtn.addEventListener('click', () => {
    currentActive--
    if(currentActive < 1) {
        currentActive = slides.length
    }
    update()
})
function update() {
        circles.forEach((circle, idx) => {
        if(idx < currentActive) {
            circle.classList.add('active-step')
        } else {
            circle.classList.remove('active-step')
        }
    })
        const actives = document.querySelectorAll('.active-step')

        progress.style.width = (actives.length - 1) / (circles.length - 1) * 100 + '%'
}


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
        searchInput.style.top = "12.5px";
        hamburger.style.transform = "translateY(0%)";
        hamburger.style.top = "5px";
        links.forEach(link =>  {
            link.classList.toggle("fade"); 
    
            hamburger.classList.toggle('toggle' );
        });
  
    } else{
        links.forEach(link =>  {
            link.classList.toggle("fade"); 
    
            hamburger.classList.toggle('toggle');
        });
        showcase.style.height = "9vh";
        showcase.style.transition = "1000ms ease-in";
        searchInput.style.transform = "translateY(-50%)";
        searchInput.style.top = "50%";
        hamburger.style.transform = "translateY(-50%)";
        hamburger.style.top = "50%";
    }
    
   
});



const API_URL = 'https://api.themoviedb.org/3/movie/popular?api_key=def445bf6e7b03a17a250c80ff2931bc&language=en-US&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=def445bf6e7b03a17a250c80ff2931bc&query="'
const SEARCH_APITV = 'https://api.themoviedb.org/3/search/tv?api_key=def445bf6e7b03a17a250c80ff2931bc&language=en-US&page=1&query="'

const main = document.getElementById('main')
const main2 = document.getElementById('main2')
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
        const { title, poster_path, vote_average, overview, release_date, backdrop_path   } = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <div class="ratingMovie">
                    <p>RATING </p>
                    <span class="${getClassByRate(vote_average)}"> ${vote_average}</span>
                </div>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                <p>${overview}</p>
                <h5>Released date: ${release_date}</h5>
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
    const searchTermTv = search.value
    if(searchTerm && searchTerm !== '', searchTermTv && searchTermTv !== '') {
        getMovies(SEARCH_API  + searchTerm)
        getTvshow(SEARCH_APITV + searchTermTv)

        search.value = ''
    }
    // else if(searchTerm && searchTerm !== '') {
    //     getTvshow(SEARCH_APITV + searchTerm)
    //     search.value = ''
    // }
    else {
        window.location.reload()
    }
}) 


const API_URLTv = 'https://api.themoviedb.org/3/tv/popular?api_key=def445bf6e7b03a17a250c80ff2931bc&language=en-US&page=1'

// Get initial movies
getTvshow(API_URLTv)

async function getTvshow(url) {
    const res = await fetch(url)
    const data = await res.json()
    showTvshow(data.results)
}

function showTvshow(show) {
    main2.innerHTML = ''

    show.forEach((tvshow) => {
        const { name, poster_path, vote_average, overview,  first_air_date } = tvshow

        const TvEl = document.createElement('div')
        TvEl.classList.add('tvshow')

        TvEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${name}">
            <div class="tv-info">
                <h3>${name}</h3>
                <div class="ratingTv">
                    <p>RATING </p>
                    <span class="${getClassByRate(vote_average)}"> ${vote_average}</span>
                </div>
            </div>
            <div class="overview-tv">
                <h3>Overview</h3>
                <p>${overview}</p>
                <h5>first aired date: ${first_air_date}</h5>
            </div>
        `
        main2.appendChild(TvEl)
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