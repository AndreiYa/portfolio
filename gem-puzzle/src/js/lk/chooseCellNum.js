import puzzle from "./index.js";
import inputArr from "./index.js";
import cellArr from "./index.js";

function chooseCellNum() {
  for (let i = 0; i < inputArr.length; i++) {
    inputArr[i].addEventListener("click", function () {
      if (inputArr[i] === inputArr[0]) {
        cellArr = Array(2);
        puzzle.classList.remove("eight");
        puzzle.classList.add("three");
        return cellArr;
      }
      if (inputArr[i] === inputArr[1]) {
        cellArr = Array(3);
        puzzle.classList.remove("three", "eight");
        return cellArr;
      }
      if (inputArr[i] === inputArr[2]) {
        cellArr = Array(7);
        puzzle.classList.remove("three");
        puzzle.classList.add("eight");
        return cellArr;
      }
    });
  }
}
chooseCellNum();

export default chooseCellNum;