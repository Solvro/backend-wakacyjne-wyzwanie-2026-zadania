import * as fs from 'node:fs';

const minutes = new Date().getMinutes();


function eloZelo(n: number): void {
  const content = 'Elo żelo\n';
  const filename = './elo-zelo.txt';
  try {
    fs.writeFileSync(filename, content.repeat(n));
  } catch (err) {
    console.error(err);
  }
}

eloZelo(minutes);