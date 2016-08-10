var fs = require('fs');
var express = require('express');
var bodyParser  = require('body-parser');
var uuid = require('uuid');
var app = express();
var cors = require('cors');

app.use(bodyParser.json());

app.use(cors());

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

function readFile(cb) {
    fs.readFile('filename', cb)
}

function writeFile(note, cb) {
    fs.writeFile('filename', note, cb)
}

app.get('/notes', function(req, res) {
    readFile(function(err, notes) {
        // console.log(notes.toString('utf8'));
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
            content.push({
                id,
                task: req.body.task
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

app.put('/notes/:id', function(req, res) {
    readFile(function(err, notes) {
        if (err)
            res.send('Something when wrong');
        else {
            var content = JSON.parse(notes);
            content = content.map(note => {
                if (note.id === req.params.id) {
                    return {
                        id: note.id,
                        task: req.body.task
                    };
                }
                return note;
            });
            writeFile(JSON.stringify(content), function(err) {
                if (err)
                    res.send('Something when wrong');
                else
                    res.send('Updated!');
            });
        }
    });
});

app.listen(3000, function(){
    console.log('CORS-enabled web server listening on port 3000');
});