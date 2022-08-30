const path = require('path');
const express = require('express');
const app = express();

const db = require("./db");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const port = 3000;

const log = console.log;

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

var documento;
var todosClientes = [];
let nomesUsados = [];
let nomes = ['Warty Warthog', 'Hoary Hedgehog', 'Breezy Badger', 'Karmic Koala'];

function selecionarNome() {
    let nome = nomes[Math.floor(Math.random() * nomes.length)];
    if (nomesUsados.find(nomeUsado => nomeUsado == nome)) {
        return selecionarNome();
    }

    return nome;
}


app.get('/documento', (req, res) => {
    log(req.query.doc);
    var dco = req.query.doc;
    documento = dco;
    log('Arquivo: ' + dco);
    res.render('documento.html');
})

app.get('/createdoc', (req, res) => {
    
    (async () => {
        try{
            await db.createDoc(await db.conectar()).then(function(dados){
                let texto = JSON.stringify(dados);
                texto = JSON.parse(texto);
                log(String(texto.id));
                res.redirect(`/documento?doc=${String(texto.id)}`);
            });
        }catch{
            
        }
    })();
})

app.get('/', (req, res) => {
    res.render('index.html');
})

http.listen(process.env.PORT || port, () => log(`server listening on port ${port}`));

//PG
io.on('connection', (socket) => {

    socket.on('message', (evt) => {
        socket.broadcast.emit('message', evt);
        (async () => {
            log('Insercao!');
            
            log('INSERT INTO CLIENTES');
            const result = await db.insertDoc(await db.conectar(), evt, documento);
            log(result.rowCount);
        
        })();
    });

    //NICKNAME START
    socket.on('send-nickname', function () {
        let nome = selecionarNome();
        nomesUsados.push(nome);
        socket.nickname = nome;
        log(socket.nickname);

        log(nomesUsados);
        socket.emit('user', socket.nickname);
        io.emit('users', nomesUsados);
    });
    //NICKNAME END

    socket.on('disconnect', function () {
        var i = nomesUsados.indexOf(socket.nickname);
        nomesUsados.splice(i, 1);
        log('desconectou o usuario ' + socket.nickname);
        io.emit('users', nomesUsados);
    });

    (async () => {
        log('SELECT * FROM arquivo');
        await db.selectDocs(await db.conectar(), documento).then(function (dados) {
            todosClientes.push(socket);
            log('connected');
            let texto = JSON.stringify(dados);
            texto = JSON.parse(texto);
            socket.send(String(texto.conteudo));
        }, function (error) {
            log("erro na requisicao" + error);
        }
        )
    })();
});

io.on('disconnect', evt => {
    log('some people left');
});