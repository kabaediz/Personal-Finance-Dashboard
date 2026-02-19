import state from './state.js';
import { loadExpensesFromJSON, loadFromLocalStorage } from './api.js';
import { initCharts, updateCharts, updateChartThemes } from './charts.js';
import { initUI, updateStatistics, updateExpensesTable } from './ui.js';
import { initTheme } from './theme.js';

async function initApp() {
    try {
        initTheme();

        let expenses = loadFromLocalStorage();

        if (!expenses || expenses.length === 0) {
            expenses = await loadExpensesFromJSON();
        }

        state.init(expenses);
        initUI();
        initCharts();

        updateStatistics();
        updateExpensesTable();
        updateCharts();

        window.addEventListener('themechange', () => {
            updateChartThemes();
        });
    } catch (error) {
        console.error('Error initializing application:', error);
        const main = document.querySelector('main');
        if (main) {
            main.innerHTML = `
                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong class="font-bold">Fehler!</strong>
                    <span class="block sm:inline"> Die Anwendung konnte nicht initialisiert werden. Bitte laden Sie die Seite neu.</span>
                </div>
            `;
        }
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
