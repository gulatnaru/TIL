const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: 'HappyHacking',
    greeting: 'May you have HAPPY HACKING'
  })
});

router.get('/:name', (req, res) => {
  res.send(`Hi, ${req.params.name}`);
});

module.exports = router;