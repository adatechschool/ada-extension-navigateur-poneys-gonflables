document.addEventListener("DOMContentLoaded", function() {
    let spritelist = [
        'Dinoimg/sleepingdino1.png',
        'Dinoimg/sleepingdino2.png',
        'Dinoimg/sleepingdino3.png',
        'Dinoimg/sleepingdino4.png'
    ];

    let spriteimg = document.querySelector(".sprite img");

    console.log(spritelist);
    console.log(spriteimg);  // Assurez-vous que cela ne retourne pas `null`

    let index = 0;

    setInterval(function() {
            spriteimg.src = spritelist[index];
            index = (index + 1) % spritelist.length;  // Boucle sur la liste des images
    }, 500);  // 200 ms = 0.2 secondes
});