import * as fs from 'fs';
const time = new Date();
const minutes = time.getMinutes();

function eloZelo(min: number) {
    let text = "";
    for (let i = 0; i < min; i++) {
        text += "Elo żelo\n";
    }
    text = text.trim();
    
    try {
        fs.writeFileSync("elo-żelo.txt", text, "utf-8");

    } catch (error) {
        console.error("Błąd zapisu do pliku: ", error);
    }
}

eloZelo(minutes);