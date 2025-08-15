// Variables
const progressCircle = document.querySelector(".autoplay-progress svg circle");
const progressContent = document.querySelector(".autoplay-progress span");
const darkmood = document.querySelector(".darkmood");
const body = document.querySelector("body");
const catagoryBox = document.querySelector(".catagory-box");
const flexhidden = document.querySelector(".flex-hidden");
const hiddenSearch = document.querySelector(".hidden-search");
const mainContainer = document.querySelector(".main-container")
const searchInput = document.querySelector(".input-container input");
const listItems = document.querySelectorAll(".hidden-search ul li");
const noResult = document.querySelector(".no-result");
const footerRightButton = document.querySelector(".footer-right button");
const footerRightInput = document.querySelector(".footer-right input");
const hiddenText = document.querySelector("#hidden-text");
let flag = true;
// Variables

// search Js
function searchfunc() {
 const inputValue = searchInput.value.toLowerCase().trim();
 let found = false;

 hiddenSearch.classList.add("show");

 listItems.forEach(li => {
  const text = li.textContent.toLowerCase();
  if (text.startsWith(inputValue) && inputValue !== "") {
   li.style.display = "list-item";
   found = true;
  } else {
   li.style.display = "none";
  }
 });

 noResult.style.display = (!found && inputValue !== "") ? "block" : "none";

 if (inputValue === "") {
  hiddenSearch.classList.remove("show");
 }
}
searchInput.addEventListener("input", searchfunc)
// search Js

// Swiper Js
let swiper = new Swiper(".mySwiper", {
 spaceBetween: 30,
 centeredSlides: true,
 autoplay: {
  delay: 2500,
  disableOnInteraction: false
 },
 pagination: {
  el: ".swiper-pagination",
  clickable: true
 },
 navigation: {
  nextEl: ".swiper-button-next",
  prevEl: ".swiper-button-prev"
 },
 on: {
  autoplayTimeLeft(s, time, progress) {
   const offset = 125.6 * (1 - progress);
   progressCircle.style.strokeDashoffset = offset;
   progressContent.textContent = `${Math.ceil(time / 1000)}s`;
  }
 }
});
// Swiper Js


// Dark Mood Js
if (localStorage.getItem("darkMode") === "enabled") {
 body.classList.add("darkmode-body");
}

function darkmode(e) {
 e.preventDefault();
 body.classList.toggle("darkmode-body");
 const isDark = body.classList.contains("darkmode-body");

 if (isDark) {
  localStorage.setItem("darkMode", "enabled");
 } else {
  localStorage.setItem("darkMode", "disabled");
 }
}
darkmood.addEventListener("click", darkmode);
// Dark Mood Js


// Catagorya Js
function catagoryFunc() {
 if (flag) {
  flexhidden.style.display = "block"
  flag = !flag
 } else {
  flexhidden.style.display = "none"
  flag = !flag
 }
}
catagoryBox.addEventListener("click", catagoryFunc)
// Catagorya Js

// Email Js
// function emailfunc() {
//  const fullEmailRegex = /^[A-Za-z0-9.]{6,30}@gmail\.com$/i;
//  const emailVal = footerRightInput.value.trim();
//  if (fullEmailRegex.test(emailVal)) {
//   hiddenText.innerHTML = "Abune olundu ✅"
//   hiddenText.style.color = "green";
//  } else {
//   hiddenText.innerHTML = "Yalnız hərflər (A-Z, a-z), rəqəmlər və nöqtə istifadə oluna bilər. Sonu @gmail.com olmalıdır. ❌"
//   hiddenText.style.color = "red";
//  }
// }
// footerRightButton.addEventListener("click", emailfunc);

// document.querySelector("#player-store").addEventListener("click", () => { alert("Tezlikle") })
// Email Js