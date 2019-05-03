var express = require('express');
var pg = require('pg');
var path = require('path');
var app = express();

var connectionString = "postgres://datateam:***@peg-confdev02:5432/jira644";
var jiraQuery =`select * from project`;


 /*
const pool = new Pool();
const client = new Client({
    user: 'datateam',
    host: 'peg-confdev02',
    database: 'jira644',
    password: 'gXHyuzv4T4I5sYxUe0k1',
    port: 5432,
  })
  client.connect()
*/
app.get('/ping', (req, res) => res.send('Hello World!'))
 
app.get('/jira', function (req, res, next) {
    /*client.query('select * from project', (err, res) => {
        console.log(err, res)
        client.end()
      });
      */

     pg.connect(connectionString,function(err,client,done) {
       if(err){
           console.log("not able to get connection "+ err);
           res.status(400).send(err);
       } 
       client.query(jiraQuery,function(err,result) {
           done(); // closing the connection;
           if(err){
               console.log(err);
               res.status(400).send(err);
           }
           res.status(200).send(result.rows);
       });
    });

});
 
app.get('/Home', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});


app.listen(4000, function () {
console.log('Server is running.. on Port 4000');
});