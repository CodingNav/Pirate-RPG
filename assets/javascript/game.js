
var animationInterval;
var playerSelected = false;

$(".pirate").click(function () {
    if (playerSelected == false) {
        if (this.id == "pirateOne") {
            playerSelected = 1;
            $(this).hide();
        }
        else if (this.id == "pirateTwo") {
            playerSelected = 2;
            $(this).hide();
        }
        else {
            playerSelected = 3;
            $(this).hide();
        }
    }
    else {
        if (this.id == "pirateOne") {
            $("#mainScreen").hide();
        }
        else if (this.id == "pirateTwo") {
            $("#mainScreen").hide();
        }
        else {
            $("#mainScreen").hide();
        }
        if (playerSelected == 1) {
            animations(1, "_entity_000_", "WALK")
        }
        else if (playerSelected == 2) {
            animations(2, "_entity_000_", "WALK")
        }
        else {
            animations(3, "_3-PIRATE_", "WALK")
        }
    }
})






function animations(folderName, animationEntity, animationName) {
    var i = 0;

    clearInterval(animationInterval);

    animationInterval = setInterval(function () {
        $("#pirate1").attr("src", "./assets/images/" + folderName + "/" + folderName + animationEntity + animationName + "_00" + i + ".png");
        i++;

        if (i == 7) {
            i = 0;
        }
    }, 150)
}
