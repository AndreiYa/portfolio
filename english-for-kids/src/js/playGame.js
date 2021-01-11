/* eslint-disable no-useless-concat */
/* eslint-disable guard-for-in */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-param-reassign */
import * as header from "./header";
import "./cards";
// import * as stat from "./stat";

const playSwitcher = document.querySelector(".play-btn-circle");
const card = document.querySelectorAll(".card");
const cardContainer = document.querySelectorAll(".card__flip");

const startGameBtn = document.createElement("div");
const finishGame = document.createElement("div");
const startGameBtnWrapper = document.createElement("div");
const finishGameWrapper = document.createElement("div");
const resultWrapper = document.createElement("div");
const resultText = document.createElement("div");
const resultPic = document.createElement("div");
const sectionMain = document.querySelector(".main");

const errorWrapper = document.createElement("div");
const error = document.createElement("div");
error.textContent = "Please choose category first!";

errorWrapper.className = "error__wrapper";
error.className = "error";

document.body.append(errorWrapper);
errorWrapper.append(error);

const soundSrc = [];
const words = [];
let correctAnswerCount = 0;
let wrongAnswerCount = 0;
// eslint-disable-next-line import/prefer-default-export
export const statCollection = {};

startGameBtn.className = "startGameBtn";
startGameBtn.classList.add("hide");
finishGame.className = "finish__game";
startGameBtnWrapper.className = "popup__overlay";
startGameBtnWrapper.classList.add("hide");
finishGameWrapper.className = "popup__overlay-finish";
resultWrapper.className = "result__wrapper";
resultPic.className = "result__wrapper-pic";
resultText.className = "result__wrapper-text";

document.body.append(startGameBtnWrapper);
document.body.append(finishGameWrapper);
startGameBtnWrapper.append(startGameBtn);
finishGameWrapper.append(finishGame);
finishGame.append(resultWrapper);
resultWrapper.append(resultText);
resultWrapper.append(resultPic);

header.playBtnWrapper.addEventListener("click", () => {
  if (!sectionMain.classList.contains("show")) {
    if (header.playSwCircle.classList.contains("active")) {
      header.playSwCircle.classList.remove("active");
      header.playSwCircle.classList.remove("start");
      header.playSwCircle.textContent = "Train";
    } else {
      header.playSwCircle.classList.add("active");
      header.playSwCircle.textContent = "Play";
    }
  } else {
    errorWrapper.classList.add("show");
    error.classList.add("show");
    errorWrapper.addEventListener("click", () => {
      errorWrapper.classList.remove("show");
      error.classList.remove("show");
    });
  }
});

function removeClass() {
  startGameBtnWrapper.classList.remove("active");
  startGameBtnWrapper.classList.remove("show");
  startGameBtn.classList.remove("active");
  startGameBtn.classList.remove("hide");
  startGameBtnWrapper.classList.add("hide");

  card.forEach((item) => {
    item.classList.remove("play");
    item.classList.add("training");
    item.classList.remove("wrong-blur");
    item.classList.remove("correct-blur");
    cardContainer.forEach((el) => {
      el.classList.remove("resize__heigth");
    });
  });
}

header.playBtnWrapper.addEventListener("click", () => {
  if (playSwitcher.classList.contains("active")) {
    startGameBtnWrapper.classList.add("active");
    startGameBtnWrapper.classList.add("show");
    startGameBtnWrapper.classList.remove("hide");
    startGameBtn.classList.add("active");
    startGameBtn.classList.remove("hide");
    startGameBtn.classList.add("show");
    startGameBtn.textContent = "Start";

    card.forEach((item) => {
      item.classList.remove("training");
      item.classList.add("play");
      cardContainer.forEach((el) => {
        el.classList.add("resize__heigth");
      });
    });
  } else {
    startGameBtn.classList.remove("start");
    startGameBtn.classList.remove("show");
    startGameBtn.classList.add("hide");
    removeClass();
  }
});

function playSound(source) {
  const audio = new Audio();
  audio.preload = "auto";
  audio.src = source;
  audio.play();
}

cardContainer.forEach((item) => {
  item.addEventListener("click", (e) => {
    if (!playSwitcher.classList.contains("active")
      && !e.target.classList.contains("reverse")
      && !item.classList.contains("transform")) {
      const soundSrcOne = item.getAttribute("audioSrc");
      playSound(soundSrcOne);
    }
  });
});

function getContent() {
  cardContainer.forEach((item) => {
    if (item.parentNode.parentNode.classList.contains("show")) {
      const dataForPlay = [];
      dataForPlay.push(item);
      dataForPlay.forEach((el) => {
        soundSrc.push(el.getAttribute("audioSrc"));
        words.push(el.getAttribute("data"));
      });
    }
  });
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function startGameSwitcher() {
  const starsWrapper = document.createElement("div");
  starsWrapper.className = "stars__wrapper";
  header.modeWrapper.prepend(starsWrapper);

  if (playSwitcher.classList.contains("active")) {
    startGameBtnWrapper.classList.add("active");
    startGameBtn.classList.add("active");
    startGameBtn.classList.add("first");
  }

  startGameBtn.addEventListener("click", () => {
    if (playSwitcher.classList.contains("active")
      && startGameBtn.classList.contains("active")
      && !startGameBtn.classList.contains("start")) {
      startGameBtn.classList.add("start");
      startGameBtn.classList.add("first");
      startGameBtn.textContent = "repeat";

      if (startGameBtn.classList.contains("start")) {
        getContent();
        shuffleArray(soundSrc);
        let count = 0;

        if (startGameBtn.classList.contains("first")) {
          setTimeout(playSound, 300, soundSrc[count]);
          startGameBtn.addEventListener("click", () => {
            setTimeout(playSound, 300, soundSrc[count]);
          });
        }

        card.forEach((item) => {
          item.addEventListener("click", (e) => {
            if (e.target.parentNode.getAttribute("status") !== "disabled") {
              startGameBtn.classList.remove("first");
              const sound = soundSrc[count].slice(13, -4);
              const starElemWrapper = document.createElement("div");
              starElemWrapper.className = "star__elem-wrapper";
              starsWrapper.append(starElemWrapper);
              const data = e.target.previousSibling.parentNode.parentNode.getAttribute("data");
              statCollection[sound] = {
                correct: 0,
                wrong: 0,
              };

              if (data === sound) {
                const counter = 1;
                statCollection[sound].correct = counter;
                correctAnswerCount += 1;
                playSound("assets/audio/correct-answer.mp3");
                starElemWrapper.style.background = "url('assets/images/Orange_star.svg') center center/cover no-repeat";
                item.classList.add("correct-blur");
                item.setAttribute("status", "disabled");
    
                let correct = +item.parentNode.getAttribute("correct");
                correct += 1;
                item.parentNode.setAttribute("correct", correct);
                localStorage.setItem(`${data}-` + "correct", correct);
              } else {
                const counter = 1;
                statCollection[sound].wrong = counter;
                wrongAnswerCount += 1;
                playSound("assets/audio/bad-answer.mp3");
                starElemWrapper.style.background = "url('assets/images/Gray_star.svg') center center/cover no-repeat";

                let wrong = +item.parentNode.getAttribute("wrong");
                wrong += 1;
                item.parentNode.setAttribute("wrong", wrong);
                localStorage.setItem(`${data}-` + "wrong", wrong);
              }
              count += 1;
              if (count < soundSrc.length) {
                // for (const key in statCollection) {
                //   // console.log(key, statCollection[key]);
                //   for (const k in statCollection[key]) {
                //     console.log(k, statCollection[key]);
                //     localStorage.setItem(key, statCollection[key]);
                //     // console.log(stat.makeStatPage.statCellClick);
                //   }
                // }

                setTimeout(playSound, 1000, soundSrc[count]);
              } else {
                startGameBtn.classList.remove("start");
                playSwitcher.classList.remove("active");
                removeClass();
                finishGame.classList.add("active");
                finishGameWrapper.classList.add("active");
                resultText.textContent = `Your result: ${correctAnswerCount} right answers & ${wrongAnswerCount} wrong answers`;
                if (wrongAnswerCount > 0) {
                  resultPic.style.background = "url('assets/images/you-lose.jpg') center center/cover no-repeat";
                } else {
                  resultPic.style.background = "url('assets/images/you-win.jpg') center center/cover no-repeat";
                }
              }
            }
          });
        });
      }
    }
  });
}

startGameSwitcher();

document.body.addEventListener("click", (e) => {
  if (e.target === finishGameWrapper) {
    finishGameWrapper.classList.remove("active");
    finishGame.classList.remove("active");
    location.href = "index.html";
  }
});
