const { error } = require('console');
const fs = require('fs');
const path = require('path');
const mkdir = fs.promises.mkdir;
const createDir = path.join(__dirname, 'project-dist');
const readdir = fs.promises.readdir;
const write = fs.promises.writeFile;
const readFile = fs.promises.readFile;
const create = fs.createReadStream;
const append = fs.appendFile;
const styledir = path.join(__dirname, 'styles');
const pathFileDestinhation = path.join(__dirname, 'project-dist', 'style.css');
const copyFile = fs.promises.copyFile;
const assertsDir = path.join(__dirname, 'assets');
const pathHtmlDestinhation = path.join(__dirname, 'project-dist', 'index.html');
const templateFile = path.join(__dirname, 'template.html');
const componentsDir = path.join(__dirname, 'components');
async function makeDir(direct) {
  const dirCreation = mkdir(direct, { recursive: true });
  return dirCreation;
}
makeDir(createDir).catch(error);

//file assets copy //
async function copyAssets() {
  const readdirAssets = await readdir(assertsDir);
  for (const dir of readdirAssets) {
    await makeDir(path.join(__dirname, 'project-dist', 'assets', dir));
    const readdirAssetsAll = await readdir(path.join(__dirname, 'assets', dir));
    for (const file of readdirAssetsAll) {
      const pathFileSource = path.join(__dirname, 'assets', dir, file);
      const pathFileDestinhation = path.join(
        __dirname,
        'project-dist',
        'assets',
        dir,
        file,
      );
      await copyFile(pathFileSource, pathFileDestinhation);
    }
  }
}
copyAssets();
//

async function html() {
  const template = await readFile(templateFile, 'utf-8');
  await write(pathHtmlDestinhation, template);
  const index = await readFile(pathHtmlDestinhation, 'utf-8');
  const readdirComponents = await readdir(componentsDir);
  let newIndex = index;
  let temp;
  let doteIndex;
  for (const file of readdirComponents) {
    doteIndex = file.lastIndexOf('.');
    temp = await readFile(
      path.join(__dirname, 'components', `${file}`),
      'utf-8',
    );
    newIndex = newIndex.replace(`{{${file.slice(0, doteIndex)}}}`, `${temp}`);
  }
  await write(pathHtmlDestinhation, newIndex);
}

html();

//  //

// style //
readdir(styledir).then((files) => {
  write(pathFileDestinhation, '', function (error) {
    if (error) {
      throw error;
    }
  });
  files.forEach((file) => {
    const pathFileSource = path.join(styledir, file);
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
// //
