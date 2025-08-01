const express = require("express");
//Imports the express module — a fast and minimal web framework for Node.js that helps you build servers and APIs easily.
const cors = require("cors");
//Imports the cors middleware. It allows your server to accept requests from other origins (like your frontend running on a different port).
const app = express();
//Creates an instance of your Express application. You use app to define routes and middleware.
app.use(cors());
/*Tells your server to use the cors middleware for all incoming requests.
This allows your frontend (e.g., React at localhost:3000) to make requests 
to this backend (at localhost:8080) without getting blocked by the browser.
*/
const todos = [
  { id: 1, title: "Organize workspace", description: "Clean and declutter the desk and computer area.", completed: false },
  { id: 2, title: "Read a chapter from a book", description: "Finish reading chapter 4 of 'Atomic Habits'.", completed: false },
  { id: 3, title: "Push code to GitHub", description: "Upload latest commits for the todo app project.", completed: false },
  { id: 4, title: "30-minute walk", description: "Take a walk outside to stretch and refresh.", completed: false },
  { id: 5, title: "Drink water", description: "Drink at least 2 liters of water today.", completed: false },
  { id: 6, title: "Practice React", description: "Build a simple component using hooks.", completed: false },
  { id: 7, title: "Meditate", description: "Do a 10-minute guided meditation using an app.", completed: false },
  { id: 8, title: "Clean email inbox", description: "Delete or archive unnecessary emails.", completed: false },
  { id: 9, title: "Learn 5 new words", description: "Pick any language and note down 5 new words.", completed: false },
  { id: 10, title: "Try a new recipe", description: "Cook something you’ve never made before.", completed: false }
];

/*
A hardcoded array of todo items. Each item is an object with:

id: unique identifier
title: short name
description: details
completed: status (done or not)
*/


// ✅ Route to get specific todo by ID
app.get("/todo", function (req, res) {
  const id = parseInt(req.query.id);   // get id from URL
  const todo = todos.find((t) => t.id == req.query.id);
  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }
  res.json({ todo });
});
/*
Defines a GET route at /todo
You call it like: http://localhost:8080/todo?id=2

req.query.id: reads the id from the URL query string
parseInt(...): converts it from string to number
todos.find(...): searches the todos array for a matching ID
res.json({ todo }): returns the found todo in JSON format
*/


// ✅ Route to get random todos
app.get("/random-todos", function (req, res) {
  const randomTodos = [];
  for (let i = 0; i < todos.length; i++) {
    if (Math.random() > 0.5) {
      randomTodos.push(todos[i]);
    }
  }
  res.json({ todos: randomTodos });
});
/*
GET route at /random-todos
You call it like: http://localhost:8080/random-todos

Loops over all todos
Randomly includes some of them (50% chance)
Sends back a new array of random todos

*/

// ✅ Sum route
app.get("/sum", function (req, res) {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  const sum = a + b;
  res.send(sum.toString());  // return back to the frontend, i dont return in the json format i return in the text format, 
});
/*
GET route at /sum
Example: http://localhost:8080/sum?a=10&b=20

Reads a and b from query
Calculates a + b
Sends result as a string 
*/

// ✅ Interest route
app.get("/interest", function (req, res) {
  const principal = parseInt(req.query.principal);
  const rate = parseInt(req.query.rate);
  const time = parseInt(req.query.time);
  const interest = (principal * rate * time) / 100;
  const total = principal + interest;
  res.json({ total, interest });
});
/*
GET route at /interest 
Example: http://localhost:8080/interest?principal=1000&rate=5&time=2

Extracts principal, rate, and time from query string
Calculates simple interest: P * R * T / 100
Calculates total amount
Returns both in JSON
*/

// ✅ Notification route
function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}
// Returns a random integer between 0 and max - 1


app.get("/notification", function (req, res) {
  res.json({
    network: getRandomNumber(10),
    jobs: getRandomNumber(10),
    messaging: getRandomNumber(10),
    notification: getRandomNumber(10),
  });
});
/*
GET route at /notification
Example: http://localhost:8080/notification

Generates fake notification counts (0–9) for:
network
jobs
messaging
notification
Returns the counts as JSON
*/
app.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});
//Starts the server on port 8080


/*

How to access ?

Endpoint	                                  What it does                     Example  
/todo?id=2	                                Get specific todo	               http://localhost:8080/todo?id=2
/random-todos 	                            Get random todos	               http://localhost:8080/random-todos
/sum?a=10&b=20	                            Get sum	                         http://localhost:8080/sum?a=10&b=20
/interest?principal=1000&rate=5&time=2	    Get interest	                   http://localhost:8080/interest?principal=1000&rate=5&time=2
/notification                               Get random notification counts   http://localhost:8080/notification
                                            
*/    

