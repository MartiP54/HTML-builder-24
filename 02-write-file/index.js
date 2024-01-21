const fs =require('fs');
const path = require('path');
const process = require('process');

const outputFile = path.join(__dirname, 'output.txt');
const output = fs.createWriteStream(outputFile);

const start = () => console.log('Введите ваш текст:');
const exit = () => {
  console.log(`Всего доброго, ваш текст находиться в файле ${outputFile}`);
  output.end();
  process.exit();
};

process.stdout.write('',start);
process.on('SIGINT', exit);

process.stdin.on('data', (data) => {
  if (data.toString().match(/exit(\s)*\n/)) {
    exit();
  } else {
    output.write(data);
  }
});
