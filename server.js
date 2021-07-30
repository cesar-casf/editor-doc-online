const { Socket } = require("dgram");

const log = console.log;

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

const http = require("http").createServer();
const io = require("socket.io")(http);
const port = 3000;

http.listen(port, () => log(`server listening on port ${port}`));

//PG
(async () => {
    const db = require("./db");

    console.log('SELECT * FROM arquivo');
    await db.selectDocs().then(function (dados) {
        io.on('connection', (socket) => {
            todosClientes.push(socket);
            log('connected');
            //console.log(dados);
            let texto = JSON.stringify(dados);
            texto = JSON.parse(texto);
            //console.log(texto.conteudo);
            socket.send(String(texto.conteudo));

            socket.on('message', (evt) => {
                socket.broadcast.emit('message', evt);
            });
                        //NICKNAME START
                        socket.on('send-nickname', function () {
                            let nome = selecionarNome();
                            nomesUsados.push(nome);
                            socket.nickname = nome;
                            console.log(socket.nickname);
            
                            socket.emit('users', nomesUsados);
                            socket.emit('user', socket.nickname);
                            console.log(nomesUsados);
                        });
                        //NICKNAME END
            
                        socket.on('disconnect', function () {
                            var i = nomesUsados.indexOf(socket.nickname);
                            nomesUsados.splice(i, 1);
                            console.log('desconectou o usuario ' + socket.nickname);
                        });

        });



    }, function (error) {
        console.log("erro na requisicao" + error);
    }
    )
})();


//SOCKET
// io.on('connection', (socket) => {
//     log('connected');
//     console.log(texto);
//     //socket.send(clientes);

//     socket.on('message', (evt) => {
//         socket.broadcast.emit('message', evt);
//     });
// });

io.on('disconnect', evt => {
    log('some people left');
});