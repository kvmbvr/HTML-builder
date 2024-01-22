const fs = require('fs');
const path = require('path');
const distPath = path.join(__dirname, 'project-dist');
const components = path.join(__dirname, 'components')

fs.mkdir(distPath, () => {
  const html = fs.createWriteStream(path.join(distPath, 'index.html'));
  const css = fs.createWriteStream(path.join(distPath, 'style.css'));

  const assets = path.join(__dirname, 'assets');
  const distAssets = path.join(distPath, 'assets');

  recursiveAssetsCopy(assets, distAssets);

  mergeComponents(html)

  mergeStyles(css)
});

function recursiveAssetsCopy(assets, distAssets) {
  fs.mkdir(distAssets, () => {
    fs.readdir(assets, (_, files) => {
      for (let i = 0; i < files.length; i++) {
        fs.stat(path.join(assets, files[i]), (_, stat) => {
          const orig = path.join(assets, files[i]);
          const dist = path.join(distAssets, files[i]);
          if (stat.isDirectory()) {
            recursiveAssetsCopy(orig, dist);
          } else {
            fs.copyFile(orig, dist, (err) => {
              if (err) {
                throw err;
              }
            });
          }
        });
      }
    });
  });
}

function mergeComponents(html) {
  fs.readFile(path.join(__dirname, 'template.html'), (_, data) => {
    fs.readdir(components, (_, files) => {
      for(let i = 0; i < files.length; i++) {
        const placeholder = `{{${path.parse(files[i]).name}}}`
        fs.readFile(path.join(components, files[i]), (_, compData) => {
          data = data.toString().replace(new RegExp(placeholder, 'g'), compData);
          if(i === files.length - 1) {
            html.write(data)
          }
        })
      }
    })
  })
}

function mergeStyles(css) {
  fs.readdir(path.join(__dirname, 'styles'), (_, files) => {
    for(let i = 0; i < files.length; i++) {
      if(path.extname(files[i]) === '.css') {
        const rs = fs.createReadStream(path.join(path.join(__dirname, 'styles'), files[i]), 'utf-8')
        rs.on('data', (chunk) => css.write(chunk))
      }
    }
  })
}