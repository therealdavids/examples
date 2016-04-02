/*
 * Dude
 * ====
 *
 * A sample prefab (extended game object class), for displaying a Dude.
 */


export default class Dude extends Phaser.Sprite {

  constructor (game, x, y) {
    super(game, x, y, 'dude');

    this.anchor.set(0.5);
  }

  update () {
    // this.angle += 0.1;
  }

}
