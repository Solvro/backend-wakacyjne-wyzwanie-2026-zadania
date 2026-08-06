import fs from 'fs';

const currMinutes = new Date().getMinutes()
const fileName = 'elo-zelo.txt';

function eloZelo(currMinutes: number, fileName: string) {
    for (let i = 0; i < currMinutes; i++) {
        fs.writeFileSync(fileName, '')
        for (let i = 0; i < currMinutes; i++)
            fs.appendFileSync(fileName, "Elo Żelo")
    }
}

eloZelo(currMinutes, fileName)