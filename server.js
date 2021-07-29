const log = console.log;

const http = require("http").createServer();
const io = require("socket.io")(http);
const port = 3000;

http.listen(port, () => log(`server listening on port ${port}`));

//PG
(async () => {
    const db = require("./db");

    console.log('SELECT * FROM arquivo');
    await db.selectDocs().then(function(dados){
        io.on('connection', (socket) => {
            log('connected');
            console.log(dados);
            let texto = JSON.stringify(dados);
            texto = JSON.parse(texto);
            console.log(texto.conteudo);
            socket.send(String(texto.conteudo));
        
            socket.on('message', (evt) => {
                socket.broadcast.emit('message', evt);
            });
        });

    }, function(error){
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