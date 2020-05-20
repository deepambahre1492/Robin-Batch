const fs = require("./../utils/fileReader");
const fsw = require("fs");

let data = fsw.readFileSync(`${__dirname}/../data/data.json`, "utf-8");

const array = JSON.parse(data);
module.exports.getAllData = (req, res) => {
  if (array.length === 0) {
    res.status(200).render("main", { data: 0 });
  } else {
    res.status(200).render("main", { data: array });
  }
};

module.exports.getByID = (req, res) => {
  const id = parseInt(req.params.id);
  let newArray = [];
  array.forEach((el) => {
    if (el.id === id) {
      newArray.push(el);
    }
  });
  if (newArray.length === 1) {
    res.status(200).render("main", { data: newArray });
  } else {
    res.status(200).render("main", { data: 0 });
  }
};

module.exports.postData = (req, res) => {
  const data = req.body;
  let pos = 0;
  fs.fileReader(`${__dirname}/../data/data.json`).then((el) => {
    pos = JSON.parse(el).length + 1;
    let userId = req.body.userId;
    let title = req.body.title;
    let body = req.body.body;
    let dataObj = {
      userId: userId,
      title: title,
      body: body,
    };
    const newData = Object.assign({ id: pos }, dataObj || data);
    array.push(newData);
    fsw.writeFile(
      `${__dirname}/../data/data.json`,
      JSON.stringify(array),
      (err) => {
        console.log("Data Added");
      }
    );
  });
  res.send("Success");
};
