const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Happy Hacking',
        greeting: 'May you have happy hacking'
    })
})

router.get('/', (req, res) => {
  res.send('Happy Hacking');
});

module.exports = router;