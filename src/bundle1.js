import 'babel-polyfill';

var someAsyncFunction1 = () => {

  console.log('someAsyncFunction1 started! please wait for while...');

  return new Promise(function(resolve) {
    setTimeout(() => {
      console.log('someAsyncFunction1 has been completed!');
      resolve();
    }, 3000);
  });
};

var someAsyncFunction2 = () => {

  console.log('someAsyncFunction2 started! please wait for while...');

  return new Promise(function(resolve) {
    setTimeout(() => {
      console.log('someAsyncFunction2 has been completed!');
      resolve();
    }, 3000);
  });
};


(async () => {
  await someAsyncFunction1();
  console.log('let\'s go next!');
  await someAsyncFunction2();
  console.log('Congratulation! all task have been completed!');
})();

