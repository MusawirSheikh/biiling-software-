export function formatDate(date) {
    return date.toISOString().split('T')[0];
}

export function setTodayDate(elementId) {
    document.getElementById(elementId).valueAsDate = new Date();
}