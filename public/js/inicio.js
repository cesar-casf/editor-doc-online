function abrirDoc(){
    var elem = document.getElementById("doc_id");
    console.log(elem.value);

    if(elem.value == null || elem.value == '' || elem.value === undefined) {
        elem.style.borderColor = 'red';
    } else{
        elem.style.borderColor = '#ced4da';
        var url = document.URL;
        window.location.href = `${url}documento?doc=${elem.value}`;
    }
}

function criaDoc(){
    window.location.href = `${document.URL}createdoc`;
}
