import fs from 'fs';

function eloZelo(repeat: number):void {
    const text = "Elo żelo\n";
    const repeated_text = text.repeat(repeat);
    const file_name = 'elo-zelo';
    
    try { fs.writeFileSync(`./${file_name}.txt`, repeated_text); } 
    catch(err) { console.error(err); }
}

const arg = new Date().getMinutes();
eloZelo(arg);