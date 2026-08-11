import fs from "node:fs";

function overrideType<T>(val: unknown): asserts val is T {}

function eloZelo(repeatCount: number): void {
    const fileName = "elo-zelo.txt";
    const message = "Elo żelo\n";
    const data = message.repeat(repeatCount);

    try{
        fs.writeFileSync(fileName, data);
    } catch (err) {
        overrideType<Error | AggregateError>(err);  // https://nodejs.org/api/fs.html#fswritefilefile-data-options-callback
        console.error(`Failed to write to file. ${err.name}: ${err.message}`);
    }
}

const currentMinutes = new Date().getMinutes();
eloZelo(currentMinutes);