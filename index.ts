import * as fs from 'node:fs';
 
function eloZelo (): void
{
    const input = new Date();
    const minuty = input.getMinutes();
    const EloZelo = "Elo żelo\n";
    
    try
    {fs.writeFileSync('elo-żelo.txt', EloZelo.repeat(minuty));}
    catch (err)
    {console.error(err);}
}

eloZelo();