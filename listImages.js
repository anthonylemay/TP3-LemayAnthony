const fs = require('fs');
const path = require('path');

const imgDirectory = path.join(__dirname, 'img'); // Assuming this script is at the root of your project

fs.readdir(imgDirectory, (err, files) => {
    if (err) {
        console.error("Error reading the directory.", err);
        return;
    }

    const imageFiles = files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif' || ext === '.svg'; // Add other extensions if needed
    });

    console.log('Images:');
    imageFiles.forEach(file => {
        console.log('img/' + file);
    });
});
