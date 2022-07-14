1.
["1", "2", "3"].map(parseInt)
// A. ["1", "2", "3"]
// B. [1, 2, 3]
// C. [0, 1, 2]
// D. other

2. 
var name = 'World!';
(function () {
    if (typeof name === 'undefined') {
      var name = 'Jack';
      console.log('Goodbye ' + name);
    } else {
      console.log('Hello ' + name);
    }
})();

// A. Goodbye Jack
// B. Hello Jack
// C. Hello undefined
// D. Hello World