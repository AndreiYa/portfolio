/* eslint-disable */

import renderMap from './module-map';
import renderLocalTable from './module-localTable';
import renderChart from './module-chart';
import renderDate from './module-date';
import * as mainTable from './module-mainTable';

const renderModules = [
    renderMap,
    mainTable.renderMainTable,
    renderLocalTable,
    renderChart,
    renderDate
]

const renderAll = () => {
    renderModules.forEach((el) => el());
}

export default renderAll;