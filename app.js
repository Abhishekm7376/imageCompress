const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Input and output directories
const inputDirectory = './pic'; // Replace with the path to your input directory
const outputDirectory = './newPics'; // Replace with the path to your output directory

// Ensure the output directory exists
if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory);
}

// List all files in the input directory
fs.readdir(inputDirectory, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  // Filter for image files (you can customize this filter)
  const imageFiles = files.filter((file) =>
    /\.(jpg|jpeg|png|gif)$/i.test(file)
  );

  // Process each image file
  imageFiles.forEach((file) => {
    const inputFile = path.join(inputDirectory, file);
    const outputFile = path.join(outputDirectory, file);

    // Compress and resize the image (adjust the options as needed)
    sharp(inputFile)
      .resize({ width: 800 }) // Set your desired width
      .toFile(outputFile, (err, info) => {
        if (err) {
          console.error('Error processing image:', err);
        } else {
          console.log(`Image ${file} processed and saved to ${outputFile}`);
        }
      });
  });
});
