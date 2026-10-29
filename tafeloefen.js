let huidigAntwoord = 0;
let huidigGetal = 0;
let shouldChange = true;

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
    let randomGetal = Math.floor(Math.random() * 10) + 1;
    if (!shouldChange && huidigGetal !== 0) {
        randomGetal = huidigGetal;
    }
    if (shouldChange) {
        huidigGetal = randomGetal;
        shouldChange = false;
    }
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
    oefenTafel();
});