const { error } = require('console');
const fs = require('fs');
const path = require('path');
const mkdir = fs.promises.mkdir;
const unlink = fs.promises.unlink;
const copyFile = fs.promises.copyFile;
const readdir = fs.promises.readdir;
const pathdir = path.join(__dirname, 'files');
const createDir = path.join(__dirname, 'files-copy');

async function makeDir() {
  const dirCreation = await mkdir(createDir, { recursive: true });
  return dirCreation;
}
makeDir().catch(error);

readdir(createDir).then((files) => {
  files.forEach((file) => {
    unlink(path.join(__dirname, 'files-copy', file));
  });
});

readdir(pathdir).then((files) => {
  files.forEach((file) => {
    const pathFileSource = path.join(__dirname, 'files', file);
    const pathFileDestinhation = path.join(__dirname, 'files-copy', file);
    copyFile(pathFileSource, pathFileDestinhation);
  });
});
