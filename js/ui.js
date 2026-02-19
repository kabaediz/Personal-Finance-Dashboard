/**
 * UI Module
 * Handles DOM manipulation and UI updates
 */

import state from './state.js';
import { exportToCSV, downloadFile, saveToLocalStorage } from './api.js';

/**
 * Initialize UI event listeners
 */
export function initUI() {
    // Expense form submission
    const expenseForm = document.getElementById('expense-form');
    if (expenseForm) {
        expenseForm.addEventListener('submit', handleExpenseSubmit);
        
        // Set today's date as default
        const dateInput = document.getElementById('expense-date');
        if (dateInput) {
            dateInput.valueAsDate = new Date();
        }
    }

    // Filter controls
    const periodSelect = document.getElementById('period-select');
    if (periodSelect) {
        periodSelect.addEventListener('change', handlePeriodChange);
    }

    const applyFilterBtn = document.getElementById('apply-filter');
    if (applyFilterBtn) {
        applyFilterBtn.addEventListener('click', handleApplyFilter);
    }

    // CSV export
    const exportBtn = document.getElementById('export-csv');
    if (exportBtn) {
        exportBtn.addEventListener('click', handleExportCSV);
    }

    // Subscribe to state changes
    state.subscribe(() => {
        updateStatistics();
        updateExpensesTable();
        // Save to localStorage whenever state changes
        saveToLocalStorage(state.getAllExpenses());
    });
}

/**
 * Handle expense form submission
 * @param {Event} e - Submit event
 */
function handleExpenseSubmit(e) {
    e.preventDefault();

    const description = document.getElementById('expense-description').value;
    const amount = document.getElementById('expense-amount').value;
    const category = document.getElementById('expense-category').value;
    const date = document.getElementById('expense-date').value;

    // Add expense to state
    state.addExpense({
        description,
        amount: parseFloat(amount),
        category,
        date
    });

    // Reset form
    e.target.reset();
    
    // Set date back to today
    document.getElementById('expense-date').valueAsDate = new Date();

    // Show success message
    showToast('Ausgabe erfolgreich hinzugefügt!', 'success');
}

/**
 * Handle period selection change
 * @param {Event} e - Change event
 */
function handlePeriodChange(e) {
    const period = e.target.value;
    const customDateRange = document.getElementById('custom-date-range');

    if (period === 'custom') {
        customDateRange.classList.remove('hidden');
    } else {
        customDateRange.classList.add('hidden');
        // Apply filter immediately for predefined periods
        state.updateFilter({ period });
    }
}

/**
 * Handle apply filter button click
 */
function handleApplyFilter() {
    const period = document.getElementById('period-select').value;
    
    if (period === 'custom') {
        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;

        if (!startDate || !endDate) {
            showToast('Bitte wählen Sie ein Start- und Enddatum', 'error');
            return;
        }

        if (new Date(startDate) > new Date(endDate)) {
            showToast('Startdatum muss vor Enddatum liegen', 'error');
            return;
        }

        state.updateFilter({ period, startDate, endDate });
    } else {
        state.updateFilter({ period });
    }

    showToast('Filter angewendet', 'success');
}

/**
 * Handle CSV export
 */
function handleExportCSV() {
    const expenses = state.getFilteredExpenses();
    
    if (expenses.length === 0) {
        showToast('Keine Daten zum Exportieren vorhanden', 'error');
        return;
    }

    const csv = exportToCSV(expenses);
    const timestamp = new Date().toISOString().split('T')[0];
    downloadFile(csv, `ausgaben_${timestamp}.csv`, 'text/csv');
    
    showToast('CSV-Export erfolgreich!', 'success');
}

/**
 * Update statistics display
 */
export function updateStatistics() {
    const stats = state.getStatistics();

    const totalElement = document.getElementById('total-expenses');
    const countElement = document.getElementById('transaction-count');
    const avgElement = document.getElementById('avg-per-day');

    if (totalElement) {
        totalElement.textContent = `€${stats.total.toFixed(2)}`;
    }

    if (countElement) {
        countElement.textContent = stats.count;
    }

    if (avgElement) {
        avgElement.textContent = `€${stats.avgPerDay.toFixed(2)}`;
    }
}

/**
 * Update expenses table
 */
export function updateExpensesTable() {
    const tbody = document.getElementById('expenses-table-body');
    if (!tbody) return;

    const expenses = state.getFilteredExpenses();

    // Clear existing rows
    tbody.innerHTML = '';

    if (expenses.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="px-6 py-8">
                    <div class="empty-state">
                        <i class="fas fa-inbox"></i>
                        <p class="text-lg font-medium">Keine Ausgaben gefunden</p>
                        <p class="text-sm">Fügen Sie Ihre erste Ausgabe hinzu oder ändern Sie den Filter</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    // Sort by date (newest first)
    const sortedExpenses = [...expenses].sort((a, b) => 
        new Date(b.date) - new Date(a.date)
    );

    // Create table rows
    sortedExpenses.forEach(expense => {
        const row = createExpenseRow(expense);
        tbody.appendChild(row);
    });
}

/**
 * Create a table row for an expense
 * @param {Object} expense - Expense object
 * @returns {HTMLElement} Table row element
 */
function createExpenseRow(expense) {
    const tr = document.createElement('tr');
    
    // Format date
    const date = new Date(expense.date);
    const formattedDate = date.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    // Get category color
    const categoryColors = {
        'Lebensmittel': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        'Miete': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        'Freizeit': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
        'Transport': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
        'Gesundheit': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
        'Bildung': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300',
        'Sonstiges': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    };

    const categoryClass = categoryColors[expense.category] || categoryColors['Sonstiges'];

    tr.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
            ${formattedDate}
        </td>
        <td class="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
            ${expense.description}
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <span class="category-badge ${categoryClass}">
                ${expense.category}
            </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900 dark:text-gray-100">
            €${expense.amount.toFixed(2)}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-center text-sm">
            <button class="delete-btn" data-id="${expense.id}">
                <i class="fas fa-trash"></i> Löschen
            </button>
        </td>
    `;

    // Add delete button event listener
    const deleteBtn = tr.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => handleDeleteExpense(expense.id));

    return tr;
}

/**
 * Handle expense deletion
 * @param {number} id - Expense ID to delete
 */
function handleDeleteExpense(id) {
    if (confirm('Möchten Sie diese Ausgabe wirklich löschen?')) {
        state.deleteExpense(id);
        showToast('Ausgabe gelöscht', 'success');
    }
}

/**
 * Show toast notification
 * @param {string} message - Message to display
 * @param {string} type - Type of toast ('success' or 'error')
 */
export function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'error' : ''}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'} mr-2"></i>
        ${message}
    `;

    document.body.appendChild(toast);

    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}
