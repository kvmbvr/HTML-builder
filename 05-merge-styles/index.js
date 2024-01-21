const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, 'project-dist');
const stylesPath = path.join(__dirname, 'styles');

const bundle = fs.createWriteStream(path.join(distPath, 'bundle.css'));

fs.readdir(stylesPath, (_, files) => {
  for(let i = 0; i < files.length; i++) {
    if(path.extname(files[i]) === '.css') {
      const rs = fs.createReadStream(path.join(stylesPath, files[i]), 'utf-8')
      rs.on('data', (chunk) => bundle.write(chunk))
    }
  }
})