let div = document.getElementById("divSadrzaj");
//instanciranje
let prisustvo = TabelaPrisustvo(div, {
    "studenti": [{
    "ime": "Neko Nekic",
    "index": 12345
    },
    {
    "ime": "Drugi Neko",
    "index": 12346
    },
    {
    "ime": "Treci Neko",
    "index": 12348
    }
    ],
    "prisustva": [{
    "sedmica": 8,
    "predavanja": 2,
    "vjezbe": 1,
    "index": 12345
    },
    {
    "sedmica": 7,
    "predavanja": 2,
    "vjezbe": 2,
    "index": 12345
    },
    {
    "sedmica": 6,
    "predavanja": 2,
    "vjezbe": 0,
    "index": 12346
    },
    {
    "sedmica": 5,
    "predavanja": 2,
    "vjezbe": 0,
    "index": 12346
    },
    {
    "sedmica": 9,
    "predavanja": 0,
    "vjezbe": 1,
    "index": 12346
    },
    {
    "sedmica": 9,
    "predavanja": 1,
    "vjezbe": 1,
    "index": 12345
    }
    ],
    "predmet": "Razvoj mobilnih aplikacija",
    "brojPredavanjaSedmicno": 2,
    "brojVjezbiSedmicno": 2
    });

//pozivanje metoda
prisustvo.sljedecaSedmica();
prisustvo.prethodnaSedmica();