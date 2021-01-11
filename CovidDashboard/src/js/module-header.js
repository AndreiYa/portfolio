/* eslint-disable no-shadow */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable no-use-before-define */
import moduleTemplates from "./service-template";
import globalConst from "./globalData";

/* MODULE TEMPLATE START */

const headerLogoWrapper = document.createElement("div");
headerLogoWrapper.className = "logo__wrapper";
const headerLogo = document.createElement("span");
headerLogo.className = "covid-logo material-icons";
headerLogo.textContent = "coronavirus";
const headerTitle = document.createElement("h4");
headerTitle.textContent = "COVID-19 Dashboard by BEST JS DEV TEAM";
const searchWrapper = document.createElement("div");
searchWrapper.className = "search__wrapper";
const searchInput = document.createElement("input");
searchInput.className = "search__input";
const searchBtn = document.createElement("div");
searchBtn.className = "search__btn";
searchBtn.textContent = "Search";

searchWrapper.append(searchInput, searchBtn);
headerLogoWrapper.append(headerLogo, headerTitle);
moduleTemplates.header.append(headerLogoWrapper, searchWrapper);

/* MODULE TEMPLATE END */

function autocomplete(inp, arr) {
  let currentFocus;
  inp.addEventListener("input", function (e) {
    let a; let b; let i; const
      val = this.value;
    closeAllLists();
    if (!val) { return false; }
    currentFocus = -1;
    a = document.createElement("DIV");
    a.setAttribute("id", `${this.id}autocomplete-list`);
    a.setAttribute("class", "autocomplete-items");
    this.parentNode.appendChild(a);
    for (i = 0; i < arr.length; i += 1) {
      if (arr[i].toUpperCase().includes(val.toUpperCase())) {
        b = document.createElement("DIV");
        const currPoint = arr[i].toUpperCase().indexOf(val.toUpperCase());
        b.innerHTML = arr[i].substr(0, currPoint);
        b.innerHTML += `<strong>${arr[i].substr(currPoint, val.length)}</strong>`;
        b.innerHTML += arr[i].substr(currPoint + val.length);
        b.innerHTML += `<input type='hidden' value='${arr[i]}'>`;
        b.addEventListener("click", function (e) {
          inp.value = this.getElementsByTagName("input")[0].value;
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  inp.addEventListener("keydown", function (e) {
    let x = document.getElementById(`${this.id}autocomplete-list`);
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode === 40) {
      currentFocus += 1;
      addActive(x);
    } else if (e.keyCode === 38) {
      currentFocus -= 1;
      addActive(x);
    } else if (e.keyCode === 13) {
      e.preventDefault();
      if (currentFocus > -1) {
        if (x) x[currentFocus].click();
      }
    }
  });

  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    x[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(x) {
    for (let i = 0; i < x.length; i += 1) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  function closeAllLists(elmnt) {
    const x = document.getElementsByClassName("autocomplete-items");
    for (let i = 0; i < x.length; i += 1) {
      if (elmnt !== x[i] && elmnt !== inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  document.addEventListener("click", (e) => {
    closeAllLists(e.target);
  });
}

autocomplete(searchInput, globalConst.dataAPI.countryNames);
    
searchBtn.addEventListener("click", () => {
  if (searchInput.value !== "") {
    const newStr = searchInput.value[0].toUpperCase() + searchInput.value.slice(1);
    globalConst.currentRegion._name = newStr;
  }
});
