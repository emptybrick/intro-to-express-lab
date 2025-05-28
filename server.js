// Import Express
const express = require('express')

// Create an Express app
const app = express()

// Define routes here (we'll add them soon)

// Listen for requests on port 3000
app.listen(3000, () => {
  console.log('Listening on port 3000')
})

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});


/*------------1. Be Polite, Greet the User----------------*/

app.get("/greetings/:userName", (req, res) => {
  res.send(`<h1>What a delight it is to see you once more, ${req.params.userName}!</h1>`)
})

/*------------2. Rolling the Dice----------------*/

app.get("/roll/:randomNumber", (req, res) => {
  const rollInput = req.params.randomNumber
  const rollInputNum = parseInt(rollInput)
  const rollInputNanCheck = Number.isInteger(rollInputNum)
  const randomRoll = Math.ceil(Math.random() * rollInputNum)

  console.log(rollInputNanCheck, rollInput, typeof (rollInputNum))

  if (!rollInputNanCheck || rollInputNum < 1) {
    res.send(`<h1>You must enter a number that is more than zero!`);
  } else {
    res.send(`<h1>You rolled ${randomRoll}`);
  }
})

/*--------------3. I Want THAT One!----------------*/

app.get("/collectibles/:index", (req, res) => {
  const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];
  const collectionIndex = parseInt(req.params.index)

  console.log(collectionIndex, typeof (collectionIndex))

  if (!Number.isInteger(collectionIndex) || collectionIndex > collectibles.length - 1) {
    res.send(`<h1>Apologies but that item is not available.`);
  } else {
    res.send(`<h1>You have selected the ${collectibles[collectionIndex].name} for a great price of $${collectibles[collectionIndex].price}`);
  }
})

/*------------4. Filter Shoes by Query Parameters----------------*/

app.get('/shoes', (req, res) => {
  const minPrice = parseInt(req.query["min-price"])
  const maxPrice = parseInt(req.query["max-price"])
  const shoeType = req.query.type
  const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
  ];

  let results = shoes;

  if (minPrice) {
    results = results.filter(shoe => shoe.price >= minPrice)
  }
  if (maxPrice) {
    results = results.filter(shoe => shoe.price <= maxPrice)
  }
  if (shoeType) {
    results = results.filter(shoe => shoe.type === shoeType)
  }
  if (results.length < 1) {
    res.send(`<h2>Apologies but there are no items available with this search.`);
  } else {
    res.send(results);
  }
})

// first attempt
// if (minPrice && !maxPrice && !shoeType) {
//   res.send(overMin);
// }
// else if (maxPrice && !minPrice && !shoeType) {
//   res.send(underMax);
// }
// else if (minPrice && maxPrice && !shoeType) {
//   const priceCheck = underMax.filter(shoe => shoe.price > minPrice)
//   res.send(priceCheck);
// }
// else if (shoeType) {
//   if (minPrice && !maxPrice) {
//     const shoeFilter = overMin.filter(shoe => shoe.type === shoeType)
//     res.send(shoeFilter);
//   }
//   else if (maxPrice && !minPrice) {
//     const shoeFilter = underMax.filter(shoe => shoe.type === shoeType)
//     res.send(shoeFilter);
//   }
//   else if (maxPrice && minPrice) {
//     const priceCheck = underMax.filter(shoe => shoe.price > minPrice)
//     const shoeFilter = priceCheck.filter(shoe => shoe.type === shoeType)
//     res.send(shoeFilter);
//   }
//   else if (!minPrice && !maxPrice) {
//     res.send(shoeTypeFiltered);
//   }
// } else {
//   res.send(shoes);
// }