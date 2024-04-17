import { waitMs, setInnerText, 
    getChildrenValuesFromElement } from './helpers.js';

// Run when the DOM has finished loading
document.addEventListener("DOMContentLoaded", function() {
    runWelcome();
});

// Local helper functions
function chooseRandomPlayer (playersArray) {
    const choosenPlayerIndex = Math.floor(Math.random() * playersArray.length);
    return playersArray[choosenPlayerIndex];
}

function resetGame () {
    document.getElementById("game-area").style.display = "none";
    runWelcome();
}

// Run the welcome screen
async function runWelcome () {
    await waitMs(1000);
    // Hide the welcome screen and show game setup
    document.getElementById("welcome-screen").style.display = "none";
    document.getElementById("game-setup").style.display = "flex";

    // Run the game setup
    runGameSetup();
}

// Run the game set up
async function runGameSetup () {
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

// Run game
function runGame (playersArray) {
    // Declare 'key' elements
    const pokeButtonElement = document.getElementById("poke-button");
    let filledRageMeterElement = document.getElementById("filled-rage-meter");
    let bearImage = document.getElementById("bear").children[0];

    // Listen to poke button clicks
    pokeButtonElement.addEventListener("click", handlePoke);

    const choosenPlayer = chooseRandomPlayer(playersArray);
    let playerHintElement = document.getElementById("player-hint");
    setInnerText(playerHintElement, `${choosenPlayer} it's your turn!`);

    // Reset all values before starting
    let alivePlayers = playersArray;
    let rageMeter = 0; // 0 - 100

    async function handlePoke () {
        // Disable poke button to prevent unwanted user clicks
        pokeButtonElement.disabled = true; 

        /* Increment rage meter by 0-15 and set the css width 
        accordingly */
        rageMeter += Math.random() * 15;
        filledRageMeterElement.style.width = `${Math.min(rageMeter, 100)}%`;

        // Change the bear image at specified levels
        let imageName;
        if (rageMeter < 50) {
            imageName = 0;
        }else if (rageMeter < 100) {
            imageName = 50;
        }else {
            imageName = 100;
        }
        bearImage.src = `/assets/images/bear/bear_${imageName}.png`;

        // Choose player randomly and set the player hint
        const choosenPlayer = chooseRandomPlayer(alivePlayers);
        setInnerText(playerHintElement, `${choosenPlayer} it's your turn!`);

        // Handle game logic
        if (rageMeter >= 100) {
            // Remove player from the game and show hint
            alivePlayers = alivePlayers.filter(player => player !== choosenPlayer); 
            setInnerText(playerHintElement, `Sorry ${choosenPlayer}, you're out!`);
            await waitMs(2000); // Wait 2 seconds

            // If there's only one player left, declare a winner 
            if (alivePlayers.length === 1){
                setInnerText(playerHintElement, `${alivePlayers[0]}, you won!`);
                await waitMs(5000); // Wait 5 seconds before resetting the game
                resetGame();
            }else{
                filledRageMeterElement.style.width = "0%";
                rageMeter = 0;
                setInnerText(playerHintElement, `${chooseRandomPlayer(alivePlayers)} it's your turn!`);
            }
        }

        pokeButtonElement.disabled = false; // Enable poke button
    }
}
