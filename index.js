import Cards from './cards.js';
const cardElement = document.querySelector('#cards');
const feedback = document.querySelector('#feedback');
const tries = document.querySelector('#tries');

const cards = new Cards(cardElement, feedback, tries);
cards.load();

