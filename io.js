const fs = require("fs");

class IO {
  createFolder(dir) {
    fs.mkdir(dir, () => {});
  }
  createFile(dir) {
    fs.rmdir(dir, (a) => {
      console.log(a);
    });
  }
  writeFile(dir, data) {
    fs.writeFileSync(dir, data);
  }
}

module.exports = { IO };
