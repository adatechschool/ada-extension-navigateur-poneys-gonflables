

function textSelection(){
    selectedObject = document.getSelection();
    console.log(selectedObject);
    selectedText = selectedObject.toString();
    console.log(selectedText);
    return selectedText;
    }
textSelection()

document.querySelector("body").addEventListener("mouseup", textSelection);