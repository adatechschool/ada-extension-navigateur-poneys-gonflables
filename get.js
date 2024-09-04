//selectionne un morceau de texte

function textSelection(){
    selectedObject = document.getSelection();
    console.log(selectedObject);
    arrayToString = selectedObject.toString();
    console.log(arrayToString)
    selectedText = arrayToString.split(" ")[0];
    console.log(selectedText);
    return selectedText;
    }
textSelection()

document.querySelector("body").addEventListener("mouseup", textSelection);