import { execSync } from "child_process";

const executeD1 = (command) => {
  try {
    const output = execSync(command, {
      encoding: "utf-8",
      maxBuffer: 1024 * 1024 * 10,
    });
    const lines = output.split("\n");
    const filteredLines = lines.filter((line) => {
      if (line.trim() === "") return false;
      try {
        const parsed = JSON.parse(line);
        return !(
          parsed.results &&
          parsed.results.length === 0 &&
          parsed.success === true
        );
      } catch {
        return true;
      }
    });
    if (filteredLines.length > 0) {
      console.log(filteredLines.join("\n"));
    }
  } catch (error) {
    console.error("Error executing command:", error.message);
    process.exit(1);
  }
};

executeD1(
  "wrangler -c ./wrangler.toml d1 execute db --local --file=empty_db.sql --json",
);
executeD1(
  "wrangler -c ./wrangler.toml d1 execute DB --local --file ./database.sql --json",
);
