import { open } from "fs/promises";

export async function getFileTail(filePath: string, linesDesired: number): Promise<string> {
    const bufferSize = 512; // Size of the buffer to read chunks
    const fileHandle = await open(filePath, "r");
    let fileSize = (await fileHandle.stat()).size;
  
    const buffer = Buffer.alloc(bufferSize);
    let position = fileSize;
    const results: string[] = [];
    
    let lackingLines = linesDesired;
  
    try {
      while (
        lackingLines > 0 && position > 0
      ) {
        const bytesToRead = Math.min(bufferSize, position);
        position -= bytesToRead;
  
        // Read the file chunk
        const { bytesRead } = await fileHandle
            .read(buffer, 0, bytesToRead, position);
        
        // new chunk of text read from the bottom
        const chunk = buffer
            .toString("utf-8", 0, bytesRead);
        const chunkLines = (chunk.match(/\n/g) ?? []).length;
        if (chunkLines > lackingLines) {
            results
                .unshift(
                    chunk.split('\n').slice(-lackingLines).join('\n')
                )
            break;
        }
        lackingLines -= chunkLines;
        results.unshift(chunk);
      }
    } finally {
      await fileHandle.close();
    }
  
    // Return the last `linesToRead` lines
    return results.join("");
  }