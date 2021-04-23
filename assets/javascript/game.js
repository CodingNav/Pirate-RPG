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
            playerSelected = {
                folder: 1,
                entity: "_entity_000_",
            };
            $(this).hide();
        }
        else if (this.id == "pirateTwo") {
            playerSelected = {
                folder: 2,
                entity: "_entity_000_",
            };
            $(this).hide();
        }
        else {
            playerSelected = {
                folder: 3,
                entity: "_3-PIRATE_",
            };
            $(this).hide();
        }
    }
    //Inside click event. This is where the enemy is chosen
    else {
        if (this.id == "pirateOne") {
            enemySelected = {
                folder: 1,
                entity: "_entity_000_",
            };
            //Hides the character selection screen 
            $("#mainScreen").hide();
        }
        else if (this.id == "pirateTwo") {
            enemySelected = {
                folder: 2,
                entity: "_entity_000_",
            };
            $("#mainScreen").hide();
        }
        else {
            enemySelected = {
                folder: 3,
                entity: "_3-PIRATE_",
            };
            $("#mainScreen").hide();
        }

        /* After the characters are chosen and main screen is hidden, 
           the following has the characters walk onto the screen (start of game) */

        //player image moves 30% to left, making it off the screen
        $("#playerPirate").css({ left: "-30%" });
        //This spawns the player's character
        animations("#playerPirate", playerSelected.folder, playerSelected.entity, "WALK", 150)
        //Animate function that moves the player's character left onto the screen and then plays idle animation
        $("#playerPirate").animate({ left: '0%' }, 3000, function () {
            animations("#playerPirate", playerSelected.folder, playerSelected.entity, "IDLE", 150)
        });


        //player image moves 30% to right, making it off the screen
        $("#enemyPirate").css({ right: "-30%" })
        //This spawns the enemy character
        animations("#enemyPirate", enemySelected.folder, enemySelected.entity, "WALK", 150)
        //Animate function that moves the enemies character left onto the screen and then plays idle animation
        $("#enemyPirate").animate({ right: '0%' }, 3000, function () {
            animations("#enemyPirate", enemySelected.folder, enemySelected.entity, "IDLE", 150)
        });
    }
})

//function to grabs the animation images and plays the animation
function animations(characterId, folderName, animationEntity, animationName, animationSpeed) {
    //Set currentImage to 0, so it starts with the first image
    var currentImage = 0;

    //Stops the animation currently player for specified character
    //example: clearInterval(animationInterval["#playerPirate"]);
    clearInterval(animationInterval[characterId]);

    //Set interval to grab the animation images from the folder
    animationInterval[characterId] = setInterval(function () {
        $(characterId).attr("src", "./assets/images/" + folderName + "/" + folderName + animationEntity + animationName + "_00" + currentImage + ".png");
        //adds 1 to currentImage 
        currentImage++;

        //each animation has 7 images. Therefore when currentImage reaches 7, the animation resets(currentImage=0).
        if (currentImage == 7) {
            currentImage = 0;
        }

        //the time the set interval waits before running again
    }, animationSpeed)
}



//click event for the player attack
$("#playerPirate").click(function () {
    /*animate function to make pirate element move to left 40%, 
    1200 is how long it takes to get to the 40% 
    everything inside callback function runs after the moving left animation is finished
    in this function it attacks after it moves*/
    $("#playerPirate").animate({ left: '40%' }, 1200, function () {
        animations("#playerPirate", playerSelected.folder, playerSelected.entity, "ATTACK", 150)
    });

});


/*
TODO:
-when player attacks, enemy has hurt animation
-click to attack (both player and enemy walk toward one another)
-Set each opponents health points (HP)
-Set each opponents attack points
-Set up attack for player/enemy (walk toward each other and attack)
-Set up die
*/
