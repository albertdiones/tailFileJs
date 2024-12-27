import { open } from "fs/promises";

export async function getFileTail(filePath: string, linesToRead: number): Promise<string> {
    const bufferSize = 512; // Size of the buffer to read chunks
    const fileHandle = await open(filePath, "r");
    let fileSize = (await fileHandle.stat()).size;
  
    const buffer = Buffer.alloc(bufferSize);
    let position = fileSize;
    let partialData = "";
  
    try {
      while (
        (partialData.match(/\n/g) ?? []).length <= linesToRead 
        && position > 0
    ) {
        const bytesToRead = Math.min(bufferSize, position);
        position -= bytesToRead;
  
        // Read the file chunk
        const { bytesRead } = await fileHandle
            .read(buffer, 0, bytesToRead, position);
        partialData = buffer
            .toString("utf-8", 0, bytesRead) + partialData;
      }
    } finally {
      await fileHandle.close();
    }
  
    // Return the last `linesToRead` lines
    return partialData.split('\n').slice(-linesToRead).join('\n');
  }