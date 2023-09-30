import fs from 'fs'
const path = require('path');
import { TypeError } from '../@types/errorType';

const relatorioPath = path.join(__dirname, 'texto.md');

function getArchive(path: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
        try {
            const encoding = "utf-8"
            const a:string = await fs.promises.readFile(relatorioPath, encoding)
            resolve(a)
        } catch (error) {
            reject({ error: "Algo deu errado" } as TypeError);
        }

    })

}

export {getArchive}