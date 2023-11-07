var express = require('express');
var router = express.Router();
const fs = require('fs');
var path = require('path');

// Or
/* GET pictures listing. */
router.get('/', function(req, res, next) {
  const pictures = fs.readdirSync(path.join(__dirname, '../pictures/'));
  res.render('pictures', { pictures: pictures});
});

router.get('/:pictureName', function(req, res, next) {
  const pictureName = req.params.pictureName;
  const picturePath = path.join(__dirname, '../pictures/', pictureName);

  fs.readFile(picturePath, (err, data) => {
    if (err) {
      // Handle error (e.g., picture not found)
      return res.status(404).send('Picture not found');
    }

    res.contentType('image/jpg');
    res.send(data);
  });
});

router.post('/', function(req, res, next) {
  const file = req.files.file;
  fs.writeFileSync(path.join(__dirname, '../pictures/', file.name), file.data);
  res.end();
});


module.exports = router;