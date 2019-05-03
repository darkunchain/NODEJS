const socket = io();

var sitios = document.getElementById('sitio');
var ips = document.getElementById('ip');
var estado = document.getElementById('estado');
var logg = [];


socket.on('resultado:server', function (nsl) {      
    nsl.forEach(function (item, index) {       
        var attsitio = 'sitio' + index;
        var attip = 'ip' + index;
        var attest = 'estado' + index;
        var attcirc = 'circ' + index;
        var attfila = 'fila' + index;
        document.getElementById(attsitio).innerHTML = item.sitio
        document.getElementById(attip).innerHTML = item.ip
        if(item.estado==0){
            document.getElementById(attest).innerHTML = "FALLÓ"
            document.getElementById(attcirc).className = "circulo-rojo"
            document.getElementById(attfila).className = "row white-text red accent-4"
            var date = new Date()
            var fechahora = date.getFullYear() +"-"+ date.getDate()+"-"+ date.getMonth() +" "+ date.getHours() +":"+date.getMinutes()+":"+date.getSeconds();   
            var dat = { fecha: fechahora, sitio: item.sitio, ip: item.ip};
            logg.push(dat);
        }else{
            document.getElementById(attest).innerHTML = "OK"
            document.getElementById(attcirc).className = "circulo-verde"
            document.getElementById(attfila).className = "row black-text green lighten-4"
        } 
              
    });
    console.log(logg) 
    logg.forEach(function (item, index) {
        var child = document.createElement('div')
        var elem = document.getElementById('logfila')
        var creado = elem.appendChild(child)
        var indice = "log" + index
        creado.id = indice        
        var datalog = item.fecha + " ; " + item.sitio + " ; " + item.ip
        document.getElementById(indice).innerHTML = datalog

    });
    
});