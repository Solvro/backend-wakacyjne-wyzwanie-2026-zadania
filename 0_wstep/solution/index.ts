import { writeFileSync } from 'fs';

function eloZelo(times: number): void {
  const lines = Array(times).fill('Elo żelo').join('\n'); // taka konstrukcja pozwala na stworzenie wymaganego tekstu w pliku ale bez zbędnego \n w ostatniej linii

  try {
    writeFileSync('elo-żelo.txt', lines, 'utf-8');
  } catch (error) {
    console.error('Nie udało się zapisać pliku elo-żelo.txt:', error);
  }
}

const minutes = new Date().getMinutes();
eloZelo(minutes);