const fs = require('fs');
const path = require('path');
const pathdir = path.join (__dirname, 'secret-folder');
let index;


fs.readdir(pathdir, {withFileTypes:true} , (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.forEach(file => {
      fs.stat(path.join (__dirname, 'secret-folder', `${file.name}`), (err, stats) => {
        if (err) {
          console.log(err);
        } else {
          if (stats.isFile()) {
            index = file.name.lastIndexOf('.');
            console.log(`${file.name.slice(0,index)} - ${file.name.slice(index+1)} - ${stats.size}b`);
          }
        } 
      });
    });
  }
});