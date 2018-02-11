// console.log(some_variable) in developer tools console for debugging
// document.write("hi")
// alert("hi")

// var userName = prompt("Please enter name:");

// primary variable types: number, string, boolean, null, undefined
// Any value can be used as boolean.
// These are treated as false in conditional operators: null, undefined(no value has been assigned yet), 0, NaN, ''

// common HTML form properties and methods
// properties: name, value, form, type
// methods: focus(), blur()

<script type="text/javascript" src="myFile.js"></script>

document.form1.txtNum1.focus();
document.form1.txtNum1.select();

if (typeof(myVar) == "string")

// write directly into a web page by referencing a paragraph tag by Id.
document.getElementById('paragraphTagName').innerHTML = 'Hello World!';
// note that it replaces the whole html inside the element.  To append, use insertAdjacentHTML

isNaN("hi");  // true
isNaN("13");  // false

// Keep general functions in top frameset page.  
// They can be easily accessed through window.top even if the frameset layout changes later.

<< STRINGS >>
// can use == for string comparison
// both single & double quotes indicate strings


parseInt(myString);		// parses myString for integer parts
parseFloat(myString);

fullName = firstName.concat(' ', lastName);  // or use +

// String methods: indexOf() and lastIndexOf()
// takes 2 parameters: the string you want to find, and index position to start search (optional)
// returns -1 when no match found.
var foundAtPosition = 0;
var word = "hello"
var wordCount = 0;
while(foundAtPosition != -1) {
	foundAtPosition = myString.indexOf(word, foundAtPosition);
	if (foundAtPosition != -1) {
		wordCount++;
		foundAtPosition++;
	}
}

var name="Bob"
// use name.charAt(0) or name[0]

// trim()   returns string with beginning and ending whitespace  removed
// startsWith(s), endsWith(s), includes(s)  return booleans

// search(s)  returns index of first match, or -1
// Use search with regexp
// str.search(/HELLO/);
// str.search(/hello/i);   ignore case
// /hello/.test('hi and hello!');

// var numbers = '5 8 2 5 7 6' 	// see if string numbers contains 0, 1, or 2.
// numbers.search(/[012]/);		// returns 4, the index in the string where the 2 was found
// /[012]/.numbers(str);   		// returns true
// /[a-z]/  match any lower case char
// /\d/		match any digit
// /[^0-9a-z]/	find char not in range of numbers and lower case chars

// Quantifiers:
// ? okay to contain 0 or 1
// /^[a-z][0-9]$/	exact match.  must start with a letter, end with a number
// * match any number of specified characters
// substring() takes 2 params: start index, and the index one past the last desired character
// substr() takes 2 params: start index, and number of characters to extract from that starting index
// 2nd param optional.  When left out, will extract all chars starting from start index.
// use substr() and lastIndexOf() to extract filename from href:
var fileName = window.location.href;	// http://mywebsite/myfile.html
fileName = fileName.substr(fileName.lastIndexOf("/" + 1);

// storing data in the browser across multiple page requests using localStorage object.
Ex:
<div>
	You have visited this page <span id="report"> </span> times.
</div>
<script>
	var timesVisited = 0;
	if (localStorage.timesVisited) {  // check if defined
		timesVisited = parseInt(localStorage.timesVisited);
	}
	timesVisited += 1;
	localStorage.setItem('timesVisted', timesVisited);	// writes value to localStorage
	var report = document.getElementById('report');
	report.innerHTML = timesVisited;
	if (timesVisited > 10)
		report.style.backgroundColor = 'red';
</script>

// to store objects rather than primitives use JSON
// all values mst be a string, number, array, boolean, null, or another valid JSON obj
JSON.stringify(myObject)		// convert Javasciprt objects to JSON string
JSON.parse(jsonString)			// convert back

localStorage.myJSON = JSON.stringify(myObject);
// .. in a later session retrieve it back.  Often do this server-side when using JSON to communicate with a server or API.
myObject = JSON.parse(localStorage.myJSON);

Ex:
You have accessed this page <span id="report"></span> times.
<p>
Your last visit was <span id="lastVisitDate"></span>.

<script>
var timesVisited = 0;
var lastVisitDate = 'never';

if (localStorage.lastvisit) {	// if undefined, evaluates to falsy value
	var lastVisit = JSON.parse(localStorage.lastVisit);	// if defined, parse the JSON into object lastVisit
	timesVisited = lastVisit.numVisits;
	lastVisitDate = lastVisit.date;
}

document.getElementById('lastVisitDate').innerHTML = lastVisitDate;

timesVisited++;
document.getElementById('report').innerHTML = timesVisited;

var myLastVisit = {};
myLastVisit.date = new Date();
myLastVisit.numVisits = timesVisited;
localStorage.lastVisit = JSON.stringify(myLastVisit);
</script>


<< ARRAYS >>
// concat() 
newArray = array1.concat(array2);	// elements can be different types

// slice() takes 2 params: start index, and the index one past the last desired element 
// returns new array with those elements

// join() 
// var myString = myArray.join(",");  // returns string of comma separated array elements


// var myArray = new Array(6);  size 6
// arrays automatically grow in size as needed
// push() adds to end
// unshift() adds to front
// pop() removes last element and returns it
// shift() removes first element and returns it
// sort();
// reverse();
// indexOf() and lastIndexOf()

// every(), some(), and filter()
var numbers = new Array(1, 2, 3, 4, 5);
function isLessThan3(value, index, array) {
	var returnValue = false;
	if (value < 3) {
		returnValue = 3;
	}
	return returnValue;
}
alert(numbers.every(isLessThan3));			// false
alert(numbers.some(isLessThan3));			// true
var results = numbers.filter(isLessThan3);	// results is an array {1, 2}.

// use map() to apply function to each element of an array, returning another array with results
var myArray = new Array(1, 2, 3);
function iimesTwo(value, index, array) {
	return value*2;
}
var doubledArray = myArray.map(timesTwo);

// Objects contain key-value pairs.  There are no classes, and object fields can be added on the fly.
var person = {
	name: 'John Doe',
	personality: ['patient', 'loyal', 'happy'],		// array
	company: { name: 'edX', id:2984 }				// company object
}
person.age = 30;	// creates age number field
person['isMale']=true;		// creates isMale boolean field

// comparison operators & conversion
5 < '20'  // true.  string '20' will be converted to integer for comparison
5 < 'hi'  // false.  'hi' converts to NaN
'hello' < 'hi'	// true, compared lexicographically.
// objects are equal only if they refer to the same object.  compare using ==

Math.random()	// [0,1)

var value = 1.005;
value = value.toFixed(2);	// value is 1.01  rounds and fixes value to 2 decimal places

// functions
// primitve arguments are passed by value
// object arguemnts are passed by reference
/* javascript functions are objects --> functions can also have properties
									--> we can have variables refer to them.
									--> they can be properties of objects
										var person = {
											name: "Bob",
											greeting: function() {
												return 'Hello!";
											}
										}
										console.log(person.greeting());
*/
// functions are objects and can be used in objects.  functions can create objects, and we can use function prototypes
// to create blueprints for creating other objects.
// all objects have their own __proto__ prototype property/field which is an object with its own __proto__
// property.  Objects inherit the properties of its prototype.  The root prototype of all objects is 
// Object.prototype.  prototypes are like classes/constructors, but can inherit other prototypes to extend functionality.

function Person (name, age) {	// create prototype Person
	this.name = name;
	this.age = age;
	this.greeting = function() {
		return 'Hello! My name is ' + this.name;
	}
}

var johnDoe = new Person('John Doe', 32);	// create new object from the prototype
johnDoe.greeting();

// Student extends Person
function Student (name, age, school) {	// create another prototype and set its prototype to Person
	this.__proto__ = new Person(name, age);
	this.school = school;
}

var mary = new Student('Mary', 17, 'USF');
mary instanceof Person;		// true

// can add properties and methods to prototypes
Person.prototype.planet = 'Earth';
Person.prototype.introduction = function () {
	return 'Hi, I am ' + this.age + ' years old.';
}
 
<< Creating new objects >>
// constructor
function CustomerBooking (bookingId, customerName, film, showDate) {
	this.customerName = customerName;
	this.bookingId = bookingId;
	this.showDate = showDate;
	this.film = film;
}

CustomerBooking.prototype.getCustomerName = function() {
	return this.customerName;
}

CustomerBooking.prototype.setCustomerName = function(customerName) {
	this.customerName = customerName;
}

// Event Handling //

// handling events via HTML attributes
<script type="text/javascript">
	function myFunc_onclick() {
		// do stuff
	}
</script>
<a href="somePage.html" name="someName" onclick="return myFunc_onclick()">Click Me</a>

// handling events via Object properties
<script type="text/javascript">
	function myFunc_onclick() {
		// do stuff
	}
</script>
<a href="somePage.html" name="someName">Click Me</a>
<script type="text/javascript">
	window.document.links[0].onclick = myFunc_onclick;
</script> 

// handling events with event listeners (event-driven, asynchronous programming)
// note we never really called clickHandler.  We only established a relationship between
// clickHandler and the button's 'click' event which has a callback function on stanbdy..
// ex1
<button id="clickMe">Click Me!</button>
<script>
	function clickHandler() {	// callback function to be called by browser
		// do stuff;
	}
	var button = document.getElementById('clickMe');
	button.addEventListener('click', clickHandler);		// 'click' event
</script>

// ex2
<div id="mouseOverMe"> Put the mouse here! </div> <p>
 <div class="highlightText"> This is some text. </div> <p>
 <div> This is some other text. </div> <p>
 <div class="highlightText"> This text is important, too.</div>

 <script>
  function makeBold() {
    var divs = document.getElementsByClassName('highlightText');
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.color = 'red';
        divs[i].style.fontWeight = 'bold';
    }
  }

  function restore() {
    var divs = document.getElementsByClassName('highlightText');
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.color = 'black';
        divs[i].style.fontWeight = 'normal';
    }
  }

  var mouseOverMeDiv = document.getElementById('mouseOverMe');
  mouseOverMeDiv.addEventListener('mouseover', makeBold);
  mouseOverMeDiv.addEventListener('mouseout', restore);
 </script>

// ex3
<input id="nameInput"></input>
<p>
Hello, <span id="nameField">guest</span>.

<script>
function nameHandler(e) {	// 'keyup' event provides the key pressed?
  if (e.keyCode == 13) {
    var nameInput = document.getElementById('nameInput');
    var nameField = document.getElementById('nameField');
    nameField.innerHTML = nameInput.value;
    nameField.style.backgroundColor = 'cyan';
    nameField.style.textTransform = 'capitalize';
  }
}

document.addEventListener('keyup', nameHandler);
</script>

// JQUERY
// download from jquery.com and include .js file using script tag

// selecting elements
$("*") selects all elements on page
$(this) selects current element
$("div") selects all <div> elements
$(".title") selects all elements with class="title"
$("#name") selects all elements with id="name"

// manipulating DOM contents
$(selector).action(arguments...)
$("#name").html("Hello");
$("#name").append(" World!");	// append html
$("#name").addClass("title");	// add to class
$("#name").hide();
$("#name").show();



// click me example
<!--<script src="jquery.js"></script>-->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
</head>
<body>
<button id="clickMe">Click Me!</button>
<p>
You've clicked the button <span id="numClicks">0 times</span>.

<script>
var clicks = 0;

function clickHandler() {
  clicks++;
  var numClicksSpan = $('#numClicks');
  if (clicks == 1)
    numClicksSpan.html('once');
  else
    numClicksSpan.html(clicks + ' times');
}

$('#clickMe').click(clickHandler);


</script>

</body>
</html>

// growing list example
<!--<script src="jquery.js"></script>-->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
</head>

<body>
<input id="itemField"></input>
<p>

<ul>
<span id="list"></span>
</ul>

<script>
function keyPressHandler(e) {
  if (e.keyCode == 13) {
    $('#list').append('<li>'+ $('#itemField').val() + '</li>');
    $('#itemField').val('');
  }
}

$('#itemField').keyup(keyPressHandler);

</script>

</body>
</html>

// bold list item on click example
<!--<script src="jquery.js"></script>-->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
</head>

<body>

<ul>
<li>dog</li>
<li>cat</li>
<li>elephant</li>
<li>bear</li>
</ul>

<script>

$('li').click(function() {
  $(this).css('font-weight', 'bold');
});

</script>

</body>
</html>


