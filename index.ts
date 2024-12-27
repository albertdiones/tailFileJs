import { open } from "fs/promises";

export async function getFileTail(filePath: string, linesToRead: number): Promise<string[]> {
    const bufferSize = 512; // Size of the buffer to read chunks    
    const buffer = Buffer.alloc(bufferSize);
    return open(filePath, "r").then(
        (fileHandle) => {
            fileHandle.stat().then(
                ({size: fileSize}) => {
                    let lines: string[] = [];
                    let position = fileSize;
                    let partialData = "";
                
                    try {
                        while (lines.length <= linesToRead && position > 0) {
                            const bytesToRead = Math.min(bufferSize, position);
                            position -= bytesToRead;
                    
                            // Read the file chunk
                            fileHandle.read(buffer, 0, bytesToRead, position);
                            partialData = buffer.toString("utf-8", 0, bytesRead) + partialData;
                    
                            // Split lines and prepend them to the array
                            lines = partialData.split("\n");
                        }
                    } finally {
                        await fileHandle.close();
                    }
                
                    // Return the last `linesToRead` lines
                    return lines.slice(-linesToRead);
                }
            )
        }
    )
  }