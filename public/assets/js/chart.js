const ctx = document.getElementById('myChart');
const myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Taxes', 'Retirement', 'Take Home'],
        datasets: [{
            label: 'Pay',
            data: [99.77, 8.41, 685.26],
            backgroundColor: [
                'rgb(231, 11, 91)',
                'rgb(234, 111, 11)',
                'rgb(34, 170, 34)',
            ],
            borderColor: [
                'rgb(231, 11, 91)',
                'rgb(234, 111, 11)',
                'rgb(34, 170, 34)',
            ],
            borderWidth: 1
        }]
    },
});