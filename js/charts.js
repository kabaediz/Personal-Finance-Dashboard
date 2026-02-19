import state from './state.js';

let pieChart = null;
let barChart = null;

const categoryColors = {
    'Lebensmittel': '#10B981',  // Green
    'Miete': '#3B82F6',         // Blue
    'Freizeit': '#F59E0B',      // Amber
    'Transport': '#8B5CF6',     // Purple
    'Gesundheit': '#EF4444',    // Red
    'Bildung': '#06B6D4',       // Cyan
    'Sonstiges': '#6B7280'      // Gray
};

export function initPieChart() {
    const ctx = document.getElementById('category-pie-chart');
    if (!ctx) return;

    const isDarkMode = document.documentElement.classList.contains('dark');
    const textColor = isDarkMode ? '#E5E7EB' : '#1F2937';
    const gridColor = isDarkMode ? '#374151' : '#E5E7EB';

    pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [],
                borderColor: isDarkMode ? '#1F2937' : '#FFFFFF',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: textColor,
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: €${value.toFixed(2)} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });

    updatePieChart();
}

export function updatePieChart() {
    if (!pieChart) return;

    const expensesByCategory = state.getExpensesByCategory();
    const labels = Object.keys(expensesByCategory);
    const data = Object.values(expensesByCategory);
    const colors = labels.map(label => categoryColors[label] || categoryColors['Sonstiges']);

    pieChart.data.labels = labels;
    pieChart.data.datasets[0].data = data;
    pieChart.data.datasets[0].backgroundColor = colors;
    pieChart.update();
}

export function initBarChart() {
    const ctx = document.getElementById('timeline-bar-chart');
    if (!ctx) return;

    const isDarkMode = document.documentElement.classList.contains('dark');
    const textColor = isDarkMode ? '#E5E7EB' : '#1F2937';
    const gridColor = isDarkMode ? '#374151' : '#E5E7EB';

    barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Ausgaben (€)',
                data: [],
                backgroundColor: '#3B82F6',
                borderColor: '#2563EB',
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Ausgaben: €${context.parsed.y.toFixed(2)}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: gridColor
                    },
                    ticks: {
                        color: textColor,
                        maxRotation: 45,
                        minRotation: 45
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: gridColor
                    },
                    ticks: {
                        color: textColor,
                        callback: function(value) {
                            return '€' + value.toFixed(0);
                        }
                    }
                }
            }
        }
    });

    updateBarChart();
}

export function updateBarChart() {
    if (!barChart) return;

    const expensesByDate = state.getExpensesByDate();
    
    const sortedDates = Object.keys(expensesByDate).sort();
    const limitedDates = sortedDates.slice(-15);
    
    const labels = limitedDates.map(date => {
        const d = new Date(date);
        return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
    });
    
    const data = limitedDates.map(date => expensesByDate[date]);

    barChart.data.labels = labels;
    barChart.data.datasets[0].data = data;
    barChart.update();
}

export function updateCharts() {
    updatePieChart();
    updateBarChart();
}

export function updateChartThemes() {
    const isDarkMode = document.documentElement.classList.contains('dark');
    const textColor = isDarkMode ? '#E5E7EB' : '#1F2937';
    const gridColor = isDarkMode ? '#374151' : '#E5E7EB';
    const borderColor = isDarkMode ? '#1F2937' : '#FFFFFF';

    if (pieChart) {
        pieChart.options.plugins.legend.labels.color = textColor;
        pieChart.data.datasets[0].borderColor = borderColor;
        pieChart.update();
    }

    if (barChart) {
        barChart.options.scales.x.grid.color = gridColor;
        barChart.options.scales.x.ticks.color = textColor;
        barChart.options.scales.y.grid.color = gridColor;
        barChart.options.scales.y.ticks.color = textColor;
        barChart.update();
    }
}

export function initCharts() {
    initPieChart();
    initBarChart();
}
