import * as fs from 'fs';

function eloZelo(count: number): void {
  const textToSave: string = 'Elo żelo\n'.repeat(count);
  
  fs.writeFileSync('elo-żelo.txt', textToSave, 'utf-8');
  console.log(`Pomyślnie zapisano frazę "Elo żelo" ${count} razy w pliku elo-żelo.txt`);
}

const currentMinutes: number = new Date().getMinutes();
eloZelo(currentMinutes);
