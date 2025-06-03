require('dotenv').config();
const messageQueue = require('./jobs/messageProcessor');

console.log('Message processing worker started');
console.log('Waiting for messages...'); 