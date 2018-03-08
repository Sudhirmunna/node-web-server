const fs = require('fs');
const express = require('express');
const hbs = require('hbs');

const port = process.env.PORT || 3000;
let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// Create a middleware
app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now} ${req.method} ${req.path}`;
    console.log(log);
    fs.appendFileSync('server.log',log + '\n', (err) => {
        if(err) {
            console.log(`Unabe to append to server.log`);
        }
    })
    next();
});

// app.use((req, res) => {
//     res.render('maintenance.hbs');
// });
// always add static middleware at the end
app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Whats up dude!!'
    }); 
});

app.get('/about', (req,res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });    
});

app.get('/projects', (req,res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects'
    });    
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'not available'
    })
});

app.listen(port);