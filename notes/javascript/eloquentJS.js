Eloquent JavaScript

////////////////////////////////////////
Chapter 1 - Values, Types, and Operators
////////////////////////////////////////

Values can be of any of the following data type:

6 primitive types:
	-numbers (Infinity, -Infinity, NaN) NaN == NaN is false, but Object.is(NaN, NaN) is true.
	-strings (immutable. can replace entire value with a new string but cant alter individual
              characters.  string methods always return a new copy of the original string)
	-booleans
	-null
	-undefined
	-symbol (new in ES6)
-objects (this inclues functions, which are "first-class" objects, meaning
	JavaScript supports constructing new functions during executing, storing them
	in data structures, passing them as arguments to other functions, and 
	returning them as values of other functions.

More on immutability:
Note that though a const binding to an object can itself not be changed and will continue
pointing to the same object, the contents of that object can in fact change.

let score = {visitors: 0, home: 0};
score.visitors = 1;				// okay
score = {visitors: 1, home: 0};	// not okay

Ternary operator: console.log(age < 5 ? "Too young" : "Welcome!");

Null vs Undefined

Comparing values using == and != involves automatic type conversion by JavaScript.
Use === and !== to prevent automatic type conversion.  This checks to match value and type.

Null is a falsey value.  When used in conjunction with || we can check if DOM element 
properties are holding values, and fall back on defaults if not:
let income = document.getElementById("income").value || 0;



/////////////////////////////
Chapter 2 - Program Structure (Control flow)
/////////////////////////////



/////////////////////
Chapter 3 - Functions
/////////////////////

Strings:
Backticks, double & single quotes can be used.
Newlines do not need to be escaped when used inside backticks.
Backticks also allow embedding of values/expressions: `Hi ${name}`


Functions that do not return a value or that use the return keyword without an
expression after it return undefined.

Prior to JS 2015, only functions created new scope.
With ES6, let allows us to restrict the scope of variable bindings to within the 
codeblock that the binding was created.  var does not have this restriction.  

if(true){
  let x = 5;
  var y = 10;
}
// y can be accessed outside the block but not x


Functions defined and bound to a variable as values are only accessible in the scope
after the definition, whereas function declarations are conceptually moved to the
top of their scope and can be used anywhere in that scope.

Function defined as value:
let square = function(x) {
  return x*x;
};

Function declaration:
function square(x) {
  return x*x;
}

Arrow notation:
let square = (x) => {return x*x};
shorthand when only 1 parameter and single expression in body:
let square = x => x*x;
no parameters
let greet = () => alert("hi");

If too many arguments are passed when invoking a function, they are ignored.
Passing too few arguments leads to parameters being undefined in the function. 

Function parameters can have default values, set using = 

Closure functions:
function multiplier(factor) {
  return number => number * factor;
}
let twice = multiplier(2);
console.log(twice(5));	// 10

Callback variable scope problem and solution using closures.
https://www.pluralsight.com/guides/javascript-callbacks-variable-scope-problem

Recursion
Using recursion requires weighing speed/efficiency versus human-readability in bigger,
more complex projects.  Applications of recursion often arise in problems that require
exploring/processing several "branches", each of which might branch out again into more
branches.
// exercise: starting with the number one, either add 5 or multiply by 3 repeatedly
// until "target" is hit.  If hit, return the sequence of additions and/or multiplications.
// If target is impossible to hit, return null.
function findSolution(target) {
  function find(current, history) {
    if (current == target) {
      return history;
    } else if (current > target) {
      return null;
    } else {
      return find(current + 5, `(${history} + 5)`) ||
             find(current * 3, `(${history} * 3)`);
    }
  }
  return find(1, "1");
}
console.log(findSolution(13));	// (((1 * 3) + 5) + 5)

Pure functions: give same consistent output when given same input, and does not have side
effects altering global variables and other states.  Not only do they have no side effects,
but they also do not rely on side effects from other code.


Method Chaining:
// http://jsbin.com/erewat/1/edit
// The data store:
var usersData = [
  {firstName: "tommy", lastName: "MalCom", email: "test@test.com", id: 102},
  {firstName: "Peter", lastName: "breCht", email: "test2@test2.com", id: 103},
  {firstName: "RoHan", lastName: "sahu", email: "test3@test3.com", id: 104}
];

// A quick utility function that does what it says:
function titleCaseName(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

// Our object with the chainable methods
var userController = {

  currentUser: "",

  findUser: function (userEmail) {
    var arrayLength = usersData.length, i;
    for (i = arrayLength - 1; i >= 0; i--) {
      if (usersData[i].email === userEmail) {
        this.currentUser = usersData[i];
        break;
      }
    }
    return this;
  },

  formatName: function () {
    if (this.currentUser) {
      this.currentUser.fullName = titleCaseName(this.currentUser.firstName) + " " 
      + titleCaseName(this.currentUser.lastName);
    }
      return this;
  },

  createLayout: function () {
    if (this.currentUser) {
      this.currentUser.viewData = "<h2>Member: " + this.currentUser.fullName + "</h2>"
      + "<p>ID: " + this.currentUser.id + "</p>" + "<p>Email: " + this.currentUser.email + "</p>";
    }
    return this;
  },

  displayUser: function () {
    if (!this.currentUser) return;
      $(".members-wrapper").append(this.currentUser.viewData);		// <div class="members-wrapper"></div>
  }
};
// Now, use the chaninable methods with expressiveness:
userController.findUser("test2@test2.com").formatName().createLayout().displayUser();	// displays data for Peter


// another example method chaining:
let person = {
  
  greet : function(name) {
    this.greeting = "Hi " + name + ".";
    return this;
  },
  
  bye : function(option="") {
    if(this.greeting){
      this.msg = this.greeting + "  Goodbye!" + option;
      return this;
    }
  },
  
};
console.log(person.greet("Mary").bye("  See ya!").msg);
// Hi Mary.  Goodbye!  See ya!



///////////////////////////////////////////////
Chapter 4 - Data Structures: Objects and Arrays
///////////////////////////////////////////////

Looping mechanisms:

// forEach 
use only on array objects.
let arr = ["a", "b", "c"];
arr.forEach(function(element, index){	// index optional
	console.log(element, index);
});

// for...in  (use only for accessing object keys/properties)
loops over enumerable properties (as opposed to non-enumerable ones such as those available through prototypes, like
toString or length)
for(let property in obj){
	console.log(property);		// prints property names
	console.log(obj[property]);	// prints values
}
use in arrays is discouraged since it would loop through any user-created properties that are enumerable
for(let property in arr){
	console.log(property);		// prints indices
}

// for...of  (use to access actual values of a data structure)
loops over iterable member objects (Array, Map, Set, String, TypedArray)
let iterable = new Map([ ["a", 1], ["b", 2], ["c", 3] ]);
for (let entry of iterable) {
	console.log(entry);					// ["a", 1]
}										// ["b", 2]
										// ["c", 3]
for (let [key, value] of iterable) {
	console.log(key, value);			// a 1
}										// b 2
										// c 3

var arr = [3, 5, 7];
arr.foo = 'hello';	// note that "foo" gets printed in the for...in case

for (var i in arr) {
   console.log(i); // logs "0", "1", "2", "foo"
}

for (var i of arr) {
   console.log(i); // logs 3, 5, 7
}

Arrays:
An array is an object with integer property names.
Do not use for...in for arrays.  The order of iteration on the property names is implementation dependent.
Instead, use for loop, Array.prototype.forEach(), or for...of

Array methods:
push, pop				// from back
shift, unshift			// from front
indexOf(val) 			// search left to right, returning index of first match, or -1.  
						// Optional 2nd arg to specify where to start search.
lastIndexOf(val) 		// search from right to left.  
slice()					// copies entire array
slice(index)			// copies entire array starting from index
slice(index1, index2) 	// copies array [index1, index2)
[1,2].concat[3,4];		// [1, 2, 3, 4]
filter, map, reduce (see higher order functions chp5 below)

Objects:
let p1 = {};
p1.name = "Bob";			// can use dot notation
p1["fav color"] = "blue";	// use bracket notation for properties with spaces and numerical properties like array indices.
// Note on notation: When using square brackets, the expression between the brackets is evaluated to get the property name. 
// Whereas value.x fetches the property of value named “x”, value[x] tries to evaluate the expression x and uses the result, 
// converted to a string, as the property name.

let height = 10;
let p2 = {
  name:"Mary",
  age: 25,
  height,					// use shorthand when property name matches previously defined variable
  say: function(msg) { return this.name + " says " + msg; }		// function property
};

console.log(p2.say.call(p1, "hello"));		// call enables p1 to "borrow" p2's say() method.
											// this works as long as the properties used in say() are also defined in p1

// delete
let anObject = {left: 1, right: 2};
console.log(anObject.left);
// → 1
delete anObject.left;
console.log(anObject.left);
// → undefined
// note that when using for...in to loop through object properties, "in" will return true for a property that has been set
// to undefined, but false for a property that has been deleted.  In the former case, the property still exists and is 
// still "in" the object, despite it having a value of undefined.

Another way to access the keys instead of "for...in":
console.log(Object.keys({x: 0, y: 0, z: 2}));
// → ["x", "y", "z"]

To copy all properties of one object to another:
let objectA = {a: 1, b: 2};
Object.assign(objectA, {b: 3, c: 4});
console.log(objectA);
// → {a: 1, b: 3, c: 4}

Note on mutability:
const score = {visitors: 0, home: 0};

// This is okay
score.visitors = 1;
// This isn't allowed
score = {visitors: 1, home: 1};


Strings methods:
slice			// same as arrays
indexOf("aa")	// same as arrays except can search for sequence of chars
trim 			// removes all leading and trailing whitespace(all kinds)
repeat(3)		// repeats string 3 times
padStart(len, str) - pads to the left of a given string with str until the string reaches length len
console.log("7".padStart(3, "0"));	// 007

split & join: 
let city = "new york";
let arr = city.split(" ");      		// ["new", "york"]
let reassembled = arr.join(" ");		// "new york"

let arr2 = "hi".split("");				// ["h", "i"]


Rest Parameters: 
1) Used in function definition to accept any number of arguments:
function max(...numbers) {
  let result = -Infinity;
  for (let number of numbers) {
    if (number > result) result = number;
  }
  return result;
}
console.log(max(4, 1, 9, -2));
// → 9

2) Used in function call to "spread" an array into the function:
let numbers = [5, 1, 7];
console.log(max(...numbers));
// → 7

3) Used within other arrays to spread one array into another:
let words = ["never", "fully"];
console.log(["will", ...words, "understand"]);
// → ["will", "never", "fully", "understand"]

The Math object is used as a container to group a bunch of related functionality.
It provides a namespace so that all these functions and values do not have to be global bindings.
Having too many global bindings “pollutes” the namespace.
Since the built-in fns are safely inside the Math object, there is no worry about name-clashing or overwriting them.
Math.PI, Math.max(), Math.min(), Math.sqrt(), Math.floor(), Math.ceil(), Math.round(), etc.

Destructuring:
If you know the value you are binding is an array, you can use square brackets to “look inside” of the value, 
binding its contents.  This allows us to bind indentifiers directly to elements, making it more succint and readable.
// Here, table is an array of 4 numerical values.
function phi(table) {
  return (table[3] * table[0] - table[2] * table[1]) /
    Math.sqrt((table[2] + table[3]) *
              (table[0] + table[1]) *
              (table[1] + table[3]) *
              (table[0] + table[2]));
}
// becomes
function phi([n00, n01, n10, n11]) {
  return (n11 * n00 - n10 * n01) /
    Math.sqrt((n10 + n11) * (n00 + n01) *
              (n01 + n11) * (n00 + n10));
}

A similar trick works for objects, using braces instead of square brackets.
let {name} = {name: "Faraji", age: 23};
console.log(name);
// → Faraji

JSON - a popular serialization format that allows us to output data from objects & variables (computer memory) 
and store in string format for saving or sharing between computers.
When we "serialize" the data, we convert them into a flat description.

JSON looks similar to JavaScript’s way of writing arrays and objects, with a few restrictions. 
All property names have to be surrounded by double quotes, and only simple data expressions are 
allowed (no function calls, bindings, or anything that involves actual computation).  Comments are not allowed in JSON.
// Example JSON data:
{
  "squirrel": false,
  "events": ["work", "touched tree", "pizza", "running"]
}

// JSON.stringify & JSON.parse
let string = JSON.stringify({squirrel: false,
                             events: ["weekend"]});
console.log(string);
// → {"squirrel":false,"events":["weekend"]}
console.log(JSON.parse(string).events);
// → ["weekend"]



//////////////////////////////////
Chapter 5 - Higher Order Functions
//////////////////////////////////

Functions in general allow for abstractions which in turn allow us to deal with greater complexities.

Plain functions have limitations.
// Abstracting repetition example:
function repeatLog(n) {
  for (let i = 0; i < n; i++) {
    console.log(i);
  }
}
Here our function task is fixed.
But what if we want to do something other than logging the numbers? 
Since “doing something” can be represented as a function and functions are just values, 
we can pass our action as a function value.
function repeat(n, action) {
  for (let i = 0; i < n; i++) {
    action(i);
  }
}

repeat(3, console.log);
// → 0
// → 1
// → 2

Or, using an anonymous function rather than console.log:
let labels = [];
repeat(5, i => {
  labels.push(`Unit ${i + 1}`);
});
console.log(labels);
// → ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5"]


Higher Order Functions
Functions operate on other functions, either by taking them as arguments or by returning them.
Higher-order functions allow us to abstract over actions, not just values.

// Filtering arrays example, where "test" is the action:
// Note: Arrays come with similar built-in method.
function filter(array, test) {
  let passed = [];
  for (let element of array) {
    if (test(element)) {
      passed.push(element);
    }
  }
  return passed;
}

console.log(filter(SCRIPTS, script => script.living));
// → [{name: "Adlam", …}, …]


// Whereas the filter method returns a subset of the passed in array,
// map returns an array of the same size but with elements transformed by the provided function.
function map(array, transform) {
  let mapped = [];
  for (let element of array) {
    mapped.push(transform(element));
  }
  return mapped;
}
let rtlScripts = SCRIPTS.filter(s => s.direction == "rtl");

console.log(map(rtlScripts, s => s.name));		// apply to each object the action/function of retrieving the script name
// → ["Adlam", "Arabic", "Imperial Aramaic", …]


// Reduce
function reduce(array, combine, start) {
  let current = start;
  for (let element of array) {
    current = combine(current, element);
  }
  return current;
}

console.log(reduce([1, 2, 3, 4], (a, b) => a + b, 0));
// → 10

// To use reduce (twice) to find the script with the most characters, we can write something like this:
// Given any one script object, total its range of characters by summing all its individual ranges. 
function characterCount(script) {
  return script.ranges.reduce((count, [from, to]) => {
    return count + (to - from);
  }, 0);
}

// Given an array of script objects, compare total characterCounts cummulatively by passing the object
// with the current highest count to the next iteration of comparison.
console.log(SCRIPTS.reduce((a, b) => {
  return characterCount(a) < characterCount(b) ? b : a;
}));
// → {name: "Han", …}

// Use higher order functions for composability, readability.  Functions that are composable are easily extracted
// for use elsewhere.
Higher-order functions start to shine when you need to compose operations. As an example, let’s write code 
that finds the average year of origin for living scripts and dead scripts in the data set.
function average(array) {
  return array.reduce((a, b) => a + b) / array.length;
}

console.log(Math.round(average(
  SCRIPTS.filter(s => s.living).map(s => s.year))));	// returns an array (filtered), which average expects
// → 1185
console.log(Math.round(average(
  SCRIPTS.filter(s => !s.living).map(s => s.year))));
// → 209

You could definitely also write this computation as one big loop.
More efficient if arrays are huge, but less readable and less modular.
let total = 0, count = 0;
for (let script of SCRIPTS) {
  if (script.living) {
    total += script.year;
    count += 1;
  }
}
console.log(Math.round(total / count));
// → 1185


// Strings and Character Codes
// Characters in certain languages and in emoji are often represented by 2 character codes
let roseDragon = "🌹🐉";
console.log(roseDragon.length);		// 4
console.log(roseDragon[0]);			// Invalid half-character
roseDragon.charCodeAt(0);			// 55356 (code of half-character)

// use codePointAt() to access the full character
roseDragon.codePointAt(0);			// 127801 (code of actual rose)

// for...of handles the full character properly
for (let char of roseDragon) {
  console.log(char);	// prints rose and dragon emojis separately
}



//////////////////////////////////////
Chapter 6 - The Secret Life of Objects
//////////////////////////////////////

Encapsulation

Methods are nothing more than properties that hold function values.

The "this" object
// When a method is defined with 'function' keyword, 'this' is bound to the object the method was called on.
function speak(line) {
  console.log(`The ${this.type} rabbit says '${line}'`);
}
let whiteRabbit = {type: "white", speak};	// 'this' points to whiteRabbit
whiteRabbit.speak("hi");					// The white rabbit says 'hi'

// It's almost as if the 'this' reference is an argument that is passed to the method by default behind the scenes.
// If we want to pass the reference explicitly, we can use a function's call() method, which takes the 'this'
// reference as first argument, and treats the remaining arguments as normal parameters to the function.
speak.call(whiteRabbit, "Burp!");
// The white rabbit says 'Burp!'

// But sometimes you don't want to access the immediate object through the 'this' reference, but instead want to access
// the 'this' of the wrapping scope, ie, the context where the object was created.
// For this scenario, use arrow functions since they don't bind their own 'this', but instead see the 'this'
// binding of the scope around them.

// Note that even though within the scope of the arrow function, the 'this' in 'this.length' refers to the 
// object {coords: [0, 2, 3], length: 5} that is in the surrounding scope.
function normalize() {
  console.log(this.coords.map(n => n / this.length));
}
normalize.call({coords: [0, 2, 3], length: 5});
// → [0, 0.4, 0.6]


Prototypes - an informal way to create classes for OOP.
// An object's prototype is another object that is used as a fallback source of properties.
Object.prototype is at the root of all objects.
Functions derive from Function.prototype and arrays derive from array.prototype.

Object.getPrototypeOf({});					// Object.prototype
Object.getPrototypeOf(Object.prototype);	// null.  Object.prototype is the very top of heirarchy.

let newObj = Object.create(myProto);		// to create object with specific prototype


let protoRabbit = {
  speak(line) {			// shorthand for creating method
    console.log(`The ${this.type} rabbit says '${line}'`);
  }
};
let killerRabbit = Object.create(protoRabbit);
killerRabbit.type = "killer";
killerRabbit.speak("SKREEEE!");		// killerRabbit falls back onto protoRabbit's speak() method.
Object.getPrototypeOf(killerRabbit);

Prototypes are useful for defining properties for which all instances of a class share the same value, 
such as methods. Properties that differ per instance, such as our rabbits’ type property, need to be stored 
directly in the objects themselves.

Use 'new' keyword in front of function to treat the function as a constructor.
// creating class using constructor definition (old way)
function Rabbit(type) {
  this.type = type;
}
Rabbit.prototype.speak = function(line) {
  console.log(`The ${this.type} rabbit says '${line}'`);
};

let weirdRabbit = new Rabbit("weird");

So JavaScript classes are constructor functions with a prototype property. That is how they work, and until 2015, 
that was how you had to write them. These days, we have a less awkward notation:

// creating class using class declaration (new way)
class Rabbit {
  constructor(type) {
    this.type = type;
  }
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  }
}

let killerRabbit = new Rabbit("killer");
let blackRabbit = new Rabbit("black");


Overriding
To have an object override one of its derived properties, simply assign a new value to that property of the object.

Maps (the data structure)
Since objects may have properties up along the prototypal tree, using objects as maps can be dangerous.
let ages = {
  Boris: 39,
  Liang: 22,
  Júlia: 62
};
console.log("toString" in ages);	// true because "toString" is a property of Object.prototype

One solution:
// If you pass null to Object.create, the resulting object will not derive from Object.prototype 
// and can safely be used as a map.
console.log("toString" in Object.create(null));

Another solution:
Object.keys returns only an object’s own keys, not those in the prototype.
Also, as an alternative to the in operator, you can use the hasOwnProperty method, 
which ignores the object’s prototype.
console.log({x: 1}.hasOwnProperty("toString"));		// false

Better solution:
// use Map class, with interface methods get, set, has.
let ages = new Map();
ages.set("Boris", 39);
ages.set("Liang", 22);
ages.set("Júlia", 62);
console.log(ages.has("toString")); 		// false


Polymorphism
Polymorphic code can work with values of different shapes, as long as they support the interface.
Looping mechanisms like for...of which handle several kinds of data structures is another example.


