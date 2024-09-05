// Création et ajout de l'élément "popup" pour afficher la définition et les sprites
const definitionPopup = document.createElement("div");
definitionPopup.id = "definition-popup";
definitionPopup.style.position = "absolute";
definitionPopup.style.display = "none"; // Cacher la popup par défaut
definitionPopup.style.backgroundColor = "#fff"; // Fond blanc pour la popup
definitionPopup.style.border = "1px solid #000"; // Bordure pour mieux visualiser la popup
definitionPopup.style.padding = "10px"; // Padding pour éviter que le texte colle aux bords
document.body.appendChild(definitionPopup);




async function fetchDefinition(word) {
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();
        
        // Vérifie si des données sont retournées et renvoie la définition
        if (data && data.length > 0 && data[0].meanings.length > 0 && data[0].meanings[0].definitions.length > 0) {
            return data[0].meanings[0].definitions[0].definition;
        } else {
            return "Définition non trouvée."; // Message de remplacement
        }
    } catch (error) {
        console.error("Erreur lors de la récupération de la définition :", error);
        return "Erreur lors de la récupération de la définition."; // Message d'erreur
    }
}

// Liste des sprites
const spriteList = [
    chrome.runtime.getURL("img/perso1.PNG"),
    chrome.runtime.getURL("img/perso2.PNG"),
    chrome.runtime.getURL("img/perso3.PNG"),
    chrome.runtime.getURL("img/perso4.PNG")
];

let spriteInterval; // Variable pour stocker l'intervalle d'animation des sprites


// Fonction pour afficher la popup avec la définition et les sprites
function showDefinitionPopup(event, definition) {
    const popup = document.getElementById("definition-popup");

    // Positionner la popup par rapport à l'événement
    const posX = event.pageX + 10;
    const posY = event.pageY + 10;

    // Mise à jour du contenu et de la position de la popup
    popup.innerHTML = `<p>${definition}</p><img src="${chrome.runtime.getURL('img/perso1.PNG')}" alt="Sprite">`;

    // Ajouter un élément img pour les sprites si non existant
    let spriteImg = popup.querySelector("img");
    if (!spriteImg) {
        spriteImg = document.createElement("img");
        popup.appendChild(spriteImg);
    }

    popup.style.left = `${posX}px`;
    popup.style.top = `${posY}px`;
    popup.style.display = "block"; // Afficher la popup
}





// Fonction pour cacher la popup et arrêter l'animation des sprites
function hideDefinitionPopup() {
    const popup = document.getElementById("definition-popup");
    popup.style.display = "none"; // Cacher la popup

    // Arrêter l'animation des sprites
    clearInterval(spriteInterval);
}

// Fonction pour sélectionner le texte surligné
function textSelection() {
    const selectedObject = window.getSelection();
    const selectedText = selectedObject.toString().trim();

    console.log("Texte sélectionné :", selectedText); // Debug

    return selectedText;
}

// Fonction pour récupérer la définition du mot à partir de l'API

// Fonction principale pour gérer l'affichage de la définition
async function handleWordHover(event, word) {
    console.log("Mot à définir :", word); // Debug

    // Récupérer la définition du mot
    const definition = await fetchDefinition(word);

    if (definition) {
        // Afficher la popup avec la définition et les sprites si elle existe
        showDefinitionPopup(event, definition);
    } else {
        // Cacher la popup si aucune définition n'est trouvée
        hideDefinitionPopup();
    }
}

// Ajouter un événement au survol de la souris
document.addEventListener("mouseup", async (event) => {
    const selectedText = textSelection();

    // Si du texte est sélectionné et que l'événement se produit sur un élément HTML
    if (selectedText && event.target.nodeType === Node.ELEMENT_NODE) {
        const word = selectedText.split(" ")[0]; // Prendre le premier mot

        // Récupérer la définition du mot
        await handleWordHover(event, word);
    }
});

// Ajouter un événement lorsque la souris quitte l'élément
document.addEventListener("mousedown", () => {
    hideDefinitionPopup(); // Cacher la popup quand la souris quitte l'élément
});


console.log(chrome.runtime.getURL("img/perso1.PNG"));
