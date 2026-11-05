function voegDatumToe() {
    const datumElements = document.getElementsByClassName('datum');
    const datum = new Date().toLocaleDateString('nl-NL');

    for (const datumElement of datumElements) {
        datumElement.textContent = datum;
    }
}

function getAppPagePath(pageName) {
    const currentPath = window.location.pathname;
    const alreadyInRekenapp = currentPath.includes('/rekenapp/') || currentPath.endsWith('/rekenapp') || currentPath.endsWith('/rekenapp/');

    return alreadyInRekenapp ? pageName : `rekenapp/${pageName}`;
}

function getNavBar() {
    const navBar = document.createElement('nav');
    navBar.className = 'navbar navbar-expand-lg bg-body-tertiary';
    navBar.innerHTML = `
        <div class="container-fluid">
            <a class="navbar-brand" href="/index.html">Tafel App</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="${getAppPagePath('tafelapp.html')}">Tafel Zicht</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="${getAppPagePath('tafeloefen.html')}">Tafel Trainer</a>
                    </li>
                </ul>
            </div>
        </div>
    `;
    return navBar;
}

document.addEventListener('DOMContentLoaded', voegDatumToe);
document.addEventListener('DOMContentLoaded', function () {
    const navBar = getNavBar();
    document.body.insertBefore(navBar, document.body.firstChild);
});