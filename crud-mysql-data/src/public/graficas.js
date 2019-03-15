const size = document.getElementById("total").innerHTML;          
          console.log(size);
          var arraydatax = [];
          var arraydatay = [];
          var bg = [];
          for(let i=0;i<size;i++){
            var l = "label" + i;
            var ll = document.getElementById(l).innerHTML;
            arraydatax[i]=ll;
            var d = "valor" + i;
            var dd = document.getElementById(d).innerHTML;
            arraydatay[i]=dd;
            bg[i] = 'rgba('+Math.random(255)+', '+Math.random(255)+', '+Math.random(255)+', 0.2)';

          };
          console.log(arraydatax);
          console.log(arraydatay);

var canvas = document.getElementById("bars");
var ctx = canvas.getContext('2d');     

        var myChart = new Chart(ctx, {            
            type: 'bar',
            data: {
                labels: arraydatax,
                datasets: [{
                    label: 'Valor de x cotra y',
                    data: arraydatay,
                    backgroundColor: bg,
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