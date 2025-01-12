// Canvas Context
const ctx = document.getElementById('myChart').getContext('2d');

// Constant CSV data embedded directly
const csvData = `
Month,Category,Subcategory,Complaints,ResolutionTime
January,Road,Potholes,30,15
January,Trash,Overflowing Bins,50,10
February,Road,Cracks,20,12
February,Trash,Garbage Dump,40,8
March,Road,Potholes,25,14
March,Trash,Overflowing Bins,35,9
`;

// Parse the constant CSV data
Papa.parse(csvData, {
    header: true,
    complete: function(results) {
        const data = results.data;

        // Process data for Month vs. Average Resolution Time
        const months = [];
        const resolutionTimes = {};
        const resolutionCounts = {};

        data.forEach(row => {
            const month = row.Month;
            const resolutionTime = parseInt(row.ResolutionTime, 10);

            if (!months.includes(month)) {
                months.push(month);
            }
            if (!resolutionTimes[month]) {
                resolutionTimes[month] = 0;
                resolutionCounts[month] = 0;
            }
            resolutionTimes[month] += resolutionTime;
            resolutionCounts[month] += 1;
        });

        // Calculate average resolution times
        const avgResolutionTimes = months.map(month =>
            resolutionTimes[month] / resolutionCounts[month]
        );

        // Prepare Chart.js data
        const chartData = {
            labels: months,
            datasets: [{
                label: 'Average Resolution Time (in days)',
                data: avgResolutionTimes,
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1,
                borderWidth: 2,
                pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                pointBorderColor: 'rgba(75, 192, 192, 1)',
                pointRadius: 5
            }]
        };

        // Create Chart
        new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Month' // Label for X-axis
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Average Resolution Time (in days)' // Label for Y-axis
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                }
            }
        });
    }
});