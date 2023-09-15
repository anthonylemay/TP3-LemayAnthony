let deferredInstallPrompt = null;
const installAlert = document.getElementById('alert-border-1');
const installButton = document.getElementById('btnInstall');
installButton.addEventListener('click', installPWA);

window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);
window.addEventListener('appinstalled', logAppInstalled);

function saveBeforeInstallPromptEvent(evt) {
    // Save the beforeinstallprompt event and show the install alert
    deferredInstallPrompt = evt;
    installAlert.removeAttribute('hidden');
}

function installPWA(evt) {
    deferredInstallPrompt.prompt();

    // Hide the source element of the event. If the event source is the installButton, it'll hide the button.
    evt.srcElement.setAttribute('hidden', true);

    // Log user response to prompt.
    deferredInstallPrompt.userChoice
        .then((choice) => {
            if (choice.outcome === 'accepted') {
                console.log("L'usager a installé la PWA via le bouton dédié.", choice);
            } else {
                console.log("L'usager a refusé d'installer la PWA.", choice);
            }
            deferredInstallPrompt = null;
        });
}

function logAppInstalled(evt) {
    console.log("L'application High Jack a été installée.", evt);
    installAlert.setAttribute('hidden', true);
}
