const express = require('express');
const router = express.Router();
const bd = require('../bd/bd');

/* GET home page. */
router.get('/search', function (req, res, next) {
  const file = bd.getAll();
  res.send(file)
  console.log('All items:\n', file);
});

router.get('/get/:id', function (req, res, next) {
  const id = req.path.split('/')[2];
  const item = bd.getOne(id);
  console.log('Item:\n', item);

  if (!item) {
    return res.sendStatus(404);
  }

  return res.send(item);
});

router.patch('/update/:id', function (req, res, next) {
  const id = req.path.split('/')[2];
  const data = req.body;

  const newItem = bd.updateOne({ id, data });

  if (!newItem) {
    return res.sendStatus(404);
  }

  console.log('Updated item:\n', newItem);
  return res.send(newItem);
});

router.post('/create', function (req, res, next) {
  const data = req.body;

  const newFile = bd.create(data);

  if (!newFile) {
    return res.sendStatus(404);
  }

  console.log('New item:\n', newFile);
  return res.send(newFile);
});

router.delete('/delete/:id', function (req, res, next) {
  const id = req.path.split('/')[2];
  const status = bd.delete(id);
  
  if (!status) {
    return res.sendStatus(400);
  }
  
  return res.send('success');
});

module.exports = router;
