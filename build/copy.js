const fs = require('fs-extra');
const TARGET_NAME = process.argv[2];
const src = './demo/' + TARGET_NAME;
const dest = './src';

const correctPath = (path, targetTxt, txt) => {
    const files = fs.readdirSync(path);
    files.forEach((file) => {
        if (file !== 'index.ts' && file !== 'index.html') return;
        const filePath = `${path}/${file}`;
        const stats = fs.statSync(filePath);
        if (stats.isFile()) {
            const content = fs.readFileSync(filePath, 'utf8');
            const newContent = content.replace(targetTxt, txt);
            fs.writeFileSync(filePath, newContent, 'utf8');
        }
    });
};

fs.copy(src, dest, (err) => {
    if (err) return console.error(err);
    correctPath(dest, /..\/..\/src/g, '.');
    console.log('copy success!');
});
