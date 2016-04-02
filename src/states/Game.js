/*
 * Game state
 * ==========
 *
 * A sample Game state, displaying the Phaser logo.
 */

import Logo from '../objects/Logo';
import Dude from '../objects/Dude';
import DudeSelector from '../objects/DudeSelector';

export default class Game extends Phaser.State {

  create () {
    // TODO: Replace this with really cool game code here :)

    this.stage.backgroundColor = '#000';

    const { centerX: x, centerY: y } = this.world;
    this.add.existing(new Logo(this.game, x, y));

    let numDudes = 5;
    let dudeSize = 105;
    let offsetX = x - (numDudes*dudeSize/2);

    for (var i = 0; i < numDudes; i++) {
      let sprite = new Dude(this.game, offsetX+(i*dudeSize), y);
      this.add.existing(sprite);
    }

    let selector1 = new DudeSelector(this.game, offsetX, y);
    this.add.existing(selector1);

    let key1 = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    key1.onDown.add(selector1.moveRight, this);
    this.input.keyboard.removeKeyCapture(Phaser.Keyboard.RIGHT);


    let key2 = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    key2.onDown.add(selector1.moveLeft, this);
    this.input.keyboard.removeKeyCapture(Phaser.Keyboard.LEFT);

    let key3 = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    key3.onDown.add((function () {
      let pos = selector1.getCursorPos();
      let letsgodude = [];
      letsgodude[0] = 'Game2';
      letsgodude[1] = 'Game';
      letsgodude[2] = 'Game2';
      letsgodude[3] = 'Preload';
      letsgodude[4] = 'Boot';
      console.log('Starting:', letsgodude[pos]);
      this.state.start(letsgodude[pos]);
    }), this);
    this.input.keyboard.removeKeyCapture(Phaser.Keyboard.ENTER);


  }
}
