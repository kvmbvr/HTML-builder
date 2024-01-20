const fs = require('fs');
const path = require('path');
const { stdout } = require('process');
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
const file = fs.createWriteStream(path.join(__dirname, 'text.txt'));

stdout.write('Type text: ');
rl.on('line', (text) => {
  if (text.toString().trim().toLowerCase() === 'exit') {
    rl.close();
  } else {
    file.write(text + '\n');
  }
});

rl.on('close', () => stdout.write('\nTyping procces end. Bye!'));
