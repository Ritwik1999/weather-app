// Remember, you can serve to a requester in two ways, either send the website assets like HTML, CSS, JS scripts, or have an API response.


const express = require('express');    //The express module exposes only a single function by the same name.

const app = express();

app.get('', (req, res) => {
    res.send('Hello express!')
})  //Serves the root, that is, the home page of our web app, when called

app.get('/help', (req, res) => {
    res.send('Help page');
})  //Serves the help route, that is, the help page of our web app, when called by visiting {url}/help

app.get('/about', (req, res) => {
    res.send('About page');
})

app.get('/weather', (req, res) => {
    res.send('Get the weather info');
})

//  app.com         root route
//  app.com/help    help route
//  app.com/about   about route, and so on....

//whatever follows the .com, or any other domain name is called route (or partial url), and that is the first argument to the get method, which is called when a user tries to access the website with the specified route.

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})

// Navigate to this directory and command nodemon intro-to-servers.js for the server to run.