const moment = require('moment');

/**
 * Generate a financial report based on user transactions.
 * @param {Array} transactions - List of transactions.
 * @param {Object} filters - Filtering options (startDate, endDate, category, tags).
 * @returns {Object} - Generated report data.
 */
function generateReport(transactions, filters) {
    let filteredTransactions = transactions;

    // Apply date filters
    if (filters.startDate) {
        filteredTransactions = filteredTransactions.filter(t => moment(t.date).isAfter(filters.startDate, 'day'));
    }
    if (filters.endDate) {
        filteredTransactions = filteredTransactions.filter(t => moment(t.date).isBefore(filters.endDate, 'day'));
    }

    // Apply category filter
    if (filters.category) {
        filteredTransactions = filteredTransactions.filter(t => t.category === filters.category);
    }

    // Apply tags filter
    if (filters.tags && filters.tags.length) {
        filteredTransactions = filteredTransactions.filter(t => t.tags.some(tag => filters.tags.includes(tag)));
    }

    // Compute summary
    const totalIncome = filteredTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = filteredTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const netBalance = totalIncome - totalExpense;

    return {
        totalIncome,
        totalExpense,
        netBalance,
        transactions: filteredTransactions
    };
}

function generateCSV(transactions) {
    const fields = ['date', 'type', 'amount', 'category', 'tags', 'notes'];
    const opts = { fields };
    const parser = new Parser(opts);
    return parser.parse(transactions);
}

module.exports = { generateReport, generateCSV };
