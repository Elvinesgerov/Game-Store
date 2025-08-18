// Variables
const btn = document.querySelector(".btn");
const nameinput = document.querySelector(".nameinput");
const surnameinput = document.querySelector(".surnameinput");
const emailinput = document.querySelector(".emailinput");
const numberinput = document.querySelector(".numberinput");
const textarea = document.querySelector("textarea");
const hiddentextcontact = document.querySelector(".hiddentextcontact");
const flexhidden = document.querySelector(".flex-hidden");
const catagoryBox = document.querySelector(".catagory-box");
const body = document.querySelector("body");
const darkmood = document.querySelector(".darkmood");
const hiddenSearch = document.querySelector(".hidden-search");
const listItems = document.querySelectorAll(".hidden-search ul li");
const searchInput = document.querySelector(".input-container input");
const noResult = document.querySelector(".no-result");
const footerRightButton = document.querySelector(".footer-right button");
const footerRightInput = document.querySelector(".footer-right input");
const hiddenText = document.querySelector("#hidden-text");
let flag = true;
numberinput.value = "+994";
// Variables

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
  flexhidden.style.display = "flex"
  flag = !flag
 } else {
  flexhidden.style.display = "none"
  flag = !flag
 }
}
catagoryBox.addEventListener("click", catagoryFunc)
// Catagorya Js

// contact js
function numberinputsfunc(params) {
 const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];
 if (!(params.key >= '0' && params.key <= '9') && !allowedKeys.includes(params.key)) {
  params.preventDefault();
 }
 if (numberinput.selectionStart < 4 && (params.key === 'Backspace' || params.key === 'Delete')) {
  params.preventDefault();
 }
}
numberinput.addEventListener('keydown', (e) => { numberinputsfunc(e) });

function emailOnlyAllowed(e) {
 const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', '.'];
 const isLetter = /^[a-zA-Z]$/.test(e.key);
 const isNumber = /^[0-9]$/.test(e.key);

 if (!isLetter && !isNumber && !allowedKeys.includes(e.key)) {
  e.preventDefault();
 }
}
emailinput.addEventListener("keydown", emailOnlyAllowed);


numberinput.addEventListener('input', () => {
 if (!numberinput.value.startsWith("+994")) {
  numberinput.value = "+994" + numberinput.value.replace(/[^0-9]/g, '');
 } else {
  numberinput.value = "+994" + numberinput.value.slice(4).replace(/[^0-9]/g, '');
 }
});

function sendfunc() {
 const email = emailinput.value.trim().toLowerCase();
 const number = numberinput.value.trim();
 const endsWithGmail = email.endsWith("@gmail.com");
 const startsWith994 = number.startsWith("+994");

 if (
  nameinput.value.trim() !== "" &&
  surnameinput.value.trim() !== "" &&
  email !== "" &&
  endsWithGmail &&
  email.length >= 6 && email.length <= 50 &&
  startsWith994 &&
  number.length === 13 &&
  textarea.value.trim().length !== 0
 ) {
  hiddentextcontact.innerHTML = "Uğurla Göndərildi ✅";
  hiddentextcontact.style.color = "green";
  nameinput.value = "";
  surnameinput.value = "";
  emailinput.value = "";
  numberinput.value = "+994";
  textarea.value = "";
 } else {
  hiddentextcontact.innerHTML = "Bütün alanı doldurun. Email '@gmail.com' ilə bitməli, uzunluğu 6-50 simvol olmalı, nömrə '+994' ilə başlamalı və 13 simvol olmalıdır ❌";
  hiddentextcontact.style.color = "red";
  nameinput.value = "";
  surnameinput.value = "";
  emailinput.value = "";
  numberinput.value = "+994";
  textarea.value = "";
 }
}
btn.addEventListener('click', sendfunc);
// contact js