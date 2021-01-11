/* eslint-disable no-restricted-syntax */
import "./makeCards";
import * as cardsCategory from "./cardsCategory";

const header = document.createElement("header");
const headerWrapper = document.createElement("div");
const navWrapper = document.createElement("ul");
export const modeWrapper = document.createElement("div");

const navBtn = document.createElement("div");
const btnIcon = document.createElement("span");
const btnText = document.createElement("span");
const mainTitle = document.createElement("h1");
const btnWrapper = document.createElement("div");
const swCircle = document.createElement("div");
const switcher = document.createElement("input");
export const playBtnWrapper = document.createElement("div");
export const playSwCircle = document.createElement("div");
export const playSwitcher = document.createElement("input");

headerWrapper.className = "header__wrapper";
navWrapper.className = "nav__wrapper";
navWrapper.innerHTML = "Choose category";
modeWrapper.className = "mode__wrapper";
swCircle.className = "btn-circle";

switcher.type = "checkbox";
switcher.className = "checkbox";
playSwCircle.className = "play-btn-circle";
playSwCircle.textContent = "Train";
playSwitcher.type = "checkbox";
playSwitcher.className = "checkbox";

navBtn.className = "nav__btn";
navBtn.id = "menu-btn";
btnIcon.className = "icon";
btnText.className = "text";
btnText.innerHTML = "MENU";
mainTitle.className = "main__title";
btnWrapper.className = "button__wrapper";
playBtnWrapper.className = "button__wrapper-play";
playBtnWrapper.classList.add("play-btn");

document.body.prepend(header);
header.append(headerWrapper, navWrapper, modeWrapper);
headerWrapper.append(navBtn, mainTitle, btnWrapper);
navBtn.append(btnIcon, btnText);
btnWrapper.append(swCircle, switcher);
playBtnWrapper.append(playSwCircle, playSwitcher);
modeWrapper.append(playBtnWrapper);

mainTitle.innerHTML = "English for Kids";
mainTitle.style.cursor = "pointer";

function createMenu(item, addClass) {
  const menuItem = document.createElement("li");
  menuItem.className = "menu__item";
  if (addClass) {
    menuItem.classList.add(addClass);
  }
  menuItem.innerHTML = item;
  navWrapper.append(menuItem);
}
createMenu("Main menu", "main-menu");

for (const key in cardsCategory.categoryCards) {
  if (Object.prototype.hasOwnProperty.call(cardsCategory.categoryCards, key)) {
    createMenu(key);
  }
}

createMenu("Statistic", "statistic");

navBtn.addEventListener("click", () => {
  if (navBtn.classList.contains("open") && navWrapper.classList.contains("active")) {
    navBtn.classList.remove("open");
    navWrapper.classList.remove("active");
    navBtn.classList.add("close");
  } else {
    navBtn.classList.remove("close");
    navWrapper.classList.add("active");
    navBtn.classList.add("open");
  }
});

document.body.addEventListener("click", (e) => {
  if (navBtn.classList.contains("open") && navWrapper.classList.contains("active") && e.target !== navBtn && e.target !== navWrapper) {
    navBtn.classList.remove("open");
    navWrapper.classList.remove("active");
    navBtn.classList.add("close");
  }
});

btnWrapper.addEventListener("click", (e) => {
  e.preventDefault();
  if (swCircle.classList.contains("active")) {
    swCircle.classList.remove("active");
    document.body.style.backgroundColor = "lightblue";
    navWrapper.style.backgroundColor = "rgb(100, 100, 255)";
    const cardHeader = document.querySelectorAll(".card__header");
    cardHeader.forEach((el) => {
      el.classList.remove("active");
    });
  } else {
    swCircle.classList.add("active");
    document.body.style.backgroundColor = "pink";
    navWrapper.style.backgroundColor = "rgb(255, 124, 124)";
    const cardHeader = document.querySelectorAll(".card__header");
    cardHeader.forEach((el) => {
      el.classList.add("active");
    });
  }
});

mainTitle.addEventListener("click", () => {
  document.location.href = "index.html";
});
