const fs = require('fs');
const path = require('path');
const secretFolder = path.join(__dirname, 'secret-folder');

fs.readdir(secretFolder, (err, file) => {
  if (err) {
    throw err;
  }
  for (let i = 0; i < file.length; i++) {
    fs.stat(path.join(secretFolder, file[i]), (_, stat) => {
      if (stat.isFile()) {
        const fileInfo = path.parse(file[i]);
        console.log(`${fileInfo.name} - ${fileInfo.ext.slice(1)} - ${stat.size / 1024}kb`)
      }
    });
  }
});
