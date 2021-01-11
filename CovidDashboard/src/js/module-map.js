/* eslint-disable import/no-cycle */
/* eslint-disable no-useless-concat */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable guard-for-in */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */
import globalConst from "./globalData";
import { map } from "./service-template";
import * as json from "./countries.json";

/* MODULE TEMPLATE START */
// moduleTemplates.map.innerHTML = ` Сюда пойдет фрэйм карты `;
export const mymap = L.map("mapid").setView([15, 0], 2);

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  maxZoom: 18,
  id: "mapbox/dark-v10",
  tileSize: 512,
  zoomOffset: -1,
  accessToken: "pk.eyJ1IjoiYW5kcmVpeWEiLCJhIjoiY2tpcnBqeGFmMGUyZTJ6bjRzdnlycjRpcyJ9.X_IoWStY2eEjv2duSjMIiA",
}).addTo(mymap);
const resizer = document.createElement("div");
resizer.className = "box-resizer";
resizer.innerHTML = "<span class='material-icons'> fullscreen_exit </span>";
map.append(resizer);
resizer.addEventListener("click", () => {
  map.classList.toggle("box-full");
});
/* MODULE TEMPLATE END */

let switcher = true;
let circle = L.circle();

const renderMap = () => {
  for (const key in json) {
    if (json[key].latlng !== undefined) {
      for (const k in globalConst.dataAPI.countryList) {
        if (json[key].name === globalConst.dataAPI.countryList[k].Country) {
          const target = json[key].latlng;
          let dataCircle;
          let colorCircle;
          let fillCol;

          (switcher) ? dataCircle = globalConst.dataAPI.countryList[k].TotalConfirmed / 10 : dataCircle = globalConst.dataAPI.countryList[k].TotalRecovered / 10;
          (switcher) ? colorCircle = "red" : colorCircle = "white";
          (switcher) ? fillCol = "#f03" : fillCol = "white";

          circle = L.circle(target, {
            color: colorCircle,
            fillColor: fillCol,
            fillOpacity: 0.5,
            radius: dataCircle,
          }).addTo(mymap);
        }
        if (json[key].name === globalConst.currentRegion.name
          && globalConst.currentRegion.name === globalConst.dataAPI.countryList[k].Country) {
          mymap.setView(json[key].latlng, 5);
          const popup = L.popup()
            .setLatLng(json[key].latlng)
            .setContent(`${globalConst.currentRegion.name}` + "<br/>" + "<p>New сonfirmed cases: " + ` ${globalConst.dataAPI.countryList[k].NewConfirmed}` + "</p>")
            .openOn(mymap);
        }
      }
    }
  }
};
async function getCountry(lat, lng) {
  const apiCountryUrl = `https://api.opencagedata.com/geocode/v1/json?key=1b5423d072234774beccddea5b1967b8&q=${lat}+${lng}&pretty=1&language=en`;
  const res = await fetch(apiCountryUrl);
  const data = await res.json();
  return data;
}

const mapLegend = document.createElement("div");
mapLegend.className = "map__legend";

function onMapClick(e) {
  getCountry(e.latlng.lat, e.latlng.lng).then((data) => {
    if (data.results[0].components.country !== undefined && e.target !== mapLegend) {
      globalConst.currentRegion._name = data.results[0].components.country;
    }
  });
}

mymap.on("click", onMapClick);

// legend popup

const legendNav = document.createElement("div");
legendNav.className = "legend__nav";
const legendTitle = document.createElement("div");
legendTitle.className = "legend__title";
const legendClose = document.createElement("div");
legendClose.className = "legend__close";
const legendConfirmed = document.createElement("div");
legendConfirmed.className = "legend__confirmed";
const legendRecovered = document.createElement("div");
legendRecovered.className = "legend__recovered";

legendTitle.textContent = "Map Legend";
legendClose.textContent = "--";

legendConfirmed.textContent = "Confirmed cases - red cicles";
legendRecovered.textContent = "Recovered cases - white cicles";

mapLegend.append(legendNav, legendConfirmed, legendRecovered);
legendNav.append(legendTitle, legendClose);

map.append(mapLegend);

mapLegend.addEventListener("click", (e) => {
  if (e.target === legendClose) {
    legendConfirmed.classList.toggle("none");
    legendRecovered.classList.toggle("none");
    mapLegend.classList.toggle("none");
  }
  if (e.target === legendConfirmed) {
    switcher = true;
    const inter = document.querySelectorAll(".leaflet-interactive");
    inter.forEach((item) => {
      item.remove(mymap);
    });
    renderMap();
  }
  if (e.target === legendRecovered) {
    switcher = false;
    const inter = document.querySelectorAll(".leaflet-interactive");
    inter.forEach((item) => {
      item.remove(mymap);
    });
    renderMap();
  }
});

export default renderMap;
