import { open } from "fs/promises";

export async function getFileTail(
    filePath: string,
    linesDesired: number
): Promise<string> {
    // number of characters to be read in one batch
    const bufferSize = 1024; // Size of the buffer to read chunks
    const fileHandle = await open(filePath, "r");
    let fileSize = (await fileHandle.stat()).size;
  
    const buffer = Buffer.alloc(bufferSize);
    
    let results: string[] = [];

    // just here to make sure that if error occurs,
    // it will still close the file
    let prevLine = "";
    try {
      for (
        let remainingBytes = fileSize;
        remainingBytes > 0;
        remainingBytes -= bufferSize
      ) {
        const bytesToRead = Math.min(bufferSize, remainingBytes);
        const position = remainingBytes-bytesToRead;
  
        // Read the file chunk
        const { bytesRead } = await fileHandle
            .read(buffer, 0, bytesToRead, position);
        
        // new chunk of text read from the bottom
        const chunk = buffer
            .toString("utf-8", 0, bytesRead);
        const chunkLines = chunk.match(/.+/g) ?? [];

        const lackingLines = linesDesired - results.length;
        
        if (chunkLines.length > lackingLines) {
            results.unshift(
                ...chunkLines.slice(-lackingLines)
            );
            break;
        }

        const lastLine = chunkLines.pop() + prevLine;
        prevLine = chunkLines.shift() ?? "";
        results.unshift(...chunkLines, lastLine);
      }
    } finally {
      await fileHandle.close();
    }
  
    // Return the last `linesToRead` lines
    return results
        .slice(-linesDesired)
        .join("\n");
  }