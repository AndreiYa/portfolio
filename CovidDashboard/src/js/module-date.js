/* eslint-disable import/no-cycle */
import globalConst from "./globalData";
import moduleTemplates from "./service-template";

/* MODULE TEMPLATE START */
moduleTemplates.date.textContent = "Last Updated at";
const dateTimeBlock = document.createElement("time");
dateTimeBlock.setAttribute("datetime", "<дата и время>");
dateTimeBlock.innerHTML = "Date";
moduleTemplates.date.appendChild(dateTimeBlock);
/* MODULE TEMPLATE END */

const renderDate = () => {
  dateTimeBlock.innerHTML = `${globalConst.dataAPI.lastUpdate}`;
};

export default renderDate;
