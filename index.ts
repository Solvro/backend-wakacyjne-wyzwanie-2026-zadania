import * as fs from 'node:fs';

const minutes = new Date().getMinutes();
const content = 'Elo żelo\n';
const filename = './elo-zelo.txt';

function eloZelo(n: number): void {
  try {
    fs.writeFileSync(filename, content.repeat(n));
  } catch (err) {
    console.error(err);
  }
}

eloZelo(minutes);