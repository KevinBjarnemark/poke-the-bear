import { waitMs, setInnerText, 
    getChildrenValuesFromSpan } from './helpers.js';

// Run when the DOM has finished loading
document.addEventListener("DOMContentLoaded", function() {

    const globalHTML = {
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

    let globalVariables = {
        firstLoad: true,
        alivePlayers: [],
        chosenPlayer: null,
        rageMeter: 0, // 0 - 100
        usernameInput: "",
    };

    // Listeners
    globalHTML.playButton.addEventListener("click", () => {
        handlePlayButtonClick(globalHTML, globalVariables)});

    globalHTML.pokeButton.addEventListener("click", () => {
        handlePoke(globalHTML, globalVariables)});

    globalHTML.usernameInput.addEventListener("change", (e) => {
        globalVariables.usernameInput = e.target.value;
    });

    globalHTML.addPlayerButton.addEventListener("click", () => {
        handleAddPlayerButtonClick(globalHTML, globalVariables)
    });

    runGameSetup(globalHTML, globalVariables);
});

// Local helper functions
function chooseRandomPlayer (playersArray) {
    if (playersArray){
        const chosenPlayerIndex = Math.floor(Math.random() * playersArray.length);
        return playersArray[chosenPlayerIndex];
    }
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

function resetGame (globalHTML, globalVariables) {
    globalHTML.gameArea.style.display = "none";
    globalHTML.gameSetup.style.display = "flex";
    runGameSetup(globalHTML, globalVariables);
}

function addPlayerToList (username, globalHTML) {
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
    document.getElementById("username-input").value = "";
    // Reset errors
    setInnerText(globalHTML.addPlayerError, "");
    setInnerText(globalHTML.playButtonError, "");
}


function handlePlayButtonClick (globalHTML, globalVariables) {
    // Create the players array
    const playersArray = getChildrenValuesFromSpan(globalHTML.playerList, 
        "textContent");
        globalVariables.alivePlayers = [...playersArray];

    // Run if at least 2 players have been added
    if (playersArray.length > 1) {
        // Hide the game set up and show the game area
        globalHTML.gameSetup.style.display = "none";
        globalHTML.gameArea.style.display = "block";
        // Send all players into the game
        runGame(globalVariables, globalHTML);
    }else {
        // Set play button error 
        setInnerText(globalHTML.playButtonError, "Please add another player");
        setInnerText(globalHTML.addPlayerError, ""); // Keep UI minimalistic
    }
}

function handleAddPlayerButtonClick (globalHTML, globalVariables) {
    switch(true){
        // Username length is less than 1 character
        case globalVariables.usernameInput.length < 1: {
            setInnerText(globalHTML.addPlayerError, 
                "Username has to be at least 1 character");
            setInnerText(globalHTML.playButtonError, "");
            break;
        }
        // Username is too long (24 characters)
        case globalVariables.usernameInput.length >= 24: {
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
            globalVariables.usernameInput): {
            setInnerText(globalHTML.addPlayerError, "Username already exists");
            setInnerText(globalHTML.playButtonError, "");
            break;
        }
        // Run if validation passes
        default: {
            addPlayerToList(globalVariables.usernameInput, globalHTML);
            break;
        }
    }
}

function setRageMeter (globalHTML, globalVariables, value, increment=false) {
    if (increment){
        globalVariables.rageMeter += value;
    }else{
        globalVariables.rageMeter = value;
    }
    // Set (and limit) the css width accordingly
    globalHTML.filledRageMeter.style.width = `${Math.min(globalVariables.rageMeter, 100)}%`;
}

// Run the game set up
async function runGameSetup (globalHTML, globalVariables) {
    // Show welcome screen on the first load
    if (globalVariables.firstLoad){
        await waitMs(1000);
        // Hide the welcome screen and show game setup
        document.getElementById("welcome-screen").style.display = "none";
        globalHTML.gameSetup.style.display = "flex";
    }
}

// Run game
async function runGame (globalHTML, globalVariables) {
    globalVariables.chosenPlayer = chooseRandomPlayer(globalVariables.alivePlayers);
    setInnerText(globalHTML.playerHint, `${globalVariables.chosenPlayer} it's your turn!`);
}

async function handlePoke (globalHTML, globalVariables) {
    // Disable poke button to prevent unwanted user clicks
    globalHTML.pokeButton.disabled = true; 

    /* Increment rage meter by 0-15 */
    setRageMeter(globalHTML, globalVariables, Math.random() * 15, true);

    // Change the bear image at specified levels
    let imageName;
    if (globalVariables.rageMeter < 50) {
        imageName = 0;
    }else if (globalVariables.rageMeter < 100) {
        imageName = 50;
    }else {
        imageName = 100;
    }
    globalHTML.bearImage.src = `assets/images/bear/bear_${imageName}.png`;

    // Handle game logic
    if (globalVariables.rageMeter >= 100) {
        // Remove player from the game and show hint
        globalVariables.alivePlayers = removePlayer(globalVariables.alivePlayers, globalVariables.chosenPlayer); 
        setInnerText(globalHTML.playerHint, `Sorry ${globalVariables.chosenPlayer}, you're out!`);
        // Pick a new random player
        globalVariables.chosenPlayer = chooseRandomPlayer(globalVariables.alivePlayers);
        await waitMs(2000); // Wait 2 seconds

        // If there's only one player left, declare a winner 
        if (globalVariables.alivePlayers.length === 1){
            setInnerText(globalHTML.playerHint, `${globalVariables.alivePlayers[0]}, you won!`);
            await waitMs(5000); // Wait 5 seconds before resetting the game
            setRageMeter(globalHTML, globalVariables, 0);
            resetGame(globalHTML, globalVariables);
        }else{
            // If there are players, reset the rage meter 
            setRageMeter(globalHTML, globalVariables, 0);
            globalVariables.chosenPlayer = chooseRandomPlayer(globalVariables.alivePlayers);
            setInnerText(globalHTML.playerHint, `${globalVariables.chosenPlayer} it's your turn!`);
        }
    }else {
        globalVariables.chosenPlayer = chooseRandomPlayer(globalVariables.alivePlayers);
        setInnerText(globalHTML.playerHint, `${globalVariables.chosenPlayer} it's your turn!`);
    }

    globalHTML.pokeButton.disabled = false; // Enable poke button
}