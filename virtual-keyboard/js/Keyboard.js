/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */

import * as storage from './storage.js';
import create from './utils/create.js';
import language from './layouts/index.js'; // { en, ru }
import Key from './Key.js';

const main = create('main', '',
  [create('h1', 'title', 'RSS Virtual Keyboard')]);

export default class Keyboard {
  constructor(rowsOrder) {
    this.rowsOrder = rowsOrder;
    this.keysPressed = {};
    this.isCaps = false;
    this.isSound = true;
  }

  init(langCode) {
    this.keyBase = language[langCode];
    this.output = create('textarea', 'output', null, main,
      ['placeholder', 'Start type something...'],
      ['rows', 5],
      ['cols', 100],
      ['spellcheck', false],
      ['autocorrect', 'off']);
    this.container = create('div', 'keyboard', null, main, ['language', langCode]);
    document.body.prepend(main);
    return this;
  }

  switchOn() {
    let text = document.querySelector('.output');
    text.addEventListener('click', function () {
      let keyb = document.querySelector(".keyboard");
      keyb.classList.remove('hidden');
    });
  }

  generateLayout() {
    this.keyButtons = [];
    this.rowsOrder.forEach((row, i) => {
      const rowElement = create('div', 'keyboard__row', null, this.container, ['row', i + 1]);
      rowElement.style.gridTemplateColumns = `repeat(${row.length}, 1fr)`;
      row.forEach((code) => {
        const keyObj = this.keyBase.find((key) => key.code === code);
        if (keyObj) {
          const keyButton = new Key(keyObj);
          this.keyButtons.push(keyButton);
          rowElement.appendChild(keyButton.div);
        }
      });
    });

    document.addEventListener('keydown', this.handleEvent);
    document.addEventListener('keyup', this.handleEvent);
    this.container.onmousedown = this.preHandleEvent;
    this.container.onmouseup = this.preHandleEvent;
  }

  preHandleEvent = (e) => {
    e.stopPropagation();
    const keyDiv = e.target.closest('.keyboard__key');
    if (!keyDiv) return;
    // keyDiv = {
    //   dataset: keyDiv.charCodeAt({ code });
    const { dataset: { code } } = keyDiv;
    
    keyDiv.addEventListener('mouseleave', this.resetButtonState);
    this.handleEvent({ code, type: e.type });
  };

  // Ф-я обработки событий

  handleEvent = (e) => {
 
    if (e.stopPropagation) e.stopPropagation();
    const { code, type } = e;
    const keyObj = this.keyButtons.find((key) => key.code === code);
    if (!keyObj) return;
    this.output.focus();
    
    // НАЖАТИЕ КНОПКИ

    if (type.match(/keydown|mousedown/)) {
      // let sw = document.querySelector('.soundSwitcher')
      // console.log(sw)
      // if (!sw.match(/soundOFF/)) {
      if(this.isSound) {
      this.sound();
  }
      
      if (!type.match(/mouse/)) e.preventDefault();
      
    //   if (code.match(/Shift/)) this.shiftKey = true;

    //  if (this.shiftKey) this.switchUpperCase(true);

      if (code.match(/Control|Alt|Caps/) && e.repeat) return;

      if (code.match(/Control/)) this.ctrKey = true;
      if (code.match(/Alt/)) this.altKey = true;
      if (keyObj.code.match(/lng/g)) {
        this.switchLanguage();
      }
    
      keyObj.div.classList.add('active');
// Shift Handler

      if (code.match(/Shift/) && !this.shiftKey) {
        this.shiftKey = true;
        // this.isShift = true;
        this.switchUpperCase(true);
      } else if (code.match(/Shift/) && this.shiftKey) {
        this.shiftKey = false;
        // this.isShift = false;
        this.switchUpperCase(false);
        keyObj.div.classList.remove('active');
      }

      // Caps Handler
      if (code.match(/Caps/) && !this.isCaps) {
        this.isCaps = true;
        this.switchUpperCase(true);
      } else if (code.match(/Caps/) && this.isCaps) {
        this.isCaps = false;
        this.switchUpperCase(false);
        keyObj.div.classList.remove('active');
      }

      // Определяем, какой символ мы пишем в консоль (спец или основной)
      if (!this.isCaps) {
        // если не зажат капс, смотрим не зажат ли шифт
        this.printToOutput(keyObj, this.shiftKey ? keyObj.shift : keyObj.small);
      } else if (this.isCaps) {
        // если зажат капс
        if (this.shiftKey) {
          // и при этом зажат шифт - то для кнопки со спецсимволом даем верхний регистр
          this.printToOutput(keyObj, keyObj.sub.innerHTML ? keyObj.shift : keyObj.small);
        } else {
          // и при этом НЕ зажат шифт - то для кнопки без спецсивмола даем верхний регистр
          this.printToOutput(keyObj, !keyObj.sub.innerHTML ? keyObj.shift : keyObj.small);
        }
      }
      // console.log(keyObj.charCode)
      this.keysPressed[keyObj.code] = keyObj;
    // ОТЖАТИЕ КНОПКИ
    } else if (e.type.match(/keyup|mouseup/)) {
      this.resetPressedButtons(code);
      if (code.match(/Shift/) && !this.keysPressed[code])
    //   if (code.match(/Shift/)) {
    //     this.shiftKey = false;
    //  this.switchUpperCase(false);
    //   }
      if (code.match(/Control/)) this.ctrKey = false;
      if (code.match(/Alt/)) this.altKey = false;

      // if (!code.match(/Caps/)){
      //   if (!code.match(/Shift/)) {
      //     keyObj.div.classList.remove('active');
      //   }
      // } 
      // if (!code.match(/Shift/)) keyObj.div.classList.remove('active');
      if (!code.match(/Caps/) && !code.match(/Shift/)) keyObj.div.classList.remove('active');
    }
  }

  resetButtonState = ({ target: { dataset: { code } } }) => {
    if (code.match('Shift')) {
      this.shiftKey = false;
      this.switchUpperCase(false);
      this.keysPressed[code].div.classList.remove('active');
    }
    if (code.match(/Control/)) this.ctrKey = false;
    if (code.match(/Alt/)) this.altKey = false;
    this.resetPressedButtons(code);
    this.output.focus();
  }

  resetPressedButtons = (targetCode) => {
    if (!this.keysPressed[targetCode]) return;
    
      if (!this.shiftKey && !this.isCaps) {
        this.keysPressed[targetCode].div.classList.remove('active');
      }

    this.keysPressed[targetCode].div.removeEventListener('mouseleave', this.resetButtonState);
    delete this.keysPressed[targetCode];
  }

  switchUpperCase(isTrue) {
    // Флаг - чтобы понимать, мы поднимаем регистр или опускаем
    if (isTrue) {
      // Мы записывали наши кнопки в keyButtons, теперь можем легко итерироваться по ним
      this.keyButtons.forEach((button) => {
        // Если у кнопки есть спецсивол - мы должны переопределить стили
        if (button.sub) {
          // Если только это не капс, тогда поднимаем у спецсимволов
          if (this.shiftKey) {
            button.sub.classList.add('sub-active');
            button.letter.classList.add('sub-inactive');
          }
        }
        // Не трогаем функциональные кнопки
        // И если капс, и не шифт, и именно наша кнопка без спецсимвола
        if (!button.isFnKey && this.isCaps && !this.shiftKey && !button.sub.innerHTML) {
          // тогда поднимаем регистр основного символа letter
          button.letter.innerHTML = button.shift;
        // Если капс и зажат шифт
        } else if (!button.isFnKey && this.isCaps && this.shiftKey) {
          // тогда опускаем регистр для основного симовла letter
          button.letter.innerHTML = button.small;
        // а если это просто шифт - тогда поднимаем регистр у основного символа
        // только у кнопок, без спецсимвола --- там уже выше отработал код для них
        } else if (!button.isFnKey && !button.sub.innerHTML) {
          button.letter.innerHTML = button.shift;
        }
      });
    } else {
      // опускаем регистр в обратном порядке
      this.keyButtons.forEach((button) => {
        // Не трогаем функциональные кнопки
        // Если есть спецсимвол
        if (button.sub.innerHTML && !button.isFnKey) {
          // то возвращаем в исходное
          button.sub.classList.remove('sub-active');
          button.letter.classList.remove('sub-inactive');
          // если не зажат капс
          if (!this.isCaps) {
            // то просто возвращаем основным символам нижний регистр
            button.letter.innerHTML = button.small;
          } else if (!this.isCaps) {
            // если капс зажат - то возвращаем верхний регистр
            button.letter.innerHTML = button.shift;
          }
        // если это кнопка без спецсимвола (снова не трогаем функциональные)
        } else if (!button.isFnKey) {
          // то если зажат капс
          if (this.isCaps) {
            // возвращаем верхний регистр
            button.letter.innerHTML = button.shift;
          } else {
            // если отжат капс - возвращаем нижний регистр
            button.letter.innerHTML = button.small;
          }
        }
      });
    }
  }

  switchLanguage = () => {
    const langAbbr = Object.keys(language);
    let langIdx = langAbbr.indexOf(this.container.dataset.language);
    this.keyBase = langIdx + 1 < langAbbr.length ? language[langAbbr[langIdx += 1]]
      : language[langAbbr[langIdx -= langIdx]];

    this.container.dataset.language = langAbbr[langIdx];
    storage.set('kbLang', langAbbr[langIdx]);

    this.keyButtons.forEach((button) => {
      const keyObj = this.keyBase.find((key) => key.code === button.code);
      if (!keyObj) return;
      button.shift = keyObj.shift;
      button.small = keyObj.small;
      if (keyObj.shift && keyObj.shift.match(/[^a-zA-Zа-яА-ЯёЁ0-9]/g)) {
        button.sub.innerHTML = keyObj.shift;
      } else {
        button.sub.innerHTML = '';
      }
      button.letter.innerHTML = keyObj.small;
    });
    // if ((this.isCaps && this.isShift) || (this.isCaps || this.isShift)) this.switchUpperCase(true);
    if (this.isCaps) this.switchUpperCase(true);
    if (this.shiftKey) this.switchUpperCase(true);
  }
  speech() {
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();
  recognition.interimResults = true;
  
  
  // let p = document.createElement('p');
  // const words = document.querySelector('.words');
  // words.appendChild(p);

  recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');

      // const poopScript = transcript.replace(/poop|poo|shit|dump/gi, '💩');
      // p.textContent = poopScript;

      if (e.results[0].isFinal) {
        p = document.createElement('p');
        console.log(this.output)
        this.output.appendChild(p);
      }
  });

  recognition.addEventListener('end', recognition.start);

    recognition.start();
    recognition.stop();
  }

  
  removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
  }

  playSound(e) {
    // console.log('tut')
    // console.log(this.charCode)
    document.addEventListener('click', function (e) {
    
      const audio = document.querySelector(`audio[data-key="Sound"]`);
    const key = document.querySelector(`div[data-code="Sound"]`);
    //   const shift = document.querySelector(`audio[data-key="ShiftLeft"]`);
    // const shiftKey = document.querySelector(`div[data-code="ShiftLeft"]`);
      
    if (!audio) return;

    key.classList.add('playing');
    // shiftKey.classList.add('playing');
    audio.currentTime = 0;
      audio.play();
    //   shift.currentTime = 0;
    // shift.play();
    })
  }

  sound(e) {
    const keys = Array.from(document.querySelectorAll('.keyboard__key'));
    keys.forEach(key => key.addEventListener('transitionend', this.removeTransition));
    this.playSound(e)
  }
  
    
    // let arr = document.querySelectorAll('.keyboard__key')
    // //console.log(arr[0].dataset.key)
    // for (let i = 0; i < arr.length; i++){
    //   console.log(arr[i].dataset.key)
    //   if (arr[i].dataset.key > 65 && arr[i].dataset.key < 122) {
    //     // arr[i].classList.add('playing');
    //     // audio.currentTime = 0;
    //     // // audio.play();
    //   }
    // }

//     function removeTransition(e) {
//     // if (e.propertyName !== 'transform') return;
//     // e.target.classList.remove('playing');
//   }

//   function playSound(e) {
//     const audio = document.querySelector(`audio[data-key="${e.code}"]`);
//     const key = document.querySelector(`div[data-key="${e.code}"]`);
    
//  console.log(`div[data-key="${e.code}"]`)
//     if (!audio) return;

//     key.classList.add('playing');
//     audio.currentTime = 0;
//     audio.play();
//   }

//   const keys = Array.from(document.querySelectorAll('.keyboard-key'));
//   keys.forEach(key => key.addEventListener('transitionend', removeTransition));
//     window.addEventListener('click', playSound);
    
  // }
  
  printToOutput(keyObj, symbol) {
    let cursorPos = this.output.selectionStart;
    const left = this.output.value.slice(0, cursorPos);
    const right = this.output.value.slice(cursorPos);
    const textHandlers = {
      Tab: () => {
        this.output.value = `${left}\t${right}`;
        cursorPos += 1;
      },
      ArrowLeft: () => {
        cursorPos = cursorPos - 1 >= 0 ? cursorPos - 1 : 0;
      },
      ArrowRight: () => {
        cursorPos += 1;
      },
      ArrowUp: () => {
        const positionFromLeft = this.output.value.slice(0, cursorPos).match(/(\n).*$(?!\1)/g) || [[1]];
        cursorPos -= positionFromLeft[0].length;
      },
      ArrowDown: () => {
        const positionFromLeft = this.output.value.slice(cursorPos).match(/^.*(\n).*(?!\1)/) || [[1]];
        cursorPos += positionFromLeft[0].length;
      },
      Enter: () => {
        this.output.value = `${left}\n${right}`;
        cursorPos += 1;
      },
      Delete: () => {
        this.output.value = `${left}${right.slice(1)}`;
      },
      Backspace: () => {
        this.output.value = `${left.slice(0, -1)}${right}`;
        cursorPos -= 1;
      },
      Space: () => {
        this.output.value = `${left} ${right}`;
        cursorPos += 1;
      },
      OFF: () => {
        let keyb = document.querySelector('.keyboard');
        keyb.classList.add('hidden')
        this.switchOn();
      },
      Speech: () => {
        this.speech();
      }, 
      Sound: () => {
        document.querySelector('div[data-code="Sound"]').classList.add('soundSwitcher')
        document.querySelector('div[data-code="Sound"]').classList.toggle('soundOFF')
        // if (this.isSound) {
        //   document.querySelector('div[data-code="Sound"]').classList.remove('loud');
        //   document.querySelector('div[data-code="Sound"]').classList.add('silent');
        //   return !this.isSound;
          
        // } else {
        //   document.querySelector('div[data-code="Sound"]').classList.remove('silent');
        //   document.querySelector('div[data-code="Sound"]').classList.add('loud');
        //   return this.isSound;
        // }
      }
    };
    if (textHandlers[keyObj.code]) textHandlers[keyObj.code]();
    else if (!keyObj.isFnKey) {
      cursorPos += 1;
      this.output.value = `${left}${symbol || ''}${right}`;
    }
    this.output.setSelectionRange(cursorPos, cursorPos);
  }
}
