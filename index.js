//import nastavnici from './public/data/nastavnici.json' assert {type: 'json'};
//const nastavnici = require('./public/data/nastavnici.json');

const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const fs = require('fs');
const path = require('path');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    secret: 'assdfghjkallsoekd',
    resave: true,
    saveUninitialized: true
}))


app.use(express.static(__dirname + '/public'));
//app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static('public'));

app.get('/prijava.html', function(req, res) {
    res.sendFile(__dirname + "/public/html/prijava.html");
});

app.get('/predmeti.html', function(req, res) {
    res.sendFile(__dirname + "/public/html/predmeti.html");
});

let nastavnici;
fs.readFile('./public/data/nastavnici.json', 'utf8', (error, data) => {
    if(error) throw error;
    nastavnici = JSON.parse(data);

});

function uspjesanLogin (username, password) {
    for(let i = 0; i < nastavnici.length; i++) {
        if(username == nastavnici[i].nastavnik.username && password == nastavnici[i].nastavnik.password) {
            return true;
        }
    }
    return false;
}

app.post('/login', function(req, res) {
    if(uspjesanLogin) {
        req.session.username = req.body.username;
        for(let i = 0; i < nastavnici.length; i++) {
            if(req.body.username == nastavnici[i].nastavnik.username) {
                req.session.predmeti = nastavnici[i].predmeti;
            }
        }
        res.json({poruka: "Uspjesna prijava"});
    }
    else {
        res.json({poruka: "Neuspjesna prijava"});
    }
    /*else {
        //res.redirect('/login');
        res.json({poruka: "Neuspjesan login..."});
    }*/
    //res.json({poruka:"Uspješno dodan red"});
    //res.send('Dobrodosli!');
    //res.end();
    /*
    let username, password, poruka = "";
    username = req.body.username;
    password = req.body.password_hash;
    */
    /*if(req.session) {
        username = req.body.username;
        password = req.body.password;
    }
    else {
        //nije uneseno
    }*/
    //let nastavnik = nadjiNastavnika(username, password);
    //provjeriti da li ima u nastavnici.json
    //if(nastavnik) {
        //Ukoliko je ispravno loginovan korisnik u sesiju upišite username korisnika i listu predmeta na kojima je on nastavnik
       // req.session.username = username;
        //req.session.predmeti = nastavnik.predmeti;
        //U odgovoru vratite json u formatu...
        //poruka = "Uspješna prijava";
    /*}
    else {
        poruka = "Neuspješna prijava";
    }
    */
});


//za loginovanog nastavnika lista predmeta se može dobiti na ruti GET /predmeti.
app.get('/predmeti', function(req, res) {
    if(req.session) {
        let predmeti = [];
        for(let i = 0; i < nastavnici.length; i++) {
            //console.log("USERNAME: " + jsonRez[i].nastavnik.username);
            if(req.session.username == nastavnici[i].nastavnik.username) {
                predmeti = nastavnici[i].predmeti;
            }
                //console.log("PREDMETI: " + req.session.predmeti);
        }
       // console.log("SESIJA: " + predmeti);
        res.json(predmeti);
    }
    else {
        res.json({greska: "Nastavnik nije loginovan"});
    }
});

//dodati na stranicu
app.post('/logout', (req, res) => {
    req.session.destroy();
    //res.redirect('/prijava.html');;
    res.json({poruka: "Uspjesna odjava"});
});

app.listen(3000, () => {console.log("Server aktivan")});