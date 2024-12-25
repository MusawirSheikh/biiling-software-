// Initialize the invoice date to today
document.getElementById('invoiceDate').valueAsDate = new Date();

// Add item button functionality
document.getElementById('addItem').addEventListener('click', addRow);

function addRow() {
    const tbody = document.getElementById('invoiceBody');
    const row = tbody.insertRow();
    
    row.innerHTML = `
        <td><input type="text" class="description" placeholder="Item description"></td>
        <td><input type="number" class="qty" value="0" min="0"></td>
        <td><input type="number" class="price" value="0" min="0"></td>
        <td><input type="number" class="discount-percent" value="0" min="0" max="100"></td>
        <td class="discount-amount">0.00</td>
        <td class="total">0.00</td>
    `;

    // Add event listeners to new inputs
    const inputs = row.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', () => calculateRow(row));
    });
}

function calculateRow(row) {
    const qty = parseFloat(row.querySelector('.qty').value) || 0;
    const price = parseFloat(row.querySelector('.price').value) || 0;
    const discountPercent = parseFloat(row.querySelector('.discount-percent').value) || 0;
    
    const subtotal = qty * price;
    const discountAmount = (subtotal * discountPercent) / 100;
    const total = subtotal - discountAmount;
    
    row.querySelector('.discount-amount').textContent = discountAmount.toFixed(2);
    row.querySelector('.total').textContent = total.toFixed(2);
    
    calculateTotals();
}

function calculateTotals() {
    let subtotal = 0;
    let totalDiscount = 0;
    const rows = document.querySelectorAll('#invoiceBody tr');
    
    rows.forEach(row => {
        const qty = parseFloat(row.querySelector('.qty').value) || 0;
        const price = parseFloat(row.querySelector('.price').value) || 0;
        const discountAmount = parseFloat(row.querySelector('.discount-amount').textContent) || 0;
        
        subtotal += qty * price;
        totalDiscount += discountAmount;
    });
    
    const prevBalance = parseFloat(document.getElementById('prevBalance').value) || 0;
    const grandTotal = subtotal - totalDiscount + prevBalance;
    
    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('totalDiscount').textContent = totalDiscount.toFixed(2);
    document.getElementById('grandTotal').textContent = grandTotal.toFixed(2);
}

// Add initial row
addRow();

// Add event listener for previous balance
document.getElementById('prevBalance').addEventListener('input', calculateTotals);