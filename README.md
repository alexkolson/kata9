# Kata9 - Checkout system
My implementation of [kata09](http://codekata.com/kata/kata09-back-to-the-checkout/).

## API

### Basket

### Methods

#### new Basket(rules) => basket
Create a new basket object given a set of pricing rules.

`rules`: Object
```js
{
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
}
```

#### .scan(item) => Undefined
Scan a new item into the basket

`item`: String : Type of Item

#### .totat() => Number
Retreive the total price of the items in the basket.

