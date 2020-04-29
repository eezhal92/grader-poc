'use strict';

const path = require('path');
const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
  inputString = inputString.split('\n').filter(line => !!line.trim());
  main();
});

function readLine() {
  return inputString[currentLine++];
}

function findMax(array) {
  let max = 0;

  for (let i = 0; i < array.length; i++) {
    const el = array[i];
    if (el > max) max = el;
  }
  return max
}

function main() {
  const ws = fs.createWriteStream(path.resolve(__dirname, "out.txt"));

  const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');
  
  const n = parseInt(firstMultipleInput[0], 10);

  const result = [];
  for (let i = 0; i < n; i++) {
    const array = readLine().replace(/\s+$/g, '').split(',').map(queriesTemp => parseInt(queriesTemp, 10))
    const out = findMax(array);
    console.log(out);
    result.push(out);
  }

  ws.write(result.join('\n') + '\n');

  ws.end();
}