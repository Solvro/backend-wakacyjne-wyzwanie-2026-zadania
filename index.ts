import fs from 'node:fs';

function eloZelo(count: number){

    const subtext = "Elo żelo\n";
    const text = subtext.repeat(count);
    
    try{
        fs.writeFileSync('./elo-żelo.txt', text);
    }
    catch (err){
        console.log(err);
    }
};

const minutes = (new Date).getMinutes();
eloZelo(minutes);