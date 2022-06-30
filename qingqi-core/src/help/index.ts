import { readFileSync } from 'fs';
import { resolve } from 'path';

export const help = () => {
    console.log(readFileSync(resolve(__dirname, '../../lib/docs.txt'), 'utf-8'));
}