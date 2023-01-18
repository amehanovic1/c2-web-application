const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const fs = require('fs');
const bcrypt = require('bcrypt')
//const path = require('path');
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
        /*bcrypt.hash(nastavnici[i].nastavnik.password_hash, 10, function(err, hash) {
            console.log("Korisnik: " + nastavnici[i].nastavnik.username + " | Sifra: "  + hash);
        });*/
        const passwordOdgovara = bcrypt.compare(password, nastavnici[i].nastavnik.password_hash);
        if(username == nastavnici[i].nastavnik.username && passwordOdgovara) {
            return true;
        }
    }
    return false;
}

app.post('/login', function(req, res) {
    if(uspjesanLogin(req.body.username, req.body.password)) {
        req.session.username = req.body.username;
        for(let i = 0; i < nastavnici.length; i++) {
            if(req.body.username == nastavnici[i].nastavnik.username) {
                req.session.predmeti = nastavnici[i].predmeti;
            }
        }
        res.json({"poruka": "Uspješna prijava"});
    }
    else {
        res.json({"poruka": "Neuspješna prijava"});
    }

    
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

app.get('/predmeti', function(req, res) {
    if(req.session) {
        let predmeti = [];
        for(let i = 0; i < nastavnici.length; i++) {
            if(req.session.username == nastavnici[i].nastavnik.username) {
                predmeti = nastavnici[i].predmeti;
            }
        }
        res.json(predmeti);
    }
    else {
        res.json({"greska": "Nastavnik nije loginovan"});
    }
});

//kao rezultat poziva dobija se lista prisustva u json formatu za navedeni predmet
app.get('/predmeti/:naziv', function(req, res) {
    //provjera da li je nastavnik loginovan
    if(req.session) {
        fs.readFile('./public/data/prisustva.json', 'utf8', (error, data) => {
            if (error) throw error;
            let jsonRez = JSON.parse(data);
            let nazivPredmeta = req.params.naziv;
            for(let i = 0; i < jsonRez.length; i++) {
                if(jsonRez[i].predmet === nazivPredmeta) {
                    res.json(jsonRez[i]); 
                }
            }
    });
    }
    else {
        res.json({"greska": "Nastavnik nije loginovan"});
    }
});

//promjena prisustva
app.post('/prisustvo/predmet/:NAZIV/student/:index', function (req, res) {
    if(req.session) {
        fs.readFile('./public/data/prisustva.json', 'utf8', (error, data) => {
            if (error) throw error;
            let jsonRez = JSON.parse(data);

            let nazivPredmeta = req.params.NAZIV;
            let index = req.params.index;
            for(let i = 0; i < jsonRez.length; i++) {
                if(jsonRez[i].predmet === nazivPredmeta) {
                    if(daLiPostojiStudent(jsonRez[i].prisustva, index, req.body.sedmica)) {
                        for(let j = 0; j < jsonRez[i].prisustva.length; j++) {
                            if(jsonRez[i].prisustva[j].index == index && jsonRez[i].prisustva[j].sedmica == req.body.sedmica) {
                            jsonRez[i].prisustva[j].predavanja = req.body.predavanja;
                            jsonRez[i].prisustva[j].vjezbe = req.body.vjezbe;
                            fs.writeFile('./public/data/prisustva.json', JSON.stringify(jsonRez), 'utf8', error => {
                                if(error) throw error;
                            });
                          }
                        }
                    }
                    else {
                        //sedmica koja nema prisustvo
                        let data = {
                            "sedmica": req.body.sedmica,
                            "predavanja": req.body.predavanja,
                            "vjezbe": req.body.vjezbe,
                            "index": Number(index)
                        };

                        jsonRez[i].prisustva.push(data);
                        fs.writeFile('./public/data/prisustva.json', JSON.stringify(jsonRez), 'utf8', error => {
                            if(error) throw error;});
                    }
                    res.json(jsonRez[i]); 
                }
            }
        });
    }
    else {
        res.json({"greska": "Nastavnik nije loginovan"});
    }
});

function daLiPostojiStudent(prisustvoZaPredmet, index, sedmica) {
    for(let i = 0; i < prisustvoZaPredmet.length; i++) {
        if(prisustvoZaPredmet[i].index == index && prisustvoZaPredmet[i].sedmica == sedmica)  return true;
    }
    return false;
}

app.post('/logout', (req, res) => {
    req.session.destroy();
    res.json({poruka: "Uspjesna odjava"});
});

app.listen(3000, () => {console.log("Server aktivan")});