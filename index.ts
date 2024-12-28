import { open } from "fs/promises";

export async function getFileTail(
    filePath: string,
    linesDesired: number
): Promise<string> {
    // number of characters to be read in one batch
    const bufferSize = 256; // Size of the buffer to read chunks
    const fileHandle = await open(filePath, "r");
    let fileSize = (await fileHandle.stat()).size;
  
    const buffer = Buffer.alloc(bufferSize);
    
    const results: string[] = [];

    // just here to make sure that if error occurs,
    // it will still close the file
    try {
      for (
        let remainingBytes = fileSize;
        remainingBytes > 0;
        remainingBytes -= bufferSize
      ) {
        const bytesToRead = Math.min(bufferSize, remainingBytes);
  
        // Read the file chunk
        const { bytesRead } = await fileHandle
            .read(
                buffer,
                0,
                bytesToRead,
                remainingBytes-bytesToRead
            );
        
        // new chunk of text read from the bottom
        const chunk = buffer
            .toString("utf-8", 0, bytesRead);
        results.unshift(...chunk.split("\n"));

        if (results.length >= linesDesired) {
            break;
        }
      }
    } finally {
      await fileHandle.close();
    }

    return results.slice(-linesDesired).join("");
  }