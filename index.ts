import fs from 'node:fs';

function eloZelo(n: number): void{

  const text = "Elo żelo\n".repeat(n);

  try{

     fs.writeFileSync('elo-żelo.txt',text);

  }catch(error){

     if(error instanceof Error){

        console.error("Błąd: ", error.message);
     }
  }
}

eloZelo(new Date().getMinutes());
