import { type Plugin } from "vite";

export function suppress403Errors(): Plugin {
  return {
    name: "suppress-fetch-errors",
    configureServer() {
      const originalStderrWrite = process.stderr.write.bind(process.stderr);

      // Override the stderr.write method
      process.stderr.write = function (
        chunk: string | Uint8Array,
        encoding?: BufferEncoding | undefined,
        callback?: (err?: Error | null) => void,
      ): boolean {
        const message = chunk.toString();

        if (
          message.includes("Asset not found") ||
          message.includes("can not fetch") || // Suppress fetch error messages
          message.includes("Failed to fetch image")
        ) {
          // Suppress these specific error messages
          return true; // Indicate that the message was handled
        }

        // For other messages, use the original stderr.write
        return originalStderrWrite(chunk, encoding, callback);
      } as typeof process.stderr.write; // Cast to the original function type
    },
  };
}
