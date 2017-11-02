let asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === "number" && typeof b === "number") {
        resolve(a + b);
      } else {
        reject("Two numbers required");
      }
    }, 2000);
  });
};

// asyncAdd(9, "15")
//   .then(
//     res => {
//       console.log("=", res);
//       return asyncAdd(res, 9);
//     },
//     error => {
//       console.log(error);
//     }
//   )
//   .then(
//     res => {
//       console.log("recursive =", res);
//     },
//     error => {
//       console.log(error);
//     }
//   );

asyncAdd(9, 999)
  .then(res => {
    console.log("=", res);
    return asyncAdd(res, "8");
  })
  .then(res => {
    console.log("recursive =", res);
  })
  .catch(err => {
    console.log("error:", err);
  });

// let somePromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     // resolve("It worked!");
//     reject("No go bro");
//   }, 2500);
// });
//
// somePromise.then(
//   resolved => {
//     console.log(resolved);
//   },
//   error => {
//     console.log(error);
//   }
// );
