const fs = require('fs');
const path = require('path');
let data = '';

const pathfile = path.join (__dirname, 'text.txt');
const readableStream = fs.createReadStream(pathfile, 'utf-8');

readableStream.on('data', chunk => data += chunk);
readableStream.on('end', () => console.log(data));