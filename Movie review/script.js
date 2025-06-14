const url = 'https://imdb236.p.rapidapi.com/api/imdb/top-box-office';
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '6dbc1978dbmsh5a219c2f723b7f7p188161jsnbe26e659607d',
    'x-rapidapi-host': 'imdb236.p.rapidapi.com'
  }
};


async function slides() {
  try {
    const response = await fetch(url, options);
    const movies = await response.json();
    console.log("API Response:", movies);

    const top3 = movies.slice(0, 3);

    const slides = document.querySelectorAll(".slide-img");
    const titles = document.querySelectorAll(".text-slide");
    const types = document.querySelectorAll(".para-slide");
    const buttons = document.querySelectorAll(".read");

    top3.forEach((movie, index) => {
      if (slides[index]) {
        slides[index].src = movie.primaryImage;
        slides[index].alt = movie.primaryTitle;
      }

      if (titles[index]) {
        titles[index].textContent = movie.primaryTitle;
      }

      if (types[index]) {
        types[index].textContent = movie.type?.toUpperCase() || "UNKNOWN";
      }

      if (buttons[index]) {
        buttons[index].onclick = () => {
          window.open(movie.trailer || movie.url, '_blank');
        };
      }
    });

  } catch (error) {
    console.error("Error loading movie data:", error);
  }
}

slides();

async function cards() {
  try {
    const response = await fetch(url, options);
    const data = await response.json();

    const cards = document.querySelectorAll('.card');
    const movies = Array.isArray(data) ? data : data.results || [];

    cards.forEach((card, index) => {
      const movie = movies[index+3];
      if (!movie) return; 

      const img = card.querySelector('.card-img');
      const title = card.querySelector('.card-title2');
      const desc = card.querySelector('.card-title3');
      const rating = card.querySelector('.rating-text');

      if (img) img.src = movie.primaryImage;
      if (title) title.textContent = movie.primaryTitle;
      if (desc) desc.textContent = movie.description;
      if (rating) rating.textContent = movie.averageRating || 'NR';
    });

  } catch (error) {
    console.error('Error fetching or displaying movie data:', error);
  }
}

document.addEventListener('DOMContentLoaded', cards);


const urll = 'https://imdb236.p.rapidapi.com/api/imdb/most-popular-movies';
const optionss = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '6dbc1978dbmsh5a219c2f723b7f7p188161jsnbe26e659607d',
    'x-rapidapi-host': 'imdb236.p.rapidapi.com'
  }
};

async function PopularMovies() {
  try {
    const response = await fetch(urll, optionss);
    const result = await response.json();
    const movies = Array.isArray(result) ? result : result.results || [];

    const popularCards = document.querySelectorAll('.popular-card'); 

    popularCards.forEach((card, index) => {
      const movie = movies[index];
      if (!movie) return;

      const img = card.querySelector('.card-img');
      const title = card.querySelector('.card-title2');
      const rating = card.querySelector('.rating-text');

      if (img) img.src = movie.primaryImage;
      if (title) title.textContent = movie.primaryTitle;
      if (rating) rating.textContent = movie.averageRating || 'NR';
    });

  } catch (error) {
    console.error('Failed to load popular movies:', error);
  }
}

PopularMovies();




/*const courasel =()=>{
const arr1 = ["https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/09/Thunderbolts-movie-concept-art.jpeg ","https://sm.ign.com/t/ign_in/feature/s/sinners-di/sinners-director-ryan-coogler-on-the-parallels-between-the-b_q7wg.1280.jpg","https://sm.ign.com/ign_pk/review/t/the-last-o/the-last-of-us-season-2-review-spoiler-free_mjkw.jpg"];
const arr2 = ["New Movie","New Movie","New Season"];
const arr3 = ["The ThunderBolts","Sinners","The Last of Us"];
const arr4 = ["https://www.imdb.com/title/tt20969586/?ref_=nv_sr_srsg_1_tt_6_nm_1_in_0_q_thunderb","https://www.imdb.com/title/tt31193180/?ref_=nv_sr_srsg_0_tt_4_nm_4_in_0_q_sinn","https://www.imdb.com/title/tt3581920/?ref_=nv_sr_srsg_1_tt_5_nm_2_in_0_q_last%2520of%2520us%2520season%25202"];

  const availableIndexes = [0, 1, 2];

  slide.forEach((s, i) => {
    const randPos = Math.floor(Math.random() * availableIndexes.length);
    const index = availableIndexes.splice(randPos, 1)[0]; 

    s.src = arr1[index];
    para[i].textContent = arr2[index];
    text[i].textContent = arr3[index];

    read[i].addEventListener("click", () => {
      window.location.href = arr4[index];
    });
  });

}

courasel();*/