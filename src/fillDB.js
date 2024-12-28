import fs from 'fs';
import path from 'path';
import pkg from 'sqlite3'
const {Database} = pkg;

const directoryPath = path.join(process.cwd(), '.wrangler/state/v3/d1/miniflare-D1DatabaseObject');
const sqlFilePath = path.join(process.cwd(), 'database.sql');

fs.readdir(directoryPath, (err, files) => {
    if (err) {
        return console.error('Unable to scan directory: ' + err);
    }

    let largestFile = null;
    let largestSize = 0;

    files.forEach(file => {
        if (path.extname(file) === '.sqlite') {
            const filePath = path.join(directoryPath, file);
            const stats = fs.statSync(filePath);

            if (stats.size > largestSize) {
                largestSize = stats.size;
                largestFile = filePath;
            }
        }
    });

    //eslint-disable-next-line
    if (largestFile) {
        const db = new Database(largestFile);
        const sql = fs.readFileSync(sqlFilePath, 'utf8');

        db.exec(sql);

        db.close();
    } else {
        console.log('No .sqlite files found in the directory.');
    }
});