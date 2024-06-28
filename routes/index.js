var express = require('express');
const userModel = require('../models/User');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  
});
router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Express' });
  
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Express' });
  
});
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Express' });
  
});
router.post('/add', function(req, res, next) {
  var no1 =parseInt(req.body.txt1)
  var no2 =parseInt(req.body.txt2)
  var no3 = no1+no2

  res.render('ans', { a:no1,b:no2,c:no3 });
});
router.get('/add', function(req, res, next) {
  res.render('add', { title: 'Express' });
  
});
router.post('/user', function(req, res, next) {
  var bodydata={
    uname :req.body.txt1,
    ugender :req.body.txt2,
    umobile :req.body.txt3
  }
  var mydata = userModel(bodydata);
  mydata.save(req.body)
  .then(data=>{
    res.redirect('/display')
  })
 .catch(err => console.log("eror in query"+err))
  
});

router.get('/display', function(req, res, next) {
  userModel.find()
  .then(data=>{
    res.render('display',{mydata:data});
  })
  .catch(err => console.log("eror in query" +err))
});

router.get('/show/:id', function(req, res, next) {
   var myid = req.params.id;
   userModel.findById(myid)
   .then(data=>{
    res.render('show',{mydata:data})
   })
   .catch(err=>console.log("error"+err))
});
router.get('/delete/:id', function(req, res, next) {
  
  var myid = req.params.id;
  userModel.findByIdAndDelete(myid)

    .then(data=>{
      res.redirect('/display');
    })
    .catch(err=>console.log("error"+err))
});
router.get('/edit/:id', function(req, res, next) {
  var myid = req.params.id;
  userModel.findById(myid)

  .then(data=>{
    res.render('edit',{mydata:data})
  })
  .catch(err=>console.log("error"+err))
});
router.post('/update/:id', function(req, res, next) {
  var myid = req.params.id;
  var mydata={
    uname :req.body.txt1,
    ugender :req.body.txt2,
    umobile :req.body.txt3
  }
  userModel.findByIdAndUpdate(myid,mydata)

  .then(data=>{
    res.redirect('/display')
  })
  .catch(err=>console.log("error"+err))
});


module.exports = router;
