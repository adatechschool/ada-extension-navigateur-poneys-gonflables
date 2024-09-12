// Création et ajout de l'élément "popup" pour afficher la définition et les sprites
const definitionPopup = document.createElement("div");
definitionPopup.id = "definition-popup";
definitionPopup.style.position = "absolute";
definitionPopup.style.display = "none"; // Cacher la popup par défaut
definitionPopup.style.backgroundColor = "#fff"; // Fond blanc pour la popup
definitionPopup.style.border = "4px dashed #d55716"; // Bordure pour mieux visualiser la popup
definitionPopup.style.padding = "10px"; // Padding pour éviter que le texte colle aux bords
document.body.appendChild(definitionPopup);


async function fetchDefinition(word) {
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();
        
        // Vérifie si des données sont retournées et renvoie la définition
        if (data && data.length > 0 && data[0].meanings.length > 0 && data[0].meanings[0].definitions.length > 0) {
            return {
                definition : data[0].meanings[0].definitions[0].definition,
                found : true 
            } 
            
        } else {
            return {
                definition :  "Je n'ai pas trouvé ta définition !!!", // Message de remplacement 
                found : false
            }
        }
    } catch (error) {
        console.error("Erreur lors de la récupération de la définition :", error);
        return "Erreur lors de la récupération de la définition."; // Message d'erreur
    }
}

// Liste des sprites
const Neutral = [
    chrome.runtime.getURL('animationPerso/dino/Dinoimg/updino1.png'),
    chrome.runtime.getURL('animationPerso/dino/Dinoimg/updino2.png'),
    chrome.runtime.getURL('animationPerso/dino/Dinoimg/updino3.png'),
    chrome.runtime.getURL('animationPerso/dino/Dinoimg/updino2.png'),
    chrome.runtime.getURL('animationPerso/dino/Dinoimg/updino1.png'),
    chrome.runtime.getURL('animationPerso/dino/Dinoimg/updino4.png'),
    chrome.runtime.getURL('animationPerso/dino/Dinoimg/updino6.png'),
    chrome.runtime.getURL('animationPerso/dino/Dinoimg/updino4.png'),
    chrome.runtime.getURL('animationPerso/dino/Dinoimg/updino1.png')
];

const Happy = [
    chrome.runtime.getURL('animationPerso/dino/Dinoimg/Happydino1.png'),
    chrome.runtime.getURL('animationPerso/dino/Dinoimg/Happydino2.png'),
    chrome.runtime.getURL('animationPerso/dino/Dinoimg/Happydino3.png'),
    chrome.runtime.getURL('animationPerso/dino/Dinoimg/Happydino4.png'),
    chrome.runtime.getURL('animationPerso/dino/Dinoimg/Happydino3.png'),
    chrome.runtime.getURL('animationPerso/dino/Dinoimg/Happydino4.png'),
    chrome.runtime.getURL('animationPerso/dino/Dinoimg/Happydino3.png'),
    chrome.runtime.getURL('animationPerso/dino/Dinoimg/Happydino4.png'),
    chrome.runtime.getURL('animationPerso/dino/Dinoimg/Happydino2.png'),
    chrome.runtime.getURL('animationPerso/dino/Dinoimg/Happydino5.png'),
    chrome.runtime.getURL('animationPerso/dino/Dinoimg/Happydino6.png'),
    chrome.runtime.getURL('animationPerso/dino/Dinoimg/Happydino7.png')
];

const Sleep = [
    chrome.runtime.getURL('animationPerso/dino/Dinoimg/sleepingdino1.png'),
    chrome.runtime.getURL('animationPerso/dino/Dinoimg/sleepingdino2.png'),
    chrome.runtime.getURL('animationPerso/dino/Dinoimg/sleepingdino3.png'),
    chrome.runtime.getURL('animationPerso/dino/Dinoimg/sleepingdino4.png')
];

const Angry = [
    chrome.runtime.getURL('animationPerso/dino/Dinoimg/Happydino2.png'),
    chrome.runtime.getURL('animationPerso/dino/Dinoimg/Happydino3.png'),
    chrome.runtime.getURL('animationPerso/dino/Dinoimg/Happydino4.png'),
    chrome.runtime.getURL('animationPerso/dino/Dinoimg/Happydino3.png'),
    chrome.runtime.getURL('animationPerso/dino/Dinoimg/Happydino4.png'),
    chrome.runtime.getURL('animationPerso/dino/Dinoimg/Happydino3.png'),
    chrome.runtime.getURL('animationPerso/dino/Dinoimg/Happydino4.png'),
    chrome.runtime.getURL('animationPerso/dino/Dinoimg/Happydino2.png'),
    chrome.runtime.getURL('animationPerso/dino/Dinoimg/AngryDino1.PNG'),
    chrome.runtime.getURL('animationPerso/dino/Dinoimg/AngryDino2.PNG'),
    chrome.runtime.getURL('animationPerso/dino/Dinoimg/AngryDino3.PNG'),
    chrome.runtime.getURL('animationPerso/dino/Dinoimg/AngryDino4.PNG'),
    chrome.runtime.getURL('animationPerso/dino/Dinoimg/AngryDino1.PNG'),
    chrome.runtime.getURL('animationPerso/dino/Dinoimg/AngryDino2.PNG'),
    chrome.runtime.getURL('animationPerso/dino/Dinoimg/AngryDino3.PNG'),
    chrome.runtime.getURL('animationPerso/dino/Dinoimg/AngryDino4.PNG'),
    chrome.runtime.getURL('animationPerso/dino/Dinoimg/AngryDino1.PNG'),
]

let spriteInterval; // Variable pour stocker l'intervalle d'animation des sprites
let spriteImg; // Variable pour stocker les images 
//Création popup pour les déifinition 
const popup = document.getElementById("definition-popup");
popup.style.border = "2px solid #d55716"; //bordure
popup.style.textAlign = "center"; //position du texte
popup.style.width ="400px" // largeur de la popup
popup.style.maxWidth = "100%"; // largeur maximal qu'elle peux atteindre (en cas de texte trop long)
popup.style.height= "230px"; //hauteur de la popup
popup.style.maxHeight="100%"; // hauteur maximal qu'elle peux atteindre (en cas de texte trop long )
popup.style.padding = "10px"; // espacement intérieur 
popup.style.borderRadius= "5px 80px / 5px 80px "; // effet arrondie en haut a gauche et en bas à droite 
popup.style.marginLeft = "10%"
popup.style.overflowWrap = "break-word";

//Création popup pour les annotations
const notePopup = document.createElement("div");
notePopup.id = "note-popup";
notePopup.style.position = "absolute";
notePopup.style.display = "none"; // Cacher par défaut
notePopup.style.backgroundColor = "#fff"; 
notePopup.style.border = "4px dashed #d55716"; 
notePopup.style.padding = "10px"; 
document.body.appendChild(notePopup);


function createButton(name, position,fonction) {
const defButton = document.createElement("button");
defButton.textContent = name ;
defButton.style.position = "fixed";
defButton.style.top = "10px";
defButton.style.right = "10px";
defButton.style.background = "linear-gradient(49deg, rgba(170,38,23,0.6) 17%, rgba(218,83,24,0.6) 43%, rgba(78,127,204,0.6) 73%)";
defButton.style.color = "#fff";
defButton.style.borderRadius = "20%";
defButton.style.border ="0px solid rgb("
defButton.style.padding = "20px";
defButton.style.cursor = "pointer";
defButton.style.zIndex = "1000";
defButton.style.width ="200px";

defButton.style.marginTop = position;
document.body.appendChild(defButton);
return defButton

}

let def = createButton("Définir","0%",)
let note= createButton("Annoter","5%",)
def.addEventListener('click', CallDefinition)
def.addEventListener('click', () => {
    note.disabled = true // Désactivation du bouton note lorsqu'on clique sur le bouton def
})
note.addEventListener('click', Callnote)
note.addEventListener ('click', () => {
    def.disabled = true //Désactive le bouton def lorsqu'on clique sur note 
})



let isAnimating = false;
let isSleeping = false;
let inactivityTimer;


function resetButtons() { //Réactive les boutons 
    def.disabled = false;
    note.disabled = false;
}
// Fonction pour afficher la popup avec la définition et les sprites
function showDefinitionPopup(event,definition,state) {


    // Positionner la popup par rapport à l'événement
    const posX = event.pageX + 10;
    const posY = event.pageY + 10;
   

   // Mise à jour du contenu et de la position de la popup
   popup.innerHTML = `<p>${definition}</p>`,addNote;

   // Ajouter un élément img 
   spriteImg = document.createElement("img");
   popup.appendChild(spriteImg);

   popup.style.left = `${posX}px`;
   popup.style.top = `${posY}px`;
   popup.style.display = "block"; // Afficher la popup


    // console.log(`Affichage de la popup pour le mot '${word}' à '(${posX}', '${posY})'`);
    // hideDefinitionPopup(); // Cache les popups précédentes

    // const popup = document.createElement("div");
    // popup.classList.add("definition-popup");
    // popup.style.position = "absolute";
    // popup.style.left = `${posX}px`;
    // popup.style.top = `${posY}px`;
    // popup.style.backgroundColor = "#fff";
    // popup.style.border = "1px solid #000";
    // popup.style.padding = "10px";
    // popup.style.zIndex = "1000";
    // popup.innerHTML = 
    //     `<p>${definition}</p>`,addNote() 
    //     `<img src="${Neutral}" alt="Sprite">`
    // ;
    // document.body.appendChild(popup);

    // Ajouter un élément img 
    // spriteImg = document.createElement("img");
    // popup.appendChild(spriteImg);

    // Démarrer l'animation
    if(state === true) { // Si on récupère une définition on lance l'animation happy
        startAnimation(Happy); 
}
    else { // si on ne récupère pas de définition on lance une animation angry 
        startAnimation(Angry);
    }
    

}

function showNotePopup(event, selectedText) {

    const notePopup = document.getElementById("note-popup")
    // Positionner la popup par rapport à l'événement
    const posX = event.pageX;
    const posY = event.pageY;
   

   // Mise à jour du contenu et de la position de la popup
   notePopup.innerHTML = `<h1>${selectedText}</h1>`;

   //Ajout d'une zone de texte pour l'annotation
   let noteTextArea = document.createElement("textarea");
   noteTextArea.setAttribute("placeholder","Des commentaire?...");
   noteTextArea.style.width = "100%" //Ajustement de la taille de la zone de texte
   noteTextArea.style.height = "100px" // Ajuster la hauter de la zone de texte
   notePopup.appendChild(noteTextArea);

   // Ajouter un élément img 
   spriteImg = document.createElement("img");
   spriteImg.src = " "
   notePopup.appendChild(spriteImg);
   

   notePopup.style.left = `${posX}px`;
   notePopup.style.top = `${posY}px`;
   notePopup.style.display = "block"; // Afficher la popup


   // Démarrer l'animation
   startAnimation(Neutral)

   

}



//fonction responssable de l'animation

    function startAnimation(spritarray) {
    //Vérifie si une animation est en cours et l'arrête
    if (isAnimating==true) {
        clearInterval(spriteInterval);
        isAnimating = false;
    }
    //initialisation du décopteur, de l'index et de la limite de répétition
        let countdown = 0;
        let index = 0
        let maxRepeats = 1;
    
    //Spécifier le début d'une nouvelle animation 
        isAnimating = true;
        isSleeping = false
    
   // MaJ de la frame à chaque intervalle 
        spriteInterval = setInterval(() => {
        spriteImg.src = spritarray[index]; // Injection de l'image sélectionnée dans le tableau spriteList
        index = (index + 1) % spritarray.length; // Avancer l'index et revenir à 0 à la fin du tableau

        if (index === 0) { //Augmenter le compter à la fin de chaque boucle complète d'animation
            countdown++;
        }
        if (countdown >= maxRepeats) {
            clearInterval(spriteInterval); // Arrête l'animation lorsque le nombre de répétition max est atteint
            isAnimating = false; //Marque la fin de l'animation
        }
        },150) // Changer de sprite totues les 150ms
        
        
    }

    //Fonction pour l'animation de veille 

    function resetInactivityTimer() {
        //réinitialise le timer d'inactivité
            clearTimeout(inactivityTimer);
        
        //Démarrer un nouveau timer de 10 secondes
        inactivityTimer = setTimeout(() => {
            if (!isAnimating) { //lance l'animation sleep si aucune autre animation est en cours
                isSleeping = true 
                startAnimation(Sleep)
            }
        },300) // 20 secondes 
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

    // console.log("Texte sélectionné :", selectedText); // Debug

    return selectedText;
}

// Fonction pour récupérer la définition du mot à partir de l'API

// Fonction principale pour gérer l'affichage de la définition
async function handleWordHover(event, word) {
    let result = await fetchDefinition(word)
    // Récupérer la définition du mot
    let definition = result.definition;
    let state = result.found

    if (definition) {
        // Afficher la popup avec la définition et les sprites si elle existe
        showDefinitionPopup(event,definition,state);
    } else {
        // Cacher la popup si aucune définition n'est trouvée
        hideDefinitionPopup();
    }
} 

console.log(chrome.runtime.getURL("img/perso1.PNG"));



function addNote(event, createNote) {
    createNote = definitionPopup.appendChild(document.createElement("textarea"));
    createNote.setAttribute("contentEditable", "True");
    createNote.setAttribute("name", "note");
    setTimeout(function() {
    document.querySelector("input[type='text'], textarea").focus();
    });
    noteContent = document.querySelector("textarea").value

    console.log(noteContent)
        
    

    //console.log(typeof(createNote))
}

async function Callnote(event) {

let selectedText= textSelection()
showNotePopup(event, selectedText)
}

async function CallDefinition(event) {

addEventListener('mouseup', mousupdef)

}

async function mousupdef(event) {

    console.log("début CallDefinition")
    //Etape 1 : Je récupère de la data lorsqu'on surligne des éléments
    let selectedText = textSelection()
    console.log("selectedText = "+selectedText)
    //Etape2 : récupérer un mot 
    if (selectedText && event.target.nodeType === Node.ELEMENT_NODE) {
        const word = selectedText.split(" ")[0]; // Prendre le premier mot
        console.log("word= "+word)

    //Etape 3 : Récupérer la définition du mot grace à l'API
    let result = await fetchDefinition(word)
    let definition = result.definition;
    let state = result.found;
    console.log("definition = "+definition)
    console.log("state = "+state)

    //Etape 4 : Aficher la popup avec la définition et l'animation 
    if (definition) {
        
        showDefinitionPopup(event,definition, state, word);
        
    } else {
        console.log("definition pas ok")
        hideDefinitionPopup()
    }
} else {
    hideDefinitionPopup()
}


}


// console.log(chrome.runtime.getURL("img/perso1.PNG"));

//détecter les cliques sur les boutons 

document.addEventListener("DOMContentLoaded", () => {
const defButton = document.getElementById("def");
const tradButton = document.getElementById("trad"); 
const noteButton = document.getElementById("note");

defButton.addEventListener("click", () => {
    chrome.runtime.sendMessage({action:"def"});
    document.addEventListener("mouseup",CallDefinition)
});

tradButton.addEventListener("click", ()=> {
    chrome.runtime.sendMessage({action:"trad"})
});

noteButton.addEventListener("click", ()=> {
    chrome.runtime.sendMessage({action:"note"})
});
});

// // Fonction pour sauvegarder les définitions dans le localStorage
// function saveToLocalStorage(word, definition, posX, posY) {
//     const url = window.location.href;
//     let savedDefinitions = JSON.parse(localStorage.getItem(url)) || [];

//     // Vérifie si le mot est déjà sauvegardé pour cette page
//     if (!savedDefinitions.some(entry => entry.word === word)) {
//         savedDefinitions.push({ word, definition, posX, posY });
//         localStorage.setItem(url, JSON.stringify(savedDefinitions));
//         console.log(`Mot '${word}' enregistré pour cette page.`);

//         // Ajouter le marqueur au mot
//         addMarkerToWord(word);
//     } else {
//         console.log(`Le mot '${word}' est déjà enregistré pour cette page.`);
//     }
// }

// function addMarkerToWord(word) {
//     // Vérifiez si le mot a déjà un marqueur
//     if (!document.querySelector(`.annotated-word[data-word="${word}"]`)) {
//         const bodyText = document.body.innerHTML;
//         const annotatedText = 
//             `<span class="annotated-word" data-word="${word}">
//                 ${word}
//                 <span class="marker" title="Définition disponible">📘</span>
//             </span>`
//         ;

//         // Remplacer la première occurrence du mot avec le texte annoté
//         const regex = new RegExp(`\\b${word}\\b`, 'i');
//         document.body.innerHTML = bodyText.replace(regex, annotatedText);
//     }
// }


// // Afficher la popup lors du survol d'un marqueur
// document.addEventListener('mouseover', (event) => {
//     if (event.target.classList.contains('marker')) {
//         const word = event.target.parentElement.getAttribute('data-word');
//         console.log(`Survol du marqueur pour le mot '${word}'`);
//         const savedDefinitions = JSON.parse(localStorage.getItem(window.location.href)) || [];
//         const definitionData = savedDefinitions.find(data => data.word === word);
//         if (definitionData) {
//             showDefinitionPopup(event.pageX, event.pageY, definitionData.definition, word);
//         }
//     }
// });


// // Fonction pour recharger les définitions sauvegardées et ajouter des marqueurs
// function loadSavedDefinitions() {
//     const savedDefinitions = JSON.parse(localStorage.getItem(window.location.href)) || [];
    
//     // Supprimer tous les anciens marqueurs avant de recharger
//     document.querySelectorAll('.annotated-word').forEach(span => span.remove());

//     savedDefinitions.forEach(data => {
//         console.log(`Rechargement du marqueur pour le mot '${data.word}'`);
//         addMarkerToWord(data.word);
//     });

//     if (savedDefinitions.length > 0) {
//         console.log("Mots sauvegardés :", savedDefinitions);
//     } else {
//         console.log("Aucune définition sauvegardée.");
//     }
// }

// // Fonction pour ajouter un bouton "Supprimer tout" en haut à droite
// function addDeleteAllButton() {
//     const deleteAllButton = document.createElement("button");
//     deleteAllButton.textContent = "Supprimer tout";
//     deleteAllButton.style.position = "fixed";
//     deleteAllButton.style.top = "10px";
//     deleteAllButton.style.right = "10px";
//     deleteAllButton.style.backgroundColor = "#ff4d4d";
//     deleteAllButton.style.color = "#fff";
//     deleteAllButton.style.border = "none";
//     deleteAllButton.style.padding = "10px";
//     deleteAllButton.style.cursor = "pointer";
//     deleteAllButton.style.zIndex = "1000";
    
//     document.body.appendChild(deleteAllButton);

//     // Événement pour supprimer tout le localStorage
//     deleteAllButton.addEventListener("click", () => {
//         if (confirm("Es-tu sûr de vouloir supprimer toutes les définitions sauvegardées ?")) {
//             localStorage.clear();  // Supprime tout le localStorage
//             console.log("Tout le contenu du localStorage a été supprimé.");

//             // Supprimer tous les marqueurs de mots
//             document.querySelectorAll('.annotated-word').forEach(span => span.remove());

//             alert("Toutes les définitions ont été supprimées.");
//         }
//     });
// }



// // Charger les définitions sauvegardées et ajouter le bouton de suppression tout au chargement de la page
// window.onload = function() {
//     loadSavedDefinitions();  // Recharge les définitions sauvegardées
//     addDeleteAllButton();    // Ajoute le bouton "Supprimer tout"
// };
