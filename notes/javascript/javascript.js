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

// Web Internationalization
<!doctype html>
<html lang="en">	// specify lang of your content
<head>
<meta charset="utf-8"/>
<head>

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
function timesTwo(value, index, array) {
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

// JQUERY library, for simplifying DOM access
// download from jquery.com and include .js file using script tag

// selecting elements
$("*") selects all elements on page
$(this) selects current element		// used in anonymous callbacks to access each individual element
$("div") selects all <div> elements
$(".title") selects all elements with class="title"
$("#name") selects all elements with id="name"
// advanced selectors
$(someNodes).find(selector)			// search someNodes' children for selector
$("div.book")			// selects the divs with class="book"
$("div, .book")			// selects all divs and all elements with class="book"
$("p:hidden")			// selects all <p> elements that have activated the hidden property
$("select[name='choose']")	// selects the select menu with tagname 'choose'
$("input:radio[name='flavors']")	// selects inputs of type radio with tagname 'flavors'

// manipulating DOM contents
$(selector).action(arguments...)
$("#name").html("Hello");
$("#name").append(" World!");	// append html
$("#name").addClass("title");	// add to class
$("#name").hide();
$("#name").show();
$("#name").val(somevalue);
$("#name").css('font-weight', 'bold');

// adding event listener to an element
$(selector).event(callback)

// click me example
<html>
<head>
<!--<script src="jquery.js"></script>-->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
</head>
<body>
<button id="clickMe">Click Me!</button>
<p>
You clicked the button <span id="numClicks">0 times</span>.

<script>
var clicks = 0;

function clickHandler() {
  clicks++;
  var numClicksSpan = $('#numClicks');	// instead of document.getElementById('numClicks')
  if (clicks == 1)
    numClicksSpan.html('once');		// instead of numClickSpan.innherHTML = 'once'
  else
    numClicksSpan.html(clicks + ' times');
}

// instead of:
// var button = document.getElementById('clickMe');
// button.addEventListener('click', clickHandler);
$('#clickMe').click(clickHandler);		// the function has the same name as the event

</script>
</body>
</html>

// growing list example
<html>
<head>
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
  if (e.keyCode == 13) {	// user pressed enter key
    $('#list').append('<li>'+ $('#itemField').val() + '</li>');
    $('#itemField').val('');
  }
}

// associate the keyPressHandler function with the keyup event for #itemField
$('#itemField').keyup(keyPressHandler);

</script>
</body>
</html>

// bold list item on click example
<html>
<head>
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

$('li').click(function() {		// selects all <li> elements and defines an anonymous callback function for each one
  $(this).css('font-weight', 'bold');
});

</script>
</body>
</html>

// mouseover list item bolds and makes red
// combine multiple callback functions to a single element using 'on' event

<html>
<head>
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
$('li').on({
  mouseenter: function() {
    $(this).css('color', 'red');
    $(this).css('font-size', '120%');
  },
  mouseleave: function() {
    $(this).css('color', 'black');
    $(this).css('font-size', '100%');
  },
  click: function() {
    $(this).css('background-color', 'yellow');
  }
});
</script>

</body>
</html>

// note: to only select list items associated with a particular class, associate
// the class name with the <ul> tag rather than for each <li> tag.
<ul class="highlight">
<li>dog</li>
<li>cat</li>
<li>bear</li>
</ul>

<ul>
<li>canary</li>
<li>eagle</li>
</ul>

<script>
$("ul.highlight").find("li").on({
	mouseenter: function() { ... },
	mouseleave: function() { ... },
	click:		function() { ... }
});

// Other user events in the browser
// mouse: click, dblclick, mousedown, mouseup, mouseover, mouseout
// keyboard: keydown, keypress, keyup
// form: focus, blur, change, reset, submit
// window/element: load, resize, scroll, unload

// form example
<html>
<head>
<!--<script src="jquery.js"></script>-->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
</head>
<body>

<form>
<select name="choose">
  <option value="male">Male</option>
  <option value="female">Female</option>
</select>
<p>
<input type="radio" name="species" value="dog">Dog</input>
<input type="radio" name="species" value="cat">Cat</input>
<input type="radio" name="species" value="bird">Bird</input>
<p>
<input type="checkbox" value="happy">Happy</input>
<input type="checkbox" value="cute">Cute</input>
<input type="checkbox" value="smart">Smart</input>
</form>

<p>
I'd like to buy a new <span id="featureSpan"></span> 
<span id="genderSpan"></span> <span id="speciesSpan">animal</span>.

<script>
    // handling select box
    $("select[name='choose']").change(function() {
       $('#genderSpan').html($(this).val());
    });

    // handling radio buttons
    $("input:radio[name='species']").change(function() {
       if ($(this).prop('checked')) {
          $('#speciesSpan').html($(this).val());
       }
    });

	var allChecked = [];
	$('input:checkbox').change(function() {
    	var value = $(this).val();
    	if ($(this).prop('checked')) {
        	allChecked.push(value);
    	} else {
			// it's unchecked so remove the value with splice
        	var index = allChecked.indexOf(value);
        	if (index != -1)
           		allChecked.splice(index, 1);
    	}
    	$('#featureSpan').html('');		// clear the html and rewrite upon each checkbox change
    	for (var i = 0; i < allChecked.length; i++) {
       		$('#featureSpan').append(allChecked[i]);
       		if (i < allChecked.length - 1)
          		$('#featureSpan').append(', ');
       		else
         		$('#featureSpan').append(' ');
    	}
  	});
</script>
</body>
</html>

// validating password example
<html>
<head>
<!--<script src="jquery.js"></script>-->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

<style>
.errorText {
color: red;
}
.errorBox {
border: 2px solid red;
}
.goodBox {
border: 2px solid green;
}
</style>
</head>

<body>
<input type="password" name="password"></input>
<br>
<span id="errorMessage" class="errorText" hidden>	<!-- hidden by default on page first load -->
     Please fix the following errors:</span>

<ul>
<li id="needsNumber" class="errorText" hidden>
    The password must contain a number</li>
<li id="atLeast10Chars" class="errorText" hidden>
    The passsword must be at least 10 characters long</li>
</ul>

<span id="successMessage" hidden>The password is okay!</span>
<p>

<button name="submit">Validate Password</button>

<script>
$("button[name='submit']").click(function() {
   var passwordField = $("input[name='password']");
   var password = passwordField.val();
   var isOkay = true;
   if (password.length < 10) {
     isOkay = false;
     $('#atLeast10Chars').show();
   }
   if (/\d/.test(password) == false) {
     isOkay = false;
     $('#needsNumber').show();
   }
   if (isOkay == false) {
     $('#successMessage').hide();
     $('#errorMessage').show();
     passwordField.removeClass("goodBox").addClass("errorBox");	// remove from goodBox class and add to errorBox
   }
   else {
     $('.errorText').hide();
     $('#successMessage').show();
     passwordField.removeClass("errorBox").addClass("goodBox");   
   }
   return false;	// so that submitting the form doesn't cause page reload
});

</script>
</body>
</html>

// REACT library, for building user interfaces
// Three main features: 
// 1) modularity: organize code into reusable components that can work together
// 2) lifecycle maintenance: modifying component based on state; event listeners; simplified conditional rendering
// 3) JSX: write HTML within JavaScript

// React Components:
// Components are the core of React and make up the nodes of the VirtualDOM.
// They are JavaScript objects based off the React.Component prototype
// Each component includes and maintains a state independently that changes with events.
// They define properties, event-based state variables, and callback functions
// A component's render() function is used to render HTML
// VirtualDOM manages each component's lifecycle and calls its render() function as needed.
// 4 main parts: properties, state variables, callback functions/event handlers, render function.
// Properties	-attributes and values that are set when the component is created
//				-should never be modified after initialization
//				-properties can be set in the render function much like html attributes name="Maria"
//				 they can be retrieved/accessed through this.props (this.props.name in this case)
// State		-attributes and values that represent the current state of the component,
// 				 based on what it does/represents
//				-should be initialized in the constructor
//				-can be modified during the component's lifecycle
//				-can be accessed using this.state
// Both properties and state can be used when rendering the component

// VirtualDOM
// The DOM is the structural representation of all the HTML elements.
// In React, the VirtualDOM selectively renders and re-renders subtrees of nodes based on state changes
// Efficient and provides layer of absraction to the developer

// In the normal DOM, if any node is changed, the entire DOM is re-rendered.
// In VirtualDOM, when a node is updated, two things occur:
//		- 'diff' to dtermine which nodes within DOM have changed
//		- 'reconciliation' to update which other (child) nodes are affected

// Three steps developing with React
// 1) Within the page's HTML, allocate a position on the page in which the desired React
//		component will be rendered, e.g. a div
// 2) Create a React component in JS
//		-establish an initial state
//		-define any events that could change the component's state over its lifecycle
//		-define the function to render the HTML
// 3) Drop the component into position allocated in Step 1)

// JSX
// -JavaScript XML Syntax Transform
// -allows user to write HTML-like tags within JavaScript
// -converts text (HTML) to React code

// example
<!DOCTYPE html>
<html>
	<head>
		<title>ReactJS Example</title>
		<script src="react.js"></script>
		<script src="react-dom.js"></script>
	</head>
	<body>
		<div id='container'></div>	<!-- div for inserting our React component -->
		<script type='text/jsx'>
			ReactDOM.render(
				<h1> Hello, React! </h1>,				<!-- specifies WHAT we want to display -->
				document.getElementById('container')	<!-- specifies WHERE we want it displayed -->
			);
		</script>
	</body>
</html>

// Two ways to create components (like creating new HTML tags)

// Classical way:
// React.createClass() allows us to define a component.  It takes an object containing
// the component's specifications as an argument.

var HelloComponent = React.createClass ({	// defines HelloComponent object
	render: function() {		// one of the properties of the object passed to createClass is render, which is a function 
		return (<h1>Hello, React!</h1>);	// that will be called when it's time to render this component.
	}										// here we're using JSX
}

// Once we create the custom component, we can render it the same way as HTML elements:
ReactDOM.render (
	<HelloComponent />,
	document.getElementById('container')
);

// More current approach using the ES6 version of JavaScript syntax:
// We define a class instead of a single object
class HelloComponent extends React.Component {
	render() {
		return (<h1>Hello, React!</h1>);
	}
}

// render is the same as before:
ReactDOM.render(
	<HelloComponent />,
	document.getElementById('container')
);

// TimesViewed
<html>
  <head>
    <title>Hello World</title>
    <script src="https://cdn.jsdelivr.net/react/0.14.0-rc1/react.js"> </script> 
    <script src="https://cdn.jsdelivr.net/react/0.14.0-rc1/react-dom.js"></script>
    <script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>
  </head>
  <body>
    <div id="container"></div>
    <script type="text/jsx">

      class TimesViewed extends React.Component {
         constructor(props) {
            super(props);
            var timesViewed = 0;
            if (localStorage.timesViewed) {
                timesViewed = localStorage.timesViewed;
            }
            timesViewed++;
            this.state = { numViews: timesViewed };
            localStorage.timesViewed = timesViewed;
         }

         render() {
           return <b>Hello {this.state.numViews}</b>;
         }
      }

      ReactDOM.render(
        <TimesViewed />,
        document.getElementById('container')
      );

    </script>
  </body>
</html>

// Events examples
// Button click
<html>
  <head>
    <title>Button Click</title>
    <script src="https://cdn.jsdelivr.net/react/0.14.0-rc1/react.js"> </script> 
    <script src="https://cdn.jsdelivr.net/react/0.14.0-rc1/react-dom.js"></script>
    <script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>
  </head>
  <body>

    <div id='container'></div>

    <script type="text/jsx">

class Counter extends React.Component { 

  constructor(props) {
    super(props);
    this.state = { count : 0 };
  }

  incrementCount () { 
    this.setState({ 
      count: this.state.count + 1 
    });
  }
      
      
  render () { // invoked when setState is called
    return ( 
      <div>Count: { this.state.count } 
      < button type = "button" onClick = { this.incrementCount.bind(this) } > Click Me! </button> </div>
    );
  } 
}; 

ReactDOM.render(
  <div>
    <Counter />
  </div>,
  document.getElementById('container'));
    </script>

  </body>
</html>

// Like/Unlike Button
<html>
  <head>
    <title>Like, Unlike</title>
    <script src="https://cdn.jsdelivr.net/react/0.14.0-rc1/react.js"> </script> 
    <script src="https://cdn.jsdelivr.net/react/0.14.0-rc1/react-dom.js"></script>
    <script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>
  </head>
  <body>

    <div id='container'></div>

    <script type="text/jsx">
class LikeButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = { liked : false };
  }
 

  toggle() {
    this.setState({liked: !this.state.liked});
  }

  render() {
    var name = this.props.name;
    var txt = this.state.liked ? 'Unlike' : 'Like';
    //var color = this.state.liked ? '#3b5998' : '#627AAC';
    var color = this.state.liked ? 'red' : 'black';
    var bold = this.state.liked ? 'bold' : 'normal';
    return (
      <p>
      <span style={{color: color, fontWeight: bold}}>
        {name} </span><span onClick={this.toggle.bind(this)}> {'\ud83d\udc4d' + txt}
      </span>
      </p>
    );
  }
};

ReactDOM.render(
  <div>
    <LikeButton name="Java" />
    <LikeButton name="JavaScript" />
   </div>,
document.getElementById('container'))
;
    </script>

  </body>
</html>

// MyText mouseover & click
<html>
  <head>
    <title>Mouse Over, Mouse Out</title>

    <script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>
    <script src="https://cdn.jsdelivr.net/react/0.14.0-rc1/react.js"> </script> 
    <script src="https://cdn.jsdelivr.net/react/0.14.0-rc1/react-dom.js"></script>

  </head>
  <body>

    <div id='container'></div>

    <script type="text/jsx">

class MyText extends React.Component { 

  constructor(props) {
    super(props);
    this.state = { bold : false, color : 'black' };
  }

    handleMouseOver() {
     this.setState( { bold : true } );
   }
   
    handleMouseOut() {
     this.setState( { bold: false } );
    }

    handleClick() { 
      this.setState( { color : (this.state.color == 'red' ? 'black' : 'red') } );
    }
      
      
    render () { 
      var color = this.state.color;
      var bold = this.state.bold ? 'bold' : 'normal' ;
      return ( 
      <span style={{color:color, fontWeight:bold}} onClick={this.handleClick.bind(this)} onMouseOver={this.handleMouseOver.bind(this)} onMouseOut={this.handleMouseOut.bind(this)}> {this.props.text} </span>
      );
  } 
}; 

ReactDOM.render(
  <div>
    <MyText text="Look at me!"/>
  </div>,
  document.getElementById('container')
);
    </script>

  </body>
</html>


// Component interactivity, by composing one component with another

// Filtered List
<html>
  <head>
    <title>Filtered List</title>
    <script src="https://cdn.jsdelivr.net/react/0.14.0-rc1/react.js"> </script> 
    <script src="https://cdn.jsdelivr.net/react/0.14.0-rc1/react-dom.js"></script>
    <script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>
  </head>

  <body>
    <div id='container'></div>
    <script type="text/jsx">

	class FilteredList extends React.Component { 
		constructor(props) {
 			super(props);
	  		var allItems = [ "anteater", "bear", "cat", "dog", "elephant", "fox" ];
	  		this.state = { initialItems: allItems, currentItems: allItems }; 
		}

		filterList(input){ 
	  		var updatedList = this.state.initialItems; 
	  		updatedList = updatedList.filter(function(item){ 
        		return item.search(input.target.value) !== -1; 
      		}); 
	  		this.setState({currentItems: updatedList}); 
		} 

		render(){ 
	  		return ( 
				<div className="filter-list"> 
  				<input type="text" placeholder="Filter" onChange={this.filterList.bind(this)}/> 
				<List items={this.state.currentItems}/> 
				</div> 
	  		); 
		} 
	}; 

	class List extends React.Component { 
		render(){ 
			return ( 
				<ul> { this.props.items.map(function(item) { 
					return <li key={item}>{item}</li> }) }
				</ul> 
			) 
		} 
	}; 

	ReactDOM.render(<FilteredList/>, document.getElementById('container'));
    </script>

  </body>
</html>

// TodoApp

<html>
  <head>
    <title>To-Do List</title>
    <script src="https://cdn.jsdelivr.net/react/0.14.0-rc1/react.js"> </script> 
    <script src="https://cdn.jsdelivr.net/react/0.14.0-rc1/react-dom.js"></script>
    <script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>
  </head>
  <body>

    <div id='container'></div>

    <script type="text/jsx">
class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {items: [], text: '', id: 0};
  }

  handleChange(e) {
    this.setState({text: e.target.value});	// set text to whatever was typed in the box
  }

  handleSubmit(e) {
    e.preventDefault();	// to not reload the page by default submit
    var newItem = {
      text: this.state.text,
      id: this.state.id
    };
    this.setState({
      items: this.state.items.concat(newItem),
      text: '',
      id: this.state.id + 1
    });
  }

  render() {
    return (
      <div>
        <h3>TO-DO LIST</h3>
        <TodoList items={this.state.items} />
		// bind the functions to the onSubmit and onChange events
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input onChange={this.handleChange.bind(this)} value={this.state.text} />
          <button>Add</button>
        </form>
      </div>
    );
  }
}

class TodoList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.items.map(function(item) {
	  	  return <TodoItem id={item.id} text={item.text}/>
        })}
      </ul>
    );
  }
}

class TodoItem extends React.Component {
 constructor(props) {
   super(props);
   this.state = { amDone : true };
 }


 handleClick() {
   var doneState = !this.state.amDone; 
   this.setState({ amDone: !this.state.amDone});
 }

 render() {
  var line =  this.state.amDone ? 'none' : 'line-through';
  return (
    <li key={this.props.id} onClick={this.handleClick.bind(this)} style={{textDecoration:line}}>{this.props.text}</li>
  );
 }
}

ReactDOM.render(<TodoApp/>, document.getElementById('container'));

    </script>

  </body>
</html>

// Thinking in terms of components: to modularize portions of the webpage for reuse, and for efficiency so that
// only certain components that need to be re-rendered are actually re-rendered.
// Here, we have one component encompassing the entire app, and composed within it are 3
// other components: 2 for the input boxes and 1 for the ouput of the results.

// Multiplier example
<html>
  <head>
    <title>Multiplier</title>
    <script src="https://cdn.jsdelivr.net/react/0.14.0-rc1/react.js"> </script> 
    <script src="https://cdn.jsdelivr.net/react/0.14.0-rc1/react-dom.js"></script>
    <script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>
  </head>
  <body>

    Enter two numbers to multiply:
    <div id='container'></div>

    <script type="text/jsx">

class Multiplier extends React.Component {

  constructor(props) {
    super(props);
    this.state = { input1: 0, input2: 0, product: 0 };
    this.multiply = this.multiply.bind(this);  // create multiply object for this component and bind to multiply()
  }

  multiply(id, val) { 
    if (id == 1) {	// since setState is called in Multiplier, its render() is automatically called.
      this.setState( { input1: val, product: val * this.state.input2 } );
    }
    else if (id == 2) {
      this.setState( { input2: val, product: this.state.input1 * val } );
    }
  }

  render() {
    return (
      <div>	
	  // pass the function multiply() as parameter to NumberInputField component
      <NumberInputField id="1" action={this.multiply}/>
      <NumberInputField id="2" action={this.multiply}/>
      <OutputField product={this.state.product}/>
      </div>
    );
  }
}

class NumberInputField extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
 
  handleChange(e) {
    this.props.action(this.props.id, e.target.value);	// onChange, send this input field's id and value to multiply()
  }
  
  render() {
    return(
      <input onChange={this.handleChange}></input>
    );
  }

}  

class OutputField extends React.Component {
  render() {
     return(
      <div>The product is {this.props.product}.</div>
     );
  }
}  

ReactDOM.render(<Multiplier/>, document.getElementById('container'));

    </script>

  </body>
</html>

// ArticlesGrid example
<html>
  <head>
    <title>Hello World</title>
    <script src="https://unpkg.com/react@latest/dist/react.js"></script>
    <script src="https://unpkg.com/react-dom@latest/dist/react-dom.js"></script>
    <script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  </head>
  <body>
    <div id='container'></div>
    <script type="text/jsx">

class ArticlesGrid extends React.Component {
	constructor (props) {
 		super(props);
 		this.state = {
      		articles: []
   		};
 	}

	componentDidMount () {
 		var API_KEY = ''; // replace this with the API key you obtained from https://developer.nytimes.com/
 		var query = location.search ? (location.search.split('?q=')[1]).split('&')[0] : 'all';
 		var url= 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + query + '&api-key=' + API_KEY;
  		$.getJSON(url, function(data, status) {
        	return this.setState({articles: this.parse(data)});
        }.bind(this));
	}

	parse(results) {
  		if(!results || !results.response) return [];
  		var articles = results.response.docs;
  		var parsedArticles = [];
  		for(var i = 0; i < articles.length; i++) {
    		var article = articles[i];
    		if (article.multimedia.find(this.checkXLarge)) {
				parsedArticles.push({
        			id: article._id,
        			title:    article.headline.main || 'Untitled',
        			imageURL: article.multimedia.find(this.checkXLarge).url || '#',
        			webURL:   article.web_url || '#'
      			});
    		}
  		}
  		return parsedArticles;
	}

	checkXLarge(image) {
		return image.subtype === 'xlarge';
	}

	render () {
		return this.state.articles && (
    		<div className='articles'>
      			{ this.state.articles.map( function (article) {
        			return <Article article={article} key={article._id} />;
      			})}
    		</div>
  		);
	}

}

// display the article
// this is shorthand for a component that only has a render function
var Article = function({article}) {
	var imgURL = 'https://static01.nyt.com/' + article.imageURL;
	return (
    	<div className='article'>
			<a className='article-link' href={article.webURL}>
				<img className='article-image' 
             		title={article.title} 
             		src={imgURL} 
        		/>
      		</a>
    	</div>
  	); 
}

ReactDOM.render(<ArticlesGrid/>, document.getElementById('container'));

    </script>

  </body>
</html>

// Using Node.js Package Manager (npm) to help manage components into different files for modularity
// instead of including all JavaScript in a <script> tag.  Node.js also allows us to incorporate
// package dependencies with 'require' and 'import'
// var React = require('react'); and import MyComponent from './MyComponent.js';

// https://nodejs.org/en/download/
// npm comes with node installation, make sure updated to most recent version using: npm install npm -g

// install create-react-app
// npm install -g create-react-app

// create new React app
// create-react-app my-app-dir
// src for JavaScript & CSS files, public for HTML files, images, other static web content.

// cd my-app/
// npm start
// starts web server listening for HTTP requests on port 3000.  visit http://localhost:3000/

// Testing with mocha, chai, and enzyme
// To include enzyme and chai as dependencies:
// npm install --save-dev enzyme react-test-renderer chai
// Place test code in 'tests' directory in the form of *.test.js
// in App.txt.js, include libraries necessary for testing:
import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import App from '../App';

describe("Test suite for App component", function() {	// using mocha testing framework to define a test suite 
  it("only one element in App class", function() {
    // creates React component.  Shallow does a shallow creation which creates the component but not the 
	// child subcomponents such as Dogs or AddDog.  Here we are only creating an instance of the App component.
    const wrapper = shallow(<App />);		
    expect(wrapper.find(".App")).length(1);
  });

  it('Dog List contains two dogs', function() {
    const wrapper = mount(<App/>);	// mount does a deep creation rather than shallow
    // we expect to find a Dogs component inside the App component.
    expect(wrapper.find('Dogs')
                  .find('DogItem')).length(2);	// within the Dogs component we expect to find DogItem
												// and by default we have 2 dogs in the array
  });

  it("successfully adds dog to list when form submitted", function() {
    const wrapper = mount(<App/>);
    const adddog = wrapper.find('AddDog');

    // simulate filling out and submitting form
    adddog.find('#dogName').get(0).value = 'Lola';	// enter Lola into the dogName field
    adddog.find('#imageURL').get(0).value = 'https://static.pexels.com/photos/54386/pexels-photo-54386.jpeg';
    adddog.find('#dogBreed').get(0).value = 'Beagle';

    const form = adddog.find('form');
    form.simulate('submit');
    expect(wrapper.find('Dogs')
                  .find('DogItem')).length(3);
    expect(wrapper.state().dogs[2].name == 'Lola');
  });

  it('removes dog from list when deleted', function() {
    const wrapper = mount(<App/>);
    const deleteLink = wrapper.find('a').first();	// get first anchor tag's link
    deleteLink.simulate('click');
    expect(wrapper.find('Dogs')
                  .find('DogItem')).length(1);		
    // note that even though we had 3 dogs in the previous test, each test starts with the original state
    // which has 2 dogs in the default array.
  });
});

// run tests
// npm run test

// ES6 - ECMAScript 6 - newest JavaScript Specification released in 2015
// Some key features:

// Arrow Notation
// ES5 syntax:
var arr = [1,2,3,4,5];
var square = function (n) {
  return n*n;
}
arr.forEach( function(v, i) {
  arr[i] = square(v);
});

// ES6 syntax:
let arr = [1,2,3,4,5];
let square = n => {
  return n*n;
}
arr.forEach( (v, i) => {
  arr[i] = square(v);
});

// Assign default values to function parameters using '='
function pow (base, power = 2) {
  return Math.pow(base, power);
};
console.log(pow(3));	// 9
console.log(pow(3,3));	// 27

// Define template for rendering strings using backticks
var person = { name: "Lydia" };
var msg = `Dear ${person.name}, 	// newline will be detected here
           How are you?`

// Classes: instead of building prototypes, classes can be directly defined in more traditional OOP style

// ES5
var Rectangle = function (height, width) {
  this.height = height;
  this.width = width;
}

Rectangle.prototype.area = function () }
  return this.height * this.width;
}

// ES6
class Rectangle {
  constructor (height, width) {
    this.height = height;
    this.width = width;
  }
  area () {
    return this.height * this.width;
  }
}

// Added Data Structures

// Sets
let s = new Set();
s.add("alligator");
s.add("fox");			// s = {"alligator", "fox"}
s.has("alligator");		// true
s.delete("alligator");
for (let v of s.values())
  console.log(v);

// Map
let m = new Map();
m.set("dog", "sparky");	// m = {"dog" => "sparky"}
m.get("dog");			// "sparky"
m.get("cat");			// undefined
for (let [key, val] of m.entries())
  console.log(key + ": " + val);

// Basic visual elements in HTML using Scalable Vector Graphics (SVG)
<html>
  <head>
    <style>
      circle:hover {
        fill:green;
      }
    </style>
  </head>

  <body>
    <svg width="400" height="400">

      <circle cx="50" cy="50" r="40" 
        stroke="blue" stroke-width="4" fill="yellow" />

      <rect x="50" y="20" rx="20" ry="20"
        width="150" height="150"
        style="fill:red;stroke:black;stroke-width:5;opacity:0.5"
        onclick="style.fill='cyan'" />

    </svg>
  </body>
</html>

// D3: Data-Driven Documents
// D3.js is a JavaScript library for manipulating HTML docs based on data
// We can bind the data to DOM elements (HTML, SVG) and programmatically apply data-driven transformations.
// Generate HTML tables, SVG charts, graphs, etc.
<html>
<head>
  <script src="http://d3js.org/d3.v4.min.js"></script>
</head>

<body>
  <svg width="400" height="400">
    <circle />		<!-- will be determined by code -->
  </svg>

  <script>
var circle = {
  x: 50,
  y: 50,
  r: 40,
  stroke: 'blue',
  width: 4
};

var svg = d3.select("svg");
svg.select("circle")
  .attr("cx", circle.x)
  .attr("cy", circle.y)
  .attr("r", circle.r)
  .style("stroke", circle.stroke)
  .style("stroke-width", circle.width);
  .style("fill", () => {
    if (circle.r <50 )
      return 'yellow';
    else
      return 'cyan';
  })
  </script>
</body>
</html>

// Bar Chart example
<html>
<head>
<style>
rect {
  fill: darkred;
}

.chart text {
  fill: white;
  font: 10px sans-serif;
  text-anchor: end;
}

rect:hover {
  fill: darkblue;
}

</style>

<script src="http://d3js.org/d3.v4.min.js"></script>

</head>

<body>
<svg class="chart" height="200">
</svg>
<p>

<input id="inputField"></input>
<button onclick="insert();">Insert</button>

<script>
function insert() {
     var value = document.getElementById('inputField').value;
     //alert(value);
     numbers.push(value);
     drawChart();
     document.getElementById('inputField').value = '';
}

function drawChart() {
  var svg = d3.select("svg");

  // the svg tag starts without any groups.  We can think of this as creating an empty container for adding groups.
  var selection = svg.selectAll("g")	
     .data(numbers)		// use 'data' function to bind the array of numbers to the selection
    .enter().append("g")	// 'enter' joins the data to the html element and create a d3 object for each data.
							// for each object, append the html g element and apply a transformation.
    .attr("transform", (d,i) => { return "translate(" + 40*i + "," + (200-d) + ")"; });

  selection.append("rect")
    .attr("width", 39)
    .attr("height", (d,i) => { return d; });

   selection.append("text")
    .attr("x", (d,i) => { return 25; })
    .attr("y", (d,i) => { return 10; })
    .text(function(d) { return d/10; });
}

var numbers = [40, 130, 75, 170];
  
drawChart();

</script>

// Plot Weighted Circles Chart example
// Data used in D3 can be objects, not just numbers
<html>
<head>
<style>
rect {
  fill: darkred;
}

rect:hover {
  fill: darkblue;
}

</style>

<script src="http://d3js.org/d3.v4.min.js"></script>

</head>

<body>
<svg class="chart" height="900" width="900">
</svg>

<script>


  var values = [ {price: 700, sqft: 3000, br: 3, pets: [ 'cats', 'dogs' ] },
                 {price: 445, sqft: 1700, br: 2, pets: [] },
                 {price: 421, sqft: 1455, br: 2, pets: [ 'cats', 'dogs' ] },
                 {price: 411, sqft: 1314, br: 2, pets: [ 'dogs' ] },
                 {price: 275, sqft: 1200, br: 1, pets: [ 'cats' ]},
                 {price: 500, sqft: 650, br: 1, pets: [] },
  
               ];


  var svg = d3.select("svg");
  
  var selection = svg.selectAll("g")
    .data(values)
    .enter()
    .append("g")
    .attr("transform", "translate(10,10)");

  selection.append("circle")
    .attr("cx", (d,i) => { return d.price/2; })
    .attr("cy", (d,i) => { return (4000 -  d.sqft)/(4000/400) ; })
    .attr("r", (d,i) => { return d.br * 10 ; })
    .style("fill", (d,i) => {return color(d.pets);})
    .style("opacity", "0.5")
    .append("svg:title").text( (d,i) => { return print(d); });


    var width = 400;
    var height = 400;
    
    var xScale = d3.scaleLinear()
    .domain([0, width*2])
    .range([0, width]);
    var xAxis = d3.axisBottom(xScale);
    svg.append("g").attr("transform", "translate(10,410)").call(xAxis);

    var yScale = d3.scaleLinear()
    .range([height,0])
    .domain([0, 4000]); 

    var yAxis = d3.axisRight(yScale);
    svg.append("g").attr("transform", "translate(10, 10)").call(yAxis);


  function print(home) {
     return `$${home.price}k, ${home.sqft}sqft, ${home.br} BRs`;
  }

  function color(pets) {
    var dogs = pets.indexOf('dogs') != -1;
    var cats = pets.indexOf('cats') != -1;

    if (dogs) return cats ? 'purple' : 'blue' ;
    return cats ? 'red' : 'gray';
  }

</script>
</body>
</html>

// Node.js Server-side
// Node is asynchronous and allows us to treat HTTP requests as events that invoke
// callback functions/handlers that construct the HTTP response

// In new project folder, run: npm init and specify index.js as entry point.

// Express 	- define separate modules that have different responsibilities
// 			- handle requests via different routes and routers
//			- split each step in the processing of a request into Middleware functions
// From within the folder with Node.js app, run: npm install express --save
// This will download the Express package and configure package.json file as a dependency.

// Create index.js
var express = require('express');
var app = express();

app.use('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

// From the project folder, run: node index.js

// Request Object Properties/Functions
app.use('/', (req, res) => {
  var method = req.method;					// the HTTP request verb/action
  var url = req.url;						// the resource that was requested
  var agent = req.headers['user-agent'];	// object containing all headers
  agent = req.get('User-Agent');			// the preferred way to request a header field (case insensitive)

  res.send('Hello World!');
});

// Response Object Properties/Functions
app.use('/', (req, res) => {
  res.status(200);							// set status code
  res.type('html');							// set content type
  res.write('Hello World!');				// add content to the body of the response
  res.write('<p>');
  res.write('<b>Have a nice day</b>');
  res.end();								// send the response and close the connection
});

// Routers
var express = require('express');
var app = express();

var nameFinder= (req, res, next) => {
    var name = req.query.name;
    if (name)
	req.username = name.toUpperCase();
    else
	req.username = 'Guest';
    next();
};

var greeter = (req, res, next) => {
    res.status(200).type('html');
    res.write('Hello, ' + req.username);
    next();
};

var adminName = (req, res, next) => {
    req.username = 'Admin';
    next();
};

var logger = (req, res, next) => {
    var url = req.url;
    var time = new Date();
    console.log('Served request for ' + url + ' at ' + time);
    next();
};

var header = (req, res, next) => {
    // header
    next();
};

var footer = (req, res, next) => {
    // footer
    next();
};

var commonRoute = express.Router();
commonRoute.use(header, greeter, footer);

// note: if we just have app.use(logger); then logger will be invoked on any HTTP request
app.use('/welcome', logger, nameFinder, commonRoute,
	(req, res) => { res.end(); } );


app.use('/admin', logger, adminName, commonRoute, 
	(req, res) => { res.end(); } );

app.use('/', logger, (req, res) => { res.send('hi'); } );

app.use( /*default*/ (req, res) => {
	res.status(404).send('Not found!');
	// can also send back a file
	// res.status(404).sendFile(__dirname + '/404.html');
});


app.listen(3000,  () => {
	console.log('Listening on port 3000');
    });

// Getting Data from the User

// Case 1A: Query Parameters included in the URL
// http://localhost:3000/?name=Lydia&location=United+States
app.use('/', (req, res) => {
  var query = req.query;
  console.log(query);	// ?name=Lydia&location=United+States

  var name = query.name;	// 'Lydia'
  var location = query.location;	// 'United States'

  var length = Object.keys(query).length;	// 2

  res.send('Hello World!');
});

// Case 1B: Query Parameters included in the URL
// http://localhost:3000/name/Lydia/location/United States
app.use('/name/:userName/location/:userLocation', (req, res) => {
  var params = req.params;
  console.log(params);

  var name = params.userName;
  var location = params.userLocation;

  var length = Object.keys(params).length;

  res.send('Hello World!');
});

// Case 2: POST data included in the body of the HTTP request
// To read from the body, use middlewear body-parser. (npm install body-parser)
// form.html
<html>
<body>

<form action="/handleForm" method="post">

Name: <input name="username">
<p>
I Like:<br>
<input type=checkbox name="animal" value="dogs">Dogs <br>
<input type=checkbox name="animal" value="cats">Cats <br>
<input type=checkbox name="animal" value="birds">Birds <br>
<p>
<input type="submit" value="Submit Form!">

</form>

</body>
</html>
// index.js
var express = require('express');
var app = express();

app.use('/public', express.static('files'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/handleForm', (req, res) => {
  var name = req.body.username;
  var animals = req.body.animal;	// this is an array
  . . .
  res.send('Thank you!');
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

// Generating HTML server-side and sending back as reponse
// Use EJS to separate format(HTML) from functionality(JavaScript)
// EJS - EmbeddedJS is a view engine that uses data and embedded JavaScript to produce HTML
// EJS allows HTML to be rendered dynamically on the server and then sent back as content to the browser.
// (npm install ejs)
// Place ejs files in views/ folder of project.

// To use EJS in an Express app:
// 1. Set EJS as the default rendering method using app.set('view engine', 'ejs');
// 2. Generate and send the HTML from an .ejs file using the Response's render function

// form.html
<html>

<form action="/handleForm" method="post">

Name: <input name="username">
<p>
I like:<br>
<input type=checkbox name="animal" value="dogs">Dogs<br>
<input type=checkbox name="animal" value="cats">Cats<br>
<input type=checkbox name="animal" value="birds">Birds<br>
<p>
<input type="submit" value="Submit form!">

</form>
</html>

// index.js
var express = require('express');
var app = express();

app.set('view engine', 'ejs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/handleForm', (req, res) => {
	var name = req.body.username;
	// The req.body.animal property will be a single value if the user selected only one animal, but will
	// be an array if more were selected.
	// Use this JS trick to force animals to stat as an empty array, and concat any number of items to it.
	var animals = [].concat(req.body.animal);	
	console.log(animals);
	res.render('showAnimals', { name: name, animals: animals });
});

app.use('/public', express.static('public'));

app.listen(3000,  () => {
	console.log('Listening on port 3000');
});

// showAnimals.ejs
Hello, <%= name %>, nice to meet you.
<p>Here are the animals you like:
<ul>
<% animals.forEach( (animal) => { %>
  <li> <%= animal %> </li>
<% }); %>
</ul>
<a href='/public/form.html'>Back to form</a>


// MongoDB
// ./mongodb-osx-x86_64-3.4.6/bin/mongod --dbpath data/db/
// npm install mongoose --save

// General program flow:
// User interacts with page rendered by HTML (submitting forms)
// The HTML either as .html or .ejs will have an action or href to another page.
// This is handled by the middleware/routing in index.js, which renders to another .ejs
// which may have other actions and hrefs.

// personform.html
<html>
<body>
<form action='/create' method='post'>

Name: <input name='name'>
<p>
Age: <input name='age'>
<p>
<input type=submit value='Submit form!'>

</form>
</body>
</html>

///<<<  index.js >>>///
var express = require('express');
var app = express();

app.set('view engine', 'ejs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var Person = require('./Person.js');	// Person object associated with Mongo db instance

app.use('/create', (req, res) => {	// triggered by form submit
	var newPerson = new Person ({	// as defined in Person.js
		name: req.body.name,		// as defined in personform.html
		age: req.body.age,
	});

	// write to the DB
	newPerson.save( (err) => {		// any potential errors during the save will be stored in err
		if (err) {					// after the save attempt, this callback will be invoked with the err parameter
		    res.type('html').status(500);
		    res.send('Error: ' + err);
		} else {
		    res.render('created', {person : newPerson});
		}
	}); 
});

app.use('/all', (req, res) => {		// remember, the callback function is not called until after the db search.
    Person.find( {}, (err, allPeople) => {	// we pass err and the array of all the person objects it found in the db.
		if (err) {
		    res.type('html').status(500);
		    res.send('Error: ' + err);
		} else {
			if (allPeople.length == 0) {
				res.type('html').status(200);
				res.send('There are no people');
			} else {
				res.render('showAll', { persons: allPeople });
			}
		}
	});
});

app.use('/person', (req, res) => {		// used to create person links within showAll.ejs
	var searchName = req.query.name;
	Person.findOne( {name: searchName}, (err, person) => {	// include search query for docs with name: searchName
		if (err) {
		    res.type('html').status(500);
		    res.send('Error: ' + err);
		} else if (!person) {
		    res.type('html').status(200);
		    res.send('No person named ' + searchName);
		} else {
		    res.render('personInfo', {person: person});
		}
	});
	
});

app.use('/update', (req, res) => {
    var updateName = req.body.username;  // username was passed as parameter from personInfo.ejs

	// locate the document matching the username
	// if found, save the person object with the new update age
	Person.findOne( {name: updateName}, (err, person) => {	
		if (err) {											
		    res.type('html').status(500);
		    res.send('Error: ' + err);
		}
		else if (!person) {
		    res.type('html').status(200);
		    res.send('No person named ' + updateName);
		} else {
			person.age = req.body.age;
			person.save( (err) => {
				if (err) {
					res.type('html').status(500);
					res.send('Error: ' + err);
				} else {
		    		res.render('updated', { person : person });
				}
			});
		}
	});
});

app.use('/public', express.static('public'));

app.use('/', (req, res) => { res.redirect('/public/personform.html'); } );

app.listen(3000,  () => {
	console.log('Listening on port 3000');
});

// Person.js for prepping the mongo schema 
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myDatabase');

var Schema = mongoose.Schema;
var personSchema = new Schema({				// define Person to have 2 properties: name and age.
	name: {type: String, required: true, unique: true},		// name must be required and unique
	age: Number
});

// export this schema as a Person class so that other files can create persons with this schema.
module.exports = mongoose.model('Person', personSchema);

personSchema.methods.standardizeName = function() {
    this.name = this.name.toLowerCase();
    return this.name;
}

// created.ejs
Successfully created new person:
<p>
<b>Name:</b> <%= person.name %>
<br>
<b>Age:</b> <%= person.age %>
<br><a href='/public/personform.html'>Create New Person</a>
<br><a href='/all'>Show All</a>

// showAll.ejs
Here are all the people:
<ul>
<% persons.forEach( (person) => { %>

<li><a href="/person?name=<%= person.name %>"> <%= person.name %>: <%= person.age %></li>

<% }); %>
</ul>

<br><a href='/public/personform.html'>Create New Person</a>

// personInfo.ejs
<form action='/update' method='post'>
Name: <%= person.name %><br>

<!-- send person.name hidden as part of the form submission so that '/update' will have access to it.  -->
<input name='username' value='<%= person.name %>' hidden>	

Age: <input name='age' value='<%= person.age %>'>
<input type='submit' value='Update'>
</form>

<% include ../partials/createNewPersonLink %>
<% include ../partials/showAllPeopleLink %>

// updated.ejs
Updated <%= person.name %>'s age to <%= person.age %>

<br><a href='/public/personform.html'>Create New Person</a>
<br><a href='/all'>Show All</a>

/////////////////////////////////////////////////////////////
// More advanced MongoDB queries for more complicated objects

// bookform.html
<form action='/createbook' method='post'>
Title: <input name='title'>
<p>
Year: <input name='year'>
<p>
Author #1: <br>
<!-- Notation for associating the input tag name attribute with the name property of the first author object in the authors array. -->
Name: <input name='authors[0][name]'> <br>		
Affiliation: <input name='authors[0][affiliation]'>
<p>
Author #2: <br>
<!-- Notation for associating the input tag name attribute with the name property of the second author object in the authors array. -->
Name: <input name='authors[1][name]'> <br>
Affiliation: <input name='authors[1][affiliation]'>
<p>
<input type='submit' value='Submit'>
</form>

// booksearch.html
Indicate the search criteria:

<form action='/search' method='post'>
Title: <input name='title'>
<p>
Author name: <input name='name'>
<p>
Year: <input name='year'>
<p>
<input type='radio' name='which' value='all' checked>All<br>
<input type='radio' name='which' value='any'>Any<br>
<p>
<input type='submit' value='Search'>
</form>

// books.ejs
Here are the results of your search:
<ul>
<% books.forEach( (book) => { %>

<li>
<i><%= book.title %></i>.

<% book.authors.forEach( (author) => { if (author.name) { %>

<%= author.name %>, 

<% } }); %>

<%= book.year %>.

</li>

<%  }); %>

</ul>

// Book.js for Mongo schema
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myDatabase');

var Schema = mongoose.Schema;

var authorSchema = new Schema({
	name: String,
	affiliation: String
});

var bookSchema = new Schema({
	title: {type: String, required: true, unique: true},
	year: Number,
	authors: [authorSchema]
});
module.exports = mongoose.model('Book', bookSchema);

// index.js
var express = require('express');
var app = express();
app.set('view engine', 'ejs');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var Book = require('./Book.js');

app.use('/createbook', (req, res) => {
	// we can pass req.body to Book because we set up the req.body to have the proper schema.
	// Note that if we did a console.log(req.body); we would see:
	// { title: 'Some Book Title',
	//   year: 'some year',
	//   authors:
	//    [ { name: 'author1', affiliation: 'aff1' },
	//      { name: 'author2', affiliation: 'aff2' } ] }
	// When creating a new object, we must pass to it an object with the properties and values 
	// we want to use to initialize the object we're creating.
	var newBook = new Book(req.body);
	newBook.save( (err) => { 
		if (err) {
		    res.type('html').status(500);
		    res.send('Error: ' + err);
		} else {
		    res.send('Created new book');
			// or res.render('created', { book: newBook });  if we set up created.ejs
		}
	}); 
});

app.use('/search', (req, res) => {
	if (req.body.which == 'all') {
	    searchAll(req, res);
	} else if (req.body.which == 'any') {
	    searchAny(req, res);
	} else {
	    searchAll(req, res);
	}
});

// gets results that match ANY of the supplied search criteria.
function searchAny(req, res) {
	// The only difference here is in how we construct the query.
	// instead of having 1 search query object, we will set up an array of search query objects
    var terms = [];

    if (req.body.title) {
	// this results in a search for an exact match of title rather than matching as a substring.
	// terms.push( { title: req.body.title });		
	// instead, set title to an object whose key is $regex:
	   terms.push( { title: { $regex: req.body.title } });
    }
    if (req.body.name) {
	terms.push( { 'authors.name' : req.body.name });
    }
    if (req.body.year) {
	terms.push( { year: req.body.year });
    }
    var query = { $or : terms };	// MongoDB syntax for querying using OR format
	// console.log(query);
	// when not using $regex: { '$or': [ {title: 'Programming'}, {year: '2017'} ] }  
	// when using $regex: { '$or': [ {title: [Object]}, {year: '2017'} ] }

	// this is the same as before
	Book.find( query, (err, books) => {
		if (err) {
		    res.type('html').status(500);
		    res.send('Error: ' + err);
		} else {
		    res.render('books', { books: books });
		}
	}).sort( { 'title': 'asc' } );	// sorts titles in ascending order.  sort() is called before the callback calls render()
}

// gets results that match ALL the search supplied criteria
function searchAll(req, res) {
	var query = {};		// empty object used to conduct query in db after filling in properties
	if (req.body.title) {	// if the user didn't enter a title, this would be a falsy value
	    query.title = req.body.title;
	}
	if (req.body.name) {
	    query['authors.name'] = req.body.name;	// use this notation to set the name property of 
	}											// the author object in the authors array
	if (req.body.year) {
	    query.year = req.body.year;
	}

	// console.log(query);
	// { 'authors.name': 'Chris Murphy', year: '2017' }
	// the query object now has a property called authors.name set to 'Chris Murphy' 

	// find() with no arguments will retrieve all objects
	// here we send the query as parameter and the search results will be in array books which we pass to the callback
	Book.find( query, (err, books) => { if (err) {
		    res.type('html').status(500);
		    res.send('Error: ' + err);
		} else {
		    res.render('books', { books: books });
		}
	});
}

app.use('/public', express.static('public'));

app.listen(3000,  () => {
	console.log('Listening on port 3000');
});

//////////////////////////////
// Previously, the interaction between Client, Server, and Database looked like this:
					   HTTP request				query DB
			(        ) -----------> (		 ) ----------> (		  )
          	( Client )				( Server )			   ( Database )
			(		 ) <----------- (        ) <---------- (		  )
					   HTTP response			 results
				(Re-render entire HTML page)

// Intead of sending back and re-rendering the entire page, how about sending back only the data
// that resulted from the HTTP request, and have some client-side code take that data and render 
// the HTML accordingly.

// Use an API (Application Programming Interface)
// - a URL or a set of URLs that returns pure data to requests
// - APIs can be used to incorporate data and functionality into your webapp from other sources
// - you can also create your own API using Node.js to return JSON data to HTTP requests

( Client )					  ( Server )				( Database )
			HTTP request
	--- GET /public/books.html -->

	<----static HTML form page----

	  Instead of submitting a form, send an HTTP request with the query we want to conduct
	----- GET /api?... ---------->

									Server recognizes this request is for /api, so conducts a db query
									------- Query ------------>			and gets back the results

									<----------Result---------

	  Rather than re-rendering entire HTML page, we just pass along the data as a JSON object.
	<--------JSON ---------------
	  Browser now renders only the affected HTML


// index.js
var express = require('express');
var app = express();

app.set('view engine', 'ejs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var Book = require('./Book.js');

var router = express.Router();

// instead of retrieving parameters from the body, we retrieve from the URL using query
app.use( '/api', (req, res) => {
	var query = {};
	if (req.query.title) {
	    query.title = { $regex : req.query.title };		// search for the title in the db using regex
	}
	if (req.query.name) {
	    query['authors.name'] = { $regex: req.query.name };
	}
	if (req.query.year) {
	    query.year = req.query.year;
	}

	if (Object.keys(query).length == 0) {	// nothing was queried
	    res.json({});
	} else {
	    Book.find( query, (err, books) => {
			if (err) {
		    	res.type('html').status(500);
		    	res.send('Error: ' + err);
			} else {
		    	res.json(books);	// rather than using EJS to render entire page, send books as JSON data.
			}
	    });	    
	}
});

app.use('/public', express.static('public'));

app.listen(3000,  () => {
	console.log('Listening on port 3000');
    });

/////////////////////////
// books.html
<html>
  <head>
    <title>Book Finder</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  </head>
  <body>

	<!-- Note that there is no action or submission needed for the form.
     	 We are simply collecting data in the form -->
    <form>
      Title: <input name='title'><br>
      Author: <input name='author'><br>
      Year: <input name='year'><br>
    </form>

    <ul><div id='results'></div></ul>

    <script>

// use jquery to select all input elements on the page since we want this code to run for an action
// on any of those 3 inputs.
// The event for which we're defining the callback function is the 'on' event, which will look for
// the specified events to trigger the callback function.
// Here we specify events with different names to accommodate different browsers.
$("input").on( "change input textInput", () => {
  var title = $("input[name='title']").val();		// jquery selecting the input with property name='title'
  var author = $("input[name='author']").val();
  var year = $("input[name='year']").val();

  var query = '?';
  if (title) query += 'title=' + title + '&';
  if (author) query += 'name=' + author + '&';
  if (year) query += 'year=' + year;

  //$("#results").html(query);

  var url = 'http://localhost:3000/api/' + query;

  $.getJSON(url, (books, status) => {		// getJSON() is from AJAX library.
  // getJSON() sends an HTTP request to the url and defines a callback to be invoked 
  // on the books JSON data that comes back.

  // normally check the status of the HTTP reponse and handle any errors here

  // using jquery:
    var results = $("#results");		// select the <div> with id 'results'
    results.html('');
    books.forEach( (book) => {
      results.append('<li><i>' + book.title + '</i>, ');
      book.authors.forEach( (author) => {
        if (author.name) results.append(author.name + ', ');
      });
      results.append(book.year + '</li>');
    });
  });
});	// close on()

    </script>

  </body>
</html>

// Bootstrap - For automatic response web designing, designing for different devices
// https://getbootstrap.com/getting-started/
// Container is a class in the bootstrap css that has the formatting rules
// Think of each row as having 12 columns

<!doctype html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1"> 
<!-- Latest compiled and minified CSS --> 
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"> 
<!-- jQuery library --> 
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script> 
<!-- Latest compiled JavaScript --> 
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head> 
<body> 

  <!-- using bootstrap -->
  <div class="container">
    <div class="row">
      <div class="col-md-4">This is the first piece of RWD content.</div>
      <div class="col-md-4">This is the second piece of RWD content.</div>
      <div class="col-md-4">This is the third piece of RWD content.</div>      
    </div>
  </div>
  <p>

  <!-- without bootstrap -->
  <table width="100%" border="1">
    <tr align="center">
      <td>This is the first table cell</td>
      <td>This is the second table cell</td>
      <td>This is the third table cell</td>
    </tr>
  </table>

 </body>
 </html>
