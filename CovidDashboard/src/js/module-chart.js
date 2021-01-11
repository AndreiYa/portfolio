/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable import/no-cycle */
import globalConst from "./globalData";

import moduleTemplates from "./service-template";

const charts = {
  daily: undefined,
  cumulative: undefined,
  log: undefined,
};

/* MODULE TEMPLATE START */

const schedulePlace = document.createElement("div");
schedulePlace.className = "schedule-place";

moduleTemplates.chart.appendChild(schedulePlace);
const resizer = document.createElement("div");
resizer.className = "box-resizer";
resizer.innerHTML = "<span class='material-icons'> fullscreen_exit </span>";
moduleTemplates.chart.append(resizer);
resizer.addEventListener("click", () => {
  moduleTemplates.chart.classList.toggle("box-full");
  renderChart();
});
const scheduleDeath = document.createElement("div");
scheduleDeath.className = "schedule-death";
scheduleDeath.style.display = "inline-block";

const scheduleConfirmed = document.createElement("div");
scheduleConfirmed.className = "schedule-confirmed";
scheduleConfirmed.style.display = "inline-block";

const scheduleRecovered = document.createElement("div");
scheduleRecovered.className = "schedule-recovered";
scheduleRecovered.style.display = "inline-block";

moduleTemplates.chart.appendChild(scheduleDeath);
moduleTemplates.chart.appendChild(scheduleConfirmed);
moduleTemplates.chart.appendChild(scheduleRecovered);
/* MODULE TEMPLATE END */

const myChartDaily = document.createElement("canvas");
const myChartCumulative = document.createElement("canvas");
const myChartLog = document.createElement("canvas");
myChartDaily.id = "myChartDaily";
myChartCumulative.id = "myChartCumulative";
myChartLog.id = "myChartLog";
myChartDaily.style.width = `${100}%`;
myChartCumulative.style.width = `${100}%`;
myChartLog.style.width = `${100}%`;
myChartDaily.style.height = `${150}px`;
myChartCumulative.style.height = `${150}px`;
myChartLog.style.height = `${150}px`;
myChartDaily.style.display = "inline-block";
myChartCumulative.style.display = "inline-block";
myChartLog.style.display = "inline-block";

scheduleDeath.append(myChartDaily);
scheduleConfirmed.append(myChartCumulative);
scheduleRecovered.append(myChartLog);
const ctxDaily = document.getElementById("myChartDaily").getContext("2d");
const ctxCumulative = document.getElementById("myChartCumulative").getContext("2d");
const ctxLog = document.getElementById("myChartLog").getContext("2d");

export async function getChartData(url) {
  const apiCountryUrl = url;
  const res = await fetch(apiCountryUrl);
  const data = await res.json();
  return data;
}

function makeTableDaily(data) {
  const arrDate = [];
  const arrParam = [];
    
  data.forEach((el) => {
    arrDate.push(el.date);
    arrParam.push(el[`New${globalConst.currentChartType}`]);
  });

  charts.daily = new Chart(ctxDaily, {
    type: "line",
    data: {

      labels: arrDate,
      datasets: [{
        label: "Daily",
        backgroundColor: globalConst.currentInfoType.name.color,
        borderColor: globalConst.currentInfoType.name.color,
        data: arrParam,
      }],
    },
    options: {},
  });
}

function makeTableCumulative(data) {
  const arrDate = [];
  const arrParam = [];
    
  data.forEach((el) => {
    arrDate.push(el.date);
    arrParam.push(el[`Total${globalConst.currentChartType}`]);
  });

  charts.cumulative = new Chart(ctxCumulative, {
    type: "line",
    data: {

      labels: arrDate,
      datasets: [{
        label: "Cumulative",
        backgroundColor: globalConst.currentInfoType.name.color,
        borderColor: globalConst.currentInfoType.name.color,
        data: arrParam,
      }],
    },
    options: {},
  });
}

function makeTableLog(data) {
  const arrDate = [];
  const arrParam = [];
    
  data.forEach((el) => {
    arrDate.push(el.date);
    arrParam.push(Math.log(el[`New${globalConst.currentChartType}`]));
  });

  charts.log = new Chart(ctxLog, {
    type: "line",
    data: {

      labels: arrDate,
      datasets: [{
        label: "Log",
        backgroundColor: globalConst.currentInfoType.name.color,
        borderColor: globalConst.currentInfoType.name.color,
        data: arrParam,
      }],
    },
    options: {},
  });
}

function getFormatData(data) {
  const newData = [];
  if (globalConst.currentRegion.name) {
    for (let i = data.length - 1; i >= data.length - 30; i -= 1) {
      const cD = new Date(data[i].Date);
      newData.push({
        date: cD.toLocaleDateString(),
        TotalConfirmed: data[i].Confirmed,
        NewConfirmed: Math.abs(data[i].Confirmed - data[i - 1].Confirmed),
        TotalDeaths: data[i].Deaths,
        NewDeaths: Math.abs(data[i].Deaths - data[i - 1].Deaths),
        TotalRecovered: data[i].Recovered,
        NewRecovered: Math.abs(data[i].Recovered - data[i - 1].Recovered),
      });
    }
  } else {
    data.sort((a, b) => a.TotalConfirmed - b.TotalConfirmed);
    const cD = new Date(globalConst.dataAPI.lastUpdate);
    data.reverse().slice(0, 30).forEach((el, index) => {
      newData.push({
        date: cD.toLocaleDateString(),
        TotalConfirmed: el.TotalConfirmed,
        NewConfirmed: el.NewConfirmed,
        TotalDeaths: el.TotalDeaths,
        NewDeaths: el.NewDeaths,
        TotalRecovered: el.TotalRecovered,
        NewRecovered: el.NewRecovered,
      });
      cD.setDate(cD.getDate() - 1);
    });
  }
  return newData;
}

const renderChart = () => {
  Object.keys(charts).forEach((el) => {
    if (charts[el] !== undefined) charts[el].destroy();
  });
  let url;
  const D = new Date(globalConst.dataAPI.lastUpdate);
  D.setDate(D.getDate() - 35);
  if (globalConst.currentRegion.name) {
    url = `https://api.covid19api.com/country/${globalConst.currentRegion.name}?from=${D.toISOString()}&to=${globalConst.dataAPI.lastUpdate}`;
  } else {
    url = `https://api.covid19api.com/world?from=${D.toISOString()}&to=${globalConst.dataAPI.lastUpdate}`;
  }
  getChartData(url)
    .then((dataInfo) => {
      const newdata = getFormatData(dataInfo).reverse();
      makeTableDaily(newdata);
      makeTableCumulative(newdata);
      makeTableLog(newdata);
    }).catch((err) => {
      throw new Error(err);
    });
};

export default renderChart;
