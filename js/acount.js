// Variables
const searchInput = document.querySelector(".input-container input");
const cardInputs = document.querySelectorAll('.cardnumber');
const expDateInputs = document.querySelectorAll('.expDate');
const btn1List = document.querySelectorAll(".btn1");
const btn2List = document.querySelectorAll(".btn2");
const fileInputs = document.querySelectorAll(".fileinput");
const cvvInputs = document.querySelectorAll('.cvvInput');
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

// Pay atention Js 
function keyfunc(e, expDateInput) {
 const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', '/', 'Tab'];
 if ((e.key >= '0' && e.key <= '9') || allowedKeys.includes(e.key)) {
  if (
   e.key >= '0' && e.key <= '9' &&
   expDateInput.value.length === 2 &&
   !expDateInput.value.includes('/')
  ) {
   expDateInput.value += '/';
  }
 } else {
  e.preventDefault();
 }
}

function inputfunc(expDateInput) {
 expDateInput.value = expDateInput.value.replace(/[^0-9\/]/g, '');
 let val = expDateInput.value;

 if (val.length >= 2) {
  let month = parseInt(val.substring(0, 2), 10);
  if (month < 1 || month > 12) {
   expDateInput.value = val.substring(0, 1);
   alert('Ay 01 ilə 12 arasında olmalıdır.');
   return;
  }
 }

 const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
 if (!regex.test(val)) return;

 const [month, year] = val.split('/');
 const inputYear = 2000 + parseInt(year, 10);
 const inputMonth = parseInt(month, 10);
 const now = new Date();

 if (inputYear < now.getFullYear() || (inputYear === now.getFullYear() && inputMonth < now.getMonth() + 1)) {
  alert('Daxil etdiyiniz istifadə müddəti artıq keçib.');
 }
}

function cardInputClean(input) {
 input.value = input.value.replace(/\D/g, '');
}


function initialize() {
 const cardInputs = document.querySelectorAll('.cardnumber');
 const expDateInputs = document.querySelectorAll('.expDate');
 const cvvInputs = document.querySelectorAll('.cvvInput');
 const btn1List = document.querySelectorAll(".btn1");
 const btn2List = document.querySelectorAll(".btn2");
 const fileInputs = document.querySelectorAll(".fileinput");

 cvvInputs.forEach(cvvInput => {
  cvvInput.addEventListener('input', () => {
   cvvInput.value = cvvInput.value.replace(/\D/g, '');
   cvvInput.setCustomValidity(cvvInput.value.length === 3 ? '' : '3 rəqəm daxil edilməlidir.');
   cvvInput.reportValidity();
  });
 });

 cardInputs.forEach(input => {
  input.addEventListener('input', () => cardInputClean(input));
 });

 expDateInputs.forEach(expInput => {
  expInput.addEventListener('keydown', e => keyfunc(e, expInput));
  expInput.addEventListener('input', () => inputfunc(expInput));
 });

 btn1List.forEach((btn, index) => {
  btn.addEventListener("click", () => {
   const fileinput = fileInputs[index];
   const text1 = btn.closest(".hidden-acount-left").querySelector(".text1");

   if (fileinput && fileinput.value) {
    text1.innerHTML = "Təsdiq olundu ✅";
    text1.style.color = "green";
    fileinput.value = "";
   } else {
    text1.innerHTML = "Lütfən qəbzi seçin ❌";
    text1.style.color = "red";
   }
  });
 });

 btn2List.forEach((btn, index) => {
  btn.addEventListener("click", () => {
   const cardInput = cardInputs[index];
   const expDateInput = expDateInputs[index];
   const cvvInput = cvvInputs[index];
   const text2 = btn.closest(".hidden-acount-right").querySelector(".text2");

   const cardOk = cardInput.value.length === 16;
   const expOk = expDateInput.value.length === 5 && /^(0[1-9]|1[0-2])\/\d{2}$/.test(expDateInput.value);
   const cvvOk = cvvInput.value.length === 3;

   if (cardOk && expOk && cvvOk) {
    const [month, year] = expDateInput.value.split('/');
    const inputYear = 2000 + parseInt(year, 10);
    const inputMonth = parseInt(month, 10);
    const now = new Date();

    if (inputYear < now.getFullYear() || (inputYear === now.getFullYear() && inputMonth < now.getMonth() + 1)) {
     alert("Tarix keçmişdir. Zəhmət olmasa düzgün tarix daxil edin.");
     return;
    }

    text2.innerHTML = "Ödəniş uğurla oldu ✅";
    text2.style.color = "green";
    cardInput.value = "";
    expDateInput.value = "";
    cvvInput.value = "";
   } else {
    text2.innerHTML = "Dəyərləri düzgün daxil edin (MM/YY formatı, keçmiş tarix olmamalıdır, CVV 3 rəqəmli) ❌";
    text2.style.color = "red";
    text2.style.width = "620px";
   }
  });
 });

 document.querySelector(".birbankbtn").addEventListener("click", () => {
  document.querySelector(".hidden-acount1").style.display = "flex";
  document.querySelector(".hidden-acount2").style.display = "none";
 });

 document.querySelector(".leobankbtn").addEventListener("click", () => {
  document.querySelector(".hidden-acount2").style.display = "flex";
  document.querySelector(".hidden-acount1").style.display = "none";
 });
}

document.addEventListener("DOMContentLoaded", () => {
 initialize();
});
// Pay atention Js 

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