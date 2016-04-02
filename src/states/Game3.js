/*
 * Game state
 * ==========
 *
 * A sample Game state, displaying the Phaser logo.
 */

import Logo from '../objects/Logo';

import { createStore } from 'redux';

const RIGHT = 'RIGHT';
const LEFT = 'LEFT';
const ENTER = 'ENTER';

function right() {
  return {
    type: RIGHT
  };
}

function left() {
  return {
    type: LEFT
  };
}

function enter() {
  return {
    type: ENTER
  };
}

function positionReducer(state = { pos: 0, startScene: false }, action) {
  if (state.startScene) return state;

  switch(action.type) {
  case RIGHT:
    return {
      pos: (state.pos + 1) % 5,
      startScene: state.startScene
    };
  case LEFT:
    return {
      pos: (state.pos + 4) % 5,
      startScene: state.startScene
    };
  case ENTER:
    return {
      pos: state.pos,
      startScene: true
    };
  default:
    return state;
  }
}

let store;

import Dude from '../objects/Dude';

export default class Game3 extends Phaser.State {

  create () {
    this.stage.backgroundColor = '#F00';

    const { centerX: x, centerY: y } = this.world;
    this.game.add.existing(new Logo(this.game, x, y));

    store = createStore(positionReducer);

    let dudes = ['dude', 'dude', 'dude', 'dude', 'dude'];

    dudes.map((dudeStr, i) => {
      let coord = this.getCoordByPos(i);
      let dude = this.game.add.sprite(coord[0], coord[1], dudeStr);
      store.subscribe(this.dropDudesChangeScene.bind(this, dude, i));
    });

    let selCoord = this.getCoordByPos(store.getState().pos);
    let selector = this.game.add.sprite(selCoord[0], selCoord[1], 'dude-selector');

    store.subscribe(this.movePlane.bind(this, selector));

    let key1 = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    key1.onDown.add(() => {store.dispatch(right());}, null);

    let key2 = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    key2.onDown.add(() => {store.dispatch(left());}, null);

    let key3 = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    key3.onDown.add(() => {store.dispatch(enter());}, null);

    this.input.keyboard.removeKeyCapture(Phaser.Keyboard.RIGHT);
    this.input.keyboard.removeKeyCapture(Phaser.Keyboard.LEFT);
    this.input.keyboard.removeKeyCapture(Phaser.Keyboard.ENTER);
  }

  getCoordByPos(pos) {
    let sizeX = 105;
    let sizeY = 130;
    console.log(this.world.centerX)

    return [this.world.centerX - (5*sizeX/2) + sizeX*pos, this.world.centerY - (sizeY/2)];
  }

  movePlane(plane) {
    let state = this.getCoordByPos(store.getState().pos);
    this.game.add.tween(plane).to({x: state[0], y: state[1] }, 100, 'Linear', true);
  }

  dropDudesChangeScene(dude, i) {
    let state = store.getState();

    if (state.startScene) {
      if (state.pos == i)
        setTimeout(this.changeScene.bind(this), 750);
      else
        this.game.add.tween(dude).to({y: 750 }, 500, 'Linear', true);
    }
  }

  changeScene() {
    let letsgodude = ['Game3','Game2','Game','Preload','Boot'];
    this.state.start(letsgodude[store.getState().pos]);
  }
}
