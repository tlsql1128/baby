(function () {
  if (typeof Swiper === "undefined") return;
  const el = document.querySelector(".about-swiper");
  if (!el) return;

  new Swiper(".about-swiper", {
    loop: true,
    speed: 650,
    grabCursor: true,
    spaceBetween: 0,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    pagination: {
      el: "#aboutReviewPager",
      clickable: true,
    },
    navigation: {
      nextEl: ".about-swiper .swiper-button-next",
      prevEl: ".about-swiper .swiper-button-prev",
    },
  });
})();
