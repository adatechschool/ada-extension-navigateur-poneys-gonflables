const spriteList = [
    chrome.runtime.getURL("img/perso1.PNG"),
    chrome.runtime.getURL("img/perso2.PNG"),
    chrome.runtime.getURL("img/perso3.PNG"),
    chrome.runtime.getURL("img/perso4.PNG")
];

// Fonction pour récupérer la définition depuis l'API
async function fetchDefinition(word) {
    console.log(`Tentative de récupération de la définition pour le mot : ${word}`);
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const data = await response.json();
        console.log('Données reçues de l\'API :', data);

        if (data && data.length > 0 && data[0].meanings.length > 0 && data[0].meanings[0].definitions.length > 0) {
            return data[0].meanings[0].definitions[0].definition;
        } else {
            return "Définition non trouvée.";
        }
    } catch (error) {
        console.error("Erreur lors de la récupération de la définition :", error);
        return "Erreur lors de la récupération de la définition.";
    }
}

// Fonction pour afficher la popup
function showDefinitionPopup(posX, posY, definition, word) {
    console.log(`Affichage de la popup pour le mot '${word}' à (${posX}, ${posY})`);
    hideDefinitionPopup(); // Cache les popups précédentes

    const popup = document.createElement("div");
    popup.classList.add("definition-popup");
    popup.style.position = "absolute";
    popup.style.left = `${posX}px`;
    popup.style.top = `${posY}px`;
    popup.style.backgroundColor = "#fff";
    popup.style.border = "1px solid #000";
    popup.style.padding = "10px";
    popup.style.zIndex = "1000";
    popup.innerHTML = `
        <p>${definition}</p>
        <img src="${spriteList[0]}" alt="Sprite">
        <button class="delete-button" data-word="${word}">Supprimer</button>
    `;
    document.body.appendChild(popup);
}

// Fonction pour cacher la popup
function hideDefinitionPopup() {
    console.log("Cache toutes les popups");
    const popups = document.querySelectorAll(".definition-popup");
    popups.forEach(popup => popup.remove());
}

// Fonction pour sauvegarder les définitions dans le localStorage
function saveToLocalStorage(word, definition, posX, posY) {
    const url = window.location.href;
    let savedDefinitions = JSON.parse(localStorage.getItem(url)) || [];

    // Vérifie si le mot est déjà sauvegardé pour cette page
    if (!savedDefinitions.some(entry => entry.word === word)) {
        savedDefinitions.push({ word, definition, posX, posY });
        localStorage.setItem(url, JSON.stringify(savedDefinitions));
        console.log(`Mot '${word}' enregistré pour cette page.`);
    } else {
        console.log(`Le mot '${word}' est déjà enregistré pour cette page.`);
    }
}

// Fonction pour supprimer les définitions du localStorage
function deleteFromLocalStorage(word) {
    console.log(`Tentative de suppression du mot '${word}' du localStorage`);
    const url = window.location.href;
    let savedDefinitions = JSON.parse(localStorage.getItem(url)) || [];

    console.log('Définitions sauvegardées avant suppression :', savedDefinitions);

    // Filtre les entrées pour supprimer celle correspondante au mot
    savedDefinitions = savedDefinitions.filter(item => item.word !== word);
    
    console.log('Définitions après suppression :', savedDefinitions);

    localStorage.setItem(url, JSON.stringify(savedDefinitions));
    
    // Retirer le marqueur du mot
    document.querySelectorAll('.annotated-word').forEach(span => {
        if (span.getAttribute('data-word') === word) {
            console.log(`Suppression du marqueur pour le mot '${word}'`);
            span.remove();
        }
    });

    // Cache la popup après suppression
    hideDefinitionPopup();
}


// Fonction pour ajouter un marqueur à un mot
function addMarkerToWord(word) {
    console.log(`Ajout du marqueur pour le mot '${word}'`);
    const bodyText = document.body.innerHTML;
    const annotatedText = `
        <span class="annotated-word" data-word="${word}">
            ${word}
            <span class="marker" title="Définition disponible">📘</span>
        </span>
    `;

    // Remplace toutes les occurrences du mot avec le texte annoté
    document.body.innerHTML = bodyText.replace(new RegExp(`(${word})(?![^<]*>)`, 'g'), annotatedText);
}

// Fonction pour gérer la sélection de texte et ajouter un marqueur
document.addEventListener('mouseup', async (event) => {
    hideDefinitionPopup(); // Cacher toute popup précédente

    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    
    if (selectedText) {
        console.log(`Texte sélectionné : '${selectedText}'`);
        const definition = await fetchDefinition(selectedText);
        const posX = event.pageX;
        const posY = event.pageY;

        // Sauvegarde le mot et la définition dans le localStorage
        saveToLocalStorage(selectedText, definition, posX, posY);

        // Affiche une popup avec la définition
        showDefinitionPopup(posX, posY, definition, selectedText);
    }
});

// Afficher la popup lors du survol d'un marqueur
document.addEventListener('mouseover', (event) => {
    if (event.target.classList.contains('marker')) {
        const word = event.target.parentElement.getAttribute('data-word');
        console.log(`Survol du marqueur pour le mot '${word}'`);
        const savedDefinitions = JSON.parse(localStorage.getItem(window.location.href)) || [];
        const definitionData = savedDefinitions.find(data => data.word === word);
        if (definitionData) {
            showDefinitionPopup(event.pageX, event.pageY, definitionData.definition, word);
        }
    }
});

// Cacher la popup sur sortie de survol sauf si clic sur le bouton de suppression
document.addEventListener('mouseout', (event) => {
    if (event.target.classList.contains('marker')) {
        setTimeout(() => {
            if (!document.querySelector('.definition-popup:hover')) {
                hideDefinitionPopup();
            }
        }, 100);
    }
});

// Fonction pour recharger les définitions sauvegardées et ajouter des marqueurs
function loadSavedDefinitions() {
    const savedDefinitions = JSON.parse(localStorage.getItem(window.location.href)) || [];
    
    savedDefinitions.forEach(data => {
        console.log(`Rechargement du marqueur pour le mot '${data.word}'`);
        addMarkerToWord(data.word);
    });

    if (savedDefinitions.length > 0) {
        console.log("Mots sauvegardés :", savedDefinitions);
    } else {
        console.log("Aucune définition sauvegardée.");
    }
}

// Charger les définitions sauvegardées au chargement de la page
window.onload = loadSavedDefinitions;

// Gérer la suppression des mots depuis la popup
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-button')) {
        const word = event.target.getAttribute('data-word');
        console.log(`Bouton de suppression cliqué pour le mot '${word}'`);
        deleteFromLocalStorage(word);
        hideDefinitionPopup(); // Cache la popup après suppression
    }
});

