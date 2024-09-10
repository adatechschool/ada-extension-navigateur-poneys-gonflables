// Exemple simple de background.js
// Ce script peut rester vide si vous n'avez pas de fonctionnalités spécifiques à gérer en arrière-plan

chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installée");
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    switch (request.action) {
        case "def":
            defFunction();
            break;
        case "trad":
            tradFunction();
            break;
        case "note":
            noteFunction();
            break;
    }
});

function defFunction() {
    console.log("un mot doit être défini");
}

function tradFunction() {
    console.log("un mot doit être traduit");
}

function noteFunction() { 
    console.log("ajoute des annotations");
}
