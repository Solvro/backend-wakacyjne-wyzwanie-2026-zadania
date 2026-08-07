import fs from 'node:fs';

const baseText:string = 'Elo żelo\n';

function eloZelo(repeats:number):void{

    const content:string = baseText.repeat(repeats);
    fs.writeFile('elo-żelo.txt',content,err=>{
        if(err){
            console.error(err);
        } })
}


const minutes:number = new Date().getMinutes();
eloZelo(minutes);