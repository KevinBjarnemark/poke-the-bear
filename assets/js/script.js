
// Run when the DOM has finished loading
document.addEventListener("DOMContentLoaded", function() {
    runWelcome();
});

/**
 * Waits for a specified number of milliseconds.
 * This function can be used to introduce a delay in asynchronous operations.
 *
 * @param {number} ms The number of milliseconds to wait before resolving the promise.
 * @returns {Promise<boolean>} A promise that resolves to true after the specified delay.
 */
const waitMs = async (ms) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true)
        }, ms);
    });
};

/**
 * This function handles the logic before the game runs 
 */
async function runWelcome () {
    await waitMs(1000);
    // Hide the welcome screen
    document.getElementById("welcome-screen").style.display = "none";
    // Show game setup
    document.getElementById("game-setup").style.display = "flex";
    // Get the player list element
    let playerListElement = document.getElementById("player-list");

    document.getElementById("add-player-button").addEventListener("click", function() {
        // Create player element
        let playerElement = document.createElement("div");
        playerElement.innerText = "Test"; // Set player name
        // Push player element to container
        playerListElement.appendChild(playerElement); 
    });
}

function runGame () {
    document.getElementById("poke-button").addEventListener("click", handlePoke);

    let rageMeter = 0; // 0 - 100
    let filledRageMeterElement = document.getElementById("filled-rage-meter");
    let bearImage = document.getElementById("bear").children[0];

    async function handlePoke () {
        // Change the bear image at specified levels
        switch (true) {
            default: bearImage = "/assets/images/bear/bear_0.png";
            case rageMeter < 50: {
                bearImage.src = "/assets/images/bear/bear_0.png";
                break;
            }
            case rageMeter >= 50 && rageMeter < 100: {
                bearImage.src = "/assets/images/bear/bear_50.png";
                break;
            }
            case rageMeter >= 100: {
                bearImage.src = "/assets/images/bear/bear_100.png";
                break;
            }
        }

        // Update the rage meter and adjust the css width accordingly
        if (rageMeter < 100) {
            rageMeter += Math.random() * 15; // Increment by 0-15
            // Set the css width (limited)
            filledRageMeterElement.style.width = `${Math.min(rageMeter, 100)}%`;
        }else{
            await waitMs(5000); // Wait 5 seconds before resetting the game
            rageMeter = 0; // Reset to 0
            filledRageMeterElement.style.width = `${rageMeter}%`;
        }
    }
}
