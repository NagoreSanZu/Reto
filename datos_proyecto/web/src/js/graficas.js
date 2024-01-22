document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('grafica');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
        datasets: [{
          label: 'Precipitación',
          data: [9, 4, 5, 7, 8, 2],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            ticks: {
              color: 'white',
              font: {
                size: 12,
                family: 'Outfit, sans-serif',
                weight: 200
              },
              textShadow: '0 0 4px rgb(3, 3, 3)'
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: 'white',
              font: {
                size: 5,
                family: 'Outfit, sans-serif',
                weight: 200
              },
              textShadow: '0 0 4px rgb(3, 3, 3)'
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: 'white',
              fontSize: 14,
              fontFamily: 'Outfit, sans-serif',
              textShadow: '0 0 4px rgb(3, 3, 3)',
              fontStyle: 'light'
            }
          }
        }
      }
    });
  });
  