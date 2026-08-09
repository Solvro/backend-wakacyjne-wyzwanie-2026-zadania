import * as fs from 'fs';
import process = require('process');

function eloZelo(elozelo_count : number): void {
    const file_path = './elo-żelo.txt';
    const write_stream = fs.createWriteStream(file_path,'utf-8');
    for(let i = 0; i<elozelo_count; i++){ 
        write_stream.write('Elo żelo\n');
    }
    write_stream.end();
}

function main(): void{
    const date = new Date()
    const minutes = date.getMinutes();
    eloZelo(minutes);
}
if (require.main == module){
    main();
}

