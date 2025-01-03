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



test(
    'test the buffer size',
    async ()  => {
        const tail = await getFileTail(
            'tests/assets/all.warn.txt',
            9
        );

        expect(tail.match(/\n/g)?.length).toBe(8);
        
        expect(tail.slice(0,24)).toBe('[12/26/2024, 4:11:55 PM]');
    }
);