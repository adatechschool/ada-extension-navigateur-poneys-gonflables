//détecter les cliques sur les boutons 

let defButtonTrigger = false //vérifie si un évènement est déjà attaché au bouton (évite de stacker ou d'annuler l'évènement du bouton)

document.addEventListener("DOMContentLoaded", () => {
const defButton = document.getElementById("def");
const tradButton = document.getElementById("trad"); 
const noteButton = document.getElementById("note");

defButton.addEventListener("click", () => {
    chrome.runtime.sendMessage({action:"def"});
});

tradButton.addEventListener("click", ()=> {
    chrome.runtime.sendMessage({action:"trad"})
});

noteButton.addEventListener("click", ()=> {
    chrome.runtime.sendMessage({action:"note"})
});
});
