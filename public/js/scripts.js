function rec_plus_rec(r1, i1, r2, i2){
    var real = r1 + r2;
    var img = i1 + i2;
    var pol = rectopol(real, img);
    if(img >= 0)
    var resp = `${pol.modulo.toFixed(4)} ∠ ${pol.angulo.toFixed(4)}°
${real.toFixed(4)} + i${img.toFixed(4)}`;

    if(img < 0){
        var aux = img*(-1);
        var resp = ` ${pol.modulo.toFixed(4)} ∠ ${pol.angulo.toFixed(4)}°
${real.toFixed(4)} - i${aux.toFixed(4)}`;
    }
    
    return resp;
}

function rec_minus_rec(r1, i1, r2, i2){
    var real = r1 - r2;
    var img = i1 - i2;
    var resp;
    var pol = rectopol(real, img);
    if(img >= 0)
        resp = `${pol.modulo.toFixed(4)} ∠ ${pol.angulo.toFixed(4)}°
${real.toFixed(4)} + i${img.toFixed(4)}`;

    if(img < 0){
        var aux = img*(-1);
        resp = `${pol.modulo.toFixed(4)} ∠ ${pol.angulo.toFixed(4)}°
${real.toFixed(4)} - i${aux.toFixed(4)}`;
    }
    return resp;
}

function pol_x_pol(z1, a1, z2, a2){
    var z = z1 * z2;
    var a = a1 + a2;
    if(a > 360)
        a = a-360;
    if(a < -360)
        a = a + 360;
    var rec = poltorec(z, a);

    if(rec.imaginaria < 0){
        var resp = `${z.toFixed(4)} ∠ ${a.toFixed(4)}°
${rec.real.toFixed(4)} - i ${(rec.imaginaria * -1).toFixed(4)}`;   
    }else{
      var resp = `${z.toFixed(4)} ∠ ${a.toFixed(4)}°
${rec.real.toFixed(4)} + i ${rec.imaginaria.toFixed(4)}`;  
    }
    return resp;
}

function pol_div_pol(z1, a1, z2, a2){
    var z = z1 / z2;
    var a = a1 - a2;

    if(a > 360)
        a = a-360;
    if(a < -360)
        a = a + 360;

    var rec = poltorec(z, a);

    if(rec.imaginaria < 0){
            var resp = `${z.toFixed(4)} ∠ ${a.toFixed(4)}°
${rec.real.toFixed(4)} - i ${(rec.imaginaria * -1).toFixed(4)}`;   
        }else{
          var resp = `${z} ∠ ${a}°
${rec.real.toFixed(4)} + i ${rec.imaginaria.toFixed(4)}`;  
        }
    return resp;
}

function rectopol(r, i){
    var z = Math.sqrt(r*r + i*i);
    var radians = Math.atan2(i, r);
    var angulo = radians * (180/Math.PI);
    var polar = {
        modulo: z,
        angulo: angulo
    }
    return polar;
}

function poltorec(z, a){
    var r = z*Math.cos(a*Math.PI/180);
    var i = z*Math.sin(a*Math.PI/180);
    i = i;
    r = r;
    var rec = {
        real: r,
        imaginaria: i
    }

    return rec;
}

function plus(){
    cleanErrors();
    var radio = document.querySelector("input[name=flexRadio]:checked");
    var radio1 = document.querySelector("input[name=flexRadio1]:checked");
    var r;
    var i;
    var r1;
    var i1;
    var verificacao = true;
    var verificacao1 = true;

    try{
        if(radio.value === "pol"){
            verificacao = verifica("module", "angle");
            var rec = poltorec(Number(document.getElementById("module").value), Number(document.getElementById("angle").value));
            r = rec.real;
            i = rec.imaginaria;
        }else{
            verificacao = verifica("real", "imaginary");
            r = Number(document.getElementById("real").value);
            i = Number(document.getElementById("imaginary").value);
        }
        if(radio1.value === "pol"){
            verificacao1 = verifica("module1", "angle1");
            var rec = poltorec(Number(document.getElementById("module1").value), Number(document.getElementById("angle1").value));
            r1 = rec.real;
            i1 = rec.imaginaria;
        }else{
            verificacao1 = verifica("real1", "imaginary1");
            r1 = Number(document.getElementById("real1").value);
            i1 = Number(document.getElementById("imaginary1").value);
        }
        if(verificacao == false || verificacao1 == false){
            alert("Preencha todos os campos corretamente ou o seu resultado pode ter alterações!");
        }
        var result = rec_plus_rec(r, i, r1, i1);
        document.getElementById("resultArea").value = result;
    }catch{
        alert("Preencha todos os campos corretamente!");
    }
}

function minus(){
    cleanErrors();
    var radio = document.querySelector("input[name=flexRadio]:checked");
    var radio1 = document.querySelector("input[name=flexRadio1]:checked");
    var r;
    var i;
    var r1;
    var i1;
    var verificacao = true;
    var verificacao1 = true;

    try{
        if(radio.value === "pol"){
            verificacao = verifica("module", "angle");
            var rec = poltorec(Number(document.getElementById("module").value), Number(document.getElementById("angle").value));
            r = rec.real;
            i = rec.imaginaria;
        }else{
            verificacao = verifica("real", "imaginary");
            r = Number(document.getElementById("real").value);
            i = Number(document.getElementById("imaginary").value);
        }
        if(radio1.value === "pol"){
            verificacao1 = verifica("module1", "angle1");
            var rec = poltorec(Number(document.getElementById("module1").value), Number(document.getElementById("angle1").value));
            r1 = rec.real;
            i1 = rec.imaginaria;
        }else{
            verificacao1 = verifica("real1", "imaginary1");
            r1 = Number(document.getElementById("real1").value);
            i1 = Number(document.getElementById("imaginary1").value);
        }
        if(verificacao == false || verificacao1 == false){
            alert("Preencha todos os campos corretamente ou o seu resultado pode ter alterações!");
        }
        var result = rec_minus_rec(r, i, r1, i1);
        document.getElementById("resultArea").value = result;
    }catch{
        alert("Preencha todos os campos corretamente!");
    }
}

function mult(){
    cleanErrors();
    var radio = document.querySelector("input[name=flexRadio]:checked");
    var radio1 = document.querySelector("input[name=flexRadio1]:checked");
    var r;
    var i;
    var r1;
    var i1;
    var verificacao = true;
    var verificacao1 = true;

    try{
        if(radio.value === "rec"){
            verificacao = verifica("real", "imaginary");
            var rec = rectopol(Number(document.getElementById("real").value), Number(document.getElementById("imaginary").value));
            r = rec.modulo;
            i = rec.angulo;
        }else{
            verificacao = verifica("module", "angle");
            r = Number(document.getElementById("module").value);
            i = Number(document.getElementById("angle").value);
        }
        if(radio1.value === "rec"){
            verificacao1 = verifica("real1", "imaginary1");
            var rec = rectopol(Number(document.getElementById("real1").value), Number(document.getElementById("imaginary1").value));
            r1 = rec.modulo;
            i1 = rec.angulo;
        }else{
            verificacao1 = verifica("module1", "angle1");
            r1 = Number(document.getElementById("module1").value);
            i1 = Number(document.getElementById("angle1").value);
        }
        if(verificacao == false || verificacao1 == false){
            alert("Preencha todos os campos corretamente ou o seu resultado pode ter alterações!");
        }
        var result = pol_x_pol(r, i, r1, i1);
        document.getElementById("resultArea").value = result;
    }catch{
        alert("Preencha todos os campos corretamente!");
    }
}

function div(){
    cleanErrors();
    var radio = document.querySelector("input[name=flexRadio]:checked");
    var radio1 = document.querySelector("input[name=flexRadio1]:checked");
    var r;
    var i;
    var r1;
    var i1;
    var verificacao = true;
    var verificacao1 = true;

    try{
        if(radio.value === "rec"){
            verificacao = verifica("real", "imaginary");
            var rec = rectopol(Number(document.getElementById("real").value), Number(document.getElementById("imaginary").value));
            r = rec.modulo;
            i = rec.angulo;
        }else{
            verificacao = verifica("module", "angle");
            r = Number(document.getElementById("module").value);
            i = Number(document.getElementById("angle").value);
        }
        if(radio1.value === "rec"){
            verificacao1 = verifica("real1", "imaginary1");
            var rec = rectopol(Number(document.getElementById("real1").value), Number(document.getElementById("imaginary1").value));
            r1 = rec.modulo;
            i1 = rec.angulo;
        }else{
            verificacao1 = verifica("module1", "angle1");
            r1 = Number(document.getElementById("module1").value);
            i1 = Number(document.getElementById("angle1").value);
        }
        if(verificacao == false || verificacao1 == false){
            alert("Preencha todos os campos corretamente ou o seu resultado pode ter alterações!");
        }
        var result = pol_div_pol(r, i, r1, i1);
        document.getElementById("resultArea").value = result;
    }catch{
        alert("Preencha todos os campos corretamente!");
    }
}

function convRecToPol(){
    var r = document.getElementById("real");
    var i = document.getElementById("imaginary");
    var z = document.getElementById("module");
    var a = document.getElementById("angle");

    var pol = rectopol(Number(r.value), Number(i.value));

    z.value = pol.modulo.toFixed(4);
    a.value = pol.angulo.toFixed(4);
}

function convPolToRec(){
    var r = document.getElementById("real1");
    var i = document.getElementById("imaginary1");
    var z = document.getElementById("module1");
    var a = document.getElementById("angle1");

    var rec = poltorec(Number(z.value), Number(a.value));

    r.value = rec.real.toFixed(4);
    i.value = rec.imaginaria.toFixed(4);
}