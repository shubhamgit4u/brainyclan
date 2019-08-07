var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var url="mongodb://localhost:27017/";
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/login', function(req, res, next) {
  res.render('login');
});
router.get('/cpro', function(req, res, next) {
  mongo.connect(url,{useNewUrlParser:true},(err,db)=>{
    if (err) throw err;
    console.log('db connected');
    var dbo = db.db('project1');
  dbo.collection('cmcq').find({}).toArray((err,result)=>{
    if(err) throw err;
    console.log("data fetched");
    res.render('cpro',{res:result});
  db.close();
  });
});
});
router.get('/apti', function(req, res, next) {
  mongo.connect(url,{useNewUrlParser:true},(err,db)=>{
    if (err) throw err;
    console.log('db connected');
    var dbo = db.db('project1');
  dbo.collection('apti').find({}).toArray((err,result)=>{
    if(err) throw err;
    console.log("data fetched");
    res.render('apti',{res:result});
  db.close();
  });
});
});

router.post('/log', function(req, res, next) {
  mongo.connect(url,{useNewUrlParser:true},(err,db)=>{
    if (err) throw err;
    console.log('db connected');
    var dbo = db.db('project1');
    //var query= {email:req.body.email,password:req.body.password};
    dbo.collection('register').find({email:req.body.email,password:req.body.password}).toArray((err,data)=>{
      if(err) throw err;
      console.log("data fetched");
      console.log(data);
      console.log(data.length);
      if(data.length>0)
      {
        dbo.collection('apti').find({}).toArray((err,result)=>{
          if(err) throw err;
          console.log("data fetched");
          res.render('apti',{res:result});
        db.close();
      });
      }
      else res.render('login',{message:"*Incorrect Email Or Password!!"})
      db.close();
    });
  });
});
router.post('/register', function(req, res, next) {
  mongo.connect(url,{useNewUrlParser:true},(err,db)=>{
    if (err) throw err;
    console.log('db connected');
    var dbo = db.db('project1');
    var query={name:req.body.name,password:req.body.password,email:req.body.email,contact:req.body.contact};
    dbo.collection("register").insertOne(query, (err,res) => {
      if (err) throw err;
      console.log("data is inserted1");
    });
      dbo.collection('cmcq').find({}).toArray((err,result)=>{
        if(err) throw err;
        console.log("data fetched");
        res.render('cpro',{res:result});
      db.close();
      
    });
  });
});
router.post('/submit', function(req, res, next) {
  mongo.connect(url,{useNewUrlParser:true},(err,db)=>{
    if (err) throw err;
    console.log('db connected');
    var dbo = db.db('project1');

    dbo.collection('cmcq').find({}).toArray((err,result)=>{
      if(err) throw err;
      console.log("data fetched");
      var i=0,count=0;
      var arr=[req.body.q0,req.body.q1,req.body.q2,req.body.q3,req.body.q4,req.body.q5,req.body.q6,req.body.q7,req.body.q8,req.body.q9]
      for(ans in result){ 
        if(result[ans].ans==arr[ans])
        {count++;}
        i++;
      }
        console.log(count)
        db.close();
        res.render('result',{mark:count});
  });
});
});
router.post('/apti', function(req, res, next) {
  mongo.connect(url,{useNewUrlParser:true},(err,db)=>{
    if (err) throw err;
    console.log('db connected');
    var dbo = db.db('project1');
    req.session.email=req.body.email;
    req.session.password=req.body.password;
    var query={name:req.body.name,password:req.body.password,email:req.body.email,contact:req.body.contact};
      dbo.collection('apti').find({}).toArray((err,re)=>{
        if(err) throw err;
        console.log("data fetched");
        res.render('apti',{res:re});
      db.close();
      
    });
  });
});
module.exports = router;
