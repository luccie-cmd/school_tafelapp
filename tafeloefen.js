let huidigAntwoord = 0;
let huidigGetal = 0;
let shouldChange = true;
let huidigeVraag = { tafel: 0, getal: 0 };
let goedeAntwoorden = [];
let gebruikteVragen = [];

function maakVraagKey(getalA, getalB) {
    const [kleinste, grootste] = [getalA, getalB].sort((a, b) => a - b);
    return `${kleinste} x ${grootste}`;
}

function kiesNieuweGetal() {
    const mogelijkeGetallen = [];
    for (let i = 1; i <= 10; i++) {
        if (!gebruikteVragen.includes(i)) {
            mogelijkeGetallen.push(i);
        }
    }

    if (mogelijkeGetallen.length === 0) {
        gebruikteVragen = [];
        for (let i = 1; i <= 10; i++) {
            mogelijkeGetallen.push(i);
        }
    }

    return mogelijkeGetallen[Math.floor(Math.random() * mogelijkeGetallen.length)];
}

function updateGoedeAntwoorden() {
    const goedeAntwoordenLijst = document.getElementById('goedeAntwoordenLijst');
    if (!goedeAntwoordenLijst) {
        return;
    }

    if (goedeAntwoorden.length === 0) {
        goedeAntwoordenLijst.innerHTML = '<li class="list-group-item text-muted">Nog geen juiste antwoorden.</li>';
        return;
    }

    goedeAntwoordenLijst.innerHTML = goedeAntwoorden
        .map((antwoord, index) => `<li class="list-group-item">${index + 1}. ${antwoord.label}</li>`)
        .join('');
}

function oefenTafel() {
    const tafelInput = document.getElementById('tafelInput');
    const tafelResultaat = document.getElementById('tafelResultaat');
    const tafel = tafelInput.value;
    if (tafel * 1 !== tafel * 1) {
        tafelResultaat.innerHTML = 'Voer een geldig getal in.';
        return;
    }
    if (!tafel) {
        tafelResultaat.innerHTML = 'Voer een tafel in.';
        return;
    }

    if (tafelInput.value !== tafelInput.getAttribute('data-tafel-actief')) {
        gebruikteVragen = [];
        tafelInput.setAttribute('data-tafel-actief', tafelInput.value);
    }

    let randomGetal = kiesNieuweGetal();
    if (shouldChange) {
        huidigGetal = randomGetal;
        shouldChange = false;
    } else if (gebruikteVragen.includes(huidigGetal)) {
        randomGetal = kiesNieuweGetal();
        huidigGetal = randomGetal;
    }

    gebruikteVragen.push(randomGetal);
    huidigeVraag = { tafel: tafel * 1, getal: randomGetal };
    let resultaat = `
    <form id="oefenForm2">
        <div class="row g-2">
            <div class="col-auto">
                ${randomGetal} x ${tafel} =
            </div>
            <div class="col">
                <input type="text" class="form-control" id="antwoordInput" placeholder="Voer het antwoord in">
            </div>
            <div class="col-auto">
                <button type="submit" class="btn btn-primary">
                    Controleer
                </button>
            </div>
        </div>
    </form><br>`;
    huidigAntwoord = randomGetal * tafel;
    tafelResultaat.innerHTML = resultaat;
    const form = document.getElementById('oefenForm2');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        checkAntwoord();
    });
    // for (let i = 1; i <= 10; i++) {
    //     resultaat += `${i} x ${tafel} = ${tafel * i}<br>`;
    // }
}

function checkAntwoord() {
    const antwoordInput = document.getElementById('antwoordInput');
    const tafelResultaat = document.getElementById('tafelResultaat');
    if (antwoordInput.value * 1 !== antwoordInput.value * 1) {
        tafelResultaat.innerHTML += 'Voer een geldig getal in.';
        return;
    }
    const num = antwoordInput.value;
    if (num == huidigAntwoord) {
        const juisteAntwoord = `${huidigeVraag.getal} x ${huidigeVraag.tafel} = ${huidigAntwoord}`;
        const vraagKey = maakVraagKey(huidigeVraag.getal, huidigeVraag.tafel);
        const bestaatAl = goedeAntwoorden.some((antwoord) => antwoord.key === vraagKey);

        if (!bestaatAl) {
            goedeAntwoorden.push({ key: vraagKey, label: juisteAntwoord });
            updateGoedeAntwoorden();
        }
        tafelResultaat.innerHTML = '<h1>Goed gedaan!</h1>';
        shouldChange = true;
    } else {
        tafelResultaat.innerHTML += '<h1>Krijg de tering doe het eens goed, zo lastig is het niet!</h1>';
    }
    setTimeout(oefenTafel, 2000);
}

const form = document.getElementById('oefenForm');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    gebruikteVragen = [];
    oefenTafel();
});