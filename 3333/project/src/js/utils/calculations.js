// Calculation utilities
export function calculateDiscount(price, discountPercent) {
    return (price * discountPercent) / 100;
}

export function calculateRowTotal(qty, price, discountAmount) {
    return (price - discountAmount) * qty;
}

export function formatNumber(number) {
    return number.toFixed(2);
}