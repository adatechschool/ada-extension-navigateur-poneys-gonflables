// Exemple simple de background.js
// Ce script peut rester vide si vous n'avez pas de fonctionnalités spécifiques à gérer en arrière-plan

// chrome.runtime.onInstalled.addListener(() => {
//     console.log("Extension installée");
// });

// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     console.log(request.action)

//     if(request.action === "def") {
       

//     // Traitement en fonction de l'action reçue
//     // if (request.action === "def") {
//     //     chrome.runtime.sendMessage({ result: defFunction() });
//     // } else if (request.action === "trad") {
//     //     chrome.runtime.sendMessage({ result: tradFunction() });
//     // } else if (request.action === "note") {
//     //     chrome.runtime.sendMessage({ result: noteFunction() });
//     // } else {
//     //     chrome.runtime.sendMessage({ result: "Action inconnue" });
//     // }
//     // return true; // Nécessaire pour indiquer que la réponse sera envoyée de manière asynchrone
// });

// // chrome.webNavigation.onCompleted.addListener(
// //     function () {
// //       chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
// //         // Send a message to the content script in the active tab
// //         chrome.tabs.sendMessage(tabs[0].id, { message: "myMessage" });
// //       });
// //     },
// //     { url: [{ schemes: ["http", "https"] }] }
// //   );



// function defFunction() {
//     console.log("un mot doit être défini");
//     return "def"
// }

// function tradFunction() {
//     console.log("un mot doit être traduit");
//     return "trad"
// }

// function noteFunction() {
//     console.log("ajoute des annotations");
//     return "note"
// }


