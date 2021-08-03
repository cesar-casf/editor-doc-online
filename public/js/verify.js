function verifica(idr, idi){
    var r = document.getElementById(idr);
    var i = document.getElementById(idi);
    var veri = true;

    if(r.value == "" || r.value == null || isNaN(r.valueAsNumber)){
        r.classList.add("b-red");
        veri = false;
    }else{
        r.classList.remove("b-red");
    }
    if(i.value == "" || i.value == null || isNaN(i.valueAsNumber)){
        i.classList.add("b-red");
        veri = false;
    }else{
        i.classList.remove("b-red");
    }
    return veri;
}

function cleanErrors(){
    var red = document.getElementsByClassName("b-red");
    var aux = red.length;
    if(red.length > 0 ){
        for(var i = 0; i < aux; i++){
            red[0].classList.remove("b-red");
        }
    }
}

