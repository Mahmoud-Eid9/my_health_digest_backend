const fs = require('fs');
const path = require('path');

const arrangePdfs = (category: string, language: string) => {
  return new Promise((resolve, reject) => {
    const directoryPath = path.resolve(__dirname, `../public/${language}/${category}`);
    let pdfs = {};
    try {
      const filenames = fs.readdirSync(directoryPath);
      filenames.forEach((file: string) => {
        if (!file.match(/^.*\.[^\\]+$/g)) {
          pdfs = {
            ...pdfs,
            [file.replaceAll('-', ' ')]: `http://143.244.213.94/api/pdfs/get-pdfs/${language}/${category}/${file}`,
          };
        }
        else if (file.endsWith(".pdf")) {
          pdfs = {
            ...pdfs,
            [file
              .replaceAll('-', ' ')
              .replaceAll(
                '.pdf',
                ''
              )]: `http://143.244.213.94/api/pdfs/static/${language}/${category}/${file}`,
          };
        }
      });
      resolve(pdfs);
    } catch (err) {
      reject('File not Found');
    }
  });
};


const arrangeSubPdfs = (category: string, language: string, subcategory: string) => {
  return new Promise((resolve, reject) => {
    const directoryPath = path.resolve(__dirname, `../public/${language}/${category}/${subcategory}`);
    let pdfs = {};
    try {
      const filenames = fs.readdirSync(directoryPath);
      filenames.forEach((file: string) => {
        if (file.endsWith(".pdf")) {
          pdfs = {
            ...pdfs,
            [file
              .replaceAll('-', ' ')
              .replaceAll(
                '.pdf',
                ''
              )]: `http://143.244.213.94/api/pdfs/static/${language}/${category}/${subcategory}/${file}`,
          };
        }
      });
      resolve(pdfs);
    } catch (err) {
      reject('File not Found');
    }
  });
};

export { arrangePdfs as arrangePdfs, arrangeSubPdfs as arrangeSubPdfs };
