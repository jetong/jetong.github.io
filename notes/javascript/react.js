React Library: The Big Picture (ps)

note: codesandbox.io and jscomplete.com for react playground

-	Your UI is a function of your state and props are to components what arguments are to functions
-	In React, your entire application’s UI is built using function composition and JSX is an abstraction over those functions.
-	Components don’t necessarily have to correspond to DOM nodes.  They can return other components, functions, null, or false.
-	When two components need to share state, there are 2 popular approaches: Redux’s solution is to put that shared state in 
	another location called a “store”. Components can then subscribe to any portions of the store they need and can also dispatch “actions” to update the store. React’s solution is to find the nearest parent of both of those components and have that parent manage the shared state, passing it down to the child components as needed.
-	When passing numbers through props, use {}.  <Button incrementValue={1} />
-	setState is async.  Use "function contract" format to avoid race conditions.
-	Use propTypes as first line of defense for checking types and detecting undefined.  It is also great for
	documentation as it lists the props of a component when done consistently.
-	In general, only store values in state that we will use in render(); otherwise we do unnecessary rendering when state changes.
-	Use curly braces in JSX to distinguish JSX and Javascript..even with comments.  {/* This is a comment */}


WHY REACT?  
1.	Flexibility
	- web apps
	- static sites
	- mobile (react native)
	- desktop apps
	- server-rendering (next.js)
	- virtual reality(react VR).
	Can be sprinkled into larger apps for gradual code migration.

2.	Developer Experience
	- simple API
	- JSX 
	- Other frameworks/libraries like Angular, Vue, Ember require you to learn a new syntax of fake javascript that is put within HTML,
	  whereas in React we use real javascript and fake HTML, which has a much lower learning curve and lets us focus on javascript.
	- use create-react-app module to up and run very quickly
	- working is components allows for working in modularity of simpler and smaller components.
	- changes are updated automatically in real time once file is saved

3.	Corporate Investment
	- Stable: Facebook itself maintains some 30,000 react components and they are reliable and consistent in fixing any breaks with patches.

4.	Large Active Community
	- Easy to seek help on StackOverflow
	- Many companies have open sourced their components (microft office UI fabric, google matrial-UI, react-bootstrap, etc) 
	- Ecosystem and tools already in place: redux, graphQL, react router, mobx, jest(automatic testing), next.js, etc.

5.	Performance
	- Virtual DOM.  Efficient updating of DOM when state changes.
	- Small size ~35k.  Smaller alternatives: inferno and preact.

6.	Testability
	- No setup/config needed, runs in memory in node without browser.
	- Uses pure functions, which are reliable, deterministic, and have no side-effects.
	- Mocha, Jasmine, Tape, QUnit, AVA, Jest all work because it is just javascript.


TRADEOFFS

1.	Framework vs Library
	React: Choose only what you need, rather than a larger framework with overhead.
2.	Concise vs Explicit
	Angular has two-way binding of variables that are used in JS and HTML, and this has the benefit of being automatic and less coding.
	React has one-way binding, which is more verbose in code, but leads to more control and explicit code.
3.	Template-centric vs JavaScript-centric
	Need learn syntax of each template technology vs React is already in Javascript environment.
4.	Separate MVC into HTML/CSS/JS files vs Single file
	But the reality is that each tech in MVC is closely intertwined, so React embraces this by letting components encompass their own
	HTML/CSS/JS, and so our concern now is in separating autonomous components from one another.
5.	Standard vs non-standard
	Standard web components still have spotty browser support, and they do not offer anything new.
	React can do the same and more while JS libraries keep innovating.
6.	Community vs corporate backing
	Backed by Facebook, which is highly invested in it.


DOWNSIDES

1.	HTML and JSX differ
	Difference is very minor.
2.	Build step required
	JSX must first be compiled to JS, but modern web apps typically go through a build step anyway (minify, transpile, testing/linting).
3.	Version conflicts.  Cannot run 2 versions of react at the same time for the same page.  
	So react components must be on same version for a given page.
	Solution: 	decide as a team to standardize on one version of react
				upgrade react when upgrading libraries.  use codemod conveniently created by facebook.
4.	Online sources can be old and outdated.
	Here are some significant changes to note due to features being extracted from React Core in making it leaner:
	Old: import {render} from 'react';		New: import {render} from 'react-dom';
	Old: React.createClass					New: var crc = require('create-react-class');
	Old: import {PropTypes} from 'react';	New: import PropTypes from 'prop-types';
	Old: mixins: [mixinNameHere]			New: use higher order components, render props	[to communicate between components]
5.  Decision fatigue
	Options give more control and flexibility.  Also there is create-react-app that bundles commonly used features to get started quickly.
	For checking types we commonly see PropTypes, TypeScript, or Flow, but PropTypes is recommended.
	React handles state just fine on its own, but some optional libraries to help are Flux, Redux, and MobX (Redux most popular)

--------------------------------------

React.js: Getting Started (pluralsight course done in jscomplete.com editor)
Components like functions, take input, give output.  Can compose one another, render one component within another.

2 types:
Function components: simply recieve props and returns JSX to DOM
Class components: reieve props and returns JSX to DOM, but also keeps track of private internal state and/or has functions
				  defined within it.
JSX is just javascript disguised as HTML-like tags.
Note that function components return the JSX directly, whereas class components call render() to return the JSX.

States can change, but props cannot.

Ex function component: 
// to use the function, assign it to a name.  Name must start with upper case.
const Button = (props) => {
	return (
		<button>{props.label}</button>
	);
};
ReactDOM.render(<Button label="Enter" />, mountNode);
// First argument - The component to be rendered
// 2nd argument - The element in which this component should be rendered.

Ex: class component:
Button click to display counter
Convert the previous function component to class component to handle state.
To use state object, need to initialize using constructor.
step 1 - Set up and display state: Within class component, create state object and have a button display that state 
class Button extends React.Component {
	// instead of constructor, can use ES6 `state = { counter: 0 };`
	constructor(props) {
		super(props);
		this.state = { counter: 0 };
	}

	render() {
		return (
			<button>	// `this` refers to the component instance we are handing off to the DOM 
				{this.state.counter}
			</button>	
		);
	}
}
ReactDOM.render(<Button label="Enter" />, mountNode);

step 2 - give it functionality: define a click handler on that button in order to change the state
note that the handler function can be done in 3 ways:
1. defined globally: <button onClick={anyFunction}>
2. defined inline: <button onClick={() => doSomething()}>
3. defined within the class component <button onClick={this.handleClick}> 
	(we will use #3 as it is standard practice)


## version 1 (does not address race conditions):
class Button extends React.Component {
	state = { counter: 0 };

	handleClick = () => {
		// `this` still refers to the component instance
		// note that setState is an async call. Multiple setState calls could theoretically hit a race condition since
		// we are reading and writing to the same state object.  The general rule is that whenever you want to update a state
		// using a value from the current state, use the `function contract` form of setState rather than `object contract` 
		// where the current state object is altered directly. (See version 2 below)

		this.setState({
			counter: this.state.counter + 1		// race condition may occur
		})
	};

	render() {
		return (
			<button onClick={this.handleClick}>	// associate the click handler
				{this.state.counter}
			</button>	
		);
	}
}
ReactDOM.render(<Button label="Enter" />, mountNode);

## version 2 (addresses race condition):
class Button extends React.Component {
	state = { counter: 0 };

	handleClick = () => {
		// this uses a prevState object that we can confidently use without worrying about race conditions
		// note that because we are just doing a simple return in the body, we can use short arrow notation (see final version).
		this.setState((prevState) => {
			return {
				counter: prevState.counter + 1		// access a prevState passed to the function rather than the current state.
			};
		});
	};

	render() {
		return (
			<button onClick={this.handleClick}>
				{this.state.counter}
			</button>	
		);
	}
}
ReactDOM.render(<Button label="Enter" />, mountNode);

## Final Version (uses short arrow notation for the function passed to setState):
class Button extends React.Component {
	// 1) define state
	state = { counter: 0 };

	// 2) define event handler (in this case, using `function contract` form of setState to avoid race conditions)
	handleClick = () => {
		// note the need for parentheses around the body of the function
		this.setState((prevState) => ({
			counter: prevState.counter + 1
		}));
	};

	// 3) associate handler with the component and render it with the result
	render() {
		return (
			<button onClick=>{this.handleClick}>
				{this.state.counter}
			</button>	
		);
	}
}
ReactDOM.render(<Button label="Enter" />, mountNode);

Points:
-	setState() can be used in 2 ways to update state.
	1.	`object contract` to be used when updating the state does not require accessing the current state.
	2.  `function contract` to be used when we do need to access the current state, in order to avoid race conditions.

-------------------------------
Extending the previous example.
Suppose we want to add a separate component to display the result separately rather than within the button.  This allows
us to modularize the program.  

## Stage 1 - Create App and Result components, have ReactDOM.render() point to App, as it is now the top of the document.
class Button extends React.Component {
	state = { counter: 0 };

	handleClick = () => {
		this.setState((prevState) => ({
			counter: prevState.counter + 1
		}));
	};

	render() {
		return (
			<button onClick={this.handleClick}>
				+1
			</button>	
		);
	}
}

// Because this display component does not track state and simply prints the value, we
// can use a function component to define it.
const Result = (props) => {
	return (
		<div>...</div>
	);
};

// A wrapper class component `App` is created to enclose all other components.  This way, ReactDOM.render() only needs to 
// reference this very top level component to display everything.  `App` is also where we will track states and pass them down
// to other components that need to access the state.  
class App extends React.Component {
	render() {
		return (
			// render() can only return one component object, so wrap all the components in a <div>
			<div>
				<Button />
				<Result />
			</div>
		);
	}
}
ReactDOM.render(<App />, mountNode);	// reference changed to point to App

## Stage 2 - Transfer the state from Button to parent App at the top level so that Result can also access it.
			Define function `incrementCounter` at the App level to handle that state, and have the Button component
			access it as a prop passed from App.  Moreoever, the Result component needs to read the counter state value,
			so we similarly pass it as a prop from App.  Note that the syntax for how we access props within function
			components is different from within class components.

class Button extends React.Component {
//  Comment out momentarily since the button onClick now references `incrementCounter` from App.  More on this later.
//	handleClick = () => {
//		this.setState((prevState) => ({
//			counter: prevState.counter + 1
//		}));
//	};

	render() {
		return (
			// button component accesses `incrementCounter` from App.
			<button onClick={this.props.onClickFunction}>
				+1
			</button>	
		);
	}
}

const Result = (props) => {
	return (
		<div>{props.counter}</div>
	);
};

class App extends React.Component {
	state = { counter: 0 };

	incrementCounter = () => {
		this.setState((prevState) => ({
			counter: prevState.counter + 1
		}));
	};

}
	render() {
		return (
			<div>
				<Button onClickFuntion={this.incrementCounter} />
				<Result counter={this.state.counter} />
			</div>
		);
	}
}

ReactDOM.render(<App />, mountNode);


## Stage 3 - The button works perfectly fine incrementing +1 with each click, but let us make the button REUSABLE by
			having it increment by any supplied value.  At the App level, create multiple buttons, each passing a different
			increment value as a prop.  The definition of incrementCounter() now needs to be able to recieve an increment 
			value as argument, and when we invoke it in Button onclick, we need to pass the incrementValue prop value into it.
			Naive approach: To invoke incrementCounter(), we wrap `this.props.onClickFunction(this.props.incrementValue)} with 
			an anonymous function to create closure on the `this` reference passed as argument.  In ES6, classes do not
			automatically bind the `this` reference.  This naive approach works, but a new function is created each render.
			The problem is not that creating a function is an expensive operation, but rather that the component sees this as
			an updated prop value each time and thus continuously re-render.  see Stage 4 for better approach.

class Button extends React.Component {
//  Comment out momentarily since the button onClick now references `incrementCounter` from App.  More on this later.
//	handleClick = () => {
//		this.setState((prevState) => ({
//			counter: prevState.counter + 1
//		}));
//	};

	render() {
		return (
			// button component accesses `incrementCounter` from App.
			// "anonymous function wrapper" approach to create closure to bind `this`  <-- BAD
			<button onClick={() => this.props.onClickFunction(this.props.incrementValue)}>
				+{this.props.incrementValue}
			</button>	
		);
	}
}

const Result = (props) => {
	return (
		<div>{props.counter}</div>
	);
};

class App extends React.Component {
	state = { counter: 0 };

	incrementCounter = (incrementValue) => {
		this.setState((prevState) => ({
			counter: prevState.counter + incrementValue
		}));
	};

}
	render() {
		return (
			<div>
				// pass incrememt value as prop.  note syntax
				<Button incrementValue={1} onClickFuntion={this.incrementCounter} />
				<Button incrementValue={5} onClickFuntion={this.incrementCounter} />
				<Button incrementValue={10} onClickFuntion={this.incrementCounter} />
				<Result counter={this.state.counter} />
			</div>
		);
	}
}

ReactDOM.render(<App />, mountNode);

## Stage 4 (Final version): we improve the way we implemented the Button onClick with an alternate, more efficient approach.
				Using the "anonymous function wrapper" approach or using bind() approach will lead to creating a new function
				for every rendered button.  Instead, we resurrect the handleClick function from before and update its definition.
				This is the preferred approach: using a function defined at the Button component level, rather than creating 
				separate anonymous functions for each button.  Because we define this function within Button, we keep the Button 
				component as a class component rather than change it to a function component, even though it does not track state.

class Button extends React.Component {
	handleClick = () => {
		this.props.onClickFunction(this.props.incrementValue);
	};

	render() {
		return (
			// use handleClick() to call onClickFuntion()
			<button onClick={this.handleClick}>
				+{this.props.incrementValue}
			</button>	
		);
	}
}

const Result = (props) => {
	return (
		<div>{props.counter}</div>
	);
};

class App extends React.Component {
	state = { counter: 0 };

	incrementCounter = (incrementValue) => {
		this.setState((prevState) => ({
			counter: prevState.counter + incrementValue
		}));
	};

}
	render() {
		return (
			<div>
				<Button incrementValue={1} onClickFuntion={this.incrementCounter} />
				<Button incrementValue={5} onClickFuntion={this.incrementCounter} />
				<Button incrementValue={10} onClickFuntion={this.incrementCounter} />
				<Result counter={this.state.counter} />
			</div>
		);
	}
}

ReactDOM.render(<App />, mountNode);

-----------------------------------------------
WORKING WITH DATA
An example taking user input, fetching corresponding API data, and updating state to render that data.

Stage 1: As much as possible, plan out the UI, determine how many components are needed, and what each one describes.  Renaming
		 and adding/removing components along the way is very common and normal.
		 Test your code in small incrememts.  Here we create the card component and test before moving on.

const Card = (props) => {
	return (
		<div>
			<img src="http://placehold.it/75" />
			<div>
				<div>Name here...</div>
				<div>Company Name here...</div>
			</div>
		</div>
	);
};

ReactDOM.render(<Card />, mountNode);


Stage 2: Style the card and fill it with actual data.

const Card = (props) => {
	return (
		<div style={{margin: '1em'}}>	// can also do <div className="wrapper"> and use an external css file.
			<img width="75" src="https://avatars1.githubusercontent.com/u/8445?v=4" />
			<div style={{display: 'inline-block', marginLeft: 10}}>
				<div style={{fontSize: '1.25em', fontWeight: 'bold'}}>
					Paul O’Shannessy
				</div>
				<div>Facebook</div>
			</div>
		</div>
	);
};

const CardList = (props) => {
	return (
		<div>
			<Card />
		</div>
	);
};

ReactDOM.render(<CardList />, mountNode);


Stage 3: Now that we have an idea of how each card would look like, make it reusable.

const Card = (props) => {
	return (
		<div style={{margin: '1em'}}>
			<img width="75" src={props.avatar_url} />
			<div style={{display: 'inline-block', marginLeft: 10}}>
				<div style={{fontSize: '1.25em', fontWeight: 'bold'}}>
					{props.name}
				</div>
				<div>{props.company}</div>
			</div>
		</div>
	);
};

const CardList = (props) => {
	return (
		<div>
			<Card name="Paul O’Shannessy"
				avatar_url="https://avatars1.githubusercontent.com/u/8445?v=4"
				company="Facebook"
			/>
		</div>
	);
};

ReactDOM.render(<CardList />, mountNode);


Stage 4: Values in CardList are still hard-coded.   Since we want to render multiple cards dynamically, we implement
		an array filled with the data and map over it.

const Card = (props) => {...};	// same as before

let data = [
	{ name: "Paul O'Shannessy",
	  avatar_url: "https://avatars.githubusercontent.com/u/8445?v=4",
	  company: "Facebook" },
	{ name: "Ben Alpert",
	  avatar_url: "https://avatars.githubusercontent.com/u/6820?v=3",
	  company: "Facebook" },
];

const CardList = (props) => {
	return (
		<div>
			// {props.cards.map(card => <Card name={card.name} avatar_url={card.avatar_url} company={card.company} />)}
			// use "spread" operator
			{props.cards.map(card => <Card {...card} />)}
		</div>
	);
};

ReactDOM.render(<CardList cards={data} />, mountNode);


Stage 5: Create form for user input.

const Card = (props) => {...};	// same as before
let data = [...];	// same as before

const CardList = (props) => {
	return (
		<div>
			// note that it technically works to put <Form /> here, but Form component should not be part of CardList
			// instead, we create a parent component to wrap and render Form and CardList
			{props.cards.map(card => <Card {...card} />)}
		</div>
	);
};

class Form extends React.Component {
	render() {
		return (
			<form>
				<input type="text" placeholder="Github username" />
				<button type"submit">Add card</button>
			</form>
		);
	}
}

class App extends React.Component {
	render() {
		return (
			<div>
				<Form />
				<CardList cards={data} />
			</div>
		);
	}
}

ReactDOM.render(<App />, mountNode);


Stage 6: Some considerations on the `data` array.  We do not want it globally declared because if we run multiple instances
		of App, we would be sharing the same array.  We can maintain the data within a component as either an instance variable  
		of the component, or as a react internal state object.  Since we want react to re-render our App component each time
		we add a card to the data array, we want it on the state object.  Lastly, we need to decide which component should hold
		that state.  Since both the Form and CardList components need to access it, we put it in the App level.

const Card = (props) => {...};	// same as before

const CardList = (props) => {
	return (
		<div>
			{props.cards.map(card => <Card {...card} />)}
		</div>
	);
};

class Form extends React.Component {
	render() {
		return (
			<form>
				<input type="text" placeholder="Github username" />
				<button type"submit">Add card</button>
			</form>
		);
	}
}

class App extends React.Component {
	// rename data array to cards and bring it into App
	state = {
		cards: [
			{ name: "Paul O'Shannessy",
	  		  avatar_url: "https://avatars.githubusercontent.com/u/8445?v=4",
	  		  company: "Facebook" },
			{ name: "Ben Alpert",
	  		  avatar_url: "https://avatars.githubusercontent.com/u/6820?v=3",
	  		  company: "Facebook" },
		];
	};

	render() {
		return (
			<div>
				<Form />
				// update the prop to reference this.state.cards
				<CardList cards={this.state.cards} />
			</div>
		);
	}
}

ReactDOM.render(<App />, mountNode);


Stage 7: Getting User Input..implementing Form component logic

const Card = (props) => {...};	// same as before
const CardList = (props) => {...};	// same as before

class Form extends React.Component {
	// accessed by `controlled component`
	state = { userName: '' };

	// every react event function is passed a wrapper to the native javascript event object.  Through it we can
	// access all the same methods of the native js event object, such as preventDefault()
	handleSubmit = (event) => {
		event.preventDefault();		// prevent page refresh
		console.log('Event: Form Submit', this.state.userName);
	};

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<input type="text" 
					// Set up `controlled component` for input
					value={this.state.userName}
					onChange={(event) => this.setState({ userName: event.target.value })}
					placeholder="Github username" required />	// input field required
				// We can set up an onClick handler inside <button>, but we would not be able to access native form
				// submission features such as having an input field be `required`.  onSubmit enables these features.
				<button type"submit">Add card</button>
			</form>
		);
	}
}

class App extends React.Component {...}	// same as before
ReactDOM.render(<App />, mountNode);


Stage 8: (Final) On form submit, fetch card data from Github API, add it to the cards array and render it.  For the ajax call, 
		we can use either the native fetch method or the axios library that is included in the jscomplete.com editor.
		After fetching the card data from the API, we just need to append it to the cards array in our App component, and
		react will automatically re-render to show the added card.  The problem is that the fetch occurs in the handleSubmit()
		event of our Form component, but the cards array is in the parent App component and we cannot access the array directly
		from within the Form component (react components have 1 way flow of data).  The solution is to create an 
		addNewCard(cardInfo) function inside App that takes a card`s info and adds it to the card array.  We then have App pass
		this function reference to Form as a prop.  This way, we can invoke the function within Form, passing as argument
		the card info retrieved from the API.

const Card = (props) => {
	return (
		<div style={{margin: '1em'}}>
			<img width="75" src={props.avatar_url} />
			<div style={{display: 'inline-block', marginLeft: 10}}>
				<div style={{fontSize: '1.25em', fontWeight: 'bold'}}>
					{props.name}
				</div>
				<div>{props.company}</div>
			</div>
		</div>
	);
};

const CardList = (props) => {
	return (
		<div>
			// we add a unique key to each card in the array to satisfy the warning message in the console.
			// conveniently, each user in the Github API has a unique id, which we access with `card.id`
			{props.cards.map(card => <Card key={card.id} {...card} />)}
		</div>
	);
};

class Form extends React.Component {
	state = { userName: '' };

	handleSubmit = (event) => {
		event.preventDefault();	
		console.log('Event: Form Submit', this.state.userName);
		axios.get(`https://api.github.com/users/${this.state.userName}`)
			.then(resp => {
				this.props.onSubmit(resp.data);		// invokes addNewCard() of App component
				this.setState({ userName: '' });	// clears input field after submit
			}
		);
	};

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<input type="text" 
					value={this.state.userName}
					onChange={(event) => this.setState({ userName: event.target.value })}
					placeholder="Github username" required />	// input field required
				<button type"submit">Add card</button>
			</form>
		);
	}
}

class App extends React.Component {
	state = {
		// since we've now implemented an add card feature, this initial data is optional
		// we can keep it or just have an empty array wiht `state = { cards: [] };
		cards: [
			{ name: "Paul O'Shannessy",
	  		  avatar_url: "https://avatars.githubusercontent.com/u/8445?v=4",
	  		  company: "Facebook" },
			{ name: "Ben Alpert",
	  		  avatar_url: "https://avatars.githubusercontent.com/u/6820?v=3",
	  		  company: "Facebook" },
		];
	};
	
	addNewCard = (cardInfo) => {
		// to avoid race conditions, use the `function contract` of setState
		// the arrow function returns the previous state of the array with the new cardInfo object concatenated to it.
		this.setState(prevState => ({
			cards: prevState.cards.concat(cardInfo)
		}));
	};

	render() {
		return (
			<div>
				<Form onSubmit={this.addNewCard} />		// this is a reference to the function.  not an invocation.
				<CardList cards={this.state.cards} />
			</div>
		);
	}
}

ReactDOM.render(<App />, mountNode);


Components Summary:
	<Card />		- renders info about a Github user
	<CardList />	- converts an array of records into an array of <Card /> components
	<Form />		- reads input from the user
	<App />			- manages the relations between all the components
