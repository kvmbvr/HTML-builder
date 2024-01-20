const fs = require('fs');
const path = require('path');

const origFolder = path.join(__dirname, 'files');
const copyFolder = path.join(__dirname, 'files-copy');

fs.mkdir(copyFolder, () => {
  fs.readdir(origFolder, (_, file) => {
    for (let i = 0; i < file.length; i++) {
      fs.copyFile(path.join(origFolder, file[i]), path.join(copyFolder, file[i]), (err, _) => {
        if (err) {
          throw err;
        }
      });
    }
  });
});
