const fs = require('fs');
const path = require('path');
const txtFile = path.join(__dirname, 'text.txt');
const rs = fs.createReadStream(txtFile, 'utf-8');

rs.on('data', (chunk) => {
  console.log(chunk)
});
