const fs = require("fs");

exports.fileReader = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, "utf-8", (err, data) => {
      if (err) reject("File Doesn't exist");
      resolve(data);
    });
  });
};
