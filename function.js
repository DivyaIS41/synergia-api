// setTimeout(() => {
//   console.log('Task 1')
// },4000);

// setTimeout(() => {
//   console.log('Task 2')
// }, 7000);

// setTimeout(() => {
//   console.log('Task 3')
// }, 2000);

// setTimeout(() => {
//   console.log('Task 4')
// }, 3000);

// setTimeout(() => {
//   console.log('Task 5')
// }, 6000);

// setTimeout(() => {
//   console.log('Task 6')
// }, 1000);


setTimeout(() => {
  console.log('Task 7');
  setTimeout(() => {
    console.log('Task 8');
    setTimeout(() => {
      console.log('Task 9');
      setTimeout(() => {
        console.log('Task 10');
      }, 3000);
    }, 2000);
  }, 1000);
}, 5000);



