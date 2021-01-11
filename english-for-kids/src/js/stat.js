/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import * as cards from "./cards";

const stat = document.createElement("section");
stat.className = "statistic";
stat.classList.add("section");
document.body.append(stat);
const tableWrapper = document.createElement("div");
tableWrapper.className = "card__wrapper";
const difWordBtn = document.createElement("button");
const clearStatBtn = document.createElement("button");
difWordBtn.textContent = "Repeat Difficult Words";
clearStatBtn.textContent = "Clear Statistic";
tableWrapper.append(difWordBtn);
tableWrapper.append(clearStatBtn);

tableWrapper.classList.add("stat__table");
stat.append(tableWrapper);
const statTable = document.createElement("table");

const statCaption = document.createElement("caption");

statCaption.textContent = "Game statistic";

tableWrapper.append(statTable);
statTable.append(statCaption);

const tableMenu = ["Word", "Translation", "Category", "Click", "Correct", "Wrong", "% error"];
const words = [];
const translate = [];

for (let i = 0; i < tableMenu.length; i += 1) {
  const statHeader = document.createElement("th");
  statHeader.textContent = tableMenu[i];
  statTable.append(statHeader);
}

cards.cards.forEach((item) => {
  for (const key in item) {
    for (const keys in item[key]) {
      words.push(item[key][keys].word);
      translate.push(item[key][keys].translation);

      const statInline = document.createElement("tr");
      statTable.append(statInline);
      const statCellWord = document.createElement("td");
      const statCellTranslate = document.createElement("td");
      const statCellCategory = document.createElement("td");
      const statCellClick = document.createElement("td");
      const statCellCorrect = document.createElement("td");
      const statCellWrong = document.createElement("td");
      const statCellPercent = document.createElement("td");

      statInline.setAttribute("data", `${item[key][keys].word}`);
      statInline.className = "stat__line";

      statCellWord.textContent = item[key][keys].word;
      statCellWord.setAttribute("data", `${item[key][keys].word}`);
            
      statCellTranslate.textContent = item[key][keys].translation;
      statCellCategory.textContent = key;
      statCellClick.textContent = "-";
      statCellCorrect.textContent = "-";
      statCellCorrect.setAttribute("correct", 0);
      statCellWrong.textContent = 0;
      statCellPercent.textContent = "-";

      statInline.append(statCellWord);
      statInline.append(statCellTranslate);
      statInline.append(statCellCategory);
      statInline.append(statCellClick);
      statInline.append(statCellCorrect);
      statInline.append(statCellWrong);
      statInline.append(statCellPercent);
    }
  }
});
