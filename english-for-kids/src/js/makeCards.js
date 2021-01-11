/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import * as cards from "./cards";
import * as cardsCategory from "./cardsCategory";

function makeMainPage(category, addClass) {
  const section = document.createElement("section");
  const cardWrapper = document.createElement("div");
  section.className = addClass;
  section.classList.add("section");
  cardWrapper.className = "card__wrapper";
  cardWrapper.classList.add(addClass);
  document.body.append(section);
  section.prepend(cardWrapper);
  for (const key in category) {
    const card = document.createElement("div");
    const cardHeader = document.createElement("div");
    const picWrapper = document.createElement("div");
    const cardTitle = document.createElement("div");

    picWrapper.className = "pic__wrapper";
    cardHeader.className = "card__header";
    card.className = "main__card";
    card.classList.add(addClass);
    cardTitle.className = "card__title";
    cardWrapper.append(card);
    card.append(cardHeader);
    card.append(picWrapper);
    card.append(cardTitle);
    cardTitle.innerHTML = key;
  }
  const picWrp = document.querySelectorAll(".pic__wrapper");
  let count = 0;
  for (const key in category) {
    picWrp[count].style.background = `url("${category[key]}") center center/cover no-repeat`;
    count += 1;
  }
}

function makePage(category, addClass) {
  const section = document.createElement("section");
  const cardWrapper = document.createElement("div");
  section.className = addClass;
  section.classList.add("section");
  cardWrapper.className = "card__wrapper";
  cardWrapper.classList.add(addClass);
  document.body.append(section);
  section.prepend(cardWrapper);

  for (const key in category) {
    category[key].forEach((item) => {
      const card = document.createElement("div");
      const back = document.createElement("div");
      const revBtn = document.createElement("div");
      const cardHeader = document.createElement("div");
      const cardHeaderBack = document.createElement("div");
      const picWrapper = document.createElement("div");
      const picWrapperBack = document.createElement("div");
      const cardTitle = document.createElement("div");
      const cardTitleBack = document.createElement("div");
      const cardWr = document.createElement("div");

      cardWr.className = "card__flip";

      cardWr.setAttribute("category", `${key}`);
      cardWr.setAttribute("data", `${item.word}`);
      cardWr.setAttribute("correct", 0);
      cardWr.setAttribute("wrong", 0);
      cardWr.setAttribute("audioSrc", `${item.audioSrc}`);

      picWrapper.className = "pic__wrapper";
      picWrapperBack.className = "pic__wrapper-back";
      revBtn.className = "reverse";
      revBtn.style.background = "url('assets/images/arrow.png') center center/cover no-repeat";
      cardHeader.className = "card__header";
      cardHeaderBack.className = "card__header-back";
      card.className = "card";
      back.className = "card";

      card.classList.add("training");
      card.classList.add(`${addClass}`);

      card.classList.add("front");
      back.classList.add("back");
      cardTitle.className = "card__title";
      cardTitleBack.className = "card__title-back";
      cardWrapper.append(cardWr);
      cardWr.append(card);
      cardWr.append(back);
      card.append(revBtn);
      back.append(cardHeaderBack);
      card.append(cardHeader);
           
      card.append(picWrapper);
      back.append(picWrapperBack);
      card.append(cardTitle);
      back.append(cardTitleBack);

      cardTitle.textContent = item.word;
      cardTitleBack.textContent = item.translation;
      
      picWrapper.style.background = `url("${item.image}") center center/cover no-repeat`;
      picWrapperBack.style.background = `url("${item.image}") center center/cover no-repeat`;
    });
  }
}

makeMainPage(cardsCategory.categoryCards, "main");
makePage(cards.cards[0], "action_set_a");
makePage(cards.cards[1], "action_set_b");
makePage(cards.cards[2], "action_set_c");
makePage(cards.cards[3], "adjective");
makePage(cards.cards[4], "animal_set_a");
makePage(cards.cards[5], "animal_set_b");
makePage(cards.cards[6], "clothes");
makePage(cards.cards[7], "emotions");
