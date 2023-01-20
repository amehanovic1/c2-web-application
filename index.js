const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const fs = require("fs");
const bcrypt = require("bcrypt");
const app = express();

const Sequelize = require("sequelize");
const db = require("./db");
const { response } = require("express");
const studenti = require("./studenti");
//const priprema = require("./priprema");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

app.use(express.static(__dirname + "/public"));

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

app.post('/login', function(req, res) {
    db.nastavnici.findOne( {where: {username: req.body.username} } ).then(function(nastavnik) {
        if(nastavnik != null) {
            bcrypt.compare(req.body.password, nastavnik.password_hash, (error, response) => {
                if(!response) {
                    res.json({"poruka": "Neuspješna prijava"});
                    return;
                }
                req.session.username = req.body.username;
                //lista predmeta
                nastavnik.getNastavniciPredmeti().then(function (predmeti) {
                    let pomocni = [];
                    predmeti.forEach(predmet => pomocni.push(predmet.naziv));
                    req.session.predmeti = pomocni;
                    res.json({"poruka": "Uspješna prijava"});
                });
            });
        }
        else {
            res.json({"poruka": "Neuspješna prijava"});
            return;
        }
    });
});

app.get('/predmeti', function(req, res) {
    if(req.session && req.session.username) {
        res.json(req.session.predmeti);
    }
    else {
        res.json({"greska": "Nastavnik nije loginovan"});
    }
});

//podaci o prisustvu
app.get('/predmeti/:NAZIV', async function(req, res) {
    //provjera da li je nastavnik loginovan
    if(req.session && req.session.username) {
    let nastavnik = await db.nastavnici.findOne({where: {username: req.session.username} });
        let predmet = await db.predmeti.findOne({where: {naziv: req.params.NAZIV, NastavnikId: nastavnik.id} });
        if(predmet == null) {
            res.json({"greska": "Nastavnik ne predaje izabrani predmet"});
            return;
        }
        
        let prisustva = await db.prisustva.findAll({where: {predmetId: predmet.id} });

        //studenti na predmetu 
        studentiNaPredmetu = [];
        db.predmeti.findOne( { where: {id: predmet.id} }).then( function (predmet){
            predmet.getStudenti().then( function (studenti){
                studenti.forEach(student => {
                    studentiNaPredmetu.push({ime: student.ime, index: student.index});
                });
                res.json({studenti: studentiNaPredmetu, prisustva: prisustva, predmet: predmet.naziv, brojPredavanjaSedmicno: predmet.brojPredavanjaSedmicno, brojVjezbiSedmicno: predmet.brojVjezbiSedmicno});
            }); 

        });
    }
    else {
        res.json({"greska": "Nastavnik nije loginovan"});
        return;
    }
});

function provjeriPrisustvoZaStudenta(prisustvoZaPredmet, index, sedmica) {
    for(let i = 0; i < prisustvoZaPredmet.length; i++) {
        if(prisustvoZaPredmet[i].index == index && prisustvoZaPredmet[i].sedmica == sedmica)  return true;
    }
    return false;
}

//promjena prisustva
app.post('/prisustvo/predmet/:NAZIV/student/:index', function (req, res) {
    //provjera da li je nastavnik loginovan
    if(req.session && req.session.username) {
        fs.readFile('./public/data/prisustva.json', 'utf8', (error, data) => {
            if (error) throw error;
            
            let podaciPrisustvo = JSON.parse(data);
            let nazivPredmeta = req.params.NAZIV;
            let index = req.params.index;
            let sedmica = req.body.sedmica;

            for(let i = 0; i < podaciPrisustvo.length; i++) {
                if(podaciPrisustvo[i].predmet === nazivPredmeta) {

                    if(provjeriPrisustvoZaStudenta(podaciPrisustvo[i].prisustva, index, req.body.sedmica)) {

                        for(let j = 0; j < podaciPrisustvo[i].prisustva.length; j++) {
                            if(podaciPrisustvo[i].prisustva[j].index == index && podaciPrisustvo[i].prisustva[j].sedmica == sedmica) {
                                podaciPrisustvo[i].prisustva[j].predavanja = req.body.predavanja;
                                podaciPrisustvo[i].prisustva[j].vjezbe = req.body.vjezbe;
                                fs.writeFile('./public/data/prisustva.json', JSON.stringify(podaciPrisustvo), 'utf8', error => {
                                    if(error) throw error;
                                });
                            }
                        }
                    }
                    else {
                        //sedmica koja nema prisustvo
                        let novaSedmica = {
                            "sedmica": req.body.sedmica,
                            "predavanja": req.body.predavanja,
                            "vjezbe": req.body.vjezbe,
                            "index": Number(index)
                        };

                        podaciPrisustvo[i].prisustva.push(novaSedmica);
                        fs.writeFile('./public/data/prisustva.json', JSON.stringify(podaciPrisustvo), 'utf8', error => {
                            if(error) throw error;
                        });
                    }
                    res.json(podaciPrisustvo[i]); 
                }
            }
        });
    }
    else {
        res.json({"greska": "Nastavnik nije loginovan"});
    }
});

app.post('/logout', (req, res) => {
    req.session.destroy();
    res.json({"poruka": "Uspješna odjava"});
});

app.listen(3000, () => { console.log("Server aktivan"); });