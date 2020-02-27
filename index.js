const fs = require('fs');
const chalk = require('chalk');

class Library {
  constructor(id, nBooks, signUpProcess, perDay) {
    this.id = id;
    this.nBooks = nBooks;
    this.signUpProcess = signUpProcess;
    this.perDay = perDay;

    this.outBooks = [];
  }

  addBook(i) {
    this.outBooks.push(i);
  }

  sortBooks() {
    return this.outBooks.sort((a, b) => (a - b)).reverse();
  }
}

let aLines = fs.readFileSync('./in/f_libraries_of_the_world.txt', 'utf8').split('\n');

for (let i = aLines.length-1; i > 0; i--) {
  if (aLines[i] == '')
    aLines.pop();
  else break;
}

for (let i = 0; i < aLines.length; i++) {
  aLines[i] = aLines[i].split(' ');
}

console.log(aLines)

let nBooks = aLines[0][0],
    nLibs = aLines[0][1],
    nDaysForScanning = aLines[0][2],
    scores = aLines[1],
    libs = [],
    bookIds = [];

// adding bools to bookIds (max 10^5 books)
for (var i = 0; i < 100000; i++) {
  bookIds.push(false);
}

let c = 0;
for (let i = 2; i < aLines.length; i++) {
  if (i % 2 == 0) {
     libs.push(new Library(c, aLines[i][0], aLines[i][1], aLines[i][2]));
    c++;
  } else {
    for (let j = 0; j < aLines[i].length; j++) {
      if (!bookIds[aLines[i][j]]) {
        bookIds[aLines[i][j]] = true;
        // adding the book to the libs
        libs[libs.length-1].addBook(aLines[i][j]);
      }
    }

    libs.sort((a, b) => (a.signUpProcess < b.signUpProcess) ? 1 : -1)
  }
}

// sorting the libs' books
// for (let i = 0; i < libs.length; i++) {
//   // libs[i].sortBooks();
// }

console.log(libs);

let output = `${nLibs}\n`;
for (let i = 0; i < nLibs; i++) {
  output += `${libs[i].id} ${libs[i].outBooks.length}\n`;
  for (let j = 0; j < libs[i].outBooks.length; j++) {
    output += `${libs[i].outBooks[j]}`;
    if (j != libs[i].outBooks.length - 1)
      output += ' ';
  }
  if (i != libs.length - 1)
    output += '\n';
}

// console.log(output);

fs.appendFile('./out/f_out.txt', output, (err) => {
  if (err) throw err;
  console.log(chalk.green.inverse("Success"));
})