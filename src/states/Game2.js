/*
 * Game state
 * ==========
 *
 * A sample Game state, displaying the Phaser logo.
 */

import Game from './Game';

export default class Game2 extends Game {

  create () {
    // TODO: Replace this with really cool game code here :)
    super.create();

    this.add.text(0, 0, 'GAME 2!', {} );
    this.stage.backgroundColor = '#FFFF00';

  }
}
