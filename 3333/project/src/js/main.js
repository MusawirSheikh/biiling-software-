import { setTodayDate } from './utils/dateUtils.js';
import { addRow, updateTotals } from './components/invoice.js';

// Initialize
setTodayDate('invoiceDate');
addRow();

// Global handlers
window.addItem = addRow;
window.deleteRow = function(button) {
    const row = button.closest('tr');
    row.remove();
    updateTotals();
};

window.printInvoice = function() {
    window.print();
};

window.cancelInvoice = function() {
    if (confirm('Are you sure you want to cancel this invoice? All data will be lost.')) {
        document.getElementById('invoiceBody').innerHTML = '';
        document.getElementById('customerName').value = '';
        document.getElementById('customerAddress').value = '';
        document.getElementById('prevBalance').value = '0';
        updateTotals();
        addRow();
    }
};

// Event Listeners
document.getElementById('addItem').addEventListener('click', addRow);
document.getElementById('prevBalance').addEventListener('input', updateTotals);