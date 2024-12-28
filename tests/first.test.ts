import { test, expect } from '@jest/globals'
import { getFileTail } from '..';


test(
    'first test',
    async ()  => {
        const tail = await getFileTail('tests/assets/smol.txt',2);
        
        expect(tail.replace("\r","")).toBe("d\ne");
    }
);