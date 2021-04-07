
var animationInterval;


function animations(folderName, animationName) {
    var i = 0;

    clearInterval(animationInterval);

    animationInterval = setInterval(function () {
        $("#pirate1").attr("src", "./assets/images/" + folderName + "/" + folderName + "_entity_000_" + animationName + "_00" + i + ".png");
        i++;

        if (i == 7) {
            i = 0;
        }
    }, 150)
}

// animations(2, "ATTACK")
// animations(2, "DIE")