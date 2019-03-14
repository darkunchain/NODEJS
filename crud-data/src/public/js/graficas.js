

var canvas = document.getElementById("bars");
var ctx = canvas.getContext('2d');
        var datax = [];
        var datay = [];          
        
        const size = coordenadas.length;  
        console.log(size);         
        for (var i=0; i < size; i++) {        
        i + 1;        
        //datax.push("<%= coords[i] %>");
        //datay.push("<%= coords[i] %>");      
        
        };

        var myChart = new Chart(ctx, {            
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: 'Valor de x cotra y',
                    data: [],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });