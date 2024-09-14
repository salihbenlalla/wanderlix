import { execSync } from "child_process";

const executeD1 = (command) => {
  try {
    const output = execSync(command, { encoding: "utf-8" });
    const lines = output.split("\n");
    const filteredLines = lines.filter((line) => {
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
    console.log(filteredLines.join("\n"));
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
