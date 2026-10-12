import * as fs from 'fs';

// Zmienne do zadania
const filePath = './elo-zelo.txt';
let fileContent = '';

// Funkcja tworząca plik i wpisująca do niego elo żelo razy ilość minut 
function eloZelo(times: number) {
    // Tworzenie gotowego tekstu który zawiera min razy tekst
    for(let i = 1 ; i<=times ; i++){
        fileContent += 'Elo żelo \n';
    }

    // Stworzenie pliku z tekstem (obłożony sprawdzaniem błędu bo plik może się nie stworzyć)
    try {
        fs.writeFileSync(filePath, fileContent, 'utf-8');
    } catch (error) {
        console.error('Blad przy tworzeniu pliku:', error);
    }
}

// Pobieranie daty z systemu oraz wyciągnięcie z tego minut
const currDate = new Date();
let currMinutes = currDate.getMinutes();

// Wywołanie funkcji z parametrem jakość ilość minut
eloZelo(currMinutes);