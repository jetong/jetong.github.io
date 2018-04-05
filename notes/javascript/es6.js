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
// Iterators & Generators have been included as a topic of functional programming because they allow us to build
// functions that compose together very well.

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

		// 'for in' approach (works with objects too)
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

//// 'For of' to work with iterators at a higher level.
// When we don't care about the keys or indices, and only want the values.
// This is perfect for data structures that don't have keys or indices, like with Iterables where 'for in' doesn't work.

// Can think of 'for of' construct as generating the code to work with an iterator (calling next, checking done flag, etc).
// Can think of generator function as creating/defining and iterator object, keeping track of its state (which iteration
// we're at for processing) and providing an implementation of next().
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

///// Making your own classes/objects iterable the "hard way" to see what happens behind the scenes.
// Iterators gives the client users a way to loop through our Company object without needing to give them direct 
// access to our employee array.  
describe("iterable", function(){

	it("can be built by implementing Symbol.iterator", function(){

		class Company {	
			constructor() {
				this.employees = [];
			}
			
			addEmployees(...names) {
				this.employees = this.employees.concat(names);
			}	

// 'for of' loop invokes this function, looking for an iterator object with method next() that eventually sets done flag
// to false when iteration is complete.
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


//// Generators
// A generator function is a function that generates an iterator object.
// The iterator object then allows us (by calling next) to step through each item the generator function yields.
// Generator function definition requires * and uses yield keyword to return multiple values.  Each time the generator
// function is called, code executes until it yields a value.  Control is sent back to the caller which processes that
// value and calls next() to send control back to the generator function to resume where it had left off (right after 
// the previous yield statement).  This continues until there are no more yield statements, at which point the object
// that the generated iterator returns will have a done flag of true. 

// Can think of 'for of' construct as generating the code to work with an iterator (calling next, checking done flag, etc).
// Can think of generator function as creating/defining and iterator object, keeping track of its state (which iteration
// we're at for processing) and providing an implementation of next().
describe("generators", function(){

	it("can build an iterable", function(){

		let numbers = function*(start, end) {
			for(let i = start; i <= end; i++) {

				yield i;
			}
		};

		let sum = 0;		
		for(let n of numbers(1,5)){
			sum += n;
		}
		
		expect(sum).toBe(15);
	});

// Improving on previous example where we created our own iterator class.  Simply replace it with a generator function.
	it("can be built by implementing Symbol.iterator", function(){

		class Company {	
			constructor() {
				this.employees = [];
			}
			
			addEmployees(...names) {
				this.employees = this.employees.concat(names);
			}	
// generator function which defines an iterator object behind the scenes and yields some value
			*[Symbol.iterator]() {
				for(let e of this.employees) {  // 'for of' which calls the next() method of the iterator object and checks for done.
					//console.log(e);
					yield e;
				}
			}
		}

// filter and take are for demonstrating how iterators and generators build functions that are composable with one another.
// filter takes an iterable object 'item' of employees and applies to each item some 'predicate' filter as defined
// by the arrow function below.
		let filter = function*(items, predicate) {
			for(let item of items) {
				//console.log("filter", item);
				if(predicate(item)) {
					yield item;
				}
			}			
		}

		let take = function*(items, number) {
			let count = 0;
			if(number < 1) return;		// return tells the iterator to set the done flag to true.
			for(let item of items) {
				//console.log("take", item);
				yield item;
				count += 1;
				if(count >= number) {
					return;				// return if count has reached the specified number.
				}
			}
		}

		let count = 0;
		let company = new Company();
		company.addEmployees("Tim", "Sue", "Joy", "Tom");

// 'filter' for employees whose names start with a 'T'
// 'take' does lazy evaluation and stops/returns once a specified 'number' of such employees have been found.  Efficient.
		for(let employee of take(filter(company, e => e[0] == 'T'),1)) {
			count += 1;
		}

		expect(count).toBe(1);
	});


// Preview of another ability of iterators (to be explored further when discussing asynch javascript)
	it("can take a parameter from next(param)", function() {

		let range = function*(start, end) {
			let current = start;
			while(current <= end) {
				let delta = yield current;	// delta will be 2 from the call to next(2)
				current += delta || 1;		// delta will be undefined if we called next() without parameter, and we would default to 1	
			}
		}

// Doing the same thing with a standard non-generator function to get an idea of what the generator with yield statements is doing.
		let range2 = function(start, end) {
			let current = start;
			let first = true;	// flag to treat the first iteration calling next a little differently.
			return {
				next(delta = 1) {
					let result = { value: undefined, done: true };
					if(!first) {	// all subsequent calls to next, increment the current value by delta.
						current += delta;
					}
					if(current <= end) {
						result.value = current;
						result.done = false;						
					}
					first = false;
					return result;
				}
			}
		}

		let result = [];
		let iterator = range2(1,10);
		let next = iterator.next();
		while(!next.done) {
			result.push(next.value);
			next = iterator.next(2);	// Pass 2 as parameter.  This will be received as 'yield current' in range.
		}

		expect(result).toEqual([1, 3, 5, 7, 9]);
	});

});


//// Comprehensions syntax of ES6 for building arrays and generators
describe("comprehensions", function() {

	it("can create arrays or generators", function(){

		let range = function*(start, end) {
			let current = start;
			while(current <= end) {
				yield current;
				current += 1;			
			}
		}

		let numbers = [];
		for(let n of [1,2,3]) {
			numbers.push(n * n);
		}
		expect(numbers).toEqual([1, 4, 9]);

        // this is similar, but demonstrates that we can have a predicate to filter values
		let numbers = [for (n of [1,2,3]) if(n > 1) n * n];
		expect(numbers).toEqual([4,9]);

        // generator comprehension uses () instead of []
        // this doesn't build an array, but rather creates a generator
		let numbers2 = (for (n of [1,2,3]) n * n);
		expect(Array.from(numbers2)).toEqual([1,4,9]);

	});

// example
	it("can be used with yield*", function(){

		class Company {	
			constructor() {
				this.employees = [];
			}
			
			addEmployees(...names) {
				this.employees = this.employees.concat(names);
			}	
			*[Symbol.iterator]() {
				for(let e of this.employees) {
					console.log("yield", e);
					yield e;
				}
			}
		}

		let filter = function*(items, predicate) {			
// yield* applies yield to each item in the array rather than to array directly object.
// Note we used () for "lazy" generator comprehension and we stopped as soon as conditions were met.
// Had we done 'yield* [for (item of items) if(predicate(item)) item]; we would have iterated the entire array regardless of conditions.
			yield* (for (item of items) if(predicate(item)) item);
			// for(let item of items) {
			// 	if(predicate(item)) {
			// 		yield item;
			// 	}
			// }			
		}

		let take = function*(items, number) {
			let count = 0;
			if(number < 1) return;
			for(let item of items) {				
				yield item;
				count += 1;
				if(count >= number) {
					return;
				}
			}
		}

		let count = 0;
		let company = new Company();
		let found = undefined;
		company.addEmployees("Tim", "Sue", "Joy", "Tom");

		for(let employee of take(filter(company, e => e[0] == 'S'),1)) {			
			count += 1;
			found = employee;
			console.log("got", employee);
		}

		expect(count).toBe(1);
		expect(found).toBe("Sue");
	});

});



//////////////////////
// Built-In Objects //
//////////////////////

//// Numbers
describe("Numbers", function() {
    // The misleading octal 071 is now 0o71
	it("should support octal literals", function () {
		var octal = 0o71;
		expect(octal).toBe(57);
	});

	it("should support binary literals", function () {
		var bin = 0b1101;
		expect(bin).toBe(13);
	});

	it("should parse octal values with Number function", function () {
		var octNum = Number("0o71");
		expect(octNum).toBe(57);
	});

	it("should parse binary values with Number function", function () {
		var binNum = Number("0b101");
		expect(binNum).toBe(5);
	});

	it("should expose parseInt and parseFloat through Number object rather than globally", function () {
		expect(Number.parseInt("3")).toBe(3);
		expect(Number.parseFloat("3.5")).toBe(3.5);
	});

	it('should not convert strings when calling Number.isFinite vs global', function() {
		expect(isFinite("1")).toBe(true);	// automatically runs a Number conversion behind the scenes.  bad?
		expect(Number.isFinite("1")).toBe(false);	// doesn't convert the string "1" to number, and so is not finite.
	});

	it('should not convert strings when calling Number.isNaN vs global', function() {
		expect(isNaN("NaN")).toBe(true);	// string "NaN" gets converted to value NaN
		expect(Number.isNaN("NaN")).toBe(false);
	});

	it('should correctly detect integers with isInteger', function() {
		expect(Number.isInteger(1)).toBe(true);
		expect(Number.isInteger(1.0)).toBe(true);
		expect(Number.isInteger(1.5)).toBe(false);
	});

	it('should expose max and min safe integer constants', function() {
		expect(Math.pow(2,53)).toBe(Math.pow(2,53)+1);		// true, internally represented by same value
		expect(Math.pow(2,53)+3).toBe(Math.pow(2,53)+5);	// still true.  gets worse as numbers go more extreme

		// ES6 can now specify the max and min of integers so we can safely use them.
		expect(Number.MAX_SAFE_INTEGER).toBe(Math.pow(2,53)-1);
		expect(Number.MIN_SAFE_INTEGER).toBe(Math.pow(2,53)*-1+1);
	});

	it('should indicate safe integers with isSafeInteger', function() {
		expect(Number.isSafeInteger(9007199254740991)).toBe(true);		// max int
		expect(Number.isSafeInteger(9007199254740992)).toBe(false);		// max int + 1
	});

});


//// Math
describe('Math trig functions', function() {
	it('should return correct values', function() {
		expect(Math.acosh(1)).toBe(0);
		expect(Math.asinh(0)).toBe(0);
		expect(Math.atanh(0)).toBe(0);
		expect(Math.cosh(0)).toBe(1);
		expect(Math.sinh(0)).toBe(0);
		expect(Math.tanh(0)).toBe(0);
	});
});

describe('Misc Math functions', function() {
	it('should return correct values', function() {
		expect(Math.cbrt(27)).toBe(3);						// cube root
		expect(Math.clz32(5)).toBe(29);						// counts leading zeros of numbers in 32 bit representation
		expect(Math.log1p(35)).toBe(3.58351893845611);
		expect(Math.log10(100)).toBe(2);
		expect(Math.log2(32)).toBe(5);
		expect(Math.expm1(35)).toBe(1586013452313434.2);
		expect(Math.hypot(3,4)).toBe(5);
		expect(Math.fround(2.888)).toBe(2.888000011444092);
	});
});

describe('Other Math functions', function() {
	it('should return correct values', function() {
		expect(Math.sign(10)).toBe(1);
		expect(Math.sign(0)).toBe(0);
		expect(Math.sign(-10)).toBe(-1);

		expect(Math.trunc(2.8)).toBe(2);
		expect(Math.trunc(-2.8)).toBe(-2);
	});
});


//// Arrays
describe('Arrays', function() {
	
	it('should return the first matching element using find', function() {
		var ary = [1,5,10];
		var match = ary.find(item => item > 8);
		expect(match).toBe(10);
	});

	it('should return the first matching index using findIndex', function() {
		var match = [1,5,10].findIndex(item => item > 3);
		expect(match).toBe(1);
	});

	it('should fill in the entire array when fill is called', function() {
		var ary = [1,2,3,4,5];
		ary.fill('a');
		expect(ary[3]).toBe('a');
	});

	it('should fill in some of the array when fill is called with args', function() {
		var ary = [1,2,3,4,5];
		ary.fill('a', 2, 3); // [1,2,'a',4,5]    Value to be filled starting at index 2, and stopping before index 3.
		expect(ary[2]).toBe('a');
		expect(ary[3]).toBe(4);
	});

// copyWithin(starting_destination_index, starting_source_index, number_elements_to_copy)
// copyWithin works with the original values in the array at the time the function is called.
	it('should copy elements with copyWithin', function() {
		var ary = [1,2,3,4];	
        ary.copyWithin(0, 2);		// [1,2,1,2]
        ary.copyWithin(2, 0, 1);	// [1,2,1,4]
		ary.copyWithin(0,-2);		//[3,4,3,4]  negative indices start from end of array 
		expect(ary[0]).toBe(3);
		expect(ary[1]).toBe(4);
	});

	it('should create a new array with 1 arg when given 1 arg when of is called', function() {
		var ary = new Array(3);		// empty array of 3 elements [,,]
		var ofAry = Array.of(3);	// array of 1 element [3]
		expect(ary.length).toBe(3);
		expect(ofAry.length).toBe(1);
	});

	it('should create a new array from an array-like object when from is called', function() {
		var arrayLike = document.querySelectorAll('div');
		expect(arrayLike.forEach).toBe(undefined);	// true arrays have forEach() defined

		var fromArray = Array.from(arrayLike);		// use 'from' to convert to true array
		expect(fromArray.forEach).toBeDefined();
	});

// Place array elements into index/value entry structure
	it('should return entries from the entries function', function() {
		var a = ['Joe','Jim','John'];
		var entries = a.entries();

		var firstEntry = entries.next().value;
		expect(firstEntry[0]).toBe(0);
		expect(firstEntry[1]).toBe('Joe');
	});

// Keys iterator
	it('should enumerate keys with the keys function', function() {
		var a = ['Joe','Jim','John'];
		var keys = a.keys();

		var firstKey = keys.next().value;
		expect(firstKey).toBe(0);
	});

// Performing some operation to each item in a list to produce a new list.
// Can already do with map() function, but array comprehension is cleaner.
	describe('comprehensions', function() {
		it('should create arrays easily', function() {
			var ary = [for (i of [1,2,3]) i]; //[1,2,3]
			expect(ary[2]).toBe(3);
			var ary2 = [for (i of [1,2,3]) i*i]; //[1,4,9]
			expect(ary2[2]).toBe(9);
			// filtering
			var ary3 = [for (i of [1,2,3]) if (i < 3) i]; //[1,2]
			expect(ary3.length).toBe(2);

            // Permute all possible combinations of first and middle names strung together, with filter
            // being that the first and middle names not match (as John is a possible first and middle name).
			var ary4 = [for (first of ['William', 'John', 'Blake'])
				for (middle of ['Robert','Andrew','John'])
				if(first != middle) (first + ' ' + middle + ' Smith')]
			console.log(ary4);
			expect(ary4[0]).toBe('William Robert Smith');
			expect(ary4[1]).toBe('William Andrew Smith');
		});
	});
})


//// Set (collection of unique values.  no keys)
describe('Sets', function() {

// creating a set and seeing its size
	it("should contain zero items when constructed", function () {
		var set = new Set();
		expect(set.size).toBe(0);
	});

// adding an item to a set
	it("should contain 1 item when one item is added", function () {
		var set = new Set();
		set.add("somevalue");
		expect(set.size).toBe(1);
	});

// Using objects as a data structure has its drawbacks.  Keys are represented as strings, so a key with the number 1
// will coincide with a key with string "1".  Storing objects as keys is even worse as toString would convert the object
// into a string "object" to be the key.  Sets can use objects as keys.  Whatever you place into the set as a key list of
// objects will be represented exactly the same way internally.
	it('should allow objects as a key', function() {
		var set = new Set();
		var key = {};
		set.add(key);
		expect(set.has(key)).toBe(true);
	});

// Can initialize sets with an array.  Pass array into contructor.
	it("should contain items when given an array in the constructor", function () {
		var set = new Set([1,2,3]);
		expect(set.has(1)).toBe(true);
	});

// Sets store unique values
	it("should not allow duplicate values", function () {
		var set = new Set();
		var key = {};
		set.add(key);
		set.add(key);
		expect(set.size).toBe(1);
	});

// Remvoing all items from set
	it("should have no items after clear is called", function () {
		var set = new Set();
		set.add(1);
		set.add(2);
		set.add(3);
		set.clear();
		expect(set.size).toBe(0);
	});

// Removing specific items.
	it("should remove an item when delete is called", function () {
		var set = new Set();
		set.add(1);
		set.add(2);
		set.delete(1);
		expect(set.size).toBe(1);	// 2 is still an item
	});

// Iterating sets with forEach()
// forEach() will operate on items based on insertion order.
	it("should call a callback function once for each item when foreach is invoked", function() {
    var set = new Set();
   	set.add('Tom');
   	set.add('Dick');
   	set.add('Harry');

   	var iterationCount = 0;
   	set.forEach(item => iterationCount++);
   	expect(iterationCount).toBe(3);
  });

// Iterating sets with for of
  it('should support for of iteration', function() {
  	var set = new Set([1,2,3]);

  	var iterationCount = 0;
  	for(var item of set) {
  		iterationCount++;
  	}
  	expect(iterationCount).toBe(3);
  });

// ??? use ?
  it("should return an iterator of arrays when entries is called", function () {
    var set = new Set();
    set.add("1");

    var entries = set.entries();
    var firstEntry = entries.next().value;		// first item is an array whose first element is the value
    expect(firstEntry[0]).toBe("1");			// and the second element is the same value
    expect(firstEntry[1]).toBe("1");
  });

  it("should return an iterator of values when values is called", function () {
    var set = new Set();
    set.add("1");

    var values = set.values();
    var firstValue = values.next().value;
    expect(firstValue).toBe("1");
  });

  it("should be able to be constructed with an iterator", function () {
  	var set = new Set();
  	set.add("1");
  	set.add("2");
  	set.add("3");

  	var set2 = new Set(set.values());	// set2 now has the same values.  Can also do new Set(set);
  	expect(set2.size).toBe(3);
  });

});


//// Map (key, value) pairs, where keys are unique.  Unlike objects whose keys are strings, map keys can be any object or primitive.
describe("Maps", function() {

// create map
	it("should contain zero items when constructed", function () {
		var map = new Map();
		expect(map.size).toBe(0);
	});

// set
	it("should contain 1 item when one item is added", function () {
    var map = new Map();
    map.set("age", 35);
    expect(map.size).toBe(1);
  });

// get
  it("should return the value when get is called with the correct key", function () {
    var map = new Map();
    map.set("age", 35);
    expect(map.get("age")).toBe(35);
  });

// use object as key
  it('should allow an object to be the key', function() {
    var ageMap = new Map();
    var ralph = {'name': 'Ralph'};
    ageMap.set(ralph, 29);

    expect(ageMap.get(ralph)).toBe(29);
  });

// initialize map with an array of arrays
  it("should contain items when given an array in the constructor", function () {
    var map = new Map([['name','John'],['age',15],['weight','155']]);
    expect(map.size).toBe(3);
  });

// check if map has an item
  it("should find the correct item when has is called", function () {
    var map = new Map([['name','John'],['age',15],['weight','155']]);
    expect(map.has('age')).toBe(true);
  });

// doesn't allow duplicates.  value will be whatever was last set.
  it("should not allow duplicate keys", function () {
    var map = new Map();
    var key = {};
    map.set(key, 'first');
    map.set(key, 'second');
    expect(map.get(key)).toBe('second');
  });

// clear
  it("should have no items after clear is called", function () {
    var map = new Map();
    map.set(1, 'a');
    map.set(2, 'b');
    map.set(3, 'c');
    map.clear();
    expect(map.size).toBe(0);
  });

// delete an item by key
  it("should remove an item when delete is called", function () {
    var map = new Map();
    var key1 = {};
    var key2 = {};
    map.set(key1, 100);
    map.set(key2, 200);
    map.delete(key2);
    expect(map.has(key2)).toBe(false);
  });

// iterate using forEach().  In this case, the Callback requires value and key.
  it("should call the callback function for each item when forEach is called", function () {
    var map = new Map([['name','John'],['age',15],['weight','155']]);
  	var iterationCount = 0;
  	map.forEach(function(value, key) {
  		iterationCount++;
  		// use value & key
  	});
  	expect(iterationCount).toBe(3);
  });

// Iterate using for of
  it("should support for of iteration", function () {
    var map = new Map([['name','John'],['age',15],['weight','155']]);
  	var iterationCount = 0;
  	for(var [key, value] of map) {
  		// if we do 'var item of map' then item is an array like ['name', 'John'].  
        // Here we use ES6 syntax [key, value] to get each value into its own variable.
  		iterationCount++;
  	}
  	expect(iterationCount).toBe(3);
  });

// Like sets, maps expose several iterators for working with items in the collection.
// 
  it("should return an iterator of arrays of key value pairs when entries is called", function () {
    var map = new Map();
    map.set('name', 'Joe');
    var items = map.entries();
    var first = items.next().value;		// get first item from our map
    expect(first[0]).toBe('name');		// each item is an array who first element is the key
    expect(first[1]).toBe('Joe');		// and second element is the value
  });

// values iterator, which just iterates over the values
  it("should return an iterator of values when values is called", function () {
    var map = new Map();
    map.set(1, 'a');
    var values = map.values();
    var first = values.next().value;  
    expect(first).toBe('a');
  });

// keys iterator
  it("should return an iterator of keys when keys is called", function () {
    var map = new Map();
    map.set(1, 'a');
    var keys = map.keys();
    var firstKey = keys.next().value;
    expect(firstKey).toBe(1);
  });

// construct map using iterator.
  it("should be able to be constructed with an iterator", function () {
    var map = new Map();					// create map with 3 items
    map.set('1');							
    map.set('2');
    map.set('3');
    var map2 = new Map(map.entries());		// pass entries iterator into a new map's constructor
    expect(map2.size).toBe(3);
  });

});


//// WeakMap and WeakSet
// Scenario: We use a set of 3 items (n1, n2, n3) to keep track of 3 div nodes in our body.
// When we delete one of the div nodes, normally that div node would be garbage collected.
// However, set still has an item pointing to it, so it would never be garbage collected unless we manually remove from the set.
// WeakMap and WeakSet solve this problem by having "weak" pointers that allow for garbage collection.
// However, they now have limited functionality (see below).
describe('WeakSets', function() {

// because garbage collection can occur at any moment, all of these are no longer available
	it('should not have properties & methods that relate to the entire set', function () {
    var set = new WeakSet();
    expect(set.size).toBe(undefined);
    expect(set.entries).toBe(undefined);
    expect(set.values).toBe(undefined);
    expect(set.forEach).toBe(undefined);
// you also can't iterate WeakSets using for of
  });

// has is still available
  it('should be able to find items with has', function() {
    var set = new WeakSet();
    var item = {name:'Joe'};
    set.add(item);
    expect(set.has(item)).toBe(true);
  });

// delete is still available
  it('should be able to remove items with delete', function() {
    var set = new WeakSet();
    var item = {name:'Joe'};
    set.add(item);
    set.delete(item);
    expect(set.has(item)).toBe(false);
  });

// clear is still available
  it('should remove all items when clear is called', function() {
    var set = new WeakSet();
    var item = {name:'Joe'};
    set.add(item);
    set.clear();
    expect(set.has(item)).toBe(false);
  });
});



describe('WeakMaps', function() {
	it('should not have properties & methods that relate to the entire set', function () {
    var map = new WeakMap();

    expect(map.size).toBe(undefined);
    expect(map.entries).toBe(undefined);
    expect(map.keys).toBe(undefined);
    expect(map.values).toBe(undefined);
    expect(map.forEach).toBe(undefined);
  });

  it('should be able to determine existince of items with has', function() {
    var map = new WeakMap();
    var key = {};
    map.set(key, 'a');
    expect(map.has(key)).toBe(true);
  });

  it('should be able to get the correct value', function() {
    var map = new WeakMap();
    var key = {};
    map.set(key, 'a');
    expect(map.get(key)).toBe('a');
  });

  it('should be able to remove items with delete', function() {
    var map = new WeakMap();
    var key = {};
    map.set(key, 'a');
    map.delete(key);
    expect(map.has(key)).toBe(false);
  });

  it('should remove all items when clear is called', function() {
    var map = new WeakMap();
    var key = {};
    map.set(key, 'a');
    var key2 = {};
    map.set(key2, 'b');
    map.clear();
    expect(map.has(key)).toBe(false);
    expect(map.has(key2)).toBe(false);
  });
})

