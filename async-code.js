async function main() {
  await task1();
  await task2();
  await task3();
  await task4();
  await task5();
}

main();

async function task1() {
  console.log("Task 1 completed");
}

async function task2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Task 2 completed");
      resolve("executed");
    }, 2000);
  });
}

async function task3() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Task 3 completed");
      resolve("executed");
    }, 1000);   
});
}  

async function task4() {
  console.log("Task 4 completed");
}

async function task5() {
  console.log("Task 5 completed");
}
