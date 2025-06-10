const slide = document.querySelectorAll(".slides");
const para = document.querySelectorAll(".para-slide");
const text = document.querySelectorAll(".text-slide");
const read = document.querySelectorAll(".read");

const courasel =()=>{
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

courasel();