/**
 * Generate RFC2822 formatted date
 * @returns {string} RFC2822 formatted date
 */
function getRFC2822Date() {
    return new Date().toUTCString();
}

/**
 * Get current timestamp in seconds
 * @returns {number} Current timestamp in seconds
 */
function getCurrentTimestamp() {
    return Math.floor(Date.now() / 1000);
}

/**
 * Get current timestamp in milliseconds
 * @returns {number} Current timestamp in milliseconds
 */
function getCurrentMsTimestamp() {
    return Date.now();
}

module.exports = {
    getRFC2822Date,
    getCurrentTimestamp,
    getCurrentMsTimestamp
}; 