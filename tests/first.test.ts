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



test(
    'test 6 lines from big file',
    async ()  => {
        const tail = await getFileTail('tests/assets/all.warn.txt',6);
        
        expect(tail.match(/\n/g)?.length).toBe(5);
    }
);




test(
    'test 30 lines from a 27 line file',
    async ()  => {
        const tail = await getFileTail(
            'tests/assets/all.warn.txt',
            30
        );
        
        expect(tail.match(/\n/g)?.length).toBe(26);
    }
);