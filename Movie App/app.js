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
        showcase.style.height = "10vh"
        showcase.style.transition = "1000ms ease-in"
    }
    
   
});

// hamburger.addEventListener('toggle', onclick);

// function onclick(e){
//     showcase.style.height = 0;

//     e.preventDefault();
// };