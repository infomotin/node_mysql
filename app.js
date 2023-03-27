const express = require('express')
const mysql = require('mysql')

//create connection with mysql client 

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "new_db"
    }
);
//connect 
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected');
});


const app = express();

// if db not exict than create new 
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE new_db';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Database created...');
    });
});
//CREATE TABLE ON DATABASE ITS BOLONG TO DATABASE POST TABLE 
app.get('/createposttable', (req, res) => {
    let sql = 'CREATE TABLE post(id int AUTO_INCREMENT,title VARCHAR(255),body VARCHAR(255),PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('post table created...');
    });
});
//INSERT DATA INTO TABLE
app.get('/addpost1', (req, res) => {
    let post = { title: 'Post One', body: 'This is post number one' };
    let sql = 'INSERT INTO post SET ?';
    db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post 1 added...');
    });
});


app.listen('3000', () => {
    console.log('app runnig on Port 3000')
});