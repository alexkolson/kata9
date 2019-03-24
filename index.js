const assert = require('assert');

function Basket(rules) {
  this.regulars = rules.regulars;
  this.specials = rules.specials;
  this.items = [];
}

Basket.prototype.scan = function (item) {
  this.items.push(item);
};

Basket.prototype.total = function () {
  let total = 0;

  Object.keys(this.regulars).forEach((regular) => {
    const count = this.items
      .filter((item) => item === regular)
      .length;

    const special = this.specials[regular];

    if (special) {
      const specialOccurences = Math.floor(count / special.quantity);
      const specialPrice = special.price;
      const specialTotal = specialPrice * specialOccurences;
      total += specialTotal;
    }

    const regularOccurences = !!special ? Math.floor(count % special.quantity) : count;
    const regularPrice = this.regulars[regular];

    const regularTotal = regularPrice * regularOccurences;

    total += regularTotal;
  });

  return total;
};


describe('Basket', () => {

  it('should calculate the correct total', () => {
    const b = new Basket({
      'regulars': {
        'A': 50,
        'B': 30,
        'C': 20,
        'D': 15,
      },
      'specials': {
        'A': {
          'quantity': 3,
          'price': 130,
        },
        'B': {
          'quantity': 2,
          'price': 45,
        },
      },
    });

    assert.strictEqual(b.total(), 0, 'Total should be zero because there are no items in the basket');
    b.scan('A')
    b.scan('A')
    b.scan('A')
    b.scan('B');
    b.scan('B');
    b.scan('C');
    assert.strictEqual(b.total(), 130 + 45 + 20, 'total should be correctly calculated based on the content of the basket');
    b.scan('A')
    b.scan('A')
    b.scan('A')
    b.scan('A')
    assert.strictEqual(b.total(), 130 + 130 + 50 + 45 + 20, 'total should be correctly calculated based on the content of the basket');
  });
});