let deferredInstallPrompt = null;
const installAlert = document.getElementById('alert-border-1');
const installButton = document.getElementById('btnInstall');
installButton.addEventListener('click', installPWA);

window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);
window.addEventListener('appinstalled', logAppInstalled);

function saveBeforeInstallPromptEvent(evt) {
    // CODELAB: Add code to save event & show the install button.
        deferredInstallPrompt = evt;
        installAlert.removeAttribute('hidden');
        installButton.removeAttribute('hidden');
    }

function installPWA(evt) {
        deferredInstallPrompt.prompt();

        evt.srcElement.setAttribute('hidden', true);


        // Log user response to prompt.
        deferredInstallPrompt.userChoice
            .then((choice) => {
                if (choice.outcome === 'accepted') {
                    console.log("L'usager a installé la PWA via le bouton dédié.", choice);
                } else {
                    console.log("L'usager a refusé d'installer la PWA.", choice);
                    installButton.removeAttribute('hidden');
                }
                deferredInstallPrompt = null;
            });
    }

function logAppInstalled(evt) {
    console.log("L'application High Jack a été installée.", evt);
}