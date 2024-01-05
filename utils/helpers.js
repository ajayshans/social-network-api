// Format date as MM/DD/YYYY
const formatDate = (date) => {
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}

module.exports = {
    formatDate
}