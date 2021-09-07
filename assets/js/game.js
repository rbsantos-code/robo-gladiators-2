let playerName = window.prompt("What is your robot's name?");
let playerHealth = 100;
let playerAttack = 10;
let playerMoney = 10;

// You can also log multiple values at once like this
console.log("Character info: ", playerName, playerAttack, playerHealth);

let enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
let enemyHealth = 50;
let enemyAttack = 12;

function fight(enemyName) {

    while (playerHealth > 0 && enemyHealth > 0) {
        // prompt player choice
        let promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        // if player picks "skip" confirm and then stop the loop
        if (promptFight === "skip" || promptFight === "SKIP") {
            let confirmSkip = window.confirm("Are you sure you'd like to quit?");

            // if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerName + ' has decided to skip this fight. Goodbye!');
                
                // subtract money from playerMoney for skipping
                playerMoney = playerMoney - 10;
                console.log("playerMoney", playerMoney)
                break;
            }
        }

        // remove enemy's health by subtracting the amount set in the playerAttack variable
        enemyHealth = enemyHealth - playerAttack;
        console.log(
            playerName + ' attacked ' + enemyName + '. ' + enemyName + ' now has ' + enemyHealth + ' remaining.'
        );

        // check enemy's health
        if (enemyHealth <= 0) {
            window.alert(enemyName + ' has died!');

            // award player money for winning
            playerMoney = playerMoney + 20;

            // leave while() loop since enemy is dead
            break;
        } else { 
            window.alert(enemyName + ' still has ' + enemyHealth + ' health remaining.');
        }

        // remove player's health by subtracting the amount set in the enemyAttack variable
        playerHealth = playerHealth - enemyAttack;
        console.log(
            enemyName + ' has attacked ' + playerName + '. ' + playerName + ' now has ' + playerHealth + ' health remaining.'
        );

        // check player's health
        if (playerHealth <= 0) {
            window.alert(playerName + ' has died!');

            // leave while() loop if player is dead
            break; 
        } else {
            window.alert(playerName + ' still has ' + playerHealth + ' health remaining.');
        }
        
    }

};

// execute function
function startGame() {
    // reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    for (let i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0 ) {
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

            let pickedEnemyName = enemyNames[i];

            enemyHealth = 50;

            fight(pickedEnemyName);

            // if we are not at the last enemy in the array
            if (playerHealth > 0 && i < enemyNames.length - 1) {
                // ask if player wants to use the store before next round
                let storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                // if yes, take player to the store() function
                if (storeConfirm) {
                    shop();
                }
            }
        }
        else {
            window.alert("You have lost your robot in battle! Game Over!");
        }
    }
    // after the loop ends, player is either out of health or enemies to fight, so run endGame function
    endGame();

};

// end game function
function endGame() {
    // if player is still alive, player wins!
    if (playerHealth > 0) {
        window.alert("Great job, you have survived the game! You now have a score of " + playerMoney + ".");
    } else {
        window.alert("You've lost your robot in battle!");
    }

    // ask player if they will like to play again
    let playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        // restart game
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

function shop() {
    console.log(playerName + " entered the shop");

    // ask player what they'd like to do
    let shopOptionPrompt = window.prompt("Would you like to REFILL you health, UPGRADE your attack, or LEAVE the store? Please enter your choice");

    // use switch to carry out action
    switch (shopOptionPrompt) {
        case "refill":
            window.alert("Refilling player's health by 20 for 7 points");

            // increase health and decrease money
            playerHealth = playerHealth + 20;
            playerMoney = playerMoney - 7;
            break;
        case "upgrade":
            window.alert("Upgrading player's attack by 6 for 7 points");

            // increase attack and decrease money
            playerAttack = playerAttack + 6;
            playerMoney = playerMoney - 7;
            break;
        case "leave":
            window.alert("Leaving the store");

            // do nothing, so function will end
            break;
        default:
            window.alert("You did not pick a valid option. Try again!");

            // call shop() again to force player to pick a valid option
            shop();
            break;
    }
};

// start game when page loads
startGame();