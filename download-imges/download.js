const fs = require('fs');
const axios = require('axios');
const path = require('path');

const links = fs.readFileSync('links.txt', 'utf-8').split('\n').filter(Boolean);

// Define the path to the target folder: ../uploads/category
const uploadsFolder = path.join(__dirname, '../uploads/category');

// Ensure the folder exists
fs.mkdirSync(uploadsFolder, { recursive: true });

async function downloadImage(url, filename) {
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  });

  const filePath = path.join(uploadsFolder, `${filename}.png`);
  const writer = fs.createWriteStream(filePath);

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', () => {
      console.log(`✅ Saved ${filename}.png`);
      resolve();
    });
    writer.on('error', reject);
  });
}

async function startDownload() {
  for (let i = 0; i < links.length; i++) {
    try {
      await downloadImage(links[i], i + 1); // filenames: 1.png, 2.png, ...
    } catch (err) {
      console.error(`❌ Failed to download ${links[i]}:`, err.message);
    }
  }
}

startDownload();
