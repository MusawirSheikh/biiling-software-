import { calculateRowTotal, formatCurrency } from '../utils/calculations.js';

export function createRow() {
  const tbody = document.getElementById('invoiceBody');
  const row = tbody.insertRow();
  
  row.innerHTML = `
    <td><input type="text" class="description" placeholder="Item description"></td>
    <td><input type="number" class="qty" value="0" onchange="window.handleRowChange(this)"></td>
    <td><input type="number" class="price" value="0" onchange="window.handleRowChange(this)"></td>
    <td><input type="number" class="discount" value="0" onchange="window.handleRowChange(this)"></td>
    <td class="total">$0.00</td>
    <td><button class="delete-btn" onclick="window.handleDeleteRow(this)">×</button></td>
  `;
}

export function updateRowCalculations(row) {
  const qty = parseFloat(row.querySelector('.qty').value) || 0;
  const price = parseFloat(row.querySelector('.price').value) || 0;
  const discount = parseFloat(row.querySelector('.discount').value) || 0;
  
  const { total } = calculateRowTotal(qty, price, discount);
  row.querySelector('.total').textContent = formatCurrency(total);
}