var fs = require('fs');
var express = require('express');
var bodyParser  = require('body-parser');
var uuid = require('uuid');
var app = express();

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

function readFile(cb) {
    fs.readFile('filename', cb)
}

function writeFile(note, cb) {
    fs.writeFile('filename', note, cb)
}

app.get('/notes', function(req, res) {
    readFile(function(err, notes) {
        if (err) {
            res.send('Something when wrong');
        } else {
            res.send(notes);
        }
    });
});

app.post('/notes', function(req, res) {
    readFile(function(err, notes) {
        if (err)
            res.send('Something when wrong');
        else {
            const id = uuid.v4();
            const content = JSON.parse(notes);
            console.log(req.body);
            content.push({
                id,
                task: req.body
            });
            writeFile(JSON.stringify(content), function(err) {
                if (err)
                    res.send('Something when wrong');
                else
                    res.send({ id });
            });
        }
    });
});

app.delete('/notes/:id', function (req, res) {
    readFile(function(err, notes) {
        if (err)
            res.send('Something when wrong');
        else {
            var content = JSON.parse(notes);
            content = content.filter(note => note.id != req.params.id);
            writeFile(JSON.stringify(content), function(err) {
                if (err)
                    res.send('Something when wrong');
                else
                    res.send('Removed!');
            });
        }
    });
});

app.put('/notes', function(req, res) {
    //update note present in json by looking up id
    fs.writeFile('filename', JSON.stringify(req.body), function(err, task) {
        if (err) {
            res.send('Something when wrong');
        } else {
            res.send('Saved!');
        }
    })
});

app.listen(3000);