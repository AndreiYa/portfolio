import playSound from "./sound.js";
// import chooseCellNum from "./chooseCellNum.js";

// import shiftCell from "./moveCell.js";

"use strict";
document.addEventListener("DOMContentLoaded", () => {
  let cellArr = [1, 2, 3];
  document.body.style.background = "url(assets/img/wood.jpg)";
  const puzzle = document.createElement("div");
  puzzle.className = "puzzle";
  puzzle.id = "puzzle";
  document.body.prepend(puzzle);
  puzzle.style.borderImage = "url(assets/img/Аl_light.jpg) 25%";

  const information = document.createElement("div");
  information.className = "info";
  information.id = "info";
  document.body.prepend(information);

  const time = document.createElement("div");
  time.className = "time";
  const min = document.createElement("span");
  const sec = document.createElement("span");
  min.id = "min";
  sec.id = "sec";
  information.append(time);
  time.append(min);
  time.append(sec);
  let secCounter = 0; 
  let minCounter = 0;
  let timerId;

  const count = document.createElement("div");
  const countSpan = document.createElement("span");
  count.className = "count";
  countSpan.className = "counter";
  information.append(count);
  count.append(countSpan);
  let counter = 0;
  // countSpan.innerHTML = `count : ${counter}`;
  
  const controls = document.createElement("div");
  controls.className = "controls";
  controls.id = "controls";
  document.body.append(controls);

  const solveBtn = document.createElement("button");
  solveBtn.className = "solve";
  solveBtn.id = "solve";
  solveBtn.innerHTML = "Solve";
  controls.prepend(solveBtn);

  const scrambleBtn = document.createElement("button");
  scrambleBtn.className = "scramble";
  scrambleBtn.id = "scramble";
  scrambleBtn.innerHTML = "Reset";
  controls.prepend(scrambleBtn);

  const loydBtn = document.createElement("button");
  loydBtn.className = "loyd";
  loydBtn.id = "loyd";
  loydBtn.innerHTML = "Loyd SW";
  controls.append(loydBtn);

  let state = 1;
  let img = false;
  let sound = false;

  const menuBtn = document.createElement("button");
  menuBtn.innerHTML = "menu";
  const popUp = document.createElement("div");
  const popScore = document.createElement("div");
  popUp.className = "popup";
  popScore.className = "popscore";
  const menu = document.createElement("div");
  menu.className = "menu";
  popUp.append(menu);
  document.body.append(popUp);
  document.body.append(popScore);
  controls.append(menuBtn);
  
  const menuName = document.createElement("span");
  const newBtn = document.createElement("div");
  const newGameBtn = document.createElement("div");
  const bestScoreBtn = document.createElement("div");
  const scrambleMenuBtn = document.createElement("div");
  const radio3 = document.createElement("input");
  const radio4 = document.createElement("input");
  const radio8 = document.createElement("input");
  const checkPic = document.createElement("input");
  const checkSound = document.createElement("input");
  
  radio3.type = "radio";
  radio4.type = "radio";
  radio4.setAttribute("checked", "");
  radio8.type = "radio";
  checkPic.type = "checkbox";
  checkSound.type = "checkbox";

  radio3.id = "3x3";
  radio4.id = "4x4";
  radio8.id = "8x8";
  checkPic.id = "Pic";
  checkSound.id = "sound";

  const label3 = document.createElement("label");
  const label4 = document.createElement("label");
  const label8 = document.createElement("label");
  const labelPic = document.createElement("label");
  const labelSound = document.createElement("label");

  label3.htmlFor = "3x3";
  label4.htmlFor = "4x4";
  label8.htmlFor = "8x8";
  labelPic.htmlFor = "Pic";
  label3.innerHTML = "3x3";
  label4.innerHTML = "4x4";
  label8.innerHTML = "8x8";
  labelPic.innerHTML = "Pic";
  labelSound.innerHTML = "Sound";

  radio3.name = "rdname";
  radio4.name = "rdname";
  radio8.name = "rdname";
  checkPic.name = "check";
  checkSound.name = "Sound";

  menuName.className = "menu_title";
  menuName.innerHTML = "Menu";

  newGameBtn.innerHTML = "New Game";
  newGameBtn.className = "menu_item-new";  

  bestScoreBtn.innerHTML = "Best Score";
  scrambleMenuBtn.innerHTML = "Scramble...";
  newBtn.className = "menu_item";
  bestScoreBtn.className = "menu_item";
  scrambleMenuBtn.className = "menu_item";

  menu.append(menuName, newBtn, bestScoreBtn, scrambleMenuBtn);
  newBtn.append(radio3, label3, radio4, label4, radio8, label8,
    checkPic, labelPic, checkSound, labelSound);
  newBtn.prepend(newGameBtn);
  const inputArr = document.getElementsByName("rdname");
 
  loydBtn.addEventListener("click", function () {
    switcherLoyd();
  });

  menuBtn.addEventListener("click", () => {
    popUp.classList.toggle("show");
  });
  bestScoreBtn.addEventListener("click", () => {
    popScore.classList.toggle("show");
  });
  
  popUp.addEventListener("click", function (e) {
    if (e.target === popUp) {
      popUp.classList.remove("show");
    }
  });
  popScore.addEventListener("click", function (e) {
    if (e.target === popScore) {
      popScore.classList.remove("show");
    }
  });

  scrambleMenuBtn.addEventListener("click", function () {
    popUp.classList.remove("show");
    chooseCellNum();
    solve();
    scramble();
  });
  
  checkPic.addEventListener("click", function () {
    if (checkPic.checked === true) {
      img = true;
    } else {
      img = false;
    }
  });

  checkSound.addEventListener("click", function () {
    if (checkSound.checked === true) {
      sound = true;
    } else {
      sound = false;
    }

  });

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
  newGameBtn.addEventListener("click", function () {
    chooseCellNum();
    solve();

    popUp.classList.remove("show");
  });
 
  solve();
 
  puzzle.addEventListener("dragend", function (e) {
    if (state === 1) {
      e.target.style.opacity = "1.0";
      shiftCell(e.target);
    }
  });

  puzzle.addEventListener("click", function (e) {
    if (state === 1) {
      puzzle.classList.remove("animate-fast");
      puzzle.classList.add("animate");
      shiftCell(e.target);
    }
  });
  
  puzzle.addEventListener("dragstart", function (e) {
    if (state === 1) {
      e.target.style.opacity = "0.001";
      puzzle.classList.remove("animate");
      puzzle.classList.add("animate-fast");
    }
  });
  puzzle.addEventListener("touchstart", function (e) {
    if (state === 1) {
      e.target.style.opacity = "0.001";
      puzzle.classList.remove("animate");
      puzzle.classList.add("animate-fast");
    }
  });
  puzzle.addEventListener("touchend", function (e) {
    if (state === 1) {
      e.target.style.opacity = "1.0";
      shiftCell(e.target);
    }
  });
  
  puzzle.addEventListener("touchmove", function (e) {
    if (state === 1) {
      e.target.style.opacity = "0.8";
    }
  });
  
  solveBtn.addEventListener("click", () => {
    solve();
  });

  scrambleBtn.addEventListener("click", () => {
    counter = 0;
    countSpan.innerHTML = `count : ${counter}`;
    scramble();
  });
  
  function solve(){
    if(state == 0){
      return;
    }
    puzzle.innerHTML = "";
		
    let n = 1;
    let pic = 1;

    for(let i = 0; i <= cellArr.length; i++){
      for (let j = 0; j <= cellArr.length; j++){
        let cell = document.createElement("span");
        cell.draggable = true;
        cell.id = `cell-${i}-${j}`;
        cell.classList.add(`n${n}`);
      
        switch (cellArr.length) {
        case 2:
          cell.classList.add("three");
          cell.classList.remove("four");
          cell.classList.remove("seven");
          cell.style.left = (j * 99 + 1 * j + 1) + "px";
          cell.style.top = (i * 99 + 1 * i + 1) + "px";
          break;
        case 3:
          cell.classList.add("four");
          cell.classList.remove("three");
          cell.classList.remove("seven");
          cell.style.left = (j * 74 + 1 * j + 1) + "px";
          cell.style.top = (i * 74 + 1 * i + 1) + "px";
          break;
        case 7:
          cell.classList.add("seven");
          cell.classList.remove("three");
          cell.classList.remove("four");
          cell.style.left = (j * 36.5 + 1 * j + 1) + "px";
          cell.style.top = (i * 36.5 + 1 * i + 1) + "px";
          break;
        }
        
        if (n <= 8 && cellArr.length === 2 ||
          n <= 15 && cellArr.length === 3 ||
          n <= 63 && cellArr.length === 7) {
          cell.classList.add("number");
          cell.classList.add("cell");
          cell.innerHTML = (n++).toString();
          
          if (img) {
            
            cell.style.fontSize = "0";
          
            if (n <= 9 && cellArr.length === 2) {
              cell.style.background =
                `url("../../assets/img/image3x3/${pic++}.jpg") 
                center center/contain no-repeat`;
            }
            if (n <= 16 && cellArr.length === 3) {
              cell.style.background =
                `url("../../assets/img/image4x4/${pic++}.jpg") 
                center center/contain no-repeat`;
            }
            if (n <= 64 && cellArr.length === 7) {
              cell.style.background =
                `url("../../assets/img/image8x8/${pic++}.jpg") 
                center center/contain no-repeat`;
            }
          } 
        } else {
          cell.className = "empty";
        }        
        puzzle.appendChild(cell);
      }
    }
    clearTime();
  }

  function shiftCell(cell) {
    if (cell.className != "empty") {
      let emptyCell = getEmptyAdjacentCell(cell);
      if (emptyCell) {
        let tmp = {
          style: cell.style.cssText,
          back: cell.style.background,
          id: cell.id,
          display: cell.style.display
        };
        
        let back = cell.style.background;
        if (img) {
          emptyCell.style.background = "none";
          emptyCell.style.fontSize = "0";
        }

        cell.style.cssText = emptyCell.style.cssText;
        
        cell.style.background = back;
        cell.id = emptyCell.id;

        emptyCell.style.cssText = tmp.style;

        if (img) {
          emptyCell.style.background = "none";
          emptyCell.style.fontSize = "0";
          tmp.back = back;
        }
        emptyCell.id = tmp.id;
        counter++;
        if (state === 1) {
          countSpan.innerHTML = `count : ${counter}`;
          if (secCounter === 0 && minCounter === 0) {
            getTime();
          }
          if (sound) {
            playSound();
          }
          checkOrder();
        }
      }
    }
  }
  
  function getCell(row, col) {
    return document.getElementById("cell-"+row+"-"+col);
  }

  function getEmptyCell(){
    return puzzle.querySelector(".empty");
  }
	
  function getEmptyAdjacentCell(cell){
    let adjacent = getAdjacentCells(cell);
    for (let i = 0; i < adjacent.length; i++){
      if (adjacent[i].className == "empty") {
        return adjacent[i];
      }
    }
    return false;
  }

  function getAdjacentCells(cell) {
    let id = cell.id.split("-");

    let row = parseInt(id[1]);
    let col = parseInt(id[2]);
		
    let adjacent = [];

    if (row < cellArr.length) {
      adjacent.push(getCell(row + 1, col));
    }			
    if (row > 0) {
      adjacent.push(getCell(row - 1, col));
    }
    if (col < cellArr.length) {
      adjacent.push(getCell(row, col + 1));
    }
    if (col > 0) {
      adjacent.push(getCell(row, col - 1));
    }
    return adjacent;
  }

  function checkOrder() {
    if (getCell(cellArr.length, cellArr.length).className != "empty") {
      return;
    }
	
    let n = 1;
    for(let i = 0; i <= cellArr.length; i++){
      for (let j = 0; j <= cellArr.length; j++){
        
        if (n <= 8 &&
          getCell(i, j).innerHTML != n.toString() &&
          cellArr.length === 2) {
          return;
        }
        if (n <= 15 &&
          getCell(i, j).innerHTML != n.toString() &&
          cellArr.length === 3) {
          return;
        }
        if (n <= 63 &&
          getCell(i, j).innerHTML != n.toString() &&
          cellArr.length === 7) {
          return;
        }
        n++;
      }
    }
    saveScore();
    menuName.innerHTML = `Your win in ${minCounter} min ${secCounter} sec and ${counter} moves`;
    clearTime();
    popUp.classList.add("show");
    
  }

  function scramble() {
    
    if(state == 0){
      return;
    }

    puzzle.classList.remove("#puzzle");
    state = 0;

    let previousCell;
    let i = 1;
    let interval = setInterval(function(){
      if(i <= 200){
        let adjacent = getAdjacentCells(getEmptyCell());
        if(previousCell){
          for(let j = adjacent.length-1; j >= 0; j--){
            if(adjacent[j].innerHTML == previousCell.innerHTML){
              adjacent.splice(j, 1);
            }
          }
        }
        previousCell = adjacent[rand(0, adjacent.length - 1)];
        shiftCell(previousCell);
        i++;
      } else {
        clearInterval(interval);
        state = 1;
        clearTime();
        cellsArr();
      }
    }, 20);
  }
  
  function rand(from, to){
    return Math.floor(Math.random() * (to - from + 1)) + from;
  }

  function getTime() {
    if (secCounter === 0 && minCounter === 0) {
      timerId = setInterval(getTime, 1000);
    }
    secCounter++;
    if (secCounter >= 59) {
      secCounter = 0;
      minCounter++;
    }
    if (minCounter < 10) {
      min.innerHTML = `Your time is 0${minCounter} `;
    } else {
      min.innerHTML = `Your time is ${minCounter} `;
    } 
    if (secCounter < 10) {
      sec.innerHTML = `: 0${secCounter}`;
    } else {
      sec.innerHTML = `: ${secCounter}`;
    }
  }

  function clearTime() {
    clearInterval(timerId);
    secCounter = 0;
    minCounter = 0;
    min.innerHTML = `Your time is 0${minCounter} `;
    sec.innerHTML = `: 0${secCounter}`;
    counter = 0;
    countSpan.innerHTML = `count : ${counter}`;
  }

  function cellsArr() {
    let c = document.querySelectorAll("[id^='cell']");
    let obj = {};
    let idArr = [];
    for (let i = 0; i < c.length; i++){
      idArr.push(c[i].id);
      obj[c[i].id] = c[i].innerHTML;
    }
  }

  function switcherLoyd() {

    if (cellArr.length === 2) {
      let preLast = document.querySelector(".n7");
      let last = document.querySelector(".n8");
      switcher(preLast, last);
    }
    if (cellArr.length === 3) {
      let preLast = document.querySelector(".n14");
      let last = document.querySelector(".n15");
      switcher(preLast, last);
    }
    if (cellArr.length === 7) {
      let preLast = document.querySelector(".n62");
      let last = document.querySelector(".n63");
      switcher(preLast, last);
    }
    function switcher(preLast, last) {
      let tmpId,
        tmpLeft,
        tmpTop,
        tmpClass;
    
      tmpId = preLast.id;
      preLast.id = last.id;
      last.id = tmpId;

      tmpClass = preLast.className;
      preLast.className = last.className;
      last.className = tmpClass;
    
      tmpLeft = preLast.style.left;
      preLast.style.left = last.style.left;
      last.style.left = tmpLeft;

      tmpTop = preLast.style.top;
      preLast.style.top = last.style.top;
      last.style.top = tmpTop;
    }
  }

  function createScorePop() {
    const scoreList = document.createElement("ol");
    const menu = document.createElement("div");
    menu.className = "menu";
    scoreList.className = "score_list";
    popScore.append(menu);
    menu.append(scoreList);

    for (let i = 1; i <= 10; i++){
      let listItems = document.createElement("li");
      listItems.className = "list_item";
      listItems.innerHTML = "empty";
      scoreList.append(listItems);
    }
  }
  createScorePop();

  let scoreArr = [];
  
  function saveScore() {
    scoreArr.push(`${minCounter} min ${secCounter} sec ${counter} moves`);

    let collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });
    scoreArr.sort(collator.compare);
    if (scoreArr.length > 10) {
      scoreArr.pop();
    }
    localStorage.setItem("save", JSON.stringify(scoreArr));
    // console.log(JSON.parse(localStorage.getItem("save")));
    // scoreArrSave.push(JSON.parse(localStorage.getItem("save")));
    // console.log(scoreArrSave)
    let scoreList = document.querySelectorAll(".list_item");
    scoreList.forEach((item, i) => {
      if (scoreArr[i]) {
        item.innerHTML = `Win in ${scoreArr[i]}`;
      } else {
        item.innerHTML = "empty";
      }
     
      // if (scoreArr[0] === "empty") {
      //   console.log("here")
      //   item.innerHTML = `Win in ${scoreArrSave[i]}`;
      // }
    });
    
    // return scoreArrSave;
  }
   
  // function setItem() {
    
  // }
  // function getItem() {
  //   console.log(scoreArrSave);
  //   console.log(scoreArr);
  //   if (scoreArr.length === 0) {
  //     console.log('tut')
      
  //       console.log("here")
  //       // item.innerHTML = `Win in ${scoreArrSave[i]}`;
  //       console.log(JSON.parse(localStorage.getItem("save")));
  //       // scoreArrSave.push(JSON.parse(localStorage.getItem("save")));
  //       console.log(scoreArrSave)
      
  //   }
  // }
  // getItem();
  
});   
