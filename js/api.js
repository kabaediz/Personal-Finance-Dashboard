/**
 * API Module
 * Handles data loading from JSON files and REST APIs
 */

/**
 * Load expenses data from JSON file
 * @param {string} url - URL or path to JSON file
 * @returns {Promise<Array>} Promise resolving to expenses array
 */
export async function loadExpensesFromJSON(url = './data/expenses.json') {
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.expenses || [];
    } catch (error) {
        console.error('Error loading expenses:', error);
        // Return empty array if loading fails
        return [];
    }
}

/**
 * Load expenses from REST API
 * @param {string} apiUrl - API endpoint URL
 * @returns {Promise<Array>} Promise resolving to expenses array
 */
export async function loadExpensesFromAPI(apiUrl) {
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`API error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.expenses || data; // Support different response formats
    } catch (error) {
        console.error('Error loading from API:', error);
        throw error;
    }
}

/**
 * Export expenses to JSON string
 * @param {Array} expenses - Expenses array to export
 * @returns {string} JSON string
 */
export function exportToJSON(expenses) {
    return JSON.stringify({ expenses }, null, 2);
}

/**
 * Export expenses to CSV format
 * @param {Array} expenses - Expenses array to export
 * @returns {string} CSV string
 */
export function exportToCSV(expenses) {
    if (expenses.length === 0) {
        return '';
    }

    // CSV header
    const headers = ['ID', 'Datum', 'Beschreibung', 'Kategorie', 'Betrag'];
    const csvRows = [headers.join(',')];

    // Add data rows
    expenses.forEach(expense => {
        const row = [
            expense.id,
            expense.date,
            `"${expense.description}"`, // Quote description in case it contains commas
            expense.category,
            expense.amount.toFixed(2)
        ];
        csvRows.push(row.join(','));
    });

    return csvRows.join('\n');
}

/**
 * Download data as file
 * @param {string} content - File content
 * @param {string} filename - Name of file to download
 * @param {string} mimeType - MIME type of file
 */
export function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

/**
 * Save expenses to localStorage
 * @param {Array} expenses - Expenses array to save
 */
export function saveToLocalStorage(expenses) {
    try {
        localStorage.setItem('finance-dashboard-expenses', JSON.stringify(expenses));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

/**
 * Load expenses from localStorage
 * @returns {Array|null} Expenses array or null if not found
 */
export function loadFromLocalStorage() {
    try {
        const data = localStorage.getItem('finance-dashboard-expenses');
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        return null;
    }
}
