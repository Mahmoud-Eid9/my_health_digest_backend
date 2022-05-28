const fs = require('fs');
const path = require('path');

const arrangePdfs = (category: string) => {
  return new Promise((resolve, reject) => {
    const directoryPath = path.resolve(__dirname, `../public/${category}`);
    let pdfs = {};
    try {
      const filenames = fs.readdirSync(directoryPath);
      filenames.forEach((file: string) => {
        pdfs = {
          ...pdfs,
          [file.replaceAll('-', ' ').replaceAll(".pdf", "")]: `http://10.0.2.2/api/pdfs/static/${category}/${file}`,
        };
      });
      resolve(pdfs);
    } catch (err) {
      reject('Server Error');
    }
  });
};

export { arrangePdfs as arrangePdfs };
