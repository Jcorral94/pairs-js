export default class Card {
  constructor(value, back, visible = false, id) {
    this.value = value;
    this.back = back;
    this.visible = visible;
    this.id = id;
  }
}