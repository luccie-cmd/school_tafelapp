function toonTafel() {
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
    let resultaat = '';
    for (let i = 1; i <= 10; i++) {
        resultaat += `${i} x ${tafel} = ${tafel * i}<br>`;
    }
    tafelResultaat.innerHTML = resultaat;
}

const form = document.getElementById('tafelForm');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    toonTafel();
});