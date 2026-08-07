import fs from "node:fs";

function eloZelo(amount: number) {
  const value = "Elo żelo";
  const file = "elo-żelo.txt";
  const content = Array(amount).fill(value).join("\n");
  fs.writeFile(file, content, err => {
    if (err) {
      console.error("Error:", err);
    } else {
      console.log("Written to file successfully");
    }
  })
}

const minutes = (new Date).getMinutes();
eloZelo(minutes);
