/* eslint-disable */
const body = document.body;

//Каркас
const loadingScreen = document.createElement('div');
loadingScreen.className = 'loading';
body.append(loadingScreen);

const header = document.createElement('header');

header.id = 'pageHeader';
body.appendChild(header);

const casesBlock = document.createElement('div');
casesBlock.id = 'cases';
body.appendChild(casesBlock);
const mapBlock = document.createElement('div');
mapBlock.id = 'map';

export const map = document.createElement("div");
map.id = "mapid";
mapBlock.append(map);

body.appendChild(mapBlock);
const global = document.createElement('div');
global.id = 'global';
body.appendChild(global);
const dateBlock = document.createElement('div');
dateBlock.id = 'date';
body.appendChild(dateBlock);
const schedule = document.createElement('div');
schedule.id = 'schedule';
body.appendChild(schedule);
const footer = document.createElement('footer');
footer.id = 'pageFooter';
body.appendChild(footer);

export default {
    header: header,
    mainTable: casesBlock,
    map: mapBlock,
    localTable: global,
    date: dateBlock,
    chart: schedule,
    footer: footer,
    loading: loadingScreen
}