const fs = require('fs');
const path = require('path');

function renameFiles(dir) {
  fs.readdir(dir, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      const filePath = path.join(dir, file);
      fs.stat(filePath, (err, stat) => {
        if (err) throw err;
        if (stat.isDirectory()) {
          renameFiles(filePath);
        } else if (file.endsWith('.html.html')) {
          const newFilePath = path.join(dir, file.replace('.html.html', '.html'));
          fs.rename(filePath, newFilePath, (err) => {
            if (err) throw err;
            console.log(`${filePath} renamed to ${newFilePath}`);
          });
        }
      });
    });
  });
}

renameFiles('out/blog/');
