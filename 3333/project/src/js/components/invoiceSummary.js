import { calculateRowTotal, formatCurrency } from '../utils/calculations.js';

export function updateTotalCalculations() {
  let subtotal = 0;
  let totalDiscount = 0;
  const rows = document.querySelectorAll('#invoiceBody tr');
  
  rows.forEach(row => {
    const qty = parseFloat(row.querySelector('.qty').value) || 0;
    const price = parseFloat(row.querySelector('.price').value) || 0;
    const discount = parseFloat(row.querySelector('.discount').value) || 0;
    
    const { subtotal: rowSubtotal, discountAmount } = calculateRowTotal(qty, price, discount);
    subtotal += rowSubtotal;
    totalDiscount += discountAmount;
  });
  
  const prevBalance = parseFloat(document.getElementById('prevBalance').value) || 0;
  const grandTotal = subtotal - totalDiscount + prevBalance;
  
  document.getElementById('subtotal').textContent = formatCurrency(subtotal);
  document.getElementById('totalDiscount').textContent = formatCurrency(totalDiscount);
  document.getElementById('grandTotal').textContent = formatCurrency(grandTotal);
}