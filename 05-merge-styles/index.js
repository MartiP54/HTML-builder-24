const fs = require('fs');
const path = require('path');
const readdir = fs.promises.readdir;
const write = fs.writeFile;
const create = fs.createReadStream;
const append = fs.appendFile;
const pathdir = path.join(__dirname, 'styles');
const pathFileDestinhation = path.join(__dirname, 'project-dist', 'bundle.css');

readdir(pathdir).then((files) => {
  write(pathFileDestinhation, '', function (error) {
    if (error) {
      throw error;
    }
  });
  files.forEach((file) => {
    const pathFileSource = path.join(pathdir, file);
    const extension = path.extname(pathFileSource);
    if (extension === '.css') {
      let input = create(pathFileSource);
      input.on('data', (data) => {
        append(pathFileDestinhation, data, (error) => {
          if (error) {
            throw error;
          }
        });
      });
    }
  });
});
