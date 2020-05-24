// Using the express to create and setting the server
const express = require('express');
const server = express()

const db = require("./db");

// Setting static files (css, scripts, images)
server.use(express.static("public"));

// Allow request.body use
server.use(express.urlencoded({ extended: true}));

// Settinf nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure("views", {
    express : server,
    noCache: true,
});

// Creating router "/" and catching the user request
server.get('/', function(request, response){

    db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err) {
            console.log(err)
            return response.send("Erro no Banco de Dados!")
        }

        const reversedIdeas = [...rows].reverse()

        let lastIdeas = []
        for (let idea of reversedIdeas) {
            if(lastIdeas.length < 3){
                lastIdeas.push(idea)
            }
        }

        return response.render('index.html', { ideas: lastIdeas });
    });
});

server.get('/ideas', function(request, response){
    db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err) {
            console.log(err)
            return response.send("Erro no Banco de Dados!")
        }

        const reversedIdeas = [...rows].reverse()
        return response.render('ideas.html', { ideas: reversedIdeas });
    });
});

server.post('/', function(request, response) {
    
    const query = `
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    ) VALUES (?,?,?,?,?);
    `

    const values = [
        request.body.image,
        request.body.title,
        request.body.category,
        request.body.description,
        request.body.link,
    ]

    db.run(query,values, function(err) {
        if (err) {
            console.log(err)
            return response.send("Erro no Banco de Dados!");
        }

        return response.redirect('/ideas');
    });
});

// Starting the server on port 3000
server.listen(3000)
console.log("🚀 Server started 🚀");