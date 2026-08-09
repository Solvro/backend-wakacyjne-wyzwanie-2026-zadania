const fs = require('node:fs');

function eloZelo(count: number) {
    let content: string = "";
    for (let i: number = 0; i < count; i++) {
        content += "Elo Żelo\n";
    }
    fs.writeFile("elo-żelo.txt", content, err => {
        if (err) {
            console.error(err);
        }
        else {
            console.log("Success!")
        }
    });
}

let mins: number = new Date().getMinutes();
eloZelo(mins);
