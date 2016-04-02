/*
 * DudeSelector
 * ====
 *
 * A sample prefab (extended game object class), for displaying a DudeSelector.
 */

export let cursorPos = 0;
let leftX = 0;
let newX = 0;
let posUpdated = false;

export default class DudeSelector extends Phaser.Sprite {

  constructor (game, x, y) {
    super(game, x, y, 'dude-selector');

    this.anchor.set(0.5);
    cursorPos = 0;
    leftX = x;
    newX = leftX;
  }

  update () {
    if (posUpdated) {
      this.x = newX;
      posUpdated = false;
    }
  }

  moveRight() {
    cursorPos++;
    if (cursorPos > 4){
      cursorPos = 0;
      newX = leftX;
    }
    else {
      newX += 105;
    }
    posUpdated = true;
  }

  moveLeft() {
    cursorPos--;
    if (cursorPos < 0){
      cursorPos = 4;
      newX = leftX + (4*105);
    }
    else {
      newX -= 105;
    }
    posUpdated = true;
  }

  getCursorPos() {
    return cursorPos;
  }
}
