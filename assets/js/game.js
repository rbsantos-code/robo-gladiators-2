function getPlayerName() {
    let name = "";

    while(name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }

    console.log("Your robot's name is " + name);
    return name;
};

let playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    }
};

// You can also log multiple values at once like this
console.log("Character info: ", playerInfo.name, playerInfo.attack, playerInfo.health);

let enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10,14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10,14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10,14)
    }
];

// fight or skip function
function fightOrSkip() {
    // ask player if they'd like to fight or skip using fightOrSkip function
    let promptFight = window.prompt('Would you like to FIGHT or SKIP this battle?');

    // Conditional Recursive Function Call
    if (promptFight === "" || promptFight === null) {
        window.alert("You need to provide a valid answer! Please try again!");
        return fightOrSkip();
    }

    // if player picks "skip" confirm and then stop the loop
    promptFight = promptFight.toLowerCase();

    if (promptFight === "skip") {
        //confirm player wants to skip
        let confirmSkip = window.confirm("Are you sure you'd like to quit?");

        // if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            // subtract money from playerMoney for skipping
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            
            // return true if player wants to leave
            return true;
        }
    }
    return false;
}

// fight function 
function fight(enemy) {

    while (playerInfo.health > 0 && enemy.health > 0) {
        // prompt player choice
        if (fightOrSkip()) {
            // if true, leave fight by breaking loop
            break;
        }

        // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
        let damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

        enemy.health = Math.max(0, enemy.health - damage);
        console.log(
            playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' remaining.'
        );

        // check enemy's health
        if (enemy.health <= 0) {
            window.alert(enemy.name + ' has died!');

            // award player money for winning
            playerInfo.money = playerInfo.money + 20;

            // leave while() loop since enemy is dead
            break;
        } else { 
            window.alert(enemy.name + ' still has ' + enemy.health + ' health remaining.');
        }

        // remove player's health by subtracting the amount set in the enemy.attack variable
        let enemyDamage = randomNumber(enemy.attack - 3, enemy.attack);

        playerInfo.health = Math.max(0, playerInfo.health - enemyDamage);
        console.log(
            enemy.name + ' has attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
        );

        // check player's health
        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + ' has died!');

            // leave while() loop if player is dead
            break; 
        } else {
            window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health remaining.');
        }
        
    }

};

// execute function
function startGame() {
    // reset player stats
    playerInfo.reset();

    for (let i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0 ) {
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

            let pickedEnemyObj = enemyInfo[i];

            pickedEnemyObj.health = randomNumber(40, 60);

            fight(pickedEnemyObj);

            // if we are not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
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
    if (playerInfo.health > 0) {
        window.alert("Great job, you have survived the game! You now have a score of " + playerInfo.money + ".");
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
    console.log(playerInfo.name + " entered the shop");

    function refillHealth() {
        if (playerInfo.money >=7) {
            window.alert("Refilling player's health by 20 for 7 points");

            // increase health and decrease money
            playerInfo.health = playerInfo.health + 20;
            playerInfo.money = playerInfo.money - 7;
        } else {
            window.alert("You don't have enough money!");
        }
    }

    function upgradeAttack() {
        if (playerInfo.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 points");

            // increase attack and decrease money
            playerInfo.attack = playerInfo.attack + 6;
            playerInfo.money = playerInfo.money - 7;
        } else {
            window.alert("You don't have enough money!");
        }
    }

    // ask player what they'd like to do
    let shopOptionPrompt = window.prompt("Would you like to REFILL(1) you health, UPGRADE(2) your attack, or LEAVE(3) the store? Please enter your choice");

    shopOptionPrompt = parseInt(shopOptionPrompt);

    // use switch to carry out action
    switch (shopOptionPrompt) {
       case 1:
           refillHealth();
           break;
        case 2: 
           upgradeAttack();
           break;
        case 3:
            window.alert("Leaving the store.");
            break;
        default:
            window.alert("You did not pick a valid option. Try again!");
            shop();
            break;  
    }
};

function randomNumber(min, max) {
    let value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
}

// start game when page loads
startGame();