/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-cycle */
import globalConst from "./globalData";

import moduleTemplates from "./service-template";

const tableMode = {
  modes: ["Cases", "Deaths", "Recovered"],
  infoType: [{
    name: "Confirmed",
    color: "orange",
  },
  {
    name: "Deaths",
    color: "red",
  }, {
    name: "Recovered",
    color: "#3ADF00",
  }],
  unit: false,
  last: false,
  currentMode: {
    mode: 0,
    set _mode(value) {
      this.mode = value;
      globalConst.currentChartType = `${tableMode.infoType[value].name}`;
      globalConst.currentInfoType._name = {
        name: `${tableMode.last ? "New" : "Total"}${tableMode.infoType[value].name}`,
        color: tableMode.infoType[value].color,
      };
      changeAnimation(this.mode);
    },
  },
};

/* MODULE TEMPLATE START */

const globalInfoSelect = document.createElement("div");
globalInfoSelect.className = "global-info-select";
const unitBox = document.createElement("div");
const unititle = document.createElement("span");
unititle.className = "select-title";
unititle.textContent = "Per 100K";
unitBox.append(unititle);
const labelUnit = document.createElement("label");
labelUnit.className = "switch";
const inpUnit = document.createElement("input");
inpUnit.addEventListener("change", selectUnit);
inpUnit.setAttribute("type", "checkbox");
labelUnit.append(inpUnit);
const spanUnit = document.createElement("span");
spanUnit.className = "slider";
labelUnit.append(spanUnit);
unitBox.append(labelUnit);
globalInfoSelect.append(unitBox);
const absBox = document.createElement("div");
const abstitle = document.createElement("span");
abstitle.className = "select-title";
abstitle.textContent = "Last day";
absBox.append(abstitle);
const labelLast = document.createElement("label");
labelLast.className = "switch";
const inpLast = document.createElement("input");
inpLast.addEventListener("change", selectLast);
inpLast.setAttribute("type", "checkbox");
labelLast.append(inpLast);
const spanLast = document.createElement("span");
spanLast.className = "slider";
labelLast.append(spanLast);
absBox.append(labelLast);
globalInfoSelect.append(absBox);
moduleTemplates.localTable.append(globalInfoSelect);
const globalInfo = document.createElement("div");
globalInfo.className = "global-info";
moduleTemplates.localTable.append(globalInfo);
const changers = document.createElement("div");
changers.className = "global-info-changer";
// left
const cahngerLeft = document.createElement("span");
cahngerLeft.id = "changer-left";
cahngerLeft.className = "changer material-icons";
cahngerLeft.textContent = "navigate_before";
changers.append(cahngerLeft);
cahngerLeft.addEventListener("click", () => {
  changeMode(-1);
});
// info
const changerInfo = document.createElement("div");
changerInfo.id = "changer-info";
changers.append(changerInfo);
// right
const cahngerRight = document.createElement("span");
cahngerRight.id = "changer-right";
cahngerRight.className = "changer material-icons";
cahngerRight.textContent = "navigate_next";
changers.append(cahngerRight);
cahngerRight.addEventListener("click", () => {
  changeMode(1);
});
const resizer = document.createElement("div");
resizer.className = "box-resizer";
resizer.innerHTML = "<span class='material-icons'> fullscreen_exit </span>";
moduleTemplates.localTable.append(resizer);
resizer.addEventListener("click", () => {
  moduleTemplates.localTable.classList.toggle("box-full");
});
moduleTemplates.localTable.appendChild(changers);
const globalInfoInner = document.createElement("div");
globalInfoInner.className = "global-info-inner";
// cases
const globalInfoCases = document.createElement("div");
globalInfoCases.className = "global-info-box";
const casesHeader = document.createElement("div");
casesHeader.className = "global-info-header";
casesHeader.textContent = "Global Cases";
const casesNum = document.createElement("span");
casesNum.className = "header-num";
casesNum.textContent = "...";
casesHeader.append(casesNum);
globalInfoCases.append(casesHeader);
const casesContent = document.createElement("div");
globalInfoCases.append(casesContent);
globalInfoInner.append(globalInfoCases);
// Deaths
const globalInfoDeaths = document.createElement("div");
globalInfoDeaths.className = "global-info-box";
const deathsHeader = document.createElement("div");
deathsHeader.className = "global-info-header";
deathsHeader.textContent = "Global Deaths";
const deathsNum = document.createElement("span");
deathsNum.className = "header-num";
deathsNum.textContent = "...";
deathsHeader.append(deathsNum);
globalInfoDeaths.append(deathsHeader);
const deathsContent = document.createElement("div");
globalInfoDeaths.append(deathsContent);
globalInfoInner.append(globalInfoDeaths);
// Recovered
const globalInfoRecovered = document.createElement("div");
globalInfoRecovered.className = "global-info-box";
const recoveredHeader = document.createElement("div");
recoveredHeader.className = "global-info-header";
recoveredHeader.textContent = "Global Recovered";
const recoveredNum = document.createElement("span");
recoveredNum.className = "header-num";
recoveredNum.textContent = "...";
recoveredHeader.append(recoveredNum);
globalInfoRecovered.append(recoveredHeader);
const recoveredContent = document.createElement("div");
globalInfoRecovered.append(recoveredContent);
globalInfoInner.append(globalInfoRecovered);

globalInfo.append(globalInfoInner);
/* MODULE TEMPLATE END */

function changeMode(x) {
  if (tableMode.currentMode.mode + x > 2) tableMode.currentMode._mode = 0;
  else if (tableMode.currentMode.mode + x < 0) tableMode.currentMode._mode = 2;
  else tableMode.currentMode._mode = tableMode.currentMode.mode + x;
}

function changeAnimation(x) {
  globalInfoInner.style.transform = `translateX(-${33.33 * x}%)`;
  changerInfo.textContent = `${tableMode.modes[x]} (${globalConst.currentRegion.name ? globalConst.currentRegion.name : "global"})`;
}

function selectUnit(e) {
  tableMode.unit = e.currentTarget.checked;
  renderLocalTable();
}

function selectLast(e) {
  tableMode.last = e.currentTarget.checked;
  tableMode.currentMode._mode = tableMode.currentMode.mode;
  renderLocalTable();
}

function countriesInfo(country, target, mode, color) {
  target.textContent = "";
  const list = document.createElement("ul");
  if (country) {
    const y = globalConst.dataAPI.countryList;
    for (let i = 0; i < y.length; i += 1) {
      if (y[i].Country === country) {
        const dataName = `${tableMode.last ? "New" : "Total"}${mode}`;
        const item = document.createElement("li");
        item.className = "country-details-li country-details-last";
        item.textContent = `${y[i].Country} `;
        const itemNum = document.createElement("span");
        itemNum.textContent = ` ${tableMode.unit ? y[i][dataName] / 100000 : y[i][dataName]}`;
        itemNum.style.color = color;
        item.append(itemNum);
        list.append(item);
        break;
      }
    }
  } else {
    globalConst.dataAPI.countryList.forEach((el, index) => {
      const dataName = `${tableMode.last ? "New" : "Total"}${mode}`;
      const item = document.createElement("li");
      item.className = "country-details-li";
      if (index === globalConst.dataAPI.countryList.length - 1) item.classList.add("country-details-last");
      item.textContent = `${el.Country} `;
      const itemNum = document.createElement("span");
      itemNum.textContent = ` ${tableMode.unit ? el[dataName] / 100000 : el[dataName]}`;
      itemNum.style.color = color;
      item.append(itemNum);
      list.append(item);
    });
  }
  target.append(list);
}

const renderLocalTable = () => {
  // if we use append => we should remove childs
  changerInfo.textContent = `${tableMode.modes[tableMode.currentMode.mode]} (${globalConst.currentRegion.name ? globalConst.currentRegion.name : "global"})`;
  if (tableMode.last) {
    if (tableMode.unit) {
      casesNum.textContent = `${Math.round(globalConst.dataAPI.totalInfo.NewConfirmed / 100000)} per 100K`;
      deathsNum.textContent = `${Math.round(globalConst.dataAPI.totalInfo.NewDeaths / 1000) / 100} per 100K`;
      recoveredNum.textContent = `${Math.round(globalConst.dataAPI.totalInfo.NewRecovered / 100000)} per 100K`;
    } else {
      casesNum.textContent = globalConst.dataAPI.totalInfo.NewConfirmed;
      deathsNum.textContent = globalConst.dataAPI.totalInfo.NewDeaths;
      recoveredNum.textContent = globalConst.dataAPI.totalInfo.NewRecovered;
    }
  } else if (tableMode.unit) {
    casesNum.textContent = `${Math.round(globalConst.dataAPI.totalInfo.TotalConfirmed / 100000)} per 100K`;
    deathsNum.textContent = `${Math.round(globalConst.dataAPI.totalInfo.TotalDeaths / 100000)} per 100K`;
    recoveredNum.textContent = `${Math.round(globalConst.dataAPI.totalInfo.TotalRecovered / 100000)} per 100K`;
  } else {
    casesNum.textContent = globalConst.dataAPI.totalInfo.TotalConfirmed;
    deathsNum.textContent = globalConst.dataAPI.totalInfo.TotalDeaths;
    recoveredNum.textContent = globalConst.dataAPI.totalInfo.TotalRecovered;
  }
  countriesInfo(globalConst.currentRegion.name, casesContent, "Confirmed", "orange");
  countriesInfo(globalConst.currentRegion.name, deathsContent, "Deaths", "red");
  countriesInfo(globalConst.currentRegion.name, recoveredContent, "Recovered", "#3ADF00");
};

export default renderLocalTable;
