var express = require('express');
var router = express.Router();
const userHelpers = require('../controlls/userhelpers');
const {check, validationResult} = require('express-validator');
const db = require('../config/connection');


/* GET home page. */
router.get('/', async function(req, res, next) {
  let users =await userHelpers.getAllUser()
  res.render('index', {users});
});
router.get('/add-user', (req, res, next) => {
  
  console.log(req.body)
  res.render('adduser')
})

router.post('/add-user',
(req, res, next) => {
  var errors = validationResult(req)
  
  userHelpers.addUser(req.body).then((response) => {
      
    console.log(req.body)
    res.redirect('/add-user')
  })
  }
);
router.get('/update-user/:id', async(req, res, next) => {
  let user =await userHelpers.getupdateUser(req.params.id)
  res.render('edituser', {user})
})

router.post('/update-user', (req, res, next) => {
  console.log(req.body)
  userHelpers.updateUser(req.body._id, req.body).then((response) => {
    res.json(response)
  })
});

router.get('/delete-user/:id', (req, res) => {
  userHelpers.deleteUser(req.params.id).then((response) => {
    console.log(response)
    res.json(response)
  })
})

module.exports = router;
