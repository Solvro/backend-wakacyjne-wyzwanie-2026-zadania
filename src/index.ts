import fs from "node:fs";

function assertType<T>(val: unknown): asserts val is T {}

function eloZelo(repeatCount: number): void {
    const fileName: string = "elo-zelo.txt";
    const message: string = "Elo żelo\n";
    const data: string = message.repeat(repeatCount);

    try{
        fs.writeFileSync(fileName, data);
    } catch (err) {
        assertType<Error | AggregateError>(err);  // https://nodejs.org/api/fs.html#fswritefilefile-data-options-callback
        console.error(`Failed to write to file. ${err.name}: ${err.message}`);
    }
}

const currentMinutes = new Date().getMinutes();
eloZelo(currentMinutes);