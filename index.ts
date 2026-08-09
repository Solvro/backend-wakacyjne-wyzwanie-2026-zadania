import fs from 'fs';

function eloZelo(repeat: number) {
    const text = "Elo żelo\n".repeat(repeat);
    
    try { fs.writeFileSync('./elo-żelo.txt', text); } 
    catch(err) { console.error(err); }
}

eloZelo(new Date().getMinutes());