var socket = io('http://localhost:3000');
const log = console.log;


const listener = document.querySelector(' #editor ' );
const tb = document.querySelector(' #tool-bar ' );

tb.addEventListener("click", evt => {
    const text = editor.getData();
    socket.send(text);
});

listener.addEventListener("keyup", evt => {
    const text = editor.getData();
    socket.send(text);
});

socket.on('message', data => {
    editor.setData(data);
});


socket.emit('send-nickname', '');

socket.on('users', data => {
    console.log(data);
    var ul = document.getElementById("users-list");
    ul.innerHTML = "";
    data.forEach(element => {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(element));
        ul.appendChild(li);
    });

});

socket.on('user', data => {
    console.log(data);
});