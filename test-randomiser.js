const { pickRandom, shuffleArray, TextRandomiser } = require('./script');

console.log('pickRandom from [1,2,3]:', pickRandom([1,2,3]));
console.log('shuffleArray demo:', shuffleArray(['a','b','c','d']));

// Demo TextRandomiser in Node - simulate by passing a fake element
class FakeElem {
  constructor() { this.textContent = ''; }
}
const fake = new FakeElem();
const tr = TextRandomiser({ selector: fake, texts: ['one','two','three'], interval: 500, shuffle: true });
// Start then stop after 1.5s
tr.start();
setTimeout(() => { tr.stop(); console.log('Fake element final text:', fake.textContent); }, 1600);
