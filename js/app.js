/**
 * Main Application Entry Point
 * Coordinates all modules and initializes the application
 */

import state from './state.js';
import { loadExpensesFromJSON, loadFromLocalStorage } from './api.js';
import { initCharts, updateCharts, updateChartThemes } from './charts.js';
import { initUI, updateStatistics, updateExpensesTable } from './ui.js';
import { initTheme } from './theme.js';

/**
 * Initialize the application
 */
async function initApp() {
    try {
        // Initialize theme
        initTheme();

        // Try to load from localStorage first
        let expenses = loadFromLocalStorage();

        // If no localStorage data, load from JSON file
        if (!expenses || expenses.length === 0) {
            expenses = await loadExpensesFromJSON();
        }

        // Initialize state with expenses
        state.init(expenses);

        // Initialize UI components
        initUI();

        // Initialize charts
        initCharts();

        // Initial render
        updateStatistics();
        updateExpensesTable();
        updateCharts();

        // Listen for theme changes to update charts
        window.addEventListener('themechange', () => {
            updateChartThemes();
        });

        console.log('✓ Personal Finance Dashboard initialized successfully');
    } catch (error) {
        console.error('Error initializing application:', error);
        
        // Show error message to user
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

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
