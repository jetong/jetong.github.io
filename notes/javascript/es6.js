// Let
Var has no block level scope.  Variables declared with var are automatically hoisted up to the top
of the current function scope even if declared inside the scope of someone other block of code such as
inside an if or for block:

function doWork(flag) {
  if(flag) {
    var x = 3;
  }
  return x;
}

Here, doWork(false) will return "undefined" (x never got to be defined, yet its scope is the
entirety of the function).  It is as if we hoisted the the variable to the top of the function block
and defined "var x = undefined;".

Intead, use let for better precision/control, clarity, and feedback from error messages.

// Const
Previously in chrome and firefox an attempt to change the value of a const variable does not throw an error.
The attempt is ignored and the value is not changed.  Now it is a syntax error.  
Const has block semantics, much like let.

// Destructuring assignments

// Arrays
let x = 2;
let y = 3;
[x, y] = [y, x];  // swaps x and y.
// Note that the right hand side is an array of values.
// The left side looks like the creation of an array literal, but it is just syntax 
// for defining and assigning values to x and y.

// Perhaps more clear to write as:
let [x, y] = [y, x];

// If we wanted to skip a value, use comma:
let [, y] = [y, x];

// Objects
// Think of the left side of the colon as for navigating through the object and the right side
// as the variable name or value.
it("can destructure objects", function() {
  let doWork = function() {
    return {
      firstName: "Scott",
      lastName: "Allen",
      handles: {
        twitter: "OdeToCode"
      }
    };
  };  
  
  let { firstName: first,
        handles: {twitter: twitter} 
      } = doWork();

  // now we expect to have 2 variables (first and twitter) with values in them.
  expect(first).toBe("Scott");
  expect(twitter).toBe("OdeToCode");
});

// If we happen to use variable names that match the property name of the object, we have a shorthand:
let { firstName,
      handles: {twitter}
    } = doWork();
expect(firstName).toBe("Scott");
expect(twitter).toBe("OdeToCode");

// Can also deconstruct as we pass objects into functions.
// Without deconstructing:
let doWork = function(url, config) {
  return config.data;
}

// With deconstructing:
let doWork = function(url, {data, cache}) {
  return data;
}

let result = doWork(
  "api/test", {
    data: "test",
    cache: false
  }
);


// Default Parameter Values
// Generally, with a function defined to have 2 parameters, we can invoke it using 0,1,2, or even 3 parameters.
// When we don't call it with enough parameters, ES6 has a cleaner way of handling undefined parameters.

// Old definition:
var doWork = function(name) {
  name = name || "Scott";   // If we didn't pass "Scott" as paramenter, this will assign "Scott" to name anytime name is falsy.
  return name;
};

// ES6 definition:
var doWork = function(name="Scott") {
  return name;             // If we didn't pass "Scott" as parameter, this will assign "Scott" to name only if the
};                         // parameter passed in is undefined (no parameter was passed or undefined itself was passed).

// Note: "undefined" and "null" are primitive values.
// A variable is "undefined" when it has not been assigned a value after being declared.
// A variable is "null" when it is empty or has non-existent reference.  Null is an explicit way of describing
// a variable's abscence of a value after it had been assigned.

// default parameters work for objects too
let doWork = function(url, { data = "Scott", cache = true}) {
  return data;
}

let result = doWork("api/test", {cache: false}); // when doWork() returns data, data will have value of Scott.


// Rest Parameters
// Makes it easier to work with an unknown or variable number of arguments in a function.

// Old way:
// Problem is that we access arguments in an object called "arguments" that looks like an array, but is not.
let sum = function() {
  let result = 0;
  for(let i = 0; i < arguments.length; i++) {
    result += arguments[i];
  }
};

// ES6 way, using a rest parameter (must be last parameter because rest parameters are greedy).
// Here "numbers" is a true array.  If we don't pass any parameters to our function, we end up with an empty array
// that adds up to 0 and this works nicely since we don't need to check for null or undefined.
let sum = function(...numbers) {
  let result = 0;
  for(let i = 0; i < numbers.length; i++) {  // or use numbers.forEach(function(n) { result += n });
    result += numbers[i];
  }
  return result;
};


// Spread Operator looks similar to rest parameter, but is used outside a function argument list and is used
// for spreading values of an array across individual parameters.
let doWork = function(x, y, z) {
  return x + y + z;
}
var result = doWork(...[1, 2, 3]);

// Easier to work with arrays.
var a = [2, 3];
var b = [1, ...a, 4];  // [1, 2, 3, 4]


// Template Literals
// Helps build string literals without mess of string concatenations.
let category = "music";
let id = 2112;
let url = `http://apiserver/${category}/${id}`;  // substitution placeholders are filled in at runtime
// Other uses: create custom tags, html ecoded to prevent xss.


// Classes
// We always had a way to declare objects, but ES6 comes with class keyword that simplifies syntax.
// Class vs Prototype
// Before:
var Employee = function() {
  // define constructor
}

Employee.prototype = {
  doWork: function() {
    return "complete!";
  }
};

var e = new Employee();

// ES6 (runtime creates constructor and does function prototyping behind scenes)
class Employee {
  doWork() {
    return "complete!";
  }
}

var e = new Employee();

// Example class.  Note that the "this" reference must be used to reference instance variables because
// otherwise javascript will try to look for the instance variable in its local scope.
class Employee {
  constructor(name) {
    this._name = name;
  }

  getName() {
    return this._name;  // can't do return _name because _name is undefined in the getName() scope.
  }
}


// Get and Set allow us to access the object properties directly rather than through get and set methods.
// Note that in the constructor we no longer reference this._name since this.name will no longer be creating a
// property of the object, but rather it will be calling the setter to assign a new value to _name.  
// Employee does not actually have a property "name".  It has property "_name".
class Employee {
  constructor(name) {
    this.name = name;
  }
  
  get name() {
    return this._name.toUpperCase();
  }
  
  set name(newValue) {
    // do valdiation here
    this._name = newValue;
  }
}
  
let e1 = new Employee("Scott");
e1.name = "James";
expect(e1.name).toBe("JAMES");


// Inheritance
// This was always possible, and there were libraries to make this easy, but they were all a little different.
// ES6 provides the "extends" keyword to standardize this syntax.
// Arguably, inheritance is one of the worst ways of code reuse since it introduces tight coupling between pieces of code.
