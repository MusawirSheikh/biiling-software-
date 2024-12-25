import { calculateDiscount, calculateRowTotal, formatNumber } from '../utils/calculations.js';

export function addRow() {
    const tbody = document.getElementById('invoiceBody');
    const row = tbody.insertRow();
    
    row.innerHTML = `
        <td><input type="text" class="description" placeholder="Item description"></td>
        <td><input type="number" class="qty" value="0" min="0"></td>
        <td><input type="number" class="price" value="0" min="0" step="0.01"></td>
        <td><input type="number" class="discount-percent" value="0" min="0" max="100" step="0.1"></td>
        <td class="discount-amount">0.00</td>
        <td class="total">0.00</td>
        <td>
            <button class="delete-btn" onclick="window.deleteRow(this)">×</button>
        </td>
    `;

    attachRowListeners(row);
    return row;
}

export function calculateRow(row) {
    const qty = parseFloat(row.querySelector('.qty').value) || 0;
    const price = parseFloat(row.querySelector('.price').value) || 0;
    const discountPercent = parseFloat(row.querySelector('.discount-percent').value) || 0;
    
    const discountAmount = calculateDiscount(price, discountPercent);
    const total = calculateRowTotal(qty, price, discountAmount);
    
    row.querySelector('.discount-amount').textContent = formatNumber(discountAmount);
    row.querySelector('.total').textContent = formatNumber(total);
    
    return { discountAmount, total };
}

function attachRowListeners(row) {
    const inputs = row.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            calculateRow(row);
            updateTotals();
        });
    });
}

export function updateTotals() {
    let subtotal = 0;
    let totalDiscount = 0;
    
    document.querySelectorAll('#invoiceBody tr').forEach(row => {
        const qty = parseFloat(row.querySelector('.qty').value) || 0;
        const price = parseFloat(row.querySelector('.price').value) || 0;
        const discountAmount = parseFloat(row.querySelector('.discount-amount').textContent) || 0;
        
        subtotal += qty * price;
        totalDiscount += discountAmount * qty;
    });
    
    const prevBalance = parseFloat(document.getElementById('prevBalance').value) || 0;
    const grandTotal = subtotal - totalDiscount + prevBalance;
    
    document.getElementById('subtotal').textContent = formatNumber(subtotal);
    document.getElementById('totalDiscount').textContent = formatNumber(totalDiscount);
    document.getElementById('grandTotal').textContent = formatNumber(grandTotal);
}