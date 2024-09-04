// Création et ajout de l'élément "popup" pour afficher la définition
const definitionPopup = document.createElement("div");
definitionPopup.id = "definition-popup";
definitionPopup.style.position = "absolute"; // Assure que la popup est correctement positionnée
definitionPopup.style.display = "none"; // Cacher la popup par défaut
document.body.appendChild(definitionPopup);

// Fonction pour afficher la popup avec la définition
function showDefinitionPopup(event, definition) {
    const popup = document.getElementById("definition-popup");
    
    // Positionner la popup par rapport à l'événement
    const posX = event.pageX + 10;
    const posY = event.pageY + 10;
    
    // Mise à jour du contenu et de la position de la popup
    popup.textContent = definition;
    popup.style.left = `${posX}px`;
    popup.style.top = `${posY}px`;
    popup.style.display = "block"; // Afficher la popup
}

// Fonction pour cacher la popup
function hideDefinitionPopup() {
    const popup = document.getElementById("definition-popup");
    popup.style.display = "none"; // Cacher la popup
}

// Fonction principale pour gérer l'affichage de la définition
async function handleWordHover(event, word) {
    // Récupérer la définition du mot
    const definition = await fetchDefinition(word);
    
    if (definition) {
        // Afficher la popup avec la définition si elle existe
        showDefinitionPopup(event, definition);
    } else {
        // Cacher la popup si aucune définition n'est trouvée
        hideDefinitionPopup();
    }
}
