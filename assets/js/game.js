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

    // keep track of who goes first
    let isPlayerTurn = true;

    // randomly change turn order
    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }

    while (playerInfo.health > 0 && enemy.health > 0) {
        if (isPlayerTurn) {
            // ask player if they'd like to fight or skip
            if (fightOrSkip()) {
                // if true, leave fight by breaking loop
                break;
            }

            let damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

            // remove enemy'ys health by subtracting the amount we set in the damage variable
            enemy.health = Math.max(0, enemy.health - damage);
            console.log(
                playerInfo.name +
                " attacked " +
                enemy.name + 
                ". " + 
                enemy.name + 
                " now has " +
                enemy.health + 
                " health remaining."
            );

            // check enemy's health
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");

                // award player money for winning
                playerInfo.Money = playerInfo.money + 20;

                // leave while() loop since enemy is dead
                break;
            } else {
                window.alert(enemy.name + " still has " + enemy.health + " health remaining!");
            }
            // player gets attacked first
        } else {
            let damage = randomNumber(enemy.attack - 3, enemy.attack);

            // remove player's health by subtracting the amount we set in the damage variable
            playerInfo.health = Math.max(0, playerInfo.health - damage);
            console.log(
                enemy.name + 
                " attacked " +
                playerInfo.name +
                ". " +
                playerInfo.name +
                " now has " +
                playerInfo.health +
                " health remaining."
            );

            // check player's health
            if (playerInfo.health <= 0 ) {
                window.alert(playerInfo.name + " has died!");
                // leave while() loop if player is dead
                break;
            } else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health remaining!");
            }
        }
        // switch turn order for next round
        isPlayerTurn = !isPlayerTurn;
        
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

// shop functions section 
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

// End Game function
function endGame() {
    window.alert("The game has now ended. Let's see how you did!");

    // check localStorage for high score, if it's not there, use 0
    let highScore = localStorage.getItem("highscore");
    if(highScore === null) {
        highScore = 0;
    }

    // if player has more money than the high score, player has new highscore
    if (playerInfo.money > highScore) {
        localStorage.setItem("highscore", playerInfo.money);
        localStorage.setItem("name", playerInfo.name);

        alert(playerInfo.name + " now has the high score of " + playerInfo.money + " !");
    } else {
        alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
    }

    // ask player if they'd like to play again
    let playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Comeback soon!");
    }
};

// start game when page loads
startGame();