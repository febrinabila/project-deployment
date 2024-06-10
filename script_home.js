let navbar = document.querySelector(".navbar");

document.querySelector("#menu-btn").onclick = () => {
  navbar.classList.toggle("active");
  searchForm.classList.remove("active");
  cartItem.classList.remove("active");
};

let searchForm = document.querySelector(".search-form");

document.querySelector("#search-btn").onclick = () => {
  searchForm.classList.toggle("active");
  navbar.classList.remove("active");
  cartItem.classList.remove("active");
};

let cartItem = document.querySelector(".cart-items-container");

document.querySelector("#cart-btn").onclick = () => {
  cartItem.classList.toggle("active");
  navbar.classList.remove("active");
  searchForm.classList.remove("active");
};

window.onscroll = () => {
  navbar.classList.remove("active");
  searchForm.classList.remove("active");
  cartItem.classList.remove("active");
};

//create by Farhan

var changeScroll_top = 0;
var changeScroll_bottom = 0;
var navLinks = document.querySelectorAll(".navbar-nav a"); // Menambahkan variabel untuk menyimpan semua tautan navbar
var footer = document.querySelector(".footer");
var footerText = document.querySelectorAll(".footer-text");

window.addEventListener("scroll", function(){
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  var scrollBottom = window.pageYOffset || document.documentElement.scrollBottom;
  if(scrollTop > changeScroll_top){
    navbar.style.top = "-80px"; // Mengubah style top menjadi -80px untuk menyembunyikan navbar
    navLinks.forEach(function(link) {
      link.style.opacity = "0"; // Menyembunyikan tautan navbar dengan mengubah opacity menjadi 0
      link.style.transition = "0.5s";
    });

    if (scrollBottom > changeScroll_bottom){
      footer.style.bottom = "0"; // Mengubah style top menjadi -80px untuk menyembunyikan navbar
    footerText.forEach(function(link) {
      link.style.opacity = "1"; // Menyembunyikan tautan navbar dengan mengubah opacity menjadi 0
      link.style.transition = "0.5s";
    });
    }
  } else {
    navbar.style.top = "0"; // Mengembalikan style top menjadi 0 untuk menampilkan navbar kembali
    footer.style.bottom = "-80px"
    navLinks.forEach(function(link) {
      link.style.opacity = "1"; // Menampilkan kembali tautan navbar dengan mengubah opacity menjadi 1
      link.style.transition = "0.5s";
    });

    footerText.forEach(function(link) {
      link.style.opacity = "0"; // Menyembunyikan tautan navbar dengan mengubah opacity menjadi 0
      link.style.transition = "0.5s";
    });
  }
  changeScroll_top = scrollTop;
  changeScroll_bottom = scrollBottom;
});

// start team
const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper svg");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;

let isDragging = false,
  startX,
  startScrollLeft;

arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return;
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);

// end team
