//This object stores the set interval loops for the animations
var animationInterval = {};

// Starts off as false to tell the game that the player has not been chosen yet.
var playerSelected = false;

//  Starts off as false to tell the game that the enemy has not been chosen yet.
var enemySelected = false;


//key(property) and value pairs
//Character object is where the character stats are stored
var characters = {
    "Pirate One": {
        name: "Pirate One",
        health: 120,
        attack: 8,
        enemyAttackBack: 15
    },
    "Pirate Two": {
        name: "Pirate Two",
        health: 100,
        attack: 14,
        enemyAttackBack: 5
    },
    "Pirate Three": {
        name: "Pirate Three",
        health: 150,
        attack: 8,
        enemyAttackBack: 20
    }
};

//Click event to pick the character
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
    //Inside click event. This is where the enemy is chosen
    else {
        if (this.id == "pirateOne") {
            enemySelected = 1;
            //Hides the character selection screen 
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

        /* After the characters are chosen and main screen is hidden, 
           this if statement has the characters walk in */

        //This spawns the player's character
        if (playerSelected == 1) {
            animations("#playerPirate", 1, "_entity_000_", "WALK")
        }
        else if (playerSelected == 2) {
            animations("#playerPirate", 2, "_entity_000_", "WALK")
        }
        else {
            animations("#playerPirate", 3, "_3-PIRATE_", "WALK")
        }

        //This spawns the enemy character
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

//function to grabs the animation images and plays the animation
function animations(characterId, folderName, animationEntity, animationName) {
    //Set currentImage to 0, so it starts with the first image
    var currentImage = 0;

    //Stops the animation currently player for specified character
    //example: clearInterval(animationInterval["#playerPirate"]);
    clearInterval(animationInterval[characterId]);

    //Set interval to 
    animationInterval[characterId] = setInterval(function () {
        $(characterId).attr("src", "./assets/images/" + folderName + "/" + folderName + animationEntity + animationName + "_00" + currentImage + ".png");
        //adds 1 to currentImage 
        currentImage++;

        //each animation has 7 images. Therefore when currentImage reaches 7, the animation resets(currentImage=0).
        if (currentImage == 7) {
            currentImage = 0;
        }

        //the time the set interval waits before running again
    }, 150)
}

//click event for the player attack
$("#playerPirate").click(function () {
    /*animate function to make pirate element move to left 10%, 
    20 is how long it takes to get to the 10% 
    everything inside callback function runs after the moving left animation is finished
    in this function it attacks after it moves*/
    $("#playerPirate").animate({ left: '10%' }, 20, function () {
        animations("#playerPirate", 1, "_entity_000_", "ATTACK")
    });
});


/*
TODO:
-click to attack (both player and enemy walk toward one another)
-Set each opponents health points (HP)
-Set each opponents attack points
-Set up attack for player/enemy (walk toward each other and attack)
-Set up die
*/
