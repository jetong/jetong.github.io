// ES6

//////////////////////////////
// Variables and Parameters //
//////////////////////////////

//// Let vs Var
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


//// Const
Previously in chrome and firefox an attempt to change the value of a const variable does not throw an error.
The attempt is ignored and the value is not changed.  Now it is a syntax error.  
Const has block semantics, much like let.


//// Destructuring Assignments

// Destructuring Arrays
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

// Destructuring Objects
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


//// Default Parameter Values

// Generally, with a function defined to have 2 parameters, we can invoke it using 0,1,2, or even 3 parameters.
// When we don't call it with enough parameters, ES6 has a cleaner way of handling undefined parameters.

// Old function definition:
var doWork = function(name) {
  name = name || "Scott";   // If we didn't pass "Scott" as paramenter, this will assign "Scott" to name anytime name is falsy.
  return name;
};

// ES6 function definition:
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


//// Rest Parameters

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


//// Spread Operator 
// Looks similar to rest parameter but is used outside a function argument list and is used
// for spreading values of an array across individual parameters.
let doWork = function(x, y, z) {
  return x + y + z;
}
var result = doWork(...[1, 2, 3]);

// Easier to work with arrays.
var a = [2, 3];
var b = [1, ...a, 4];  // [1, 2, 3, 4]


//// Template Literals
// Helps build string literals without mess of string concatenations.
let category = "music";
let id = 2112;
let url = `http://apiserver/${category}/${id}`;  // substitution placeholders are filled in at runtime
// Other uses: create custom tags, html ecoded to prevent xss.



/////////////
// Classes //
/////////////
// Topics: defining class, constructor, get and set, inheritance, super, overrides.
// Note there are no public/private keywords for expressing accessibility.  Modules (discussed later) will address this.

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

// Now in ES6 (runtime creates default constructor and does function prototyping behind scenes)
class Employee {
  doWork() {
    return "complete!";
  }
}

// Another example comparing old and new way:
// Old way:
var Shape = function (id, x, y) {
    this.id = id;
    this.move(x, y);
};
Shape.prototype.move = function (x, y) {
    this.x = x;
    this.y = y;
};

// New way:
class Shape {
    constructor (id, x, y) {
        this.id = id
        this.move(x, y)
    }
    move (x, y) {
        this.x = x
        this.y = y
    }
}


// Full Example:
describe("the class keyword", function(){

// Note that the "this" reference must be used to reference instance variables because
// otherwise javascript will treat it like an instance variable in its local scope.
// Constructors allow us to introduce and initialize state.

	it("can have a constructor", function(){

		class Employee {

			constructor(name) {
				this._name = name;
			}

			doWork() {
				return "complete!";
			}

			getName() {
// can't do 'return _name' because _name is undefined in the getName() scope.
				return this._name;
			}
		}

		let e1 = new Employee("Scott");
		let e2 = new Employee("Alex");

// note the simplified syntax when 'get' and 'set' keywords are used instead (see next example)
		expect(e1.getName()).toBe("Scott");
		expect(e2.getName()).toBe("Alex");

	});
	

// Get and Set allow us to access the object properties directly rather than having to create get and set methods.
// Employee does not actually have a property "name".  It has property "_name".

	it("can have getters and setters", function(){

		class Employee {
			
			constructor(name) {
				this.name = name;
// Note that if we chose to reference this.name instead of this._name, we are no longer creating a _name property
// directly.  Instead, this.name will reference and call the setter 'name' to assign the passed in value to _name.
			}

			doWork() {
				return "complete!";
			}

			get name() {
				return this._name.toUpperCase();
			}

			set name(newValue) {
// Do validation here
				this._name = newValue;
// Note that this.name won't work as we may think even though we see it in the constructor (we would get maximum
// call stack size exceeded error).  this.name in the constructor didn't actually create a property called 'name'.  
// It was simply a call to this set method and '_name' is the actual property that's created.
			}
		}

		let e1 = new Employee("Scott");
		let e2 = new Employee("Alex");

// use of 'set' and 'get' simplifies syntax
		expect(e1.name).toBe("SCOTT");
		expect(e2.name).toBe("ALEX");

		e1.name = "Chris";
		expect(e1.name).toBe("CHRIS");

	});


// Inheritance
// This was always possible, and there were libraries to make this easy, but they were all a little different.
// ES6 provides the "extends" keyword to standardize this syntax.
// Arguably, inheritance can be one of the worst ways of code reuse since it introduces tight coupling between 
// pieces of code, but there are scenarios where it's useful (there is a clear object model to take advantage of
// and there aren't too many levels of inheritance involved).

	it("can have a super class", function(){

		class Person {
			
			constructor(name) {
				this.name = name;
			}

			get name() {
				return this._name;
			}

			set name(newValue) {
				if(newValue) {
					this._name = newValue;
				}
			}
		}	

// Employee is everything that a Person is, but it can also doWork().
		class Employee extends Person {
			doWork() {
				return `${this._name} is working`;
			}
		}

		let p1 = new Person("Scott");
		let e1 = new Employee("Christopher");

		expect(p1.name).toBe("Scott");
		expect(e1.name).toBe("Christopher");
		expect(e1.doWork()).toBe("Christopher is working");


	});


// We say that Person is the base class or super class of Employee.
// Whatever function(doesn't have to be constructor) that super is invoked in, super will call the same function 
// in the immediate super class.  For example, we can have 'super();' in Employee's doWork().  This will invoke the
// doWork() method of the Person class (if it were defined).  In fact, we can do 'super.method()' to access any
// specific method in the super class.  For overriding, don't use super.  Simply define a method that matches the 
// super class's method name (see next section). 

	it("can invoke super methods", function(){

		class Person {
			
			constructor(name) {
				this.name = name;
			}

			get name() {
				return this._name;
			}

			set name(newValue) {
				if(newValue) {
					this._name = newValue;
				}
			}
		}	

		class Employee extends Person {			
// If we don't provide an Employee constructor, the class will default to the super class's constructor.
// In Employee constructor, we can do this._name = name; but this bypasses the Person constructor, which itself could be doing
// a whole slew of other things like data validation.  Instead, doing super(name); invokes the constructor for Person class.
			constructor(title, name) {
				super(name);
				this._title = title;				
			}

			get title() {
				return this._title;
			}

			doWork() {
				return `${this._name} is working`;
			}

		}

		let e1 = new Employee("Developer", "Scott");
		expect(e1.name).toBe("Scott");
		expect(e1.title).toBe("Developer");
		
	});




	it("can override methods", function(){

		class Person {
			
			constructor(name) {
				this.name = name;
			}

			get name() {
				return this._name;
			}

			set name(newValue) {
				if(newValue) {
					this._name = newValue;
				}
			}

			doWork() {
				return "free";
			}

// Implicitly, all classes extend class Object (which has toString method).  Here we are overriding Object's toString().
			toString() {
				return this.name;
			}
		}	

		class Employee extends Person {			

			constructor(title, name) {
				super(name);
				this._title = title;				
			}

			get title() {
				return this._title;
			}

			doWork() {
				return "paid";
			}

		}

		let e1 = new Employee("Developer", "Scott");
		let p1 = new Person("Alex");

		expect(p1.doWork()).toBe("free");
		expect(e1.doWork()).toBe("paid");
		expect(p1.toString()).toBe("Alex");
		expect(e1.toString()).toBe("Scott");

// To check if a particular a particular object has a doWork() method, can do 'if(people[i].doWork)' but even better 
// is 'if(people[i] instanceof Person)'  <-- this checks if the object has the Person.Prototype in its prototype chain.
// This check will always return true for any object instantiated by new Person or new Employee.  This is good defensive
// programming to check and ensure we are working with the right type of objects.  The check is not really for deciding 
// and coding different behaviors depending on what type of object it is, as that should be baked into the classes 
// rather than be determined at this outside layer of abstraction.
		let makeEveryoneWork = function(...people){
			var results = [];
			for (var i = 0; i < people.length; i++) {
				if(people[i] instanceof Person){
					results.push(people[i].doWork());
				}
			};
			return results;
		}

// Here we pass in an empty {} object that is neither Person or Employee, but makeEveryoneWork() filters this out.
		expect(makeEveryoneWork(p1, e1, {})).toEqual(["free", "paid"]);
		
	});

});



////////////////////////////
// Functional Programming //
////////////////////////////

// JavaScript has always been a functional prog language, but ES6 improves the functional ability of the language.

//// Arrow Functions
let add = (x,y) => x + y;

equivalent to:

let add = function(x,y) {
  return x + y;
}

// Example:
describe("arrow functions", function(){

//// Arrows
	it("provide a compact syntax to define a function", function(){
		let add = (x,y) => {			// need {} and return when multiple lines in body
			let temp = x + y;
			return temp;
		};
		let square = x => x * x;		// don't need () if single parameter
		let three = () => 3;			// no parameters

		expect(square(add(2,three()))).toBe(25);

	});

	it("can be used with array methods", function(){

		var numbers = [1,2,3,4];

		var sum = 0;
		numbers.forEach(n => sum += n);
		expect(sum).toBe(10);

		var doubled = numbers.map(n => n * 2);
		expect(doubled).toEqual([2,4,6,8]);
	});


//// Arrows and Asynch
// Done tells Jasmine when setTimeout() has finished.
// Use setTimeout() to simulate some asynch like an Ajax call.

// Problem: the 'this' reference inside the callback function doesn't point to name Scott.
this.name = "Scott";

setTimeout(function() {
	expect(this.name).toBe("Scott");
	done();
},15);

// Old solution is to use a closure.
let self = this;
self.name = "Scott";

setTimeout(() => {
	expect(self.name).toBe("Scott");
	done();
},15);

// ES6 solution: arrow function automatically binds the 'this' reference.
	it("lexically binds to 'this'", function(done) {  

		this.name = "Scott";
	
		setTimeout(() => {
			expect(this.name).toBe("Scott");
			done();
		},15);
		
	});

});


//// Iterables and Iterators
describe("iterables", function(){

	it("can work with iterators at a low level", function(){

		let sum = 0;
		let numbers = [1,2,3,4];

		// for loop approach
		sum = 0;
		for(let i =0; i < numbers.length; i++){
			sum += numbers[i];
		}
		expect(sum).toBe(10);

		// for in approach (works with objects too)
        // see 'for of' in next section for cleaner way
		sum = 0;
		for(let i in numbers) {
			sum += numbers[i];
		}
		expect(sum).toBe(10);

		// iterator approach at a low level
		sum = 0;

		let iterator = numbers[Symbol.iterator]();  
		let next = iterator.next();
		while(!next.done){
			sum += next.value;
			next = iterator.next();
		}
		expect(sum).toBe(10);
	});

});

//// 'For of'
// When we don't care about the keys or indices, and only want the values.
// This is perfect for data structures that don't have keys or indices, like with Iterables where 'for in' doesn't work.
describe("for of", function() {

	it("can work with iteratables at a high level", function(){

		let sum = 0;
		let numbers = [1,2,3,4];

		for(let n of numbers){
			sum += n;
		}
				
		expect(sum).toBe(10);			
	});

});

describe("iterable", function(){

	it("can be built by implementing Symbol.iterator", function(){

		class Company {	
			constructor() {
				this.employees = [];
			}
			
			addEmployees(...names) {
				this.employees = this.employees.concat(names);
			}	
			[Symbol.iterator]() {
				return new ArrayIterator(this.employees);
			}
		}

		class ArrayIterator {
			constructor(array) {
				this.array = array;
				this.index = 0;
			}
			next() {
				var result = { value: undefined, done: true };
				if(this.index < this.array.length) {
					result.value = this.array[this.index];
					result.done = false;
					this.index += 1;	
				}
				return result;
				
			}
		}

		let count = 0;
		let company = new Company();
		company.addEmployees("Tim", "Sue", "Joy", "Tom");

		for(let employee of company) {
			count += 1;
		}

		expect(count).toBe(4);
	});
});
