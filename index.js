import nastavnici from './public/data/nastavnici.json' assert {type: 'json'};
//const nastavnici = require('./public/data/nastavnici.json');

const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    secret: 'assdfghjkallsoekd',
    resave: true,
    saveUninitialized: true
}))

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/public/html/prijava.html");
});

function nadjiNastavnika(username, password) {
    for(let i = 0; i < nastavnici.length; i++) {
        if(nastavnici[i].username == username && nastavnici[i].password_hash == password) {
            return nastavnici[i];
        }
    }
}

app.post('/login', function(req, res) {
    let username, password, poruka = "";
    username = req.body.username;
    password = req.body.password_hash;
    /*if(req.session) {
        username = req.body.username;
        password = req.body.password;
    }
    else {
        //nije uneseno
    }*/
    let nastavnik = nadjiNastavnika(username, password);
    //provjeriti da li ima u nastavnici.json
    if(nastavnik) {
        //Ukoliko je ispravno loginovan korisnik u sesiju upišite username korisnika i listu predmeta na kojima je on nastavnik
        req.session.username = username;
        req.session.predmeti = nastavnik.predmeti;
        //U odgovoru vratite json u formatu...
        poruka = "Uspješna prijava";
    }
    else {
        poruka = "Neuspješna prijava";
    }
});

//za loginovanog nastavnika lista predmeta se može dobiti na ruti GET /predmeti.
app.get('/predmeti', function(req, res) {

});

app.get('/predmeti.html', function(req, res) {
    res.sendFile(__dirname + "/public/html/predmeti.html");
});

//dodati na stranicu
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})

app.listen(3000);