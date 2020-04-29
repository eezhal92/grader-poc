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


function main() {
  const ws = fs.createWriteStream(path.resolve(__dirname, "out.txt"));

  const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');
  
  const n = parseInt(firstMultipleInput[0], 10);

  const result = [];
  for (let i = 0; i < n; i++) {
    const namesCount = Number(readLine());
    const names = [];
    for (let i = 0; i < namesCount; i++) {
      names.push(readLine());
    }
    let out = sortRoyalNames(names);
    out = out.join('\n') + '\n';

    console.log(out);
    result.push(out);
  }

  ws.write(result.join('\n'));

  ws.end();
}

/**
 * Convert roman number into integer.
 * @param  {string} romanNumber 
 * @return {number}  
 */
const toRomanNumber = (romanNumber) => {
  if (romanNumber === "")           return 0;
  if (romanNumber.startsWith("L"))  return 50 + toRomanNumber(romanNumber.substr(1));
  if (romanNumber.startsWith("XL")) return 40 + toRomanNumber(romanNumber.substr(2));
  if (romanNumber.startsWith("X"))  return 10 + toRomanNumber(romanNumber.substr(1));
  if (romanNumber.startsWith("IX")) return 9  + toRomanNumber(romanNumber.substr(2));
  if (romanNumber.startsWith("V"))  return 5  + toRomanNumber(romanNumber.substr(1));
  if (romanNumber.startsWith("IV")) return 4  + toRomanNumber(romanNumber.substr(2));
  if (romanNumber.startsWith("I"))  return 1  + toRomanNumber(romanNumber.substr(1));
}

/**
 * Convert royal name into tupple.
 * @param  {string} fullname 
 * @return {[string, number]}
 */
function toTupple(fullname) {
  const [, number] = fullname.split(" ");
  return [fullname, toRomanNumber(number)]
}

/**
 * Create map for grouping names.
 * @param  {string[]} names
 * @return {object<string, Array>}
 */
function createNameMap(names) {
  const map = {};
  let currentName = null;

  for (let i = 0; i < names.length; i += 1) {
    const fullname = names[i];
    const [name,] = fullname.split(" ");
    if (name !== currentName) currentName = name;

    if (!map.hasOwnProperty(name)) map[name] = [toTupple(fullname)];
    else map[name].push(toTupple(fullname));
  }

  return map;
}

/**
 * @param {object} nameMap
 * @return {string[]}
 */
function sortAndMerge(nameMap) {
  let sortedNames = [];

  Object.keys(nameMap).forEach((key) => {
    const sortedChunk = nameMap[key]
      .sort((tuppleA, tuppleB) => tuppleA[1] - tuppleB[1])
      .map(tupple => tupple[0])
    
    sortedNames = sortedNames.concat(sortedChunk);
  });

  return sortedNames;
}

/**
 * @param  {string[]} names
 * @return {string[]}
 */
function sortByFirstLetter(names) {
  return names
    .slice()
    // compare first character
    .sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0));
}

/**
 * The main function
 * @param  {string[]} names
 * @return {string[]}
 */
function sortRoyalNames(names) {
  // sort by first character of the name first
  const namesSortedByFirstLetter = sortByFirstLetter(names);
  const nameMap = createNameMap(namesSortedByFirstLetter);

  return sortAndMerge(nameMap);
}
