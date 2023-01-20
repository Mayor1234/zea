// const cars = [
//   { name: 'Honda' },
//   { name: 'Toyota' },
//   { name: 'Benz' },
//   { name: 'Lexus' },
//   { name: 'Bmw' },
//   { name: 'Audi' },
// ];

// const query = 'b';
// const result = cars.filter((item) => {
//   return item.name.toLowerCase().includes(query.toLowerCase());
// });

function capitalized(input) {
  return input
    .split(
      ' '
    ) /* The result here will be ['elephant', 'is', 'an', 'animal' ]  */
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    .join(' ');
}

const result = capitalized('elephant is an animal');

console.log(result);
