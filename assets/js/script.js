import { waitMs, setInnerText, 
    getChildrenValuesFromElement } from './helpers.js';

// Run when the DOM has finished loading
document.addEventListener("DOMContentLoaded", function() {
    runWelcome();
});

async function runWelcome () {
    await waitMs(1000);

    // Hide the welcome screen and show game setup
    document.getElementById("welcome-screen").style.display = "none";
    document.getElementById("game-setup").style.display = "flex";

    // Get the player list element
    let playerListElement = document.getElementById("player-list");
    let playButtonErrorElement = document.getElementById("play-button-error");
    let addPlayerErrorElement = document.getElementById("add-player-error");

    // Listen to the username input
    let username = "";
    document.getElementById("username-input").
        addEventListener("change", function(e) {
            username = e.target.value;
        });

    // Listen to to play button clicks
    document.getElementById("play-button").
        addEventListener("click", function() {
            // Create the players array
            const playersArray = getChildrenValuesFromElement(playerListElement, "innerText");

            // Run if at least 2 players have been added
            if (playersArray.length > 1) {
                // Hide the game set up and show the game area
                document.getElementById("game-setup").style.display = "none";
                document.getElementById("game-area").style.display = "block";
                // Pass all players into the game
                runGame(playersArray);
            }else {
                // Set play button error message
                setInnerText(playButtonErrorElement, "Please add another player");
                setInnerText(addPlayerErrorElement, ""); // Keep UI minimalistic
            }
    });

    document.getElementById("add-player-button").addEventListener("click", function() {
        switch(true){
            // Username length is less than 1
            case username.length < 1: {
                setInnerText(addPlayerErrorElement, "Username has to be at least 1 character");
                setInnerText(playButtonErrorElement, "");
                break;
            }
            // There are more than 10 players
            case playerListElement.children.length > 10: {
                setInnerText(addPlayerErrorElement, "The limit for this game is 10 players");
                setInnerText(playButtonErrorElement, "");
                break;
            }
            // Username already exists
            case getChildrenValuesFromElement(playerListElement, "innerText").includes(
                username): {
                setInnerText(addPlayerErrorElement, "Username already exists");
                setInnerText(playButtonErrorElement, "");
                break;
            }
            // Run if validation passes
            default: {
                addPlayerToList();
                console.log()
                break;
            }
        }

        function addPlayerToList () {
            // Create player element
            let playerElement = document.createElement("div");
            setInnerText(playerElement, username); // Set player name
            // Push player element to container
            playerListElement.appendChild(playerElement);
            username = ""; // Reset username
            document.getElementById("username-input").value = "";
            // Reset errors
            setInnerText(addPlayerErrorElement, "");
            setInnerText(playButtonErrorElement, "");
        }
    });
}

function chooseRandomPlayer (playersArray) {
    const choosenPlayerIndex = Math.floor(Math.random() * playersArray.length);
    return playersArray[choosenPlayerIndex];
}

function resetGame () {
    document.getElementById("game-area").style.display = "none";
    runWelcome();
}

function runGame (playersArray) {
    let pokeButtonElement = document.getElementById("poke-button");
    pokeButtonElement.addEventListener("click", handlePoke);

    const choosenPlayer = chooseRandomPlayer(playersArray);
    let playerHintElement = document.getElementById("player-hint");
    setInnerText(playerHintElement, `${choosenPlayer} it's your turn!`);

    let alivePlayers = playersArray;
    let rageMeter = 0; // 0 - 100
    let filledRageMeterElement = document.getElementById("filled-rage-meter");
    let bearImage = document.getElementById("bear").children[0];

    async function handlePoke () {
        pokeButtonElement.disabled = true; // Disable poke button
        const choosenPlayer = chooseRandomPlayer(alivePlayers);

        setInnerText(playerHintElement, `${choosenPlayer} it's your turn!`);

        // Change the bear image at specified levels
        if (rageMeter < 50) {
            bearImage.src = "/assets/images/bear/bear_0.png";
        }else if (rageMeter >= 50 && rageMeter < 100) {
            bearImage.src = "/assets/images/bear/bear_50.png";
        }else if (rageMeter >= 100) {
            bearImage.src = "/assets/images/bear/bear_100.png";
        }

        // Update the rage meter and adjust the css width accordingly
        if (rageMeter < 100) {
            rageMeter += Math.random() * 15; // Increment by 0-15
            // Set the css width (limited)
            filledRageMeterElement.style.width = `${Math.min(rageMeter, 100)}%`;
        }else{
            // Remove player from the game 
            alivePlayers = alivePlayers.filter(player => player !== choosenPlayer); 

            if (alivePlayers.length === 1){
                setInnerText(playerHintElement, `${alivePlayers[0]}, you won!`);
            }else {
                // Show player hint
                setInnerText(playerHintElement, `Sorry ${choosenPlayer}, you're out!`);
            }
            await waitMs(5000); // Wait 5 seconds before resetting the game
            rageMeter = 0; // Reset to 0
            filledRageMeterElement.style.width = `${rageMeter}%`;
            resetGame();
        }

        pokeButtonElement.disabled = false; // Enable poke button
    }
}
