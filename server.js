
// Usei o express para criar o configurar meu servidor
const express = require("express")
const server = express();

const db = require("./db");

// const ideas = [
//   {
//     img: "https://image.flaticon.com/icons/svg/2728/2728923.svg",
//     title: "Curso de programação",
//     category: "Estudo",
//     description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id.",
//     url: "https://rocketseat.com.br"
//   },

//   {
//     img: "https://image.flaticon.com/icons/svg/2728/2728799.svg",
//     title: "Jogar video-game",
//     category: "Diversão",
//     description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id.",
//     url: "https://rocketseat.com.br"
//   },

//   {
//     img: "https://image.flaticon.com/icons/svg/2728/2728923.svg",
//     title: "Curso de programação",
//     category: "Estudo",
//     description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id.",
//     url: "https://rocketseat.com.br"
//   },

//   {
//     img: "https://image.flaticon.com/icons/svg/2728/2728799.svg",
//     title: "Jogar video-game",
//     category: "Diversão",
//     description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id.",
//     url: "https://rocketseat.com.br"
//   },
// ]

// Configurar arquivos estáticos (css, scripts, imagens)

server.use(express.static("public"))

// Configuração do nunjucks

const nunjucks = require("nunjucks");

nunjucks.configure("views", {
  express: server,
  noCache: true,  // desabilita o cache do nunjucks
});



// Criei um rota
// Aqui eu capturo o pedido do cliente para responder
server.get("/", function (req, res) {

  db.all(`SELECT * FROM ideas`, function (err, rows) {
    if (err) {
      console.log(err)
      return res.send("Erro no banco de dados");
    }

    const reversedIdeas = [...rows].reverse();

    let lastIdeas = [];
    for (let idea of reversedIdeas) {
      if (lastIdeas.length < 2) {
        lastIdeas.push(idea);
      }
    }

    // lastIdeas = lastIdeas.reverse()

    return res.render("index.html", { ideas: lastIdeas });
  })


});

server.get("/ideas", function (req, res) {

  db.all(`SELECT * FROM ideas`, function (err, rows) {
    if (err) {
      console.log(err)
      return res.send("Erro no banco de dados");
    }

    const reversedIdeas = [...rows].reverse();

    return res.render("ideas.html", { ideas: reversedIdeas.reverse() });
  });


})


// Servidor ligado na porta 3000
server.listen(3000);

console.log("🚀 Server started 🚀");

