//definicion de variables
const size = document.getElementById("total").innerHTML;

var arraydatax = [];
var arraydatay = [];
var arraydatav1 = [];
var arraydatav2 = [];
var arraydatav3 = [];
var bg = [];
var bg1 = [];
var bord = [];
var rand1 = 0;
var rand2 = 0;
var rand3 = 0;

//arreglos para graficar
for (let i = 0; i < size; i++) {
    var l = "label" + i;
    var ll = document.getElementById(l).innerHTML;
    arraydatax[i] = ll;
    var d = "valor" + i;
    var dd = document.getElementById(d).innerHTML;
    arraydatay[i] = dd;
    var v1 = "valor1" + i;
    var vv1 = document.getElementById(v1).innerHTML;
    arraydatav1[i] = vv1;
    var v2 = "valor2" + i;
    var vv2 = document.getElementById(v2).innerHTML;
    arraydatav2[i] = vv2;
    var v3 = "valor3" + i;
    var vv3 = document.getElementById(v3).innerHTML;
    arraydatav3[i] = vv3;
    
    rand1 = Math.round(Math.random() * 255);
    rand2 = Math.round(Math.random() * 255);
    rand3 = Math.round(Math.random() * 255);
    bg[i] = 'rgba(' + rand1 + ', ' + rand2 + ', ' + rand3 + ', 0.2)';
    bord[i] = 'rgba(' + rand1 + ', ' + rand2 + ', ' + rand3 + ', 1)';
};
console.log(arraydatax);
console.log(arraydatay);
console.log(arraydatav1);
console.log(arraydatav2);
console.log(arraydatav3);
//Grafica de barras
var canvas = document.getElementById("bars");
var ctx = canvas.getContext('2d');
var canvas1 = document.getElementById("torta");
var ctx1 = canvas1.getContext('2d');
var canvas2 = document.getElementById("dona");
var ctx2 = canvas2.getContext('2d');
var canvas3 = document.getElementById("otra");
var ctx3 = canvas3.getContext('2d');

var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: arraydatax,
        datasets: [{
            label: 'Valor',
            data: arraydatav3,
            backgroundColor: 'rgba(63,63,191,0.2)',
            borderColor: 'rgba(63,63,191,1)',
            borderWidth: 1
        },{            
            label: 'Valor 1',
            data: arraydatay,
            backgroundColor: 'rgba(127,161,63,0.2)',
            borderColor: 'rgba(127,161,63,1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
        
    }
});


// Grafica de torta (circular)
var myPieChart = new Chart(ctx1, {
    type: 'pie',
    data: {
        labels: arraydatax,
        datasets: [{
            label: 'Valor de x contra y',
            data: arraydatav1,
            backgroundColor: bg,
            borderColor: bord,
            borderWidth: 1
        }]
    },
   
});

// And for a doughnut chart
var myDoughnutChart = new Chart(ctx2, {
    type: 'doughnut',
    data: {
        labels: arraydatax,
        datasets: [{
            label: 'Valor 2',
            data: arraydatav2,
            backgroundColor: bg,
            borderColor: bord,
            borderWidth: 1
        },{
            label: 'Valor 3',
            data: arraydatav3,
            backgroundColor: bg,
            borderColor: bord,
            borderWidth: 1
        }]
    },
   
});

// And for a doughnut chart
var myLineChart = new Chart(ctx3, {
    type: 'line',
    data: {
        labels: arraydatax,
        datasets: [{
            label: 'Valor de x contra y',
            data: arraydatav3,
            backgroundColor: bg,
            borderColor: bord,
            borderWidth: 1
        }]
    },
   
});
