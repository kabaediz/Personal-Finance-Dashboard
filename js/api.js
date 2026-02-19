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
        return [];
    }
}

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
        return data.expenses || data;
    } catch (error) {
        console.error('Error loading from API:', error);
        throw error;
    }
}

export function exportToJSON(expenses) {
    return JSON.stringify({ expenses }, null, 2);
}

export function exportToCSV(expenses) {
    if (expenses.length === 0) {
        return '';
    }

    const headers = ['ID', 'Datum', 'Beschreibung', 'Kategorie', 'Betrag'];
    const csvRows = [headers.join(',')];

    expenses.forEach(expense => {
        const row = [
            expense.id,
            expense.date,
            `"${expense.description}"`,
            expense.category,
            expense.amount.toFixed(2)
        ];
        csvRows.push(row.join(','));
    });

    return csvRows.join('\n');
}

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

export function saveToLocalStorage(expenses) {
    try {
        localStorage.setItem('finance-dashboard-expenses', JSON.stringify(expenses));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

export function loadFromLocalStorage() {
    try {
        const data = localStorage.getItem('finance-dashboard-expenses');
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        return null;
    }
}
