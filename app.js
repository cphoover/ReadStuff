var fs = require('fs');
var exec = require('child_process').exec; 
var express = require('express');
var app = express();
var Logger = console;

app.use(express.bodyParser());
console.log('static', __dirname + '/audio/');
app.use('/audio', express.static('audio'));
app.use('/js', express.static('js'));

app.get('/', function(req, res){
    console.log(req.query.text);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    var filename =  new Date().getTime() + "-" + Math.floor(Math.random()*100000) + '.mp3';

    var command = exec('wget -U Mozilla -O ./audio/' + filename + ' "http://tts-api.com/tts.mp3?q=' + encodeURIComponent(req.query.text) + '";');

    command.stdout.on('data', function (data) {
      console.log('stdout: ' + data);
    });

    command.stderr.on('data', function (data) {
        //console.log('stderr: ' + data);
    });

    command.on('exit', function (code) {
        var response = {status:0, data:null, message:null};

        console.log('child process exited with code ' + code);
        if(code == 0){
            response.data    = filename;
            response.status  = 1;
            res.json(response);
        }
        else{
            response.message  = "Exited with code (" + code + ")";
            response.status   = 0;
            res.json(response);
        }
    });
    
/*
    console.log('command', command);
    child = exec(command, 
        function (error, stdout, stderr) {
            if(error) Logger.log(error);
            if(stdout) Logger.log(stdout);
            if(stderr) Logger.log(stderr);
            res.send(filename);
    }); */
});

app.listen(80);
