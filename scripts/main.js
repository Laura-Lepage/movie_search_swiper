//Swiper effect
const swiper = new Swiper('.swiper', {
  slidesPerView: 4,
  spaceBetween: 30,
  centeredSlides: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

//API
let input = document.querySelector("input")
let button = document.querySelector(".search_button")
let imageZone = document.querySelector(".swiper-wrapper")
let buttonNext = document.querySelector(".button_next")

function getMovies(movie, pageNumber){
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=6631e5f1dc96088e0d26b86da29b5b6a&include_adult=false&language=en-US&query=${movie}&page=${pageNumber}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      for (let i = 0; i < data.results.length; i++) {
        if (data.results[i].poster_path == null){
          imageZone.innerHTML +=
          `
          <div class="swiper-slide" data-movieid="${data.results[i].id}">
          <h3>${data.results[i].title}</h3>
          <img src="https://www.batirama.com/scaled/1200/920/1/2017/08/31/125459/images/article/15082-_00erreur.jpg"></img>
          `    
        } else {
          imageZone.innerHTML += 
          `
          <div class="swiper-slide" data-movieid="${data.results[i].id}">
          <h3>${data.results[i].title}</h3>
          <img src="https://image.tmdb.org/t/p/w300/${data.results[i].poster_path}">

          </div>
          ` 
        }
      }
      if (data.total_pages > 1){
        buttonNext.style.display = "block"
      } else {
        buttonNext.style.display = "none"
      }
      
    
    })
    .catch(error => {console.log("Erreur lors de la récup des données :", error);
  })
}


button.addEventListener('click', function(){
  imageZone.innerHTML = ``
  getMovies(input.value, 1)
  input.value = ``
})
input.addEventListener("keyup", function(event){    
  if(event.key === "Enter"){
      imageZone.innerHTML = ``
      getMovies(input.value, 1)
      input.value = ``
  }
})

buttonNext.addEventListener('click', function(){
  
})


