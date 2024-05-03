import { waitMs, setInnerText, 
    getChildrenValuesFromSpan } from './helpers.js';

// Run when the DOM has finished loading
document.addEventListener("DOMContentLoaded", function() {
    runWelcome();
});

// Local helper functions
function chooseRandomPlayer (playersArray) {
    const choosenPlayerIndex = Math.floor(Math.random() * playersArray.length);
    return playersArray[choosenPlayerIndex];
}

/**
 * This function will filter out a player from an array of 
 * players 
 * 
 * @param {Array} playersList Declared as a let variable
 * @param {string} playerName
 * @returns {Array} 
 */
function removePlayer (playersList, playerName) {
    return playersList.filter(player => player !== playerName); 
}

function resetGame () {
    document.getElementById("game-area").style.display = "none";
    document.getElementById("game-setup").style.display = "flex";
    runGameSetup();
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
    // Player list HTML element
    let playerListElement = document.getElementById("player-list");
    // Error HTML elements
    let playButtonErrorElement = document.getElementById("play-button-error");
    let addPlayerErrorElement = document.getElementById("add-player-error");

    // Current username state from input
    let username = "";

    function addPlayerToList () {
        // Create player element
        let playerElement = document.createElement("div");

        // Set the player name as the innerText
        let usernameSpan = document.createElement("span");
        setInnerText(usernameSpan, username);
        playerElement.appendChild(usernameSpan);

        // Create a 'remove player button'
        let removePlayerButton = document.createElement("button");
        removePlayerButton.innerText = "X";
        removePlayerButton.className = "remove-player-button"
        playerElement.appendChild(removePlayerButton);
        // Listen to the 'remove player click'
        removePlayerButton.addEventListener("click", function() {
            /* Remove the playerElement, 
            note! this will remove the button and stop listening to 
            button clicks */
            playerElement.remove(); 
        });

        // Push player element to container
        playerListElement.appendChild(playerElement);
        username = ""; // Reset username after submission
        document.getElementById("username-input").value = "";
        // Reset errors
        setInnerText(addPlayerErrorElement, "");
        setInnerText(playButtonErrorElement, "");
    }

    function handlePlayButtonClick () {
        // Create the players array
        const playersArray = getChildrenValuesFromSpan(playerListElement, 
            "textContent");

        // Run if at least 2 players have been added
        if (playersArray.length > 1) {
            // Hide the game set up and show the game area
            document.getElementById("game-setup").style.display = "none";
            document.getElementById("game-area").style.display = "block";
            // Send all players into the game
            runGame([...playersArray]);
        }else {
            // Set play button error 
            setInnerText(playButtonErrorElement, "Please add another player");
            setInnerText(addPlayerErrorElement, ""); // Keep UI minimalistic
        }
    }

    function handleAddPlayerButtonClick () {
        switch(true){
            // Username length is less than 1 character
            case username.length < 1: {
                setInnerText(addPlayerErrorElement, 
                    "Username has to be at least 1 character");
                setInnerText(playButtonErrorElement, "");
                break;
            }
            // Username is too long (24 characters)
            case username.length >= 24: {
                setInnerText(addPlayerErrorElement, "Username is too long");
                setInnerText(playButtonErrorElement, "");
                break;
            }
            // There are more than 10 players
            case playerListElement.children.length > 150: {
                setInnerText(addPlayerErrorElement, 
                    "The limit for this game is 150 players");
                setInnerText(playButtonErrorElement, "");
                break;
            }
            // Username already exists
            case getChildrenValuesFromSpan(playerListElement, "innerText").includes(
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
    }

    function handleChangeUsername (e) {
        username = e.target.value;
    }

    // Event listeners [username, play button, add player]
    document.getElementById("username-input").
        addEventListener("change", handleChangeUsername);

    document.getElementById("play-button").
        addEventListener("click", handlePlayButtonClick);

    document.getElementById("add-player-button").
        addEventListener("click", handleAddPlayerButtonClick);
    }

// Run game
function runGame (playersArray) {
    // Declare 'key' elements
    const pokeButtonElement = document.getElementById("poke-button");
    let filledRageMeterElement = document.getElementById("filled-rage-meter");
    let playerHintElement = document.getElementById("player-hint");
    let bearImage = document.getElementById("bear").children[0];

    // Declare and reset 'key' varibles
    let alivePlayers = playersArray;
    let rageMeter = 0; // 0 - 100
    let choosenPlayer = null;

    // Listen to poke button clicks
    pokeButtonElement.addEventListener("click", handlePoke);

    // Choose player randomly and set the player hint
    if (choosenPlayer === null){
        choosenPlayer = chooseRandomPlayer(alivePlayers);
        setInnerText(playerHintElement, `${choosenPlayer} it's your turn!`);
    }

    function setRageMeter (value, increment=false) {
        if (increment){
            rageMeter += value;
        }else{
            rageMeter = value;
        }
        // Set (and limit) the css width accordingly
        filledRageMeterElement.style.width = `${Math.min(rageMeter, 100)}%`;
    }

    async function handlePoke () {
        // Disable poke button to prevent unwanted user clicks
        pokeButtonElement.disabled = true; 

        /* Increment rage meter by 0-15 */
        setRageMeter(Math.random() * 15, true);

        // Change the bear image at specified levels
        let imageName;
        if (rageMeter < 50) {
            imageName = 0;
        }else if (rageMeter < 100) {
            imageName = 50;
        }else {
            imageName = 100;
        }
        bearImage.src = `assets/images/bear/bear_${imageName}.png`;

        // Handle game logic
        if (rageMeter >= 100) {
            // Remove player from the game and show hint
            alivePlayers = removePlayer(alivePlayers, choosenPlayer); 
            setInnerText(playerHintElement, `Sorry ${choosenPlayer}, you're out!`);
            // Pick a new random player
            choosenPlayer = chooseRandomPlayer(alivePlayers);
            await waitMs(2000); // Wait 2 seconds

            // If there's only one player left, declare a winner 
            if (alivePlayers.length === 1){
                setInnerText(playerHintElement, `${alivePlayers[0]}, you won!`);
                await waitMs(5000); // Wait 5 seconds before resetting the game
                setRageMeter(0);
                resetGame();
            }else{
                // If there are players, reset the rage meter 
                setRageMeter(0);
                choosenPlayer = chooseRandomPlayer(alivePlayers);
                setInnerText(playerHintElement, `${choosenPlayer} it's your turn!`);
            }
        }else {
            choosenPlayer = chooseRandomPlayer(alivePlayers);
            setInnerText(playerHintElement, `${choosenPlayer} it's your turn!`);
        }

        pokeButtonElement.disabled = false; // Enable poke button
    }
}