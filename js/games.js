// Variables
const hiddenSearch = document.querySelector(".hidden-search");
const listItems = document.querySelectorAll(".hidden-search ul li");
const noResult = document.querySelector(".no-result");
const darkmood = document.querySelector(".darkmood");
const body = document.querySelector("body");
const flexhidden = document.querySelector(".flex-hidden");
const catagoryBox = document.querySelector(".catagory-box");
const footerRightButton = document.querySelector(".footer-right button");
const footerRightInput = document.querySelector(".footer-right input");
const hiddenText = document.querySelector("#hidden-text");
const searchInput = document.querySelector(".input-container input");
let flag = true;
// Variables

// Catagorya Js
function catagoryFunc() {
 if (flag) {
  flexhidden.style.display = "flex"
  flag = !flag
 } else {
  flexhidden.style.display = "none"
  flag = !flag
 }
}
catagoryBox.addEventListener("click", catagoryFunc)
// Catagorya Js

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

// Email Js
function emailfunc() {
 const fullEmailRegex = /^[A-Za-z0-9.]{6,30}@gmail\.com$/i;
 const emailVal = footerRightInput.value.trim();
 if (fullEmailRegex.test(emailVal)) {
  hiddenText.innerHTML = "Abune olundu ✅"
  hiddenText.style.color = "green";
 } else {
  hiddenText.innerHTML = "Yalnız hərflər (A-Z, a-z), rəqəmlər və nöqtə istifadə oluna bilər. Sonu @gmail.com olmalıdır. ❌"
  hiddenText.style.color = "red";
 }
}
footerRightButton.addEventListener("click", emailfunc);

document.querySelector("#player-store").addEventListener("click", () => { alert("Tezlikle") })
// Email Js