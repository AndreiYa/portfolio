/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable import/no-cycle */
import globalConst from "./globalData";
import moduleTemplates from "./service-template";

/* MODULE TEMPLATE START */
const casesInfo = document.createElement("div");
casesInfo.className = "global-cases";

moduleTemplates.mainTable.appendChild(casesInfo);

const casesBy = document.createElement("div");
casesBy.className = "cases-by";
casesBy.innerHTML = `
      <h4 class="title-text"><span>Cases by</span><span>Country/Region/Sovereignty</span></h4>
      `;
moduleTemplates.mainTable.appendChild(casesBy);
const resizer = document.createElement("div");
resizer.className = "box-resizer";
resizer.innerHTML = "<span class='material-icons'> fullscreen_exit </span>";
moduleTemplates.mainTable.append(resizer);
resizer.addEventListener("click", () => {
  moduleTemplates.mainTable.classList.toggle("box-full");
});

/* MODULE TEMPLATE END */

export function makeCountryList() {
  casesBy.removeChild(casesBy.lastChild);
  const casesByList = document.createElement("ul");
  casesByList.className = "cases-by__list";
  casesBy.appendChild(casesByList);
  globalConst.dataAPI.countryList.forEach((el) => {
    const countryItem = document.createElement("li");
    const countryName = document.createElement("div");
    const countryStat = document.createElement("div");
    const countryFlag = document.createElement("div");

    countryItem.className = "country__item-wrapper";
    countryName.className = "country__item-name";
    countryStat.className = "country__item-stat";
    countryFlag.className = "country__item-flag";

    countryItem.setAttribute("country", el.Country);
    countryName.textContent = el.Country;
    countryStat.textContent = el[globalConst.currentInfoType.name.name];
    countryStat.style.color = globalConst.currentInfoType.name.color;
    casesByList.append(countryItem);
    countryItem.append(countryFlag, countryName, countryStat);

    globalConst.dataAPI.countryFlag.forEach((el) => {
      if (countryItem.getAttribute("country") === el.name) {
        countryFlag.style.background = `url("${el.flag}") center center/cover no-repeat`;
      }
    });
  });

  const country = document.querySelectorAll(".country__item-wrapper");
  country.forEach((item) => {
    item.addEventListener("click", (e) => {
      globalConst.currentRegion._name = e.currentTarget.getAttribute("country");
    });
  });
}

export function renderMainTable() {
  casesInfo.innerHTML = `
<h4 class="title-text">Global Cases</h4>
<span class="global-cases__count">${globalConst.dataAPI.totalInfo.TotalConfirmed}</span>
`;
  makeCountryList();
}
