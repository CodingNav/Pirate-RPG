
var animationInterval = {};
var playerSelected = false; // Starts off as false to tell the game that the player has not picked his/her own character yet.
var enemySelected = false;


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
            enemySelected = 1;
            $("#mainScreen").hide();
        }
        else if (this.id == "pirateTwo") {
            enemySelected = 2;
            $("#mainScreen").hide();
        }
        else {
            enemySelected = 3;
            $("#mainScreen").hide();
        }
        if (playerSelected == 1) {
            animations("#playerPirate", 1, "_entity_000_", "WALK")
        }
        else if (playerSelected == 2) {
            animations("#playerPirate", 2, "_entity_000_", "WALK")
        }
        else {
            animations("#playerPirate", 3, "_3-PIRATE_", "WALK")
        }
        if (enemySelected == 1) {
            animations("#enemyPirate", 1, "_entity_000_", "WALK")
        }
        else if (enemySelected == 2) {
            animations("#enemyPirate", 2, "_entity_000_", "WALK")
        }
        else {
            animations("#enemyPirate", 3, "_3-PIRATE_", "WALK")
        }
    }
})




function animations(characterId, folderName, animationEntity, animationName) {
    var i = 0;

    clearInterval(animationInterval[characterId]);

    animationInterval[characterId] = setInterval(function () {
        $(characterId).attr("src", "./assets/images/" + folderName + "/" + folderName + animationEntity + animationName + "_00" + i + ".png");
        i++;

        if (i == 7) {
            i = 0;
        }
    }, 150)
}

$("#playerPirate").click(function () {
    $("#playerPirate").animate({ left: '10%' }, 20, function () {
        animations("#playerPirate", 1, "_entity_000_", "ATTACK")
    });
});