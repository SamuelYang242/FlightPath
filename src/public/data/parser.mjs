import { readFile, writeFile } from 'fs';
let lines = [];
let newLines = [];

readFile("./src/public/data/airlines.csv", "utf8", (err, data) => {
  if (err) console.log(err.message);

  // Split by line
  lines = data.split("\r\n");

  // Split each line by comma
  lines.forEach((line) => {
    newLines.push(line.split(','));
  })

  // Filter out unneeded data
  newLines = newLines.filter((line) => {
    if (line[1] === '' || line[2] === '' || line[5] === 'N') {
      return false;
    }
    return true;
  })

  //Only keep needed fields
  newLines = newLines.map((line) => {
    return [line[0], line[1], line[2]];
  })

  //Write to file
  const content = newLines.reduce((acc, line) => {
    line.forEach((val, index) => {
      if (index === line.length - 1) {
        acc += val;
      } else {
        acc += val + ',';
      }
    });
    acc += "\r\n";
    return acc;
  }, '');

  writeFile("./src/public/data/new.csv", content, (err) => {
    if (err) return;
  });

})
