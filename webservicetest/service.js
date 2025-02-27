const express = require('express');
const app = express();
//Creates a new object of type express named app

//Express goes in order of declaration
//In this case checking public, then /j then /r

//whenever anything is requested from the server
//the server will respond with an 404 error code
//And output an html file with 'Not Found'
// app.get('*', (req, res) => {
//     res.send(404, '<h1>Not Found</h1>');
// });

//Sends a file in the public directory
// app.use(express.static('public'));


// //Sends some json
// //Also responds with the error code 401
// //Code only seen in curl not in browser
// app.get('/j', (req, res) => {
//     res.send(401, {x: '3', y: '4'});
// })

// //Redirects to a different page
// app.get('/r', (req, res) => {
//     res.redirect('https://5edice.com');
// });


// function noBobs(req, res, next) {
//     /bob/.test(req.path) ? res.status(401).send('No Bobs!') : next();
// }

// function isDave(req, res, next) {
//     res.isDave = /dave/.test(req.path);
//     next();
// }
      

//broken check for if path has dave in it
// app.get('*', (req, res) => {
//     res.send('<p> ${res.isDave() ? 'yes' : 'no'} Hello</p>');
// });


app.use(express.json());

app.put('/data', (req, res) => {
 res.send(req.body.msg);
});


app.listen(3000, () =>{
    console.log('Server is running on http//localhost:3000');
});