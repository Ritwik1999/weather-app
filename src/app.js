const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Node provides with the following two variables, __dirname and __filename

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))    //the use of this uses the public folder to serve files, and since we have a file named index.html in the public folder, the get method for root is no longer required, as the root is index.html.

app.get('', (req,res) => {
    res.render('index', {
        title: "Weather",
        name: "Ritwik Neema"
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Ritwik Neema"
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: "Ritwik Neema",
        message: "This is a dynamically created help message"
    });
})

app.get('/weather', (req, res) => {
   if(!req.query.address) {
       return res.send({
           error: "You must provide an address"
       });      //It is a common practice using return because if node encounters res.send being used twice (in case you use it without the else condition), itthrows an error.
   }

   geocode(req.query.address, (error, data) => {
       if(error) {
           return res.send({error});
       }
       forecast(data, (error, response) => {
           if(error) {
               return res.send({error});
           }
           res.send(response);
       })
   })

});



//  Express uses the wildcard character * to specify anything
app.get('/help/*', (req, res) => {
    res.render('not-found', {
        title: 404,
        message: "Help resource not found",
        name: "Ritwik Neema"
    })
})

// 404 page, this route has to be handled at the last.
app.get('*', (req, res) => {
    res.render('not-found', {
        title: 404,
        message: "Resource not found",
        name: "Ritwik Neema"
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
});

