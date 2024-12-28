import { test, expect } from '@jest/globals'
import { getFileTail } from '..';


test(
    'test last 2 lines',
    async ()  => {
        const tail = await getFileTail('tests/assets/smol.txt',2);
        
        expect(tail.replace("\r","")).toBe("d\ne");
    }
);

test(
    'test all lines',
    async ()  => {
        const tail = await getFileTail('tests/assets/smol.txt',10);
        
        expect(tail.replace(/\r/g,"")).toBe("a\nb\nc\nd\ne");
    }
);