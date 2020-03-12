const socket = io();


socket.on('resultado:server', function (nsl,logg) {   
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
        }else{
            document.getElementById(attest).innerHTML = "OK"
            document.getElementById(attcirc).className = "circulo-verde"
            document.getElementById(attfila).className = "row black-text green lighten-4"
        } 
              
    });
    
    
    
});