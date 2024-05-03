import { waitMs, setInnerText, 
    getChildrenValuesFromSpan } from './helpers.js';

// Run when the DOM has finished loading
document.addEventListener("DOMContentLoaded", function() {

    const globalHTML = {
        welcomeScreen: document.getElementById("welcome-screen"),
        filledRageMeter: document.getElementById("filled-rage-meter"),
        pokeButton: document.getElementById("poke-button"),
        playerHint: document.getElementById("player-hint"),
        bearImage: document.getElementById("bear").children[0],
        playerList: document.getElementById("player-list"),
        playButtonError: document.getElementById("play-button-error"),
        addPlayerError: document.getElementById("add-player-error"),
        usernameInput: document.getElementById("username-input"),
        gameSetup: document.getElementById("game-setup"),
        gameArea: document.getElementById("game-area"),
        playButton: document.getElementById("play-button"),
        addPlayerButton: document.getElementById("add-player-button"),
    };

    runWelcome(globalHTML);
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

function resetGame (globalHTML) {
    globalHTML.gameArea.style.display = "none";
    globalHTML.gameSetup.style.display = "flex";
    runGameSetup(globalHTML);
}

// Run the welcome screen
async function runWelcome (globalHTML) {
    await waitMs(1000);
    // Hide the welcome screen and show game setup
    globalHTML.welcomeScreen.style.display = "none";
    globalHTML.gameSetup.style.display = "flex";
    // Run the game setup
    runGameSetup(globalHTML);
}

// Run the game set up
async function runGameSetup (globalHTML) {
    // Current username state from input
    let username = "";

    function addPlayerToList (globalHTML) {
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
        globalHTML.playerList.appendChild(playerElement);
        username = ""; // Reset username after submission
        globalHTML.usernameInput.value = "";
        // Reset errors
        setInnerText(globalHTML.addPlayerError, "");
        setInnerText(globalHTML.playButtonError, "");
    }

    function handlePlayButtonClick (globalHTML) {
        // Create the players array
        const playersArray = getChildrenValuesFromSpan(globalHTML.playerList, 
            "textContent");

        // Run if at least 2 players have been added
        if (playersArray.length > 1) {
            // Hide the game set up and show the game area
            globalHTML.gameSetup.style.display = "none";
            globalHTML.gameArea.style.display = "block";
            // Send all players into the game
            runGame([...playersArray], globalHTML);
        }else {
            // Set play button error 
            setInnerText(globalHTML.playButtonError, "Please add another player");
            setInnerText(globalHTML.addPlayerError, ""); // Keep UI minimalistic
        }
    }

    function handleAddPlayerButtonClick (globalHTML) {
        switch(true){
            // Username length is less than 1 character
            case username.length < 1: {
                setInnerText(globalHTML.addPlayerError, 
                    "Username has to be at least 1 character");
                setInnerText(globalHTML.playButtonError, "");
                break;
            }
            // Username is too long (24 characters)
            case username.length >= 24: {
                setInnerText(globalHTML.addPlayerError, "Username is too long");
                setInnerText(globalHTML.playButtonError, "");
                break;
            }
            // There are more than 10 players
            case globalHTML.playerList.children.length > 150: {
                setInnerText(globalHTML.addPlayerError, 
                    "The limit for this game is 150 players");
                setInnerText(globalHTML.playButtonError, "");
                break;
            }
            // Username already exists
            case getChildrenValuesFromSpan(globalHTML.playerList, "innerText").includes(
                username): {
                setInnerText(globalHTML.addPlayerError, "Username already exists");
                setInnerText(globalHTML.playButtonError, "");
                break;
            }
            // Run if validation passes
            default: {
                addPlayerToList(globalHTML);
                break;
            }
        }
    }

    function handleChangeUsername (e) {
        username = e.target.value;
    }

    // Event listeners [username, play button, add player]
    globalHTML.usernameInput.addEventListener("change", () => {
        handleChangeUsername(globalHTML)});

    globalHTML.playButton.addEventListener("click", () => {
        handlePlayButtonClick(globalHTML)});

    globalHTML.addPlayerButton.addEventListener("click", () => {
        handleAddPlayerButtonClick(globalHTML)});
}

// Run game
function runGame (playersArray, globalHTML) {
    // Declare and reset 'key' varibles
    let alivePlayers = playersArray;
    let rageMeter = 0; // 0 - 100
    let choosenPlayer = null;

    // Listen to poke button clicks
    globalHTML.pokeButton.addEventListener("click", handlePoke);


    // Choose player randomly and set the player hint
    if (choosenPlayer === null){
        choosenPlayer = chooseRandomPlayer(alivePlayers);
        setInnerText(globalHTML.playerHint, `${choosenPlayer} it's your turn!`);
    }

    function setRageMeter (value, increment=false) {
        if (increment){
            rageMeter += value;
        }else{
            rageMeter = value;
        }
        // Set (and limit) the css width accordalHTML.bearImageingly
        globalHTML.filledRageMeter.style.width = `${Math.min(rageMeter, 100)}%`;
    }

    async function handlePoke (globalHTML) {
        // Disable poke button to prevent unwanted user clicks
        globalHTML.pokeButton.disabled = true; 

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
        globalHTML.bearImage.src = `assets/images/bear/bear_${imageName}.png`;

        // Handle game logic
        if (rageMeter >= 100) {
            // Remove player from the game and show hint
            alivePlayers = removePlayer(alivePlayers, choosenPlayer); 
            setInnerText(globalHTML.playerHint, `Sorry ${choosenPlayer}, you're out!`);
            // Pick a new random player
            choosenPlayer = chooseRandomPlayer(alivePlayers);
            await waitMs(2000); // Wait 2 seconds

            // If there's only one player left, declare a winner 
            if (alivePlayers.length === 1){
                setInnerText(globalHTML.playerHint, `${alivePlayers[0]}, you won!`);
                await waitMs(5000); // Wait 5 seconds before resetting the game
                setRageMeter(0);
                resetGame(globalHTML);
            }else{
                // If there are players, reset the rage meter 
                setRageMeter(0);
                choosenPlayer = chooseRandomPlayer(alivePlayers);
                setInnerText(globalHTML.playerHint, `${choosenPlayer} it's your turn!`);
            }
        }else {
            choosenPlayer = chooseRandomPlayer(alivePlayers);
            setInnerText(globalHTML.playerHint, `${choosenPlayer} it's your turn!`);
        }

        globalHTML.pokeButton.disabled = false; // Enable poke button
    }
}