// This object stores the set interval loops for the animations
var animationInterval = {};

// Starts off as false to tell the game that the player has not been chosen yet.
var playerSelected = false;

//  Starts off as false to tell the game that the enemy has not been chosen yet.
var enemySelected = false;

var secondEnemy;

//key(property) and value pairs
//Character object is where the character stats are stored
var characters = {
    "Pirate One": {
        stats: {
            name: "Pirate One",
            health: 120,
            maxHealth: 120,
            attack: 200,//8
            enemyAttackBack: 115, //15            
            multiplier: 1
        },
        alreadyPicked: false,
        folder: 1,
        entity: "_entity_000_",
    },
    "Pirate Two": {
        stats: {
            name: "Pirate Two",
            health: 100,
            maxHealth: 100,
            attack: 14,
            enemyAttackBack: 5,
            multiplier: 1
        },
        alreadyPicked: false,
        folder: 2,
        entity: "_entity_000_",
    },
    "Pirate Three": {
        stats: {
            name: "Pirate Three",
            health: 150,
            maxHealth: 150,
            attack: 8,
            enemyAttackBack: 20,
            multiplier: 1
        },
        alreadyPicked: false,
        folder: 3,
        entity: "_3-PIRATE_",
    }
};

//Click event to pick the character
$(".pirate").click(function () {
    if (playerSelected == false) {
        if (this.id == "pirateOne") {
            playerSelected = { ...characters["Pirate One"] };
            characters["Pirate One"].alreadyPicked = true;
            $(this).hide();
        }
        else if (this.id == "pirateTwo") {
            playerSelected = { ...characters["Pirate Two"] };
            characters["Pirate Two"].alreadyPicked = true;
            $(this).hide();
        }
        else {
            playerSelected = { ...characters["Pirate Three"] };
            characters["Pirate Three"].alreadyPicked = true;
            $(this).hide();
        }
        $("#pick-text").text("Pick An Enemy")
    }
    //Inside click event. This is where the enemy is chosen
    else {
        if (this.id == "pirateOne") {
            enemySelected = { ...characters["Pirate One"] };
            characters["Pirate One"].alreadyPicked = true;
            //Hides the character selection screen 
            $("#mainScreen").hide();
        }
        else if (this.id == "pirateTwo") {
            enemySelected = { ...characters["Pirate Two"] };
            characters["Pirate Two"].alreadyPicked = true;
            $("#mainScreen").hide();
        }
        else {
            enemySelected = { ...characters["Pirate Three"] };
            characters["Pirate Three"].alreadyPicked = true;
            $("#mainScreen").hide();
        }

        //searches array for character that has alreadyPicked as false
        if (characters["Pirate One"].alreadyPicked == false) {
            secondEnemy = characters["Pirate One"];
        }
        else if (characters["Pirate Two"].alreadyPicked == false) {
            secondEnemy = characters["Pirate Two"];
        }
        else {
            secondEnemy = characters["Pirate Three"];
        }

        $("#playerName").text(playerSelected.stats.name);
        $("#playerPower").text(playerSelected.stats.attack);
        $("#playerHP").text(playerSelected.stats.health);
        $("#enemyName").text(enemySelected.stats.name);
        $("#enemyHP").text(enemySelected.stats.health);

        //$("#swap-enemy").attr("src", "./assets/images/" + secondEnemy.folder + "-PIRATE.png")
        $("#swap-enemy").css("background-image", "url(./assets/images/" + secondEnemy.folder + "-PIRATE.png)")

        $("#gameScreen").show();

        /* After the characters are chosen and main screen is hidden, 
           the following has the characters walk onto the screen (start of game) */
        debounce = true;
        //player image moves 30% to left, making it off the screen
        $("#playerPirate").css({ left: "-30%" });
        //This spawns the player's character
        animations("#playerPirate", playerSelected.folder, playerSelected.entity, "WALK", 150)

        //Animate function that moves the player's character left onto the screen and then plays idle animation
        $("#playerPirate").animate({ left: '0%' }, 3000, function () {
            animations("#playerPirate", playerSelected.folder, playerSelected.entity, "IDLE", 150)
            debounce = false;
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
//animationLooped is set to true here
function animations(characterId, folderName, animationEntity, animationName, animationSpeed, animationLooped = true, callback) {
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
            //if animationLooped is set to false, then the animation stops playing after one loop.
            if (animationLooped == false) {
                //clearInterval stops the animation
                clearInterval(animationInterval[characterId]);
                if (callback) {
                    callback();
                }
            }
        }
        //the time the set interval waits before running again
    }, animationSpeed)
}

//When the player attacks, debounce prevents the player from interrupting (by clicking multiple times) the current attack animation
var debounce = false;
//click event for the player attack
$("#playerPirate").click(function () {
    //if statement checks if debounce is true and if it's true, it stops the click function
    //if the debounce is true, that means an attack animation is already running when the player tried clicking again
    if (debounce == true) {
        return;
    }
    //Sets debounce to true when you first click so the game knows that an attack is happening
    debounce = true;
    /*animate function to make pirate element move to left 40%, 
    1200 is how long it takes to get to the 40% 
    everything inside callback function runs after the moving left animation is finished
    in this function it attacks after it moves*/
    animations("#playerPirate", playerSelected.folder, playerSelected.entity, "RUN", 60)
    $("#playerPirate").animate({ left: '40%' }, 1600, function () {
        animations("#playerPirate", playerSelected.folder, playerSelected.entity, "ATTACK", 150, false, function () {
            //subtracts enemies health
            enemySelected.stats.health -= (playerSelected.stats.attack * playerSelected.stats.multiplier);
            playerSelected.stats.multiplier++;
            $("#playerPower").text(playerSelected.stats.attack * playerSelected.stats.multiplier);
            $("#enemyHP").text(enemySelected.stats.health);

            var percentage = (enemySelected.stats.health / enemySelected.stats.maxHealth) * 100;
            //target enemies green bar
            $("#enemyGreenBar").animate({ width: percentage + "%" });
            //enemy dying animation 
            if (enemySelected.stats.health <= 0) {
                animations("#enemyPirate", enemySelected.folder, enemySelected.entity, "DIE", 60, false)
            }
            //turns player around after attack
            animations("#playerPirate", playerSelected.folder, playerSelected.entity, "RUN", 60)
            setTimeout(function () {
                $("#playerPirate").css({ transform: "scaleX(-1)" });
                //has player run back to original spot (0%)
                $("#playerPirate").animate({ left: '0%' }, 1600, function () {
                    //after player runs back, it turns back around
                    $("#playerPirate").css({ transform: "scaleX(1)" });
                    //plays idle animation after player runs back and turns around
                    animations("#playerPirate", playerSelected.folder, playerSelected.entity, "IDLE", 150)
                    if (enemySelected.stats.health <= 0) {
                        $("#enemyPirate").fadeOut("slow");
                        if (enemySelected == secondEnemy) {
                            return;
                        }
                        //second enemy walks in
                        enemySelected = secondEnemy;

                        $("#enemyName").text(enemySelected.stats.name);
                        $("#enemyHP").text(enemySelected.stats.health);
                        $("#enemyGreenBar").animate({ width: "100%" });
                        $("#enemyPirate").css({ filter: "brightness(100%)" });
                        $("#enemyPirate").fadeIn();
                        //player image moves 30% to right, making it off the screen
                        $("#enemyPirate").css({ right: "-30%" })
                        //This spawns the enemy character
                        animations("#enemyPirate", enemySelected.folder, enemySelected.entity, "WALK", 150)
                        //Animate function that moves the enemies character left onto the screen and then plays idle animation
                        $("#enemyPirate").animate({ right: '0%' }, 3000, function () {
                            animations("#enemyPirate", enemySelected.folder, enemySelected.entity, "IDLE", 150)
                            debounce = false;
                        });
                        return;
                    }
                    //runs enemyAttack function
                    enemyAttack();
                });
            }, 500)
        })
        //setTimeout function to play enemy hurt animation after 800 milliseconds\
        setTimeout(function () {
            animations("#enemyPirate", enemySelected.folder, enemySelected.entity, "HURT", 150, false, function () {
                //plays enemy idle animation after hurt animation
                animations("#enemyPirate", enemySelected.folder, enemySelected.entity, "IDLE", 150)
            })
            //function to change brightness 300 milliseconds after hurt function plays
            setTimeout(function () {
                $("#enemyPirate").css({ filter: "brightness(80%)" });
                if (enemySelected.stats.health > 0) {
                    //function to change brightness back 1 second after brightness was originally changed
                    setTimeout(function () {
                        $("#enemyPirate").css({ filter: "brightness(100%)" });
                    }, 1000)
                }
            }, 300)
        }, 800)
    });
});

function enemyAttack() {
    animations("#enemyPirate", enemySelected.folder, enemySelected.entity, "RUN", 60)
    $("#enemyPirate").animate({ right: '40%' }, 1600, function () {
        animations("#enemyPirate", enemySelected.folder, enemySelected.entity, "ATTACK", 150, false, function () {
            //subtracts players health
            playerSelected.stats.health -= enemySelected.stats.enemyAttackBack;
            var percentage = (playerSelected.stats.health / playerSelected.stats.maxHealth) * 100;
            $("#playerHP").text(playerSelected.stats.health);

            //target players green bar
            $("#playerGreenBar").animate({ width: percentage + "%" });

            //player dying animation
            if (playerSelected.stats.health <= 0) {
                animations("#playerPirate", playerSelected.folder, playerSelected.entity, "DIE", 60, false)
                return;
            }
            animations("#enemyPirate", enemySelected.folder, enemySelected.entity, "RUN", 60)
            setTimeout(function () {
                //turns enemy around after attack
                $("#enemyPirate").css({ transform: "scaleX(1)" });
                //has enemy run back to original spot (0%)
                $("#enemyPirate").animate({ right: '0%' }, 1600, function () {
                    //after enemy runs back, it turns back around
                    $("#enemyPirate").css({ transform: "scaleX(-1)" });
                    //plays idle animation after enemy runs back and turns around
                    animations("#enemyPirate", enemySelected.folder, enemySelected.entity, "IDLE", 150)
                });
                //allows the player to attack again
                debounce = false;
            }, 500)
        })
        //setTimeout function to play player hurt animation after 800 milliseconds\
        setTimeout(function () {
            animations("#playerPirate", playerSelected.folder, playerSelected.entity, "HURT", 150, false, function () {
                //plays player idle animation after hurt animation
                animations("#playerPirate", playerSelected.folder, playerSelected.entity, "IDLE", 150)
            })
            //function to change brightness 300 milliseconds after hurt function plays
            setTimeout(function () {
                $("#playerPirate").css({ filter: "brightness(80%)" });
                //function to change brightness back 1 second after brightness was originally changed
                setTimeout(function () {
                    $("#playerPirate").css({ filter: "brightness(100%)" });
                }, 1000)
            }, 300)
        }, 800)
    });
}




/*
TODO:
-set up swap enemy
-after death, it shows end screen with message "player wins" or "enemy wins" and start over button
-Add css
-README file
*/
