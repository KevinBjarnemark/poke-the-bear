import { waitMs, setInnerText, 
    getChildrenValuesFromSpan } from './helpers.js';

// Run when the DOM has finished loading
document.addEventListener("DOMContentLoaded", function() {
    // README! #1

    const globalHTML = {
        welcomeScreen: document.getElementById("welcome-screen"),
        filledRageMeter: document.getElementById("filled-rage-meter"),
        pokeButton: document.getElementById("poke-button"),
        playerHint: document.getElementById("player-hint"),
        playerHintEm: document.getElementById("player-hint-em"),
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
        chosenPlayer: null, // String or null
        rageMeter: 0, // 0 - 100
        usernameInput: "",
    };

    // Event listeners [username, play button, add player]
    globalHTML.usernameInput.addEventListener("change", (e) => {
        globalVariables.usernameInput = e.target.value;});

    globalHTML.addPlayerButton.addEventListener("click", () => {
        handleAddPlayerButtonClick(globalHTML, globalVariables)});

    globalHTML.playButton.addEventListener("click", () => {
        handlePlayButtonClick(globalHTML, globalVariables)});

    globalHTML.pokeButton.addEventListener("click", () => {
        handlePoke(globalHTML, globalVariables)});

    runGameSetup(globalHTML, globalVariables);
});

// Run the game set up
async function runGameSetup (globalHTML, globalVariables) {
    if (globalVariables?.firstLoad){
        // Temporarily show welcome screen on the first load
        await waitMs(1000);
        // Hide the welcome screen and show game setup
        globalHTML.welcomeScreen.style.display = "none";
        globalHTML.gameSetup.style.display = "flex";
    }
}

function resetGame (globalHTML, globalVariables) {
    globalHTML.bearImage.src = `assets/images/bear/bear_0.png`;
    globalHTML.bearImage.alt = "A bear lying down";
    setRageMeter(globalHTML, globalVariables, 0);
    // Hide the game area and show game setup
    globalHTML.gameArea.style.display = "none";
    globalHTML.gameSetup.style.display = "flex";
}

function addPlayerToList (globalHTML, globalVariables) {
    // Create player element
    let playerElement = document.createElement("div");
    // Set the player name as the innerText
    let usernameSpan = document.createElement("span");
    setInnerText(usernameSpan, globalVariables.usernameInput);
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
    // Reset username after submission
    globalVariables.usernameInput = ""; 
    globalHTML.usernameInput.value = "";
    // Reset errors
    setInnerText(globalHTML.addPlayerError, "");
    setInnerText(globalHTML.playButtonError, "");
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
            addPlayerToList(globalHTML, globalVariables);
            break;
        }
    }
}

function handlePlayButtonClick (globalHTML, globalVariables) {
    // Create the players array
    const playersArray = getChildrenValuesFromSpan(globalHTML.playerList, 
        "textContent");

    // Run if at least 2 players have been added
    if (playersArray.length > 1) {
        // Reset errors
        setInnerText(globalHTML.addPlayerError, "");
        setInnerText(globalHTML.playButtonError, "");
        // Send all players into the game
        runGame(playersArray, globalHTML, globalVariables);
    }else {
        // Set play button error 
        setInnerText(globalHTML.playButtonError, "Please add another player");
        setInnerText(globalHTML.addPlayerError, ""); // Keep UI minimalistic
    }
}

function setRageMeter (globalHTML, globalVariables, value, increment=false) {
    if (increment){
        globalVariables.rageMeter += value;
    }else{
        globalVariables.rageMeter = value;
    }
    // Set (and limit) the css width accordalHTML.bearImageingly
    globalHTML.filledRageMeter.style.width = `${Math.min(globalVariables.rageMeter, 100)}%`;
}

/**
 * This will filter out a player from the alivePlayersArray
 * and set the innerText of the playerHint
 * 
 * @param {Object} globalHTML
 * @param {Object} globalVariables 
 */
function kickChosenPlayer (globalHTML, globalVariables) {
    globalVariables.alivePlayers = globalVariables.alivePlayers.filter(
        player => player !== globalVariables.chosenPlayer);
    globalHTML.playerHint.innerHTML = 
        `<div>${globalVariables.chosenPlayer}</div><div style="color: var(--red); font-family: 'Luckiest Guy', sans-serif;">YOU'RE OUT</div>`;
}

/**
 * This will generate a random number(index) based on the alive players 
 * and choose a random player based out of the generated value.
 * The HTML element 'playersHint' will update accordingly
 * 
 * @param {Object} globalHTML
 * @param {Object} globalVariables 
 */
function pickNewPlayer (globalHTML, globalVariables) {
    const chosenPlayerIndex = Math.floor(Math.random() * 
        globalVariables.alivePlayers.length);
    globalVariables.chosenPlayer = globalVariables.alivePlayers[chosenPlayerIndex];
    globalHTML.playerHint.innerHTML = 
        `<div>${globalVariables.chosenPlayer}</div><div>IT'S YOUR TURN!</div>`;
}

async function handlePoke (globalHTML, globalVariables) {
    // Disable poke button to prevent unwanted user clicks
    globalHTML.pokeButton.disabled = true;
    // Poke button transition effect 
    globalHTML.pokeButton.style.transform = "scale(0.9)";
    await waitMs(50)
    globalHTML.pokeButton.style.transform = "scale(1)";
    // Player hint transition effect
    globalHTML.playerHint.style.transform = "scale(0.7)";
    await waitMs(150)
    globalHTML.playerHint.style.transform = "scale(1)";
    /* Increment rage meter by 0-15 */
    setRageMeter(globalHTML, globalVariables, Math.random() * 15, true);

    // Handle game logic
    if (globalVariables.rageMeter >= 100) {
        kickChosenPlayer(globalHTML, globalVariables);
        await waitMs(2000); // Wait 2 seconds
        // If there's only one player left, declare a winner 
        if (globalVariables.alivePlayers.length === 1){
            globalHTML.playerHint.innerHTML = 
                `<div>${globalVariables.alivePlayers[0]}</div><div style="color: var(--green); font-family: 'Luckiest Guy', sans-serif;">YOU WON!</div>`;
                await waitMs(5000); // Wait 5 seconds before resetting the game
            resetGame(globalHTML, globalVariables);
        }else{
            // If there are players, reset the rage meter 
            setRageMeter(globalHTML, globalVariables, 0);
            pickNewPlayer(globalHTML, globalVariables);
        }
    }else {
        pickNewPlayer(globalHTML, globalVariables);
    }

    // Change the bear image at specified levels + SEO & accessibility optimization
    let updatedBearStyle = {};
    if (globalVariables.rageMeter < 33) {
        updatedBearStyle.imageName = 0;
        updatedBearStyle.alt = "A bear lying down";
    }else if (globalVariables.rageMeter < 66) {
        updatedBearStyle.imageName = 33;
        updatedBearStyle.alt = "A bear sitting on the ground";
    }else {
        updatedBearStyle.imageName = 66;
        updatedBearStyle.alt = "An angry bear standing up";
    }
    globalHTML.bearImage.src = `assets/images/bear/bear_${updatedBearStyle.imageName}.png`;
    globalHTML.bearImage.alt = updatedBearStyle.alt;

    globalHTML.pokeButton.disabled = false; // Enable poke button
}

function runGame (playersArray, globalHTML, globalVariables) {
    // Hide the game set up and show the game area
    globalHTML.gameSetup.style.display = "none";
    globalHTML.gameArea.style.display = "block";
    // Bring all players to life
    globalVariables.alivePlayers = [...playersArray];
    pickNewPlayer(globalHTML, globalVariables);
}
