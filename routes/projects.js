
var express = require('express');
var Project = require('../models/projectModel');
var router = express.Router();



var MongoClient = require('mongodb').MongoClient;
// Connection URL
var url = 'mongodb://localhost:27017';
var db;
// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  console.log("Connected successfully to MongoDB Server...");
  db = client.db('portfolio-v');
});


// this function will go to the database and fetch the documents
// once it has got the data, it will make a call to the callback function
function getProjects(callback){
    var collection = db.collection('projects');
    collection.find({}).toArray(function(err, docs) {
        console.log(docs)
        console.log('2')
        callback(null, docs);
        console.log('4')
    });
}


router.get('/create',function(req,res,next){

res.render('project-create', { 
    layout: 'layout-admin', 
    title: 'Projects Admin',
    navProjects: true
});
});

router.post('/create',function(req,res,next){
    var projectModel = new Project();
   
    projectModel.name = req.body.name;
    console.log(req.body.name)
    projectModel.alias = req.body.alias;
    projectModel.githubUrl = req.body.githubUrl;
   // projectModel.tags = req.body.tags;
    projectModel.description = req.body.description;
    projectModel.createAt = new Date();
    projectModel.save(function(err,projectModel){
      console.log(JSON.stringify(projectModel));
   if(err) res.send(err);
   res.redirect('/')
    });
  });



router.get('/', function (req, res, next) {
    // define a callback function
    function listProjects(error, data){
        res.render('projects', { 
            title: 'Projects', 
            navProjects: true, 
            showFooter: true, 
            layout: 'layout-projects',
            projects: data,
            
        });
        console.log('3')
        
     };
     console.log('1')
    getProjects(listProjects);
    console.log('5')
});
console.log('6')
module.exports = router;