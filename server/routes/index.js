var express = require('express');
const { Register, SearchUser } = require('../controllers/users');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.json('it works!');
});

router.post('/register', Register);
router.get('/search', SearchUser);



module.exports = router;
