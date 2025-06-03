const crypto = require('crypto');

/**
 * Calculate signature for AmoCRM API requests
 * @param {string} secret - Secret key for signature calculation
 * @param {string} method - HTTP method
 * @param {string} checksum - MD5 hash of the request body
 * @param {string} contentType - Content type of the request
 * @param {string} date - RFC2822 formatted date
 * @param {string} path - API endpoint path
 * @returns {string} Calculated signature
 */
function calculateSignature(secret, method, checksum, contentType, date, path) {
    const str = [
        method.toUpperCase(),
        checksum,
        contentType,
        date,
        path
    ].join('\n');

    return crypto.createHmac('sha1', secret)
        .update(str)
        .digest('hex')
        .toLowerCase();
}

/**
 * Calculate MD5 hash of a string
 * @param {string} data - Data to hash
 * @returns {string} MD5 hash
 */
function calculateMD5(data) {
    return crypto.createHash('md5')
        .update(data)
        .digest('hex')
        .toLowerCase();
}

/**
 * Verify webhook signature
 * @param {string} secret - Secret key for signature verification
 * @param {string} signature - Signature to verify
 * @param {object|string} body - Request body
 * @returns {boolean} True if signature is valid
 */
function verifyWebhookSignature(secret, signature, body) {
    if (!signature) {
        throw new Error('Missing signature');
    }

    const data = typeof body === 'string' ? body : JSON.stringify(body);
    const calculatedSignature = crypto
        .createHmac('sha1', secret)
        .update(data)
        .digest('hex');

    if (signature !== calculatedSignature) {
        throw new Error('Invalid signature');
    }

    return true;
}

module.exports = {
    calculateSignature,
    calculateMD5,
    verifyWebhookSignature
}; 