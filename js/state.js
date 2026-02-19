/**
 * State Management Module
 * Manages the application state including expenses data and filters
 */

class State {
    constructor() {
        this.expenses = [];
        this.filteredExpenses = [];
        this.currentFilter = {
            period: 'current-month',
            startDate: null,
            endDate: null
        };
        this.listeners = [];
        this.nextId = 1;
    }

    /**
     * Initialize state with expenses data
     * @param {Array} expenses - Array of expense objects
     */
    init(expenses) {
        this.expenses = expenses;
        this.nextId = expenses.length > 0 ? Math.max(...expenses.map(e => e.id)) + 1 : 1;
        this.applyFilter();
    }

    /**
     * Add a new expense
     * @param {Object} expense - Expense object to add
     */
    addExpense(expense) {
        const newExpense = {
            ...expense,
            id: this.nextId++,
            amount: parseFloat(expense.amount)
        };
        this.expenses.push(newExpense);
        this.applyFilter();
        this.notify();
    }

    /**
     * Delete an expense by ID
     * @param {number} id - Expense ID to delete
     */
    deleteExpense(id) {
        this.expenses = this.expenses.filter(e => e.id !== id);
        this.applyFilter();
        this.notify();
    }

    /**
     * Update filter settings
     * @param {Object} filter - Filter configuration
     */
    updateFilter(filter) {
        this.currentFilter = { ...this.currentFilter, ...filter };
        this.applyFilter();
        this.notify();
    }

    /**
     * Apply current filter to expenses
     */
    applyFilter() {
        const { startDate, endDate } = this.getFilterDates();
        
        this.filteredExpenses = this.expenses.filter(expense => {
            const expenseDate = new Date(expense.date);
            return expenseDate >= startDate && expenseDate <= endDate;
        });
    }

    /**
     * Calculate start and end dates based on current filter
     * @returns {Object} Object with startDate and endDate
     */
    getFilterDates() {
        const now = new Date();
        let startDate, endDate;

        switch (this.currentFilter.period) {
            case 'current-month':
                startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
                break;
            
            case 'last-month':
                startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
                endDate = new Date(now.getFullYear(), now.getMonth(), 0);
                break;
            
            case 'current-quarter':
                const currentQuarter = Math.floor(now.getMonth() / 3);
                startDate = new Date(now.getFullYear(), currentQuarter * 3, 1);
                endDate = new Date(now.getFullYear(), (currentQuarter + 1) * 3, 0);
                break;
            
            case 'last-quarter':
                const lastQuarter = Math.floor(now.getMonth() / 3) - 1;
                const year = lastQuarter < 0 ? now.getFullYear() - 1 : now.getFullYear();
                const quarter = lastQuarter < 0 ? 3 : lastQuarter;
                startDate = new Date(year, quarter * 3, 1);
                endDate = new Date(year, (quarter + 1) * 3, 0);
                break;
            
            case 'current-year':
                startDate = new Date(now.getFullYear(), 0, 1);
                endDate = new Date(now.getFullYear(), 11, 31);
                break;
            
            case 'custom':
                startDate = this.currentFilter.startDate ? new Date(this.currentFilter.startDate) : new Date(2000, 0, 1);
                endDate = this.currentFilter.endDate ? new Date(this.currentFilter.endDate) : new Date();
                break;
            
            default:
                startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        }

        return { startDate, endDate };
    }

    /**
     * Get filtered expenses
     * @returns {Array} Filtered expenses array
     */
    getFilteredExpenses() {
        return [...this.filteredExpenses];
    }

    /**
     * Get all expenses
     * @returns {Array} All expenses array
     */
    getAllExpenses() {
        return [...this.expenses];
    }

    /**
     * Get statistics for filtered expenses
     * @returns {Object} Statistics object
     */
    getStatistics() {
        const total = this.filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
        const count = this.filteredExpenses.length;
        
        // Calculate days in filter range
        const { startDate, endDate } = this.getFilterDates();
        const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
        const avgPerDay = days > 0 ? total / days : 0;

        return {
            total,
            count,
            avgPerDay,
            days
        };
    }

    /**
     * Get expenses grouped by category
     * @returns {Object} Object with categories as keys and totals as values
     */
    getExpensesByCategory() {
        return this.filteredExpenses.reduce((acc, expense) => {
            acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
            return acc;
        }, {});
    }

    /**
     * Get expenses grouped by date
     * @returns {Object} Object with dates as keys and totals as values
     */
    getExpensesByDate() {
        return this.filteredExpenses.reduce((acc, expense) => {
            acc[expense.date] = (acc[expense.date] || 0) + expense.amount;
            return acc;
        }, {});
    }

    /**
     * Subscribe to state changes
     * @param {Function} listener - Callback function
     */
    subscribe(listener) {
        this.listeners.push(listener);
    }

    /**
     * Notify all listeners of state change
     */
    notify() {
        this.listeners.forEach(listener => listener());
    }
}

// Create and export singleton instance
const state = new State();
export default state;
