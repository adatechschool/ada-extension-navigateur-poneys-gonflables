document.addEventListener("DOMContentLoaded", function() {
    let spritelist = [
        'Spritsheet/perso1.PNG',
        'Spritsheet/perso2.PNG',
        'Spritsheet/perso3.PNG',
        'Spritsheet/perso4.PNG'
    ];

    let spriteimg = document.querySelector(".sprite img");

    console.log(spritelist);
    console.log(spriteimg);  // Assurez-vous que cela ne retourne pas `null`

    let index = 0;

    setInterval(function() {
            spriteimg.src = spritelist[index];
            index = (index + 1) % spritelist.length;  // Boucle sur la liste des images
    }, 200);  // 200 ms = 0.2 secondes
});