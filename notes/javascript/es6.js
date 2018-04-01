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


