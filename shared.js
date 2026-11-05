function voegDatumToe() {
    const datumElements = document.getElementsByClassName('datum');
    const datum = new Date().toLocaleDateString('nl-NL');

    for (const datumElement of datumElements) {
        datumElement.textContent = datum;
    }
}

document.addEventListener('DOMContentLoaded', voegDatumToe);
