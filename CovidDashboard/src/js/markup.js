const body = document.querySelector("body");

const header = document.createElement("header");
header.id = "pageHeader";
header.innerHTML = "Header";
body.appendChild(header);
const casesBlock = document.createElement("div");
casesBlock.id = "cases";
body.appendChild(casesBlock);
const mapBlock = document.createElement("div");
mapBlock.id = "map";
body.appendChild(mapBlock);
const global = document.createElement("div");
global.id = "global";
body.appendChild(global);
const dateBlock = document.createElement("div");
dateBlock.id = "date";
body.appendChild(dateBlock);
const schedule = document.createElement("div");
schedule.id = "schedule";
body.appendChild(schedule);
const footer = document.createElement("footer");
footer.id = "pageFooter";
footer.innerHTML = "Footer";
body.appendChild(footer);

// cases block
const casesInfo = document.createElement("div");
casesInfo.className = "global-cases";
casesInfo.innerHTML = `
      <h4 class="title-text">Global Cases</h4>
      <span class="global-cases__count">72 948 590</span>
      `;
casesBlock.appendChild(casesInfo);

const casesBy = document.createElement("div");
casesBy.className = "cases-by";
casesBy.innerHTML = `
      <h4 class="title-text">Cases by Country/Region/Sovereignty</h4>
      `;
casesBlock.appendChild(casesBy);
// ul element
const casesByList = document.createElement("ul");
casesByList.className = "cases-by__list";
// li elements
casesByList.innerHTML = `
      <li class="cases-by__country country">
        <span class="country-count">16 520 083</span>
        <span class="country-name">US</span>
      </li>
      `;
casesBy.appendChild(casesByList);

// map block
mapBlock.innerHTML = " Сюда пойдет фрэйм карты ";

// global
const globalInfo = document.createElement("div");
globalInfo.className = "global-info";
global.appendChild(globalInfo);

// Deaths
const globalDeaths = document.createElement("div");
globalDeaths.className = "global-deaths";
globalDeaths.innerHTML = `
      <h4 class="title-text">Global Cases</h4>
      <span class="global-cases__count">72 948 590</span>
      `;
globalInfo.appendChild(globalDeaths);
const globalDeathList = document.createElement("ul");
globalDeathList.className = "global-death__list";
globalDeathList.innerHTML = `
      <li class="global-death__country">
        <span class="global-death-count">16 520 083</span>
        <span class="global-death-name">US</span>
      </li>
      `;
globalDeaths.appendChild(globalDeathList);

// Recovered
const globalRecovered = document.createElement("div");
globalRecovered.className = "global-recovered";
globalRecovered.innerHTML = `
      <h4 class="title-text">Global Recovered</h4>
      <span class="global-recovered__count">41 339 537</span>
      `;
globalInfo.appendChild(globalRecovered);
const globalRecoveredList = document.createElement("ul");
globalRecoveredList.className = "global-recovered__list";
globalRecoveredList.innerHTML = `
      <li class="global-recovered__country">
        <span class="global-recovered-count">16 520 083</span>
        <span class="global-recovered-name">US</span>
      </li>
      `;
globalRecovered.appendChild(globalRecoveredList);

// date block
const dateTimeBlock = document.createElement("time");
dateTimeBlock.setAttribute("datetime", "<дата и время>");
dateTimeBlock.innerHTML = "Date";
date.appendChild(dateTimeBlock);

// schedule block
const schedulePlace = document.createElement("div");
schedulePlace.className = "schedule-place";
schedulePlace.innerHTML = "API schedule";
schedule.appendChild(schedulePlace);
