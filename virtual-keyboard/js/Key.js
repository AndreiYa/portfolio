/* eslint-disable import/extensions */
import create from './utils/create.js';

export default class Key {
  constructor({ small, shift, code }) {
    this.code = code;
    this.small = small;
    this.shift = shift;
    let charCode = small.charCodeAt();
    this.charCode = charCode;
    // console.log(charCode)
    this.isFnKey = Boolean(small.match(/Ctrl|arr|Alt|Shift|Tab|Back|Del|Enter|Caps/));
    this.isFnKey += Boolean(code.match(/lng|Speech|OFF|Sound/));
    if (shift && shift.match(/[^a-zA-Zа-яА-ЯёЁ0-9]/)) {
      this.sub = create('div', 'sub', this.shift);
    } else {
      this.sub = create('div', 'sub', '');
    }

    this.letter = create('div', 'letter', small);
    this.div = create('div', 'keyboard__key', [this.sub, this.letter], null, ['code', this.code], ['key', charCode],
      this.isFnKey ? ['fn', 'true'] : ['fn', 'false']); // мы забыли этот атрибут добавить )) он нужен, чтобы в разметке стилизовать функциональные клавиши отдельно
  }

}
