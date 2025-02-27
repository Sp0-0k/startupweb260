const express = require('express');
const app = express();
//Creates a new object of type express named app


//whenever anything is requested from the server
//the server will respond with an 404 error code
//And output an html file with 'Not Found'
// app.get('*', (req, res) => {
//     res.send(404, '<h1>Not Found</h1>');
// });

app.use(express.static('public'));

app.listen(3000, () =>{
    console.log('Server is running on http//localhost:3000');
});