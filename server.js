var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/sample-server'); // test테이블을 만든다.

const User = mongoose.model('User', { id:String, password:String, name:String, email:String, gender:String, location:String });

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

//Create
app.post('/user', function (req, res) {

  var user = new User();
  user.id = req.body.id;
  user.password = req.body.password;
  user.name =  req.body.name;

  user.save(function(err){
      if(err){
          console.error(err);
          res.json({result: 0});
          return;
      }
      res.json({result: 1});
  });
});

app.get('/user/:id', function (req, res) {
  var id = req.params.id;

  User.findOne({id:id}, function(err, result){
    if(result){
      res.send(result);
      //res.redirect('/?'+result.name);
    }
    else{
      res.send('Fail');
    }
  });
});

//Read
app.post('/login', function (req, res) {
  var id = req.body.id;
  var password = req.body.password;

  User.findOne({id:id, password:password}, function(err, res){
    if(result){
      res.send('OK');
      // res.redirect('/?'+result.name);
    }
    else{
      res.send('Fail');
    }
  });
});


// app.get('/user/search', function (req, res) {
//
//   console.log('데이터 확인', req.query.name);
//
//   // TODO 실제로 DB 데이터를 조회하는 로직을 개발해야 함.
//
//   var users = [{
//     userId: 13579,
//     name: 'John',
//     email: 'yohany_AT_gmail.com',
//     company: 'KossLAB'
//   }];
//
//   res.send({result: users});
//
// });



app.put('/user/:userId', function (req, res) {
  res.send('PUT (Update) ');
});

app.delete('/user/:userId', function (req, res) {
  res.send('DELETE (Delete) ');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
