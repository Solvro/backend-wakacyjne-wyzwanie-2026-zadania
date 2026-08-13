import fs from 'fs';

const currMinutes = new Date().getMinutes()
const fileName = 'elo-zelo.txt';

function eloZelo(currMinutes: number, fileName: string) {
    try 
    {
        fs.writeFileSync(fileName, 'Elo Żelo\n'.repeat(currMinutes));
    } catch (error) {
        console.error("Wystąpił błąd: ", error);
    }
    
}

eloZelo(currMinutes, fileName)